import React, { Component, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'

function NavBar({ currentUser, onLogout, triggerRerender, setTriggerRerender, fetchUrl, localFetchUrl, categoriesList}) {
    const [focused, setFocused] = useState({})
    const { activeItem } = focused
   
    let category1_id = 1
    let category2_id = 2
    let category3_id = 3
    

    const history = useHistory();

    function handleItemClick(e, { name }) {
        setFocused({ activeItem: name})
    }

    if (categoriesList.length > 0) {
        category1_id = categoriesList[0].products[0].category_id
        category2_id = categoriesList[1].products[0].category_id
        category3_id = categoriesList[2].products[0].category_id
    }


    if (activeItem === "log out") {
        onLogout()
    }




    function handleChange(e, data) {
      history.push(`/ShoppingCart/${data.value}`);
      // console.log(data.value)
      setTriggerRerender(!triggerRerender)
    }

    function handleClick(e, data) {
      console.log(e.target, 'in the click')
      history.push(`/ShoppingCart/${e.target.id}`);
      // console.log(e.target.id)
      // console.log('registerd click')
      localStorage.setItem("shoppingCart_id", JSON.stringify(parseInt(e.target.id)))
      setTriggerRerender(!triggerRerender)
    }


   // console.log(currentUser.order_details.length > 0, 'inininin')
    // && currentUser.order_details.length > 0 

    if (!currentUser) {
      return(
        <>
               <Menu className='navBar' style={{backgroundColor: 'rgb(249, 247, 250)'}}>
       <Menu.Item  as={Link}  to="/SignUp"
           name='sign up'
           active={activeItem === 'sign up'}
           onClick={handleItemClick}>Sign Up</Menu.Item>

          <Menu.Item as={Link} to="/SignIn"
          name='sign in'
          active={activeItem === 'sign in'}
          onClick={handleItemClick}>Sign in</Menu.Item>
          </Menu>
        </>
      )
    }

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

        {currentUser    ?  <Menu.Item name='shopping cart' active={activeItem === 'shopping cart'} onClick={handleItemClick}>
        <div class="ui simple dropdown item">
          Shopping cart
      <i class="dropdown icon=cart"></i>
    <div class="menu">
      <div id={category1_id} class="item" onClick={handleClick}>Wine Cart</div>
      <div id={category2_id} class="item" onClick={handleClick}>Meat Cart</div>
      <div id={category3_id} class="item" onClick={handleClick}>Produce Cart</div>
    </div>
  </div></Menu.Item> : null }

  {currentUser.admin ?  <Menu.Item as={Link} to="/UserList"
          name='UserList'
          active={activeItem === 'UserList'}
          onClick={handleItemClick}>All Users</Menu.Item>: null} 
        </Menu>
    )
}

export default NavBar