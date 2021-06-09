import React, {useState, useEffect} from "react";
import {Form, Label ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";


function SignIn({ setCurrentUser, autoLogin }) {
    const [formData, setFormData] = useState({email: "", password: ""})
    const history = useHistory();

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
            localStorage.token = token;
            // save the user in state in App
            setCurrentUser(user);
            });
        }


    return(
<>





<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png'  avatar/> Log-in to your account
      </Header>

      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="email" placeholder='E-mail address' value={formData.email} onChange={handleChange}/>
          <Form.Input fluid icon='lock' iconPosition='left' name="password" placeholder='Password' type='password' value={formData.password} onChange={handleChange}/>

          <Button type='submit' color='teal' fluid size='large'>Login</Button>
        </Segment>
      </Form>

      <Message as={Link}  to="/SignUp" style={{ width: '' }}>
        Do not have an account? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>














 
        </>
    )
}

export default SignIn