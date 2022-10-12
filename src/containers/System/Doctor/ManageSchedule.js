import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';

import './ManageSchedule.scss';
import { useEffect, useState } from 'react';
import { LANGUAGES, dateFormat } from '../../../utils';
import DataPicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { saveBulkScheduleDoctor } from '../../../services/userService';

import { toast } from 'react-toastify';
import _ from 'lodash';

function ManageSchedule({
    fetchAllDoctors,
    allDoctors,
    language,
    fetchAllScheduleTime,
    allScheduleTime,
}) {
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [currentDate, setCurrentDate] = useState();
    const [listDoctors, setListDoctors] = useState([]);
    let [rangeTime, setRangeTime] = useState([]);

    useEffect(() => {
        fetchAllDoctors();
        fetchAllScheduleTime();
    }, []);
    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors);
        setListDoctors(dataSelect);

        let data = allScheduleTime;

        if (data && data.length > 0) {
            data = data.map((item) => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
    }, [allDoctors, language, allScheduleTime]);

    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    const handleChange = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
    };
    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });

            setRangeTime(rangeTime);
        }
    };
    const handleSaveSchedule = async () => {
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please select a doctor');
            return;
        }
        if (!currentDate) {
            toast.error('Please select a date');
            return;
        }

        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true,
            );
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error('Invalid schedule time');
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate,
        });

        console.log(res);

        console.log(result);
    };
    return (
        <>
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={handleChange}
                                options={listDoctors}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DataPicker
                                className="form-control"
                                onChange={handleOnChangeDatePicker}
                                value={currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={
                                                item.isSelected === true
                                                    ? 'btn btn-schedule active'
                                                    : 'btn btn-schedule'
                                            }
                                            key={index}
                                            onClick={() =>
                                                handleClickBtnTime(item)
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn - btn-primary btn-save-schedule"
                                onClick={() => handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
