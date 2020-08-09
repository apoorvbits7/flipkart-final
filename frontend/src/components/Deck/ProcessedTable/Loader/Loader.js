import React from 'react';
import './Loader.css';
import { connect } from 'react-redux';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleaClick = () => {
        this.props.showPreview(this.props.row.original.id);
    }
    render() {
        let statusJSX;
        if (this.props.value == false) {
            statusJSX = <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div class="loader"></div>
            </div>;
        } else if (this.props.value == '-') {
            statusJSX = '-';
        } else {
            statusJSX = <div>
                <span>✅</span>
                <a href="#" onClick={this.handleaClick}>(View)</a>
            </div>;
        }
        return (
            statusJSX
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPreview: (fileID) => {
            dispatch({
                type: 'SHOW_PREVIEW',
                fileID: fileID
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Loader);