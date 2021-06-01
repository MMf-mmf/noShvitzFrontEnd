import React, { Component, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

function NavBar({ currentUser, onLogout, currentCart, setCurrentCart , triggerRerender, setTriggerRerender}) {
    const [focused, setFocused] = useState({})
    const { activeItem } = focused
    

    const history = useHistory();
   
    function handleItemClick(e, { name }) {
        setFocused({ activeItem: name})
    }

// console.log('current cart',  currentCart)
    if (activeItem === "log out") {
        onLogout()
    }


    const options = [
      { key: 1, text: 'Wine Cart', value: 1 },
      { key: 2, text: 'Meat Cart', value: 2 },
    ]

    function handleChange(e, data) {
      history.push(`/ShoppingCart/${data.value}`);
      // console.log(data.value)
      setCurrentCart(data.value)
      setTriggerRerender(!triggerRerender)
    }

    function handleClick(e, data) {
      history.push(`/ShoppingCart/${currentCart}`);
      // console.log(data.value)
    }
   // console.log(currentUser.order_details.length > 0, 'inininin')
    // && currentUser.order_details.length > 0 

    return(
        <Menu className='navBar' style={{backgroundColor: 'rgb(249, 247, 250)'}}>
          {currentUser ? null:  <Menu.Item  as={Link}  to="/SignUp"
           name='sign up'
           active={activeItem === 'sign up'}
           onClick={handleItemClick}>Sign Up</Menu.Item> }



{currentUser ? null: <Menu.Item as={Link} to="/SignIn"
          name='sign in'
          active={activeItem === 'sign in'}
          onClick={handleItemClick}>Sign in</Menu.Item>}


{currentUser ? <Menu.Item as={Link} to="/"
          name='main menu'
          active={activeItem === 'main menu'}
          onClick={handleItemClick}
        >main menu</Menu.Item>: null}

        {currentUser ?         <Menu.Item
        
          name='log out'
          active={activeItem === 'log out'}
          onClick={handleItemClick}
        >Log Out</Menu.Item>: null}

        
        {currentUser    ?  <Menu.Item
              name='shopping cart'
              active={activeItem === 'shopping cart'}
              onClick={handleItemClick}
            >
        <Dropdown
        labeled
        icon='cart'
        options={options}
        fluid
        onClick={handleClick}
        onChange={handleChange}
        text='Select Shopping Cart'
          />
          </Menu.Item> : null }

       
        </Menu>


    )
}

export default NavBar