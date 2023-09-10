import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingPOSITION: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;

            state.isLoadingPosition = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            state.position = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_END:
            state.isLoadingRole = false;
            state.roles = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_USERS_START:
            state.isLoadingRole = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data;
            state.isLoadingRole = false;

            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            state.isLoadingRole = false;

            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;

            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];

            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];

            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];

            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];

            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
