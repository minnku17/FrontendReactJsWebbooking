import React from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { useState } from 'react';
import { getAllSpecialty } from '../../../services/userService';
import { useEffect } from 'react';
import { withRouter } from 'react-router';

function Specialty({ settings, history }) {
    let [dataSpecialty, setDataSpecialty] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let res = await getAllSpecialty();
            setDataSpecialty(res.data);
        }
        fetchData();
    }, []);
    const handleViewDetailDoctor = (item) => {
        console.log('view detail: ', item);
        history.push(`/detail-specialty/${item.id}`);
    };

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {dataSpecialty &&
                            dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div
                                        className="section-customize"
                                        key={index}
                                        onClick={() =>
                                            handleViewDetailDoctor(item)
                                        }
                                    >
                                        <div
                                            className="bg-image section-specialty"
                                            style={{
                                                backgroundImage: `url(${item.image})`,
                                            }}
                                        />
                                        <div>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty),
);
