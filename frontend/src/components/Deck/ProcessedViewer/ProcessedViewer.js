import React from 'react';
import { connect } from 'react-redux';
import './ProcessedViewer.css';
import PDFViewer from './PDFViewer/PDFViewer';
import x from './Sample1.pdf'

class ProcessedViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let fileID = this.props.preview.fileID;
        let file;
        this.props.files.map((f) => {
            if (f.id == fileID) {
                file = f;
            }
        })
        return (
            <div>
                <div className="overlay"></div>
                <div className="ProcessedViewer">
                    <div className="fields">
                        <span className="title">Extracted Fields</span>
                        <label for="invoiceNo">Invoice Number</label>
                        <input id="invoiceNo" value={file.processedDetails.invoiceNumber} />
                        <label for="invoiceNo">Total Amount</label>
                        <input id="invoiceNo" value={file.processedDetails.totalAmount} />
                        <label for="invoiceNo">GSTIN Number</label>
                        <input id="invoiceNo" value={file.processedDetails.gstinNo} />
                    </div>
                    <div className="preview" style={{ backgroundImage: `url(${file.download})` }}>
                        <PDFViewer url={x} />
                    </div>
                    <div className="fa-stack fa-4x crossButton" onClick={this.props.closePreview}>
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-times fa-stack-1x" style={{ color: 'white' }}></i>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files,
        preview: state.preview
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePreview: () => {
            dispatch({
                type: 'CLOSE_PREVIEW'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessedViewer);