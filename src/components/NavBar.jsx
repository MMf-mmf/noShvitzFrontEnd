import React, { Component, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'
import CreateItems from "./CreateItems";

function NavBar({ currentUser, onLogout, triggerRerender, setTriggerRerender, fetchUrl, localFetchUrl, categoriesList}) {
    const [focused, setFocused] = useState({})
    const { activeItem } = focused
   
 
    let options = ""
    if (categoriesList.length > 0) {
       options =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
    }

    const history = useHistory();

    function handleItemClick(e, { name }) {
        setFocused({ activeItem: name})
    }

 


    if (activeItem === "log out") {
        onLogout()
    }




    function handleChange(e, data) {
      // history.push(`/ShoppingCart/${data.value}`);
      localStorage.removeItem('admin_search_user_id');
      history.push(`/ShoppingCart/${data.value}`);
       console.log(data.value)
       localStorage.setItem("shoppingCart_id", JSON.stringify(parseInt(data.value)))
       setTriggerRerender(!triggerRerender)
      // setTriggerRerender(!triggerRerender)
    }

    function handleClick(e, data) {
      localStorage.removeItem('admin_search_user_id');
      history.push(`/ShoppingCart/${e.target.id}`);
      // console.log(e.target.id)
      // console.log('registerd click')
      localStorage.setItem("shoppingCart_id", JSON.stringify(parseInt(e.target.id)))
      setTriggerRerender(!triggerRerender)
    }




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


<Dropdown id="CartDropDown" text='Dropdown' onChange={handleChange} options={options}/>




  {currentUser.admin ?  <Menu.Item as={Link} to="/UserList"
          name='UserList'
          active={activeItem === 'UserList'}
          onClick={handleItemClick}>All Users</Menu.Item>: null} 


          {currentUser.admin ? <Menu.Item as={Link} to="/CreateItems"
          name="CreateItems"
          active={activeItem === 'CreateItems'}
          onClick={handleItemClick}>Control Panel</Menu.Item>: null}
        </Menu>
    )
}

export default NavBar