import React from 'react';
import './Deck.css';
import InvoicesProcessedCard from './InvoicesProcessedCard/InvoicesProcessedCard';
import UploadCard from './UploadCard/UploadCard';
import DownloadCard from './DownloadCard/DownloadCard';
import Uploader from './Uploader/Uploader';
import ProcessedTable from './ProcessedTable/ProcessedTable';
import ProcessedViewer from './ProcessedViewer/ProcessedViewer';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Query from './Query/Query';
import Chatbot from './Chatbot/ChatbotTable';
import InvoiceViewer from './Chatbot/InvoiceViewer/InvoiceViewer';


class Deck extends React.Component {
    render() {
        return (
            <div className="Deck">
                <Switch>
                    <Route exact path="/">
                        <div className="headerRow">
                            <InvoicesProcessedCard />
                            <UploadCard />
                            <DownloadCard />
                        </div>
                        {this.props.uploaderOpen == true && <Uploader />}
                        {this.props.previewShow == true && <ProcessedViewer />}
                        {/* <ProcessedViewer /> */}
                        <ProcessedTable />
                    </Route>
                    <Route path="/query">
                        <Query />
                    </Route>
                    <Route path="/chatbot">
                        <Chatbot />
                        {this.props.supportDisplay.display == true && <InvoiceViewer />}
                    </Route>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uploaderOpen: state.uploaderOpen,
        previewShow: state.preview.show,
        supportDisplay: state.supportDisplay
    }
}

export default connect(mapStateToProps)(Deck);