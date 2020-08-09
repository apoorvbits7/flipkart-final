import React from 'react';
import './InvoicesProcessedCard.css';
import { connect } from 'react-redux';

class InvoicesProcessedCard extends React.Component {
    render() {
        return (
            <div className="InvoicesProcessedCard">
                <span className="number">{this.props.invoicesProcessed}</span>
                <span className="text">Invoices<br />Processed</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoicesProcessed: state.invoicesProcessed
    }
}

export default connect(mapStateToProps)(InvoicesProcessedCard);