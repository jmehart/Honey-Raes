import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const TicketForm = () => {
    //create the inital ticket object
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })

    const history = useHistory()

    //use state object to post to the api
    const saveTicket = (event) => {
        event.preventDefault()
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            //pull foreign key of customerId from local storage and add to new object
            customerId: parseInt(localStorage.getItem("honey_customer")),
            //employeeId is needed or else json will delete object because it thinks its an invalid foreign key
            employeeId: 1,
            dateCompleted: ""
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }
        return fetch("http://localhost:8088/serviceTickets", fetchOption)
        //change browser URL with useHistory 
        .then(() => {
            history.push("/serviceTickets")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        onChange={
                            (event) => {
                                //cannot directly modifiy state in react, use a setter function to change state
                                const copy = { ...ticket }
                                copy.description = event.target.value
                                updateTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" id="description"
                        className="form-control"
                        placeholder="Brief description of problem"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.emergency = event.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <button onClick={saveTicket} className="btn btn-primary" onClick={saveTicket}>
                Submit Ticket
            </button>
        </form>
    )
}