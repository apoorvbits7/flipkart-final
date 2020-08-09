import React from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
// Import the main component
import Viewer from '@phuocng/react-pdf-viewer';
// Import the CSS
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import './InvoiceViewer.css';
import { connect } from 'react-redux';

class InvoiceViewer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="overlay"></div>
                <div className="InvoiceViewer">
                    <div className="fa-stack fa-4x crossButton" onClick={this.props.hideSupport}>
                        <i class="fa fa-circle fa-stack-2x icon-background" style={{ color: '#3b55e6' }}></i>
                        <i class="fa fa-times fa-stack-1x" style={{ color: 'white' }}></i>
                    </div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                        <Viewer fileUrl={this.props.supportDisplay.url} />
                    </Worker>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supportDisplay: state.supportDisplay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideSupport: () => {
            dispatch({
                type: 'HIDE_SUPPORT'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceViewer);