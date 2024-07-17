import { init as initApm} from '@elastic/apm-rum'
import React from 'react'
import {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'


var apm = initApm({
    serviceName: 'ems-frontend-app',
    serverUrl: 'http://10.10.10.47:8200',
    environment: 'test'
}) 



const ListEmployeeComponent = () => {
const [employees, setEmployees] = useState ([])
const navigator = useNavigate();
useEffect(()=>{
    getAllEmployees();
},[])

function getAllEmployees(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
            }).catch(error=>{
                console.error(error);
            })
}

function addNewEmployee(){
navigator('/add-employee')
}

function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
}

function removeEmployee(id){
console.log(id);
deleteEmployee(id).then((response) => {
getAllEmployees();
}).catch(error => {
    console.error(error);
})
}

  return (
    <div className='container'><br />
        <h1 className='text-center'>Employees List</h1>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px', marginRight:'-75px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent