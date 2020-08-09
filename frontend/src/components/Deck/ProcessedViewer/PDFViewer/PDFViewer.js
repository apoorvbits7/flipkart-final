import React from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
// Import the main component
import Viewer from '@phuocng/react-pdf-viewer';
// Import the CSS
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

class PDFViewer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                <Viewer fileUrl={this.props.url} />
            </Worker>
        )
    }
}

export default PDFViewer;