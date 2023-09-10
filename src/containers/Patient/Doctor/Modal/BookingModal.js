import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import './BookingModal.scss';
import DatePicker from '../../../../components/Input/DatePicker';
import ProfileDoctor from '../ProfileDoctor';
import * as actions from '../../../../store/actions';
import { useEffect } from 'react';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { useParams } from 'react-router';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import _ from 'lodash';

function BookingModal({
    language,
    isOpenModal,
    closeBookingModal,
    getGenderStart,
    genderRedux,
    dataScheduleTimeModal,
}) {
    let [state, setState] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        genderArr: '',
        selectedGender: '',
        doctorId: 0,
        timeType: '',
    });

    const { id } = useParams();

    useEffect(() => {
        getGenderStart();
    }, []);

    useEffect(() => {
        setState({
            ...state,
            doctorId: +id,
            timeType: dataScheduleTimeModal.timeType,
            genderArr: buildDataGender(genderRedux),
        });
    }, [language, genderRedux, dataScheduleTimeModal]);

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    let handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = { ...state };

        copyState[id] = valueInput;

        setState(copyState);
    };

    let handleOnChangeDatePicker = (date) => {
        setState({
            ...state,
            birthday: date[0],
        });
    };

    let handleChange = (selectedOption) => {
        setState({
            ...state,
            selectedGender: selectedOption,
        });
    };

    let handleConfirmBooking = async () => {
        let date = new Date(state.birthday).getTime().toString();
        let timeString = buildTimeBooking(dataScheduleTimeModal);
        let doctorName = buildDoctorName(dataScheduleTimeModal);
        let res = await postPatientBookAppointment({
            fullName: state.fullName,
            phoneNumber: state.phoneNumber,
            email: state.email,
            address: state.address,
            reason: state.reason,
            date: date,
            selectedGender: state.selectedGender.value,
            doctorId: state.doctorId,
            timeType: state.timeType,
            language: language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            closeBookingModal();
        } else {
            toast.error(res.errMessage);
        }
    };
    const buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return '';
    };
    const buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;

            let data =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            return ` ${time} ${data}`;
        }
        return '';
    };

    return (
        <>
            <Modal
                isOpen={isOpenModal}
                // toggle={}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeBookingModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-info">
                            <ProfileDoctor isShowDescriptionDoctor={false} />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullname" />
                                </label>
                                <input
                                    className="form-control"
                                    value={state.fullName}
                                    onChange={(e) =>
                                        handleOnChangeInput(e, 'fullName')
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phonenumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={state.phoneNumber}
                                    onChange={(e) =>
                                        handleOnChangeInput(e, 'phoneNumber')
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={state.email}
                                    onChange={(e) =>
                                        handleOnChangeInput(e, 'email')
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={state.address}
                                    onChange={(e) =>
                                        handleOnChangeInput(e, 'address')
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reasons" />
                                </label>
                                <input
                                    className="form-control"
                                    value={state.reason}
                                    onChange={(e) =>
                                        handleOnChangeInput(e, 'reason')
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={handleOnChangeDatePicker}
                                    value={state.birthday}
                                    // minDate={yesterday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={state.selectedGender}
                                    onChange={handleChange}
                                    options={state.genderArr}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
