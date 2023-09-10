import React from 'react';
import { connect } from 'react-redux';

function DefaultClass({ language }) {
    return <></>;
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
