import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

interface DataRow {
    firstName: string;
    lastName: string;
    email: string;
}

interface Props {
    data: DataRow[];
}

const ClientSidePaginatedTable: React.FC<Props> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1 + indexOfFirstRow}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                className="my-3"
            // activePage={currentPage}
            // itemsCountPerPage={rowsPerPage}
            // totalItemsCount={data.length}
            // pageRangeDisplayed={5}
            // onChange={handlePageChange}
            />
        </>
    );
};

export default ClientSidePaginatedTable;
