import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import TimeTrackingTable from './timetracking/TimeTracking'
import EditableTable from './reusable/EditableTable'
interface TableData {
  id: number,
  name: string,
  age: number,
  address: string
}
const sampleData: TableData[] = [
  { id: 1, name: 'John Doe', age: 32, address: '123 Main St' },
  { id: 2, name: 'Jane Doe', age: 28, address: '456 Elm St' },
  { id: 3, name: 'Jim Smith', age: 40, address: '789 Oak St' },
];

function App() {
  const [count, setCount] = useState(0)



  return (
    <div className="App">
      <EditableTable data={sampleData} columns={['name', 'age', 'address']}></EditableTable>
      <TimeTrackingTable></TimeTrackingTable>
    </div>
  )
}

export default App
