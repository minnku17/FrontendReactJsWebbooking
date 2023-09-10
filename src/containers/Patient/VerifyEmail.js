import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

import { postVerifyBookAppointment } from '../../services/userService';

function VerifyEmail({ language, location }) {
    let [statusVerify, setStatusVerify] = useState(false);
    let [errCode, setErrCode] = useState(false);
    useEffect(() => {
        async function fetchData() {
            if (location && location.search) {
                const urlParams = new URLSearchParams(location.search);
                const token = urlParams.get('token');
                const doctorId = urlParams.get('doctorId');
                let res = await postVerifyBookAppointment({
                    token: token,
                    doctorId: doctorId,
                });

                if (res && res.errCode === 0) {
                    setStatusVerify(true);
                    setErrCode(res.errCode);
                } else {
                    setStatusVerify(true);
                    setErrCode(res && res.errCode ? res.errCode : -1);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <HomeHeader />
            <div className="verify-email-container">
                {statusVerify === false ? (
                    <div>Loading data...</div>
                ) : (
                    <div>
                        {errCode === 0 ? (
                            <div className="info-booking">
                                Xác nhận lịch hẹn thành công!
                            </div>
                        ) : (
                            <div className="info-booking">
                                Lịch hẹn không tồn tại hoặc đã được xác nhận!
                            </div>
                        )}
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
