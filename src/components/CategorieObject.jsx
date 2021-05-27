import React from "react";
import { Link } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
const src = 'https://image.flaticon.com/icons/png/512/883/883806.png'




function CategorieObject({categories, currentUser}) {
    const category_id = categories.id
    const user_id = currentUser.id
    // console.log(currentUser)

    function handleClick(e, data) {
        console.log('logged click')
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({user_id: currentUser.id, category_id: category_id})
            })
            .then(res => res.json())
            .then(newCartObj => {
                console.log(newCartObj)
            })
    }
   
    return(
   <Link to={`/categories/${category_id}`}> <Card onClick={handleClick} link style={{width: '10rem'}}> 
        <Image src={src} wrapped ui={false} size='tiny' circular/>

        <Card.Content>
            <Card.Meta textAlign="center">
                <span >{categories.name}</span>
            </Card.Meta>
        </Card.Content>
    </Card></Link>
    )
}

export default CategorieObject