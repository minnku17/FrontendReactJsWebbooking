import React from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';

function DoctorSchedule({ match, language, doctorIdFromParent }) {
    let [allDays, setAllDays] = useState([]);

    useEffect(() => {
        setArrDays();
    }, []);
    useEffect(() => {
        setArrDays();
    }, [language]);

    const setArrDays = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date())
                    .add(i, 'days')
                    .format('dddd - DD/MM');
            } else {
                object.label = moment(new Date())
                    .add(i, 'days')
                    .locale('en')
                    .format('ddd - DD/MM');
            }

            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day'.valueOf());
            arrDate.push(object);
        }

        setAllDays(arrDate);
    };
    const handleOnChangeSelect = async (e) => {
        if (doctorIdFromParent && doctorIdFromParent !== -1) {
            let id = doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(id, date);
            console.log('check schedule: ', res);
        }
    };
    return (
        <>
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
                <div className="all-available-time"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
