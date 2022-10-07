import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import { useEffect, useState } from 'react';

console.warn = () => {};
function UserRedux({
    getGenderStart,
    getPositionStart,
    getRoleStart,
    createNewUserService,
    fetchUserRedux,
    language,
    genderRedux,
    positionRedux,
    roleRedux,
    isLoadingGender,
    users,
    editAUserRedux,
}) {
    const [state, setState] = useState({
        genderArr: [],
        positionArr: [],
        roleArr: [],
        previewImg: '',
        isOpen: false,

        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',

        actions: '',
        userEditId: '',
    });

    useEffect(() => {
        getGenderStart();
        getPositionStart();
        getRoleStart();
    }, []);

    useEffect(() => {
        setState({
            genderArr: genderRedux,
            gender:
                genderRedux && genderRedux.length > 0
                    ? genderRedux[0].keyMap
                    : '',
            positionArr: positionRedux,
            position:
                positionRedux && positionRedux.length > 0
                    ? positionRedux[0].keyMap
                    : '',
            roleArr: roleRedux,
            role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : '',
            actions: CRUD_ACTIONS.CREATE,
        });
    }, [genderRedux, positionRedux, roleRedux, users]);

    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let files = data[0];

        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            console.log(base64);
            let objectUrl = URL.createObjectURL(files);
            setState({
                ...state,
                previewImg: objectUrl,
                avatar: base64,
            });
        }
    };
    const openPreviewImage = () => {
        if (state.previewImg === '') return;
        setState({
            ...state,
            isOpen: true,
        });
    };
    const checkValidate = () => {
        let isValid = true;
        let arrCheck = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };
    const handleSaveUser = async () => {
        let isValid = checkValidate();
        if (isValid === false) return;

        if (state.actions === CRUD_ACTIONS.CREATE) {
            await createNewUserService({
                email: state.email,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName,
                address: state.address,
                phonenumber: state.phoneNumber,
                gender: state.gender,
                roleId: state.role,
                positionId: state.position,
                avatar: state.avatar,
            });
        }
        if (state.actions === 'EDIT') {
            await editAUserRedux({
                id: state.userEditId,
                email: state.email,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName,
                address: state.address,
                phonenumber: state.phoneNumber,
                gender: state.gender,
                roleId: state.role,
                positionId: state.position,
                avatar: state.avatar,
            });
        }
        fetchUserRedux();
    };

    const onChangeInput = (e, id) => {
        let copyState = { ...state };
        copyState[id] = e.target.value;
        setState({
            ...copyState,
        });
    };

    const handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        setState({
            ...state,

            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            previewImg: imageBase64,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: user.imageBase64,
            actions: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };
    return (
        <div className="user-redux-container">
            <div className="title">User Redux with Thanh Hoa</div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-3">
                            <FormattedMessage id="manage-user.add" />
                        </div>
                        <div className="col-12">
                            {isLoadingGender === true ? 'Loading genders' : ''}
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={state.email || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'email');
                                }}
                                disabled={
                                    state.actions === CRUD_ACTIONS.EDIT
                                        ? true
                                        : false
                                }
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={state.password || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'password');
                                }}
                                disabled={
                                    state.actions === CRUD_ACTIONS.EDIT
                                        ? true
                                        : false
                                }
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.firstName || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'firstName');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.lastName || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'lastName');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.phoneNumber || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'phoneNumber');
                                }}
                            />
                        </div>
                        <div className="col-9">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.address || ''}
                                onChange={(e) => {
                                    onChangeInput(e, 'address');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    onChangeInput(e, 'gender');
                                }}
                                value={state.gender}
                            >
                                {state.genderArr &&
                                    state.genderArr.length > 0 &&
                                    state.genderArr.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    onChangeInput(e, 'position');
                                }}
                                value={state.position}
                            >
                                {state.positionArr &&
                                    state.positionArr.length > 0 &&
                                    state.positionArr.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap || ''}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    onChangeInput(e, 'role');
                                }}
                                value={state.role}
                            >
                                {state.roleArr &&
                                    state.roleArr.length > 0 &&
                                    state.roleArr.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.images" />
                            </label>
                            <div className="preview-img-container">
                                <input
                                    id="previewImg"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleOnChangeImage(e)}
                                />
                                <label
                                    className="label-upload"
                                    htmlFor="previewImg"
                                >
                                    Tải ảnh <i className="fas fa-upload"></i>
                                </label>
                                <div
                                    className="preview-image"
                                    style={{
                                        backgroundImage: `url(${state.previewImg})`,
                                    }}
                                    onClick={() => openPreviewImage()}
                                ></div>
                            </div>
                        </div>
                        <div className="col-12 my-3">
                            <button
                                className={
                                    state.actions === CRUD_ACTIONS.EDIT
                                        ? 'btn btn-warning'
                                        : 'btn btn-primary'
                                }
                                onClick={() => handleSaveUser()}
                            >
                                {state.actions === CRUD_ACTIONS.EDIT ? (
                                    <FormattedMessage id="manage-user.edit" />
                                ) : (
                                    <FormattedMessage id="manage-user.save" />
                                )}
                            </button>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleOnChangeImage={handleOnChangeImage}
                                    openPreviewImage={openPreviewImage}
                                    handleEditUserFromParentKey={
                                        handleEditUserFromParent
                                    }
                                    action={state.actions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.isOpen === true && (
                <Lightbox
                    mainSrc={state.previewImg}
                    onCloseRequest={() => setState({ ...state, isOpen: false })}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserService: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
