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
const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
    );
};

const getExtraInfoDoctorById = (id) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${id}`);
};

const getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${id}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
};
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`);
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
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllClinic,
};
