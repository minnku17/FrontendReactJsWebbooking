import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorsService,
    getAllDoctors,
    saveDetailDoctorService,
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
        }
    };
};

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START });
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Created new user!!!');
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
        }
    };
};

export const saveUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START });
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Deleted a user!!!');
                dispatch(deleteUserSuccess());
            } else {
                toast.success('Delete fail a user!!!');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
        }
    };
};
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: data,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_USER_START });
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Edited a user!!!');
                dispatch(editUserSuccess());
            } else {
                toast.success('Edited fail a user!!!');
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed(e));
        }
    };
};
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorsService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save info detail succeed !!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.success('Save info detail error !!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            toast.success('Save info detail error !!!');

            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};
