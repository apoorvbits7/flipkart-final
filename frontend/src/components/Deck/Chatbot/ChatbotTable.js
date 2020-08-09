import React, { useEffect } from 'react';
import './Chatbot.css';
import styled from 'styled-components';
import { useTable, useSortBy, usePagination } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    ${'' /* border: 1px solid black; */}
    width:97%;
    background-color:white;
    border-radius:1%;
    margin:auto;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      width:25%;
      padding: 0.5rem;
      ${'' /* border-bottom: 1px solid black;
      border-right: 1px solid black; */}
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow } = useTable(
            {
                columns,
                data
            },
            useSortBy
        )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows;

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
        </>
    )
}

function ChatbotTable(props) {
    useEffect(() => {
        async function temp() {
            let result = await axios.post('http://localhost:8000/api/getSupportMessages');
            props.setSupport(result.data);
        }
        temp();
    }, [])

    const replyClick = () => {
        Swal.fire({
            title: 'Enter the message you wish to send!',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            preConfirm: (text) => {
                return axios.post('http://localhost:8000/api/sendMessageTo', {
                    message: text,
                    to: '+919381872407'
                }).then(result => {
                    return result.data;
                }).catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result);
            if (result.value) {
                Swal.fire(
                    'Message Sent!',
                    'Your message has been sent!',
                    'success'
                )
            }
        })
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Invoices Asking For Support',
                columns: [
                    {
                        Header: 'Phone Number',
                        accessor: 'phoneNumber',
                        Cell: (props) => {
                            console.log(props.value)
                            return <span>{props.value == undefined ? '-' : props.value}</span>
                        }
                    },
                    {
                        Header: 'Invoice',
                        accessor: 'lastFile',
                        Cell: (params) => (
                            <a href='#' style={{ cursor: 'pointer', textDecoration: 'none' }}
                                onClick={() => { props.displaySupport(params.value) }}>
                                {params.value == undefined ? '-' : 'View'}
                            </a>
                        )
                    },
                    {
                        Header: 'Reply',
                        accessor: '',
                        Cell: (props) => {
                            if (props.row.original.phoneNumber) {
                                return <a style={{ textDecoration: 'none' }} href='#' onClick={replyClick}>Reply</a>;
                            } else {
                                return <a style={{ textDecoration: 'none' }} href='#' onClick={replyClick}>-</a>;
                            }

                        }
                    },
                    {
                        Header: 'Date',
                        accessor: 'updatedAt',
                        Cell: (props) => {
                            return <span>{props.value == undefined ? '-' : new Date(props.value).toLocaleDateString()}</span>
                        }
                    }
                ]
            }
        ],
        []
    )

    return (
        <Styles>
            <Table columns={columns} data={
                props.support.length == 0 ?
                    [{ filename: '-', status: '-', fraud: '-', date: '-', download: '-' }] :
                    props.support} />
        </Styles>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSupport: (supportArray) => {
            dispatch({
                type: 'SET_SUPPORT',
                supportArray: supportArray
            })
        },
        displaySupport: (url) => {
            dispatch({
                type: 'DISPLAY_SUPPORT',
                url: url
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        support: state.support,
        length: state.support.length
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatbotTable);