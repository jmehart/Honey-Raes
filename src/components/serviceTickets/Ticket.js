import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Ticket = () => {
    const [ticket, setTicket] = useState({})  // State variable for current ticket object
    const { ticketId } = useParams()  // Variable storing the route parameter which is ticketId and is an integer. example: http://localhost:8088/serviceTickets/5
        //5 is the ticketId route parameter
    const [employees, syncEmployees] = useState([])  // State variable for array of employees
    const history = useHistory()


    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(res => res.json())
                .then((data) => {
                    setTicket(data)
                })
        },
        [ticketId]  // Above function runs when the value of ticketId change
    )

       // Fetch all employees
       useEffect(
        () => {
            fetch(`http://localhost:8088/employees`)
                .then(res => res.json())
                .then(syncEmployees)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )

    // Function to invoke when an employee is chosen from <select> element
    const assignEmployee = (changeEvent) => {

        // Construct a new object to replace the existing one in the API
        //JSON server controls the object's id so you don't need that
        const updatedTicket = {
            customerId: ticket.customerId,
            employeeId: parseInt(changeEvent.target.value),
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ticket.dateCompleted
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTicket)
        })
            .then(() => {
                history.push("/serviceTickets")
            })
    }

    return (
        <>
            <h2>Ticket Details</h2>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">Assigned to 
                <select id="employee"
                        value={ ticket.employeeId }
                        onChange={ assignEmployee }>
                        {
                            employees.map(employee => <option key={`employee--${employee.id}`} value={employee.id}>{employee.name}</option>)
                        }
                    </select>
                </div>
            </section>
        </>
    )
}