import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import EditableTable from '../reusable/EditableTable';

interface TimeTrackingProps {
    task: string;
    client: string;
    duration: number;
    // onSave: (task: string, client: string, duration: number) => void;
}

const TimeTracking: React.FC<TimeTrackingProps> = ({ task, client, duration }) => {
    const [edit, setEdit] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);
    const [updatedClient, setUpdatedClient] = useState(client);
    const [updatedDuration, setUpdatedDuration] = useState(duration);

    const onSave = (data: TimeTrackingProps) => console.log(data);
    const toggleEdit = () => setEdit(!edit);
    const cancelEdit = () => {
        setEdit(false);
        setUpdatedTask(task);
        setUpdatedClient(client);
        setUpdatedDuration(duration);
    };
    const handleSave = () => {
        setEdit(false);
        onSave({ task: updatedTask, client: updatedClient, duration: updatedDuration });
    };


    return (
        <>
            <tr onDoubleClick={toggleEdit}>
                <td>
                    {edit ? (
                        <input
                            type="text"
                            value={updatedTask}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                    ) : (
                        task
                    )}
                </td>
                <td>
                    {edit ? (
                        <input
                            type="text"
                            value={updatedClient}
                            onChange={(e) => setUpdatedClient(e.target.value)}
                        />
                    ) : (
                        client
                    )}
                </td>
                <td>
                    {edit ? (
                        <input
                            type="number"
                            value={updatedDuration}
                            onChange={(e) => setUpdatedDuration(Number(e.target.value))}
                        />
                    ) : (
                        duration
                    )}
                </td>
                {edit && (
                    <td>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </td>
                )}
            </tr>
        </>
    );
};

const TimeTrackingTable: React.FC = () => {
    const [timeTrackings, setTimeTrackings] = useState<TimeTrackingProps[]>([
        { task: 'Task 1', client: 'Client 1', duration: 2 },
        { task: 'Task 2', client: 'Client 2', duration: 3 },
        { task: 'Task 3', client: 'Client 3', duration: 4 },
    ]);

    const handleSave = (updatedTimeTracking: TimeTrackingProps) => {
        setTimeTrackings((prevTimeTrackings) =>
            prevTimeTrackings.map((timeTracking) =>
                timeTracking.task === updatedTimeTracking.task
                    ? updatedTimeTracking
                    : timeTracking
            )
        );
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Client</th>

                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {timeTrackings.map((timeTracking) => (
                    <TimeTracking
                        key={timeTracking.task}
                        task={timeTracking.task}
                        client={timeTracking.client}
                        duration={timeTracking.duration}
                    // onSave={handleSave}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default TimeTrackingTable;

