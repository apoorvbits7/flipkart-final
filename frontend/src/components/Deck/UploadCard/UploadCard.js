import React from 'react';
import './UploadCard.css';
import { connect } from 'react-redux';

class UploadCard extends React.Component {
    render() {
        return (
            <div onClick={() => { this.props.toggleUploader(true) }} className="UploadCard">
                <i className="fa fa-upload image" aria-hidden="true"></i>
                <span className="text">Upload<br />Files</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleUploader: (toggle) => {
            dispatch({
                type: 'TOGGLE_UPLOADER',
                toggle: toggle
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(UploadCard);