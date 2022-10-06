import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    handleCreateNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (item) => {
        console.log(item);

        try {
            let response = await deleteUserService(item.id);
            if (response.errCode === 0) {
                await this.getAllUsersFromReact();
                console.log(response.errCode);
            } else {
                console.log(response.errCode);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleEditUser = (item) => {
        console.log('check edit user', item);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: item,
        });
    };

    doEditUser = async (user) => {
        let res = await editUserService(user);
        if (res && res.errCode !== 0) {
            alert(res.errMessage);
        } else {
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModalEditUser: false,
            });
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.handleCreateNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.toggleUserModal()}
                    >
                        Add new user <i className="fas fa-plus"></i>
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-21"
                                                    onClick={() => {
                                                        this.handleEditUser(
                                                            item,
                                                        );
                                                    }}
                                                >
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    className="btn-21"
                                                    onClick={() => {
                                                        this.handleDeleteUser(
                                                            item,
                                                        );
                                                    }}
                                                >
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
