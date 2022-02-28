import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import "./Tickets.css"

export const TicketList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value
    //useState takes a single arguement - the array input below
    const [tickets, updateTickets] = useState([])
    //useState returns an array
    //This is a hook provided by the React Router DOM library that you installed. 
    //It grants you the ability to programtically manipulate the browser URL instead of waiting for a user to click on a <Link> component.
    const history = useHistory()

    //define and get value for fetch in order to use it for Delete fetch method and avoid copying the fetch call over and over
    const getTickets = () => {
        //get data from API and pull it into application state of tickets
        fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
            .then(res => res.json())
            .then((ticketAPIData) => {
                //you can not directly modify state in React - you always have to use the function that it provided you in useState
                //arguement is what you want the state to be
                updateTickets(ticketAPIData)
            })
    }


        //built in function/hook - useEffect - takes two arguments (function and array)
        //useEffect's purpose is to run code when state changes
        useEffect(
            //invoke getTickes from above to use the fetch call
            () => {
                getTickets()
            },
            []
        )

        //After the DELETE operation is successful, you need to GET all of the service tickets again, and render the new state.
    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
            .then(getTickets)
    }

    return (
        //fragment to put children under single component
        <>
            <h1>Service Tickets</h1>
            <section className="serviceTickets">
            <div>
                <button className="create_ticket" onClick={() => history.push("/serviceTickets/create")}>Create Ticket</button>
            </div>
            {tickets.map((ticketObject) => {
                if (ticketObject.emergency === false) {
                    return (
                        <div className="tickets_css" key={`ticket--${ticketObject.id}`}>
                            <p>
                                <Link to={`/serviceTickets/${ticketObject.id}`}>{ticketObject.description}</Link> <p>Submitted by {ticketObject.customer.name}</p>
                            </p>
                            <p>Worked on by {ticketObject.employee.name}</p>
                            <button className="delete-ticket" onClick={() => { deleteTicket(ticketObject.id) }}>Delete</button>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className="emergency"
                            key={`ticket--${ticketObject.id}`}
                        >
                            <p>
                                {ticketObject.emergency ? "🚑" : ""} <Link to={`/serviceTickets/${ticketObject.id}`}>{ticketObject.description}</Link>{" "}
                                <p>Submitted by {ticketObject.customer.name}</p>
                            </p>
                            <p>Worked on by {ticketObject.employee.name}</p>
                            <button className="delete-ticket" onClick={() => { deleteTicket(ticketObject.id) }}>Delete</button>
                        </div>
                    );
                }
            })} </section>
        </>
    );
};