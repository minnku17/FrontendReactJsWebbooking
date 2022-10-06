import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
function OutStandingDoctor({
    settings,
    language,
    loadTopDoctors,
    topDoctorsRedux,
}) {
    const [arrDoctors, setArrDoctors] = useState([]);

    useEffect(() => {
        loadTopDoctors();
    }, []);

    useEffect(() => {
        setArrDoctors(topDoctorsRedux);
    }, [topDoctorsRedux]);

    let allDoctors = arrDoctors;
    console.log('check state arrdoctors', allDoctors);
    return (
        <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">
                        <FormattedMessage id="home-page.out-standing-doctor" />
                    </span>
                    <button className="btn-section">
                        <FormattedMessage id="home-page.more-info" />
                    </button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {allDoctors &&
                            allDoctors.length > 0 &&
                            allDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(
                                        item.image,
                                        'base64',
                                    ).toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div
                                        className="section-customize"
                                        key={index}
                                    >
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div
                                                    className="bg-image section-outstanding-doctor"
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                    }}
                                                />
                                            </div>
                                            <div className="position text-center">
                                                <div>
                                                    {language === LANGUAGES.VI
                                                        ? nameVi
                                                        : nameEn}
                                                </div>
                                                <div>CƠ Xương Khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);