import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

interface Data {
  id: number;
  [key: string]: any;
}

interface Props {
  data: Data[];
  columns: string[];
}

const EditableTable: React.FC<Props> = ({ data, columns }) => {
  const [newData, setNewData] = useState(data);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewData(data);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    setNewData(
      newData.map(item => {
        if (item.id === id) {
          const newItem: any = { id };
          columns.forEach(column => {
            newItem[column] = item[column];
          });
          return newItem;
        }
        return item;
      })
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {newData.map(item =>
          item.id === editingId ? (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column}>
                  <Form.Control
                    type="text"
                    defaultValue={item[column]}
                    onChange={e =>
                      setNewData(
                        newData.map(dataItem =>
                          dataItem.id === item.id
                            ? { ...dataItem, [column]: e.target.value }
                            : dataItem
                        )
                      )
                    }
                  />
                </td>
              ))}
              <td>
                <Button variant="primary" onClick={() => handleSave(item.id)}>
                  Save
                </Button>{" "}
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </td>
            </tr>
          ) : (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column}>{item[column]}</td>
              ))}
              <td>
                <Button variant="primary" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default EditableTable;
