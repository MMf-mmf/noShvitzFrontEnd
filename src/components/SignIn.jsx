import React, {useState, useEffect} from "react";
import {Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'


function SignIn({ onUpdateUser }) {
    const [formData, setFormData] = useState({email: "", password: ""})

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((data) => {
            console.log(data);
            const { user, token } = data;
    
            // save the user in state in App
            onUpdateUser(user);
    
            // also save the id to localStorage
            localStorage.token = token;
           
            });
        }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Input name="email" label='Email'
                 placeholder='joe@schmoe.com' width={6} value={formData.email} onChange={handleChange}/>
            <Form.Input name="password" label='Password'
                 placeholder='password' width={6} value={formData.password} onChange={handleChange}/>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default SignIn