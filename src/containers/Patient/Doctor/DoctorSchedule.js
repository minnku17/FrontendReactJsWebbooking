import React from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import './DoctorSchedule.scss';
import { result } from 'lodash';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { createContext } from 'react';

export const dataScheduleTimeContext = createContext();

function DoctorSchedule({ match, language }) {
    let [allDays, setAllDays] = useState([]);
    let [allValiableTime, setAllValiableTime] = useState([]);
    let [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
    let [dataScheduleTimeModal, setDataScheduleTimeModal] = useState({});

    const { id } = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            let allDays = getArrDays(language);
            setAllDays(allDays);
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorByDate(id, allDays[0].value);
                setAllValiableTime(res.data ? res.data : []);
            }
        };
    }, []);

    useEffect(() => {
        let allDays = getArrDays(language);
        setAllDays(allDays);
    }, [language]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date())
                        .add(i, 'days')
                        .format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day')
                .valueOf();
            allDays.push(object);
        }
        return allDays;
    };
    const handleOnChangeSelect = async (e) => {
        let date = e.target.value;
        let res = await getScheduleDoctorByDate(id, date);

        if (res && res.errCode === 0) {
            setAllValiableTime(res && res.data ? res.data : []);
        }
    };
    const handleClickScheduleTime = (time) => {
        setIsOpenModalBooking(true);
        setDataScheduleTimeModal(time);
    };
    const closeBookingModal = () => {
        setIsOpenModalBooking(false);
    };
    return (
        <dataScheduleTimeContext.Provider value={dataScheduleTimeModal}>
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(e) => handleOnChangeSelect(e)}>
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fas fa-calendar">
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </i>

                        <div className="time-content">
                            {allValiableTime && allValiableTime.length > 0 ? (
                                <>
                                    <div className="time-content-btns">
                                        {allValiableTime.map((item, index) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        handleClickScheduleTime(
                                                            item,
                                                        )
                                                    }
                                                    className={
                                                        language ===
                                                        LANGUAGES.VI
                                                            ? 'btn-vi'
                                                            : 'btn=-en'
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                                            <i className="far fa-hand-point-up" />{' '}
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal
                isOpenModal={isOpenModalBooking}
                closeBookingModal={closeBookingModal}
                dataScheduleTimeModal={dataScheduleTimeModal}
            />
        </dataScheduleTimeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
