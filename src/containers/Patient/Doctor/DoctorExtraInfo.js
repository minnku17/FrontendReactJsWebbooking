import React from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getExtraInfoDoctorById } from '../../../services/userService';
import './DoctorExtraInfo.scss';
import { result } from 'lodash';
import { useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from 'react-intl';

function DoctorExtraInfo({ match, language }) {
    let [isShowDetailInfo, setSsShowDetailInfo] = useState(false);

    let [extraInfo, setExtraInfo] = useState([]);

    const { id } = useParams();
    useEffect(async () => {
        let res = await getExtraInfoDoctorById(id);

        if (res && res.errCode === 0) {
            setExtraInfo(res.data);
        }
    }, []);

    const showHideDetailInfo = (status) => {
        setSsShowDetailInfo(status);
    };
    return (
        <>
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic
                            ? extraInfo.nameClinic
                            : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic
                            ? extraInfo.addressClinic
                            : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo === false ? (
                        <div className="short-info">
                            <FormattedMessage id="patient.extra-info-doctor.price" />

                            {extraInfo &&
                                extraInfo.priceTypeData &&
                                language === LANGUAGES.VI && (
                                    <NumericFormat
                                        className="currency"
                                        type="text"
                                        value={extraInfo.priceTypeData.valueVi}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                )}
                            {extraInfo &&
                                extraInfo.priceTypeData &&
                                language === LANGUAGES.EN && (
                                    <NumericFormat
                                        className="currency"
                                        type="text"
                                        value={extraInfo.priceTypeData.valueEn}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                )}
                            <span
                                className="detail"
                                onClick={() => showHideDetailInfo(true)}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.viewdetail" />
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfo &&
                                            extraInfo.priceTypeData &&
                                            language === LANGUAGES.VI && (
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    value={
                                                        extraInfo.priceTypeData
                                                            .valueVi
                                                    }
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            )}
                                        {extraInfo &&
                                            extraInfo.priceTypeData &&
                                            language === LANGUAGES.EN && (
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    value={
                                                        extraInfo.priceTypeData
                                                            .valueEn
                                                    }
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            )}
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note
                                        ? extraInfo.note
                                        : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-info-doctor.payment" />

                                {extraInfo &&
                                extraInfo.paymentTypeData &&
                                language === LANGUAGES.VI
                                    ? extraInfo.paymentTypeData.valueVi
                                    : ''}
                                {extraInfo &&
                                extraInfo.paymentTypeData &&
                                language === LANGUAGES.EN
                                    ? extraInfo.paymentTypeData.valueEn
                                    : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => showHideDetailInfo(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
