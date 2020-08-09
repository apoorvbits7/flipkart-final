import React from 'react';
import './DownloadCard.css';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils'
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class DownloadCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downlaoding: false,
            percentage: 0
        }
    }

    urlToPromise(url) {
        return new Promise(function (resolve, reject) {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    updatePercent = (metadata) => {
        var msg = "progression : " + metadata.percent.toFixed(2) + " %";
        if (metadata.currentFile) {
            msg += ", current file = " + metadata.currentFile;
        }
        // showMessage(msg);
        // updatePercent(metadata.percent | 0)
        console.log(msg);
        console.log(metadata.percent | 0);
        if (this.state.percentage == 100) {
            setTimeout(() => {
                this.setState({
                    downlaoding: false,
                    percentage: 0
                })
            }, 1000)
        }
        this.setState({
            downlaoding: true,
            percentage: Math.floor(metadata.percent)
        })
    }

    downloadZip = () => {
        let zip = new JSZip();
        console.log('Hi there!');
        if (this.props.files.length == 0) {
            alert('No files download!');
            return;
        }
        this.props.files.map((file) => {
            console.log('haah');
            zip.file(file.filename + '-' + new Date().getTime().toString() + '.' + file.download.split('.')[
                file.download.split('.').length - 1],
                this.urlToPromise(
                    file.download
                ), {
                binary: true
            });
        })
        zip.generateAsync({
            type: "blob"
        }, this.updatePercent)
            .then(function callback(blob) {

                // see FileSaver.js
                saveAs(blob, "allFiles.zip");
            });
    }
    render() {
        let downloadJSX;
        if (this.state.downlaoding == false) {
            downloadJSX = <i className="fa fa-download image" aria-hidden="true"></i>;
        } else {
            downloadJSX = <CircularProgressbar
                value={this.state.percentage}
                text={`${this.state.percentage}%`}
                className="circleProgress"
                styles={buildStyles({
                    trailColor: '#d6d6d6',
                    backgroundColor: '#729fe5',
                    textColor: '#729fe5',
                    pathColor: '#729fe5'
                })} />
        }
        return (
            <div onClick={this.downloadZip} className="DownloadCard">
                {downloadJSX}
                <span className="text">Download<br />All Files</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files
    }
}

export default connect(mapStateToProps)(DownloadCard);