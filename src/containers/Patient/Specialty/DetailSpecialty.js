import React, { useState } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';

function DetailSpecialty({ language }) {
    let [arrDoctorId, settDoctorId] = useState([45, 46, 73]);
    return (
        <>
            <HomeHeader />
            <div>Hello from detail specialty</div>
            <DoctorSchedule />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
