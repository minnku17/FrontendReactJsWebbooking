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
    const [hasOldData, setHasOldData] = useState(false);

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [allDoctors, language]);

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
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    const handleChange = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);

        let res = await getDetailInfoDoctor(selectedDoctor.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            setContentHTML(markdown.contentHTML);
            setContentMarkdown(markdown.contentMarkdown);
            setDescription(markdown.description);
            setHasOldData(true);
        } else {
            setContentHTML('');
            setContentMarkdown('');
            setDescription('');
            setHasOldData(false);
        }
        console.log(res);
        // if(res && res.)
    };
    const handleOnChangeDesc = (e) => {
        setDescription(e.target.value);
    };
    console.log(selectedDoctor);
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
                    <span>Lưu thông tin</span>
                ) : (
                    <span>Tạo thông tin</span>
                )}
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
