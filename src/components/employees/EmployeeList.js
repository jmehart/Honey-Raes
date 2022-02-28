import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Employees.css"

export const EmployeeList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value
    //useState takes a single arguement - the array input below
    const [employees, changeEmployee] = useState([])
    const [employeeSpecialties, setSpecialty] = useState("")
    //useState returns an array
    const history = useHistory()
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    useEffect(
        //get data from API and pull it into application state of employees
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((employeeAPIData) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    changeEmployee(employeeAPIData)
                })
        },
        []
    )

    useEffect(() => {
        /*
            1. Use .map() to get the specialty of each employee
            2. Then update a state variable to be a comma-separated string
                (e.g. "iPhone, Printers, ...")
        */
        const employeeSpecialties = employees.map(employee => employee.specialty)
        setSpecialty(employeeSpecialties.join(", "))
    }, [employees])

    return (
        //fragment to put chilcdren under single component
        <>
            <h1>Employees</h1>
            <div class="hire_button">
                <button onClick={() => history.push("/employees/create")}>Hire Employee</button>
            </div>
            <div>
                Specialties: {employeeSpecialties}
            </div>
            <ul>
                {
                    employees.map(
                        //paramater captures each individual employee object as it iterates
                        (employeeObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            return <li key={`employee--${employeeObject.id}`}><Link to={`/employees/${employeeObject.id}`}>{employeeObject.name}</Link></li>
                        }
                    )
                }
            </ul>

        </>
    )
}
