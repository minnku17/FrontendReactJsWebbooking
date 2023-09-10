import React, { useEffect, createContext, useContext } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from 'react-intl';

import localization from 'moment/locale/vi';

import { dataScheduleTimeContext } from './DoctorSchedule';
import _ from 'lodash';
import moment from 'moment';

function ProfileDoctor({ language, isShowDescriptionDoctor }) {
    const dataContext = useContext(dataScheduleTimeContext);

    let [dataProfile, setDataProfile] = useState({});

    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            setDataProfile(await getInfoDoctor(id));
        }
        fetchData();
    }, []);

    const getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }

            console.log(result);
        }

        return result;
    };

    let nameVi = '',
        nameEn = '';
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    const renderTimeBooking = (dataTime) => {
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
            return (
                <>
                    <div>
                        {time} {data}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    console.log('check data context: >>>>>>>>>', dataContext);
    return (
        <>
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left">
                        <img src={dataProfile.image} alt="" />
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>
                                                {
                                                    dataProfile.Markdown
                                                        .description
                                                }
                                            </span>
                                        )}
                                </>
                            ) : (
                                <>{renderTimeBooking(dataContext)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />{' '}
                    {dataProfile &&
                    dataProfile.Doctor_info &&
                    language === LANGUAGES.VI ? (
                        <NumericFormat
                            className="currency"
                            type="text"
                            value={
                                dataProfile.Doctor_info.priceTypeData.valueVi
                            }
                            displayType="text"
                            thousandSeparator={true}
                            suffix={'VNĐ'}
                        />
                    ) : (
                        ''
                    )}
                    {dataProfile &&
                    dataProfile.Doctor_info &&
                    language === LANGUAGES.EN ? (
                        <NumericFormat
                            className="currency"
                            type="text"
                            value={
                                dataProfile.Doctor_info.priceTypeData.valueEn
                            }
                            displayType="text"
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
