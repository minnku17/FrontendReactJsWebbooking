import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
};
const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcodes?type=${inputData}`);
};
const getTopDoctorsService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorsService,
    getAllDoctors,
    saveDetailDoctorService,
};
