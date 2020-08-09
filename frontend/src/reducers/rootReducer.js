import { produce, original } from "immer";
import { act } from "react-dom/test-utils";

const initState = {
    uploaderOpen: false,
    invoicesProcessed: 0,
    userID: '0fcc0cae-1870-4307-b949-7ed90788b878',
    files: [
    ],
    preview: {
        fileID: null,
        show: false
    },
    support: [],
    supportDisplay: {
        display: false,
        url: null
    }
}

var files;
var newFiles;

const rootReducer = produce((draft, action) => {
    switch (action.type) {
        case "TOGGLE_UPLOADER":
            draft.uploaderOpen = action.toggle;
            break;
        case "ADD_FILE":
            files = original(draft).files;
            console.log(files);
            newFiles = [{
                id: action.fileID,
                filename: action.file.meta.name,
                status: false,
                fraud: '-',
                date: new Date().toLocaleDateString(),
                download: null
            }, ...files];
            draft.files = newFiles;
            break;
        case "UPDATE_FILE":
            let fileID = action.fileData.fileID;
            let fraud = action.fileData.fraud;
            let url = action.fileData.link;
            let processedDetails = action.fileData.processedDetails;
            files = original(draft).files;
            files.map((file, index) => {
                if (file.id == fileID) {
                    draft.files[index].fraud = fraud;
                    draft.files[index].download = url;
                    draft.files[index].status = true;
                    draft.files[index].processedDetails = processedDetails;
                }
            });
            draft.invoicesProcessed = original(draft).invoicesProcessed + 1;
            break;
        case "SHOW_PREVIEW":
            draft.preview.show = true;
            draft.preview.fileID = action.fileID;
            break;
        case "CLOSE_PREVIEW":
            draft.preview.show = false;
            draft.preview.fileID = null;
            break;
        case "SET_SUPPORT":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_INVOICE":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_SUPPORT":
            draft.supportDisplay = {
                display: true,
                url: action.url
            }
            break;
        case "HIDE_SUPPORT":
            draft.supportDisplay = {
                display: false,
                url: null
            }
            break;
    }
}, initState);


export default rootReducer;