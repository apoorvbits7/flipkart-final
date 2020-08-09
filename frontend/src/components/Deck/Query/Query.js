import React from 'react';
import './Query.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from 'react-redux';
import axios from 'axios';

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Filename", field: "fileName", sortable: true, filter: true
            }, {
                headerName: "URL", field: "fileURL",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + params.value + `</a>`
                }
            }, {
                headerName: "Invoice Number", field: "invoiceNumber", sortable: true, filter: 'agNumberColumnFilter'
            }, {
                headerName: "Total Amount (Rs)", field: "totalAmount", sortable: true, filter: 'agNumberColumnFilter'
            }, {
                headerName: "Date", field: "createdAt", sortable: true, filter: 'agDateColumnFilter',
                filterParams: {
                    // provide comparator function
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;

                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        // var dateParts = dateAsString.split('/');
                        // var day = Number(dateParts[2]);
                        // var month = Number(dateParts[1]) - 1;
                        // var year = Number(dateParts[0]);
                        var cellDate = new Date(cellValue);

                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }],
            rowData: []
        }
    }
    async componentDidMount() {
        let allUploads = await axios.post('http://localhost:8000/api/getAllUploads', {
            userID: this.props.userID
        });
        let allUploadsProcessed = allUploads.data.map((upload) => {
            upload.createdAt = new Date(upload.createdAt).toLocaleDateString();
            return upload;
        })
        this.setState({
            rowData: allUploadsProcessed
        })
        console.log(allUploads);
        this.refs.agGrid.api.sizeColumnsToFit()
    }
    render() {
        return (
            <div
                className="ag-theme-alpine"
                style={{
                    height: '90%',
                    width: '100%'
                }}
            >
                <AgGridReact
                    ref="agGrid"
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps)(Query);