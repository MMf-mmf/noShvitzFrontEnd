import React, {useState, useEffect} from "react";
import { Form } from 'semantic-ui-react'


function SignUp(params) {
    return(
        <Form>
        <Form.Group >
          <Form.Input label='First name' placeholder='First Name' width={4} />
          <Form.Input label='Last Name' placeholder='Last Name' width={4} />
        </Form.Group>
        <Form.Input label='Email' placeholder='joe@schmoe.com' width={8}/>
        <Form.Group >
          <Form.Input label='Phone number#1' placeholder='First Name' width={4} />
          <Form.Input label='Phone number#2' placeholder='Last Name' width={4} />
        </Form.Group>
        <Form.Input label='Address' placeholder='address' width={8}/>
        <Form.Group >
          <Form.Input label='City' placeholder='City' width={3} />
          <Form.Input label='State' placeholder='state' width={3} />
          <Form.Input label='ZipCode' placeholder='Zip code' width={2} />
        </Form.Group>
        <Form.Group >
          <Form.Input label='Password' placeholder='password' width={4} />
          <Form.Input label='Confirm password' placeholder='confirm password' width={4} />
        </Form.Group>
      </Form>
    )
}
// address / city / state / zipCode
export default SignUp