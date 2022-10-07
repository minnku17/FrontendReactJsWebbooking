import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { useState, useEffect } from 'react';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
function TableManageUser({
    handleEditUserFromParentKey,
    users,
    fetchUserRedux,
    deleteAUser,
}) {
    const [usersRedux, setUsersRedux] = useState([]);

    useEffect(() => {
        fetchUserRedux();
    }, []);

    useEffect(() => {
        setUsersRedux(users);
    }, [users]);

    const handleDeleteUser = async (user) => {
        await deleteAUser(user.id);
        fetchUserRedux();
    };
    const handleEditUser = (user) => {
        handleEditUserFromParentKey(user);
    };
    return (
        <React.Fragment>
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Avatar</th>
                        <th>Actions</th>
                    </tr>
                    {usersRedux &&
                        usersRedux.length > 0 &&
                        usersRedux.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(
                                    item.image,
                                    'base64',
                                ).toString('binary');
                            }
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <th>{item.gender}</th>

                                    <td>{item.address}</td>
                                    <th
                                        className="bg-image section-outstanding-doctor avatarDoctor"
                                        style={{
                                            backgroundImage: `url(${imageBase64})`,
                                        }}
                                    ></th>

                                    <td>
                                        <button
                                            className="btn-21"
                                            onClick={() => {
                                                handleEditUser(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="btn-21"
                                            onClick={() => {
                                                handleDeleteUser(item);
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
            <MdEditor
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
