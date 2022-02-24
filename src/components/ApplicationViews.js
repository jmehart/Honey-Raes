import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { Ticket } from "./serviceTickets/Ticket"
import { TicketForm } from "./serviceTickets/TicketForm"
import { TicketList } from "./serviceTickets/TicketList"

//Define how your application will respond when the URL matches each of those patterns
//When a user clicks on one of the hyperlinks in the navigation bar, this code dictates which component should be rendered.
export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/customers">
                <CustomerList />
            </Route>
            <Route exact path="/serviceTickets">
                <TicketList />
            </Route>
            <Route path="/serviceTickets/create">
                <TicketForm />
            </Route>
            <Route exact path="/serviceTickets/:ticketId(\d+)">
                <Ticket />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/create">
                <EmployeeForm />
            </Route>
        </>
    )
}