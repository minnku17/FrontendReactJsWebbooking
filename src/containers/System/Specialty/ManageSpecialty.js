import React, { useState } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageSpecialty.scss';
import { toast, Toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageSpecialty({ language }) {
    let [name, setName] = useState('');
    let [imageBase64, setImageBase64] = useState('');
    let [descriptionHTML, setDescriptionHTML] = useState('');
    let [descriptionMarkdown, setDescriptionMarkdown] = useState('');

    const handleOnChangeInput = (e, id) => {
        if (id === 'name') {
            setName(e.target.value);
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkdown(text);
        setDescriptionHTML(html);
    };

    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let files = data[0];

        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            setImageBase64(base64);
        }
    };
    const handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty({
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.success('Add new specialty successfully');
            setName('');
            setImageBase64('');
            setDescriptionHTML('');
            setDescriptionMarkdown('');
        } else {
            toast.error('Add new specialty fail');
        }
    };

    return (
        <>
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input
                            className="form-control-file"
                            type="file"
                            onChange={(e) => handleOnChangeImage(e)}
                        />
                    </div>

                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => handleSaveNewSpecialty()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
