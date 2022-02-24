import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [customers, setCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState("")
    //useState returns an array
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    //observing initial state
    useEffect(
        //get data from API and pull it into application state of customers
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((customerArray) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    setCustomers(customerArray)
                })
        },
        []
    )
    //useEffect observes state
    useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage("You have 1 customer")
            }
            else {
                updateMessage(`You have ${customers.length} customers, including:`)
            }
        },
        //array below contains what state useEffect is observing
        //run when customers changes
        [customers]
    )
    return (
        //fragment to put children under single component
        <>
            <h1>Customers</h1>
            <div>{totalCustomerMessage}</div>
            <ul>
                {
                    //interpolating an html representation that maps through customers
                    customers.slice(0, 5).map(
                        //paramater captures each individual customer object as it iterates
                        (customerObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            return <li key={`customer--${customerObject.id}`}>{customerObject.name}</li>
                        }
                    )
                }
            </ul>

        </>
    )
}
