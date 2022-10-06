import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick';
//import css file
class HandBook extends Component {
    render() {
        return (
            <div className="section-share section-hand-book">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-hand-book" />
                                <div>Cơ xương khớp6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
