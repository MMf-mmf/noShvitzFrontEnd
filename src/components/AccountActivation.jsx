import React, {useState, useEffect} from "react";
import { useParams, Route, Switch, Redirect, useHistory } from "react-router-dom";
import {Message} from 'semantic-ui-react'





function AccountActivation() {
    const [serverResponse, setServerResponse] = useState("")
    let {id}  = useParams()

    // console.log(id)
    const queryString = window.location.search
    const email = new URLSearchParams(queryString).get('email');
    
    setTimeout(() => sendOthToken(), 200)
function sendOthToken() {
    fetch("http://localhost:3000/account_activations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({id: id, email: email}),
      })
        .then((r) => r.json())
        .then((message) => setServerResponse(message.message));
      // history.push('/SignIn')
      // window.location.reload();
}

  





    return(
        <>
                {serverResponse
        ?
        <Message negative id="placeOrder-message">
        <Message.Header>{serverResponse}</Message.Header>
        </Message>:null}

        <h1>in account actiovation page</h1>
        </>
    )
}

export default AccountActivation