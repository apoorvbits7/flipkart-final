import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './Uploader.css';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class Uploader extends React.Component {
    getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    submitFile = async (file, fileID) => {
        const filesData = new FormData();
        filesData.append('userID', this.props.userID);
        filesData.append('fileID', fileID);
        filesData.append(file.meta.name, file.file);
        this.props.addFile(fileID, file);
        let result = await axios({
            method: "POST",
            url: "http://localhost:8000/api/upload",
            data: filesData,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
        console.log(result);
        this.props.updateFile(result.data);
    }

    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta.name));
        files.map((file) => {
            let fileID = uuidv4();
            this.submitFile(file, fileID);
        });
        allFiles.forEach(f => f.remove());
        this.props.toggleUploader(false);
    }
    render() {
        return (
            <div>
                <div className="overlay"></div>
                <div className="uploader">
                    <div className="header">
                        <i onClick={() => { this.props.toggleUploader(false) }} style={{ color: 'white', marginRight: '2%', cursor: 'pointer' }} class="fa fa-times"></i>
                    </div>
                    <Dropzone
                        onChangeStatus={this.handleChangeStatus}
                        onSubmit={this.handleSubmit}
                        styles={{ dropzone: { width: '100%', height: '95%', borderRadius: '2%', overflow: 'hidden', backgroundColor: 'white', borderRadius: '2%', border: 0, overflowY: 'scroll' } }}
                        inputContent="Upload or Drag Documents"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID,
        files: state.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleUploader: (toggle) => {
            dispatch({
                type: 'TOGGLE_UPLOADER',
                toggle: toggle
            })
        },
        addFile: (fileID, file) => {
            dispatch({
                type: 'ADD_FILE',
                fileID: fileID,
                file: file
            })
        },
        updateFile: (fileData) => {
            dispatch({
                type: 'UPDATE_FILE',
                fileData: fileData
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);