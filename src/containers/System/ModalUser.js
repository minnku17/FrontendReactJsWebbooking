import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            });
        });
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
        console.log('aaaaa');
    };

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value; //copyState[id] đồng nghĩa với this.state.id cụ thể (this.state.email)
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let arrInput = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
        ];
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            console.log(
                'Check inside loop: ' + this.state[arrInput[i]],
                arrInput[i],
            );
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing required field: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleAddNewUser = () => {
        let check = this.checkValidateInput();
        if (check === true) {
            this.props.createNewUser(this.state);
        }
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'email');
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'password');
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'firstName');
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'lastName');
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'address');
                                }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                    >
                        Add new
                    </Button>{' '}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
