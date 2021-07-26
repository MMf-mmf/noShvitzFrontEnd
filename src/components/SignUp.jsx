import React, {useState, useEffect} from "react";
import {Form, Label ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


function SignUp({fetchUrl, localFetchUrl}) {
    const [serverResponse, setServerResponse] = useState("")
    const [formData, setFormData] = useState({email: "", password: "", confirmPassword: "",
                                              firstName: "", lastName: "", phone1: "", phone2: "",
                                              emailError: false,   passwordError: false,
                                              passwordMatchError: false,
                                              phone1Error: false,   phone2Error: false,
                                              phoneMatchError: false,
                                              createUserError: false,  firstNameError: false,
                                              lastNameError: false, formError: false})

    // set a 6 second timer to refresh page a get rid of allert message
    if (serverResponse) {
      setTimeout(() => setServerResponse(""), 6000)
      // setServerResponse('')
      console.log('in page refresh')
    }

    function handleChange(e) {
      console.log(e.target.name)
      setFormData({...formData, [e.target.name]: e.target.value })
  }


    function handleSubmit(e) {
      e.preventDefault();

      let error = false
 
        const signUpData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNumber1: formData.phone1,
        phoneNumber2: formData.phone2
      }

      if (formData.email === '') {
        setFormData({...formData, emailError: true })
        error = true
      } else{
        setFormData({...formData, emailError: false })
      }

      if (formData.password.length < 6) {
        console.log(formData, 'befor')
        console.log(formData.passwordError)
        setFormData({...formData, passwordError: !formData.passwordError})
        console.log(formData, 'after')
        error = true
      } else {
        
        setFormData({...formData, passwordError: false })
      }

    //   HAVING A ISSUE WHERE THE setFormData(is setting all other vaues to false wile setting itown value to ether true or false)
    // to more reserch on how useState works

      // if (formData.confirmPassword !== formData.password) {
      //   console.log(formData.confirmPassword, formData.password, 'in the if ')
      //   setFormData({...formData, passwordMatchError: true })
      //   error = true
      // } else {
      //   setFormData({...formData, passwordMatchError: false })
      // }

     
      // if (error) {
      //   setFormData({...formData, formError: true })
      //   return;
      // }else{
      //   setFormData({...formData, formError: false })
      // }


      fetch(`${localFetchUrl}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
    })
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
          setServerResponse(data.message);
          if (data.error) {
            console.log(data.exception.slice(50))
            setServerResponse(data.exception.slice(50, -1))
          }
        const { user, token } = data;
        localStorage.token = token
        // setCurrentUser(user);
        });
    }

// console.log(formData)

    return(
<>
{serverResponse
?
<Message negative id="placeOrder-message">
  <Message.Header>{serverResponse}</Message.Header>
</Message>:null}



{/* {formData.passwordError
?
<Message negative id="placeOrder-message">
  <Message.Header>password must contain at least 8 caracters</Message.Header>
</Message>:null} */}

{formData.passwordMatchError
?
<Message negative id="placeOrder-message">
  <Message.Header>password must match</Message.Header>
</Message>:null}


<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png'  avatar/> Sign-Up Here
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
        <Form.Group >
           <Form.Input name="firstName"  placeholder='First Name' width={8} value={formData.firstName} onChange={handleChange}/>
           <Form.Input name="lastName"  placeholder='Last Name' width={8} value={formData.lastName} onChange={handleChange}/>
         </Form.Group>
          <Form.Input name="email" type='email' fluid icon='user' iconPosition='left'  placeholder='E-mail address' value={formData.email} onChange={handleChange} error={formData.emailError}/>
          <Form.Group >
       <Form.Input name="phone1" type='tel'  placeholder='Phone#1    1234564567' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" width={8} value={formData.phone1} onChange={handleChange} error={formData.phone1Error || formData.phoneMatchError}/>
         <Form.Input name="phone2" placeholder='Phone#2      1234564567' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" width={8} value={formData.phone2} onChange={handleChange} error={formData.phone2Error || formData.phoneMatchError}/>
        </Form.Group>
          <Form.Input name="password" type='password' minlength="8" fluid icon='lock' iconPosition='left'  placeholder='Password' type='password' value={formData.password} onChange={handleChange} error={formData.passwordError || formData.passwordMatchError}/>
          <Form.Input  name="confirmPassword" type='password' minlength="8" fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' value={formData.confirmPassword} onChange={handleChange} error={formData.passwordError || formData.passwordMatchError}/>
          <Button type='submit' color='teal' fluid size='large'
          disabled={!formData.email 
              || !formData.password
              || !formData.firstName
              || !formData.lastName
              || !formData.confirmPassword
              || !formData.phone1
              || !formData.phone2         
          }
          >Sign Up</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
        </>
    )
}
// address / city / state / zipCode
export default SignUp