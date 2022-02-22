import React, { useEffect, useState } from "react"

export const TicketList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value
    //useState takes a single arguement - the array input below
    const [tickets, updateTickets] = useState([])
    //useState returns an array
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
        //fragment to put chilcdren under single component
        <>

            <ul>
                {
                    tickets.map(
                        //paramater captures each individual ticket object as it iterates
                        (ticketObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            return <li key={`ticket--${ticketObject.id}`}>{ticketObject.description}</li>
                        }
                    )
                }
            </ul>

        </>
    )
}