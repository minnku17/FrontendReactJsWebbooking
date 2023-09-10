import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { useState, useEffect } from 'react';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
import { SEND_INIT_STATE } from 'redux-state-sync';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor({
    language,
    fetchAllDoctors,
    allDoctors,
    saveDetailDoctor,
    getAllRequiredDoctorInfor,
    allRequiredDoctorInfo,
}) {
    //save to Markdown table
    const [selectedOptions, setSelectedOptions] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);
    const [hasOldData, setHasOldData] = useState(false);

    //save to doctor_info table
    let [listPrice, setListPrice] = useState([]);
    let [listPayment, setListPayment] = useState([]);
    let [listProvince, setListProvince] = useState([]);
    let [listClinic, setListClinic] = useState([]);
    let [listSpecialty, setListSpecialty] = useState([]);

    let [selectedPrice, setselectedPrice] = useState('');
    let [selectedPayment, setselectedPayment] = useState('');
    let [selectedProvince, setselectedProvince] = useState('');
    let [selectedClinic, setSelectedClinic] = useState('');
    let [selectedSpecialty, setSelectedSpecialty] = useState('');

    let [nameClinic, setNameClinic] = useState('');
    let [addressClinic, setAddressClinic] = useState('');
    let [note, setNote] = useState('');
    let [clinicId, setCliniId] = useState('');
    let [specialtyId, setSpecialtyId] = useState('');

    useEffect(() => {
        fetchAllDoctors();
        getAllRequiredDoctorInfor();
    }, []);

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors, 'USERS');
        let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
            allRequiredDoctorInfo;

        let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectSpecialty = buildDataInputSelect(
            resSpecialty,
            'SPECIALTY',
        );
        let dataSelectClinic = buildDataInputSelect(resClinic, 'CLINIC');
        setListDoctors(dataSelect);
        setListPrice(dataSelectPrice);
        setListPayment(dataSelectPayment);
        setListProvince(dataSelectProvince);
        setListSpecialty(dataSelectSpecialty);
        setListClinic(dataSelectClinic);
    }, [allDoctors, language, allRequiredDoctorInfo]);

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }
        return result;
    };

    // Finish!
    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = async () => {
        await saveDetailDoctor({
            addressClinic: addressClinic,
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedOptions.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            note: note,
            clinicId:
                selectedClinic && selectedClinic.value
                    ? selectedClinic.value
                    : '',
            specialtyId: selectedSpecialty.value,
        });
    };

    const handleChangeSelectDoctorInfo = (selectedOptions, name) => {
        let stateName = name.name;

        if (stateName === 'selectedPrice') {
            selectedPrice = selectedOptions;
            setselectedPrice(selectedPrice);
        } else if (stateName === 'selectedPayment') {
            selectedPayment = selectedOptions;
            setselectedPayment(selectedPayment);
        } else if (stateName === 'selectedProvince') {
            selectedProvince = selectedOptions;
            setselectedProvince(selectedProvince);
        } else if (stateName === 'selectedSpecialty') {
            selectedSpecialty = selectedOptions;
            setSelectedSpecialty(selectedSpecialty);
        } else if (stateName === 'selectedClinic') {
            selectedClinic = selectedOptions;
            setSelectedClinic(selectedClinic);
        }

        console.log(
            '>>>>>>>>>check :',
            selectedPrice,
            selectedPayment,
            selectedProvince,
        );
    };
    const handleChange = async (selectedOptions) => {
        setSelectedOptions(selectedOptions);

        let res = await getDetailInfoDoctor(selectedOptions.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                specialtyId = '',
                provinceId = '',
                selectedPayment = '',
                selectedPrice = '',
                selectedProvinceId = '',
                selectedSpecialtyId = '';
            if (res.data.Doctor_info) {
                addressClinic = res.data.Doctor_info.addressClinic;
                nameClinic = res.data.Doctor_info.nameClinic;
                note = res.data.Doctor_info.note;
                paymentId = res.data.Doctor_info.paymentId;
                priceId = res.data.Doctor_info.priceId;
                provinceId = res.data.Doctor_info.provinceId;
                specialtyId = res.data.Doctor_info.specialtyId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvinceId = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
                selectedSpecialtyId = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
            }

            setAddressClinic(addressClinic);
            setNameClinic(nameClinic);
            setNote(note);
            setContentHTML(markdown.contentHTML);
            setContentMarkdown(markdown.contentMarkdown);
            setDescription(markdown.description);
            setHasOldData(true);
            setselectedPayment(selectedPayment);
            setselectedPrice(selectedPrice);
            setselectedProvince(selectedProvinceId);
            setSelectedSpecialty(selectedSpecialtyId);
        } else {
            setContentHTML('');
            setContentMarkdown('');
            setDescription('');
            setAddressClinic('');
            setNameClinic('');
            setNote('');
            setHasOldData(false);
        }
        // if(res && res.)
    };

    console.log(selectedSpecialty);
    const handleOnchangeText = (e, id) => {
        if (id === 'description') {
            setDescription(e.target.value);
        }
        if (id === 'nameClinic') {
            setNameClinic(e.target.value);
        }
        if (id === 'addressClinic') {
            setAddressClinic(e.target.value);
        }
        if (id === 'note') {
            setNote(e.target.value);
        }
    };
    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">
                <FormattedMessage id="admins.manage-doctor.title" />
            </div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.select-doctor" />
                    </label>
                    <Select
                        value={selectedOptions}
                        onChange={handleChange}
                        options={listDoctors}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.select-doctor" />
                        }
                    />
                </div>
                <div className="content-right">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.intro" />
                    </label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => handleOnchangeText(e, 'description')}
                    ></textarea>
                </div>
            </div>
            <div className="more-infor-extra row">
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.price" />
                    </label>
                    <Select
                        value={selectedPrice}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPrice}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.price" />
                        }
                        name="selectedPrice"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.payment" />
                    </label>

                    <Select
                        value={selectedPayment}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPayment}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.payment" />
                        }
                        name="selectedPayment"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.province" />
                    </label>
                    <Select
                        value={selectedProvince}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listProvince}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.province" />
                        }
                        name="selectedProvince"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.nameClinic" />
                    </label>
                    <input
                        className="form-control"
                        value={nameClinic}
                        onChange={(e) => handleOnchangeText(e, 'nameClinic')}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.address" />
                    </label>
                    <input
                        className="form-control"
                        value={addressClinic}
                        onChange={(e) => handleOnchangeText(e, 'addressClinic')}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Note</label>
                    <input
                        className="form-control"
                        value={note}
                        onChange={(e) => handleOnchangeText(e, 'note')}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.specialty" />
                    </label>
                    <Select
                        value={selectedSpecialty}
                        options={listSpecialty}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.specialty" />
                        }
                        onChange={handleChangeSelectDoctorInfo}
                        name="selectedSpecialty"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>
                        <FormattedMessage id="admins.manage-doctor.select-clinic" />
                    </label>

                    <Select
                        value={selectedClinic}
                        options={listClinic}
                        placeholder={
                            <FormattedMessage id="admins.manage-doctor.specialty" />
                        }
                        onChange={handleChangeSelectDoctorInfo}
                        name="selectedClinic"
                    />
                </div>
            </div>
            <div className="manage-doctor-editor">
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />
            </div>

            <button
                className={
                    hasOldData === true
                        ? 'save-content-doctor'
                        : 'create-content-doctor'
                }
                onClick={() => handleSaveContentMarkdown()}
            >
                {hasOldData === true ? (
                    <span>
                        <FormattedMessage id="admins.manage-doctor.save" />
                    </span>
                ) : (
                    <span>
                        <FormattedMessage id="admins.manage-doctor.create" />
                    </span>
                )}
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequiredDoctorInfor: () =>
            dispatch(actions.getRequiredDoctorInfor()),

        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
