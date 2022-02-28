import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Employee = () => {
    const [employee, setEmployee] = useState({})
    const {employeeId} = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employeeId}`)
                .then(res => res.json())
                .then((data) => {
                    setEmployee(data)
                })
        },
        [employeeId]  // Above function runs when the value of ticketId change
    )

    return (
        <>
            <h2>{employee.name}</h2>
            <p>Specialty is {employee.specialty}</p>
        </>
    )
}