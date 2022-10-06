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
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor({
    language,
    fetchAllDoctors,
    allDoctors,
    saveDetailDoctor,
}) {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [allDoctors, language]);
    console.log('Check state doctors: ', listDoctors);

    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    // Finish!
    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = () => {
        saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
        });
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
                        options={listDoctors}
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
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
