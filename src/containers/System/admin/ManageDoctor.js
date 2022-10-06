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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor({}) {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');

    // Finish!
    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = () => {
        console.log(
            'check state: ',
            selectedDoctor,
            contentMarkdown,
            contentHTML,
            description,
        );
    };

    const handleChange = (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
        console.log(`Option selected:`, selectedDoctor);
    };
    const handleOnChangeDesc = (e) => {
        setDescription(e.target.value);
    };
    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label>Chọn bác sĩ</label>
                    <Select
                        value={selectedDoctor}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <div className="content-right">
                    <label>Thông tin giới thiệu:</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => handleOnChangeDesc(e)}
                    >
                        faafs
                    </textarea>
                </div>
            </div>
            <div className="manage-doctor-editor">
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <button
                className="save-content-doctor"
                onClick={() => handleSaveContentMarkdown()}
            >
                Lưu thông tin
            </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
