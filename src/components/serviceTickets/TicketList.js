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
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    useEffect(
        //get data from API and pull it into application state of tickets
        () => {
            fetch("http://localhost:8088/serviceTickets")
                .then(res => res.json())
                .then((ticketAPIData) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    updateTickets(ticketAPIData)
                })
        },
        []
    )



    return (
        //fragment to put children under single component
        <>
            <h1>Service Tickets</h1>
            <div>
                <button onClick={() => history.push("/serviceTickets/create")}>Create Ticket</button>
            </div>
            <ul>
                {
                    tickets.map(
                        //paramater captures each individual ticket object as it iterates
                        (ticketObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            return <section className="tickets_css" key={`ticket--${ticketObject.id}`}>
                                <div className={ticketObject.emergency ? "emergency" : "ticket"}>
                                    <div>{ticketObject.emergency ? "🚑" : ""}
                                        <Link to={`/tickets/${ticketObject.id}`}>{ticketObject.description}</Link>
                                    </div>
                                    <div>Submitted by <b>{ticketObject.customer?.name}</b> and worked on by <b>{ticketObject.employee?.name}</b></div>
                                </div>
                            </section>
                        }
                    )
                }
            </ul>

        </>
    )
}