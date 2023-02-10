import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

interface RowData {
    name: string;
    age: number;
    address: string;
}

interface Props {
    columnNames: string[];
    pageSize: number;
    fetchData: (page: number, pageSize: number) => Promise<RowData[]>;
}

const ServerSidePaginationTable: React.FC<Props> = ({
    columnNames,
    pageSize,
    fetchData,
}) => {
    const [data, setData] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetchData(currentPage, pageSize).then(data => {
            setData(data);
            setLoading(false);
        });
    }, [currentPage, pageSize, fetchData]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {columnNames.map((name, index) => (
                                <th key={index}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Button onClick={handlePrev}>Prev</Button>
            <Button onClick={handleNext}>Next</Button>
        </>
    );
};

export default ServerSidePaginationTable;
