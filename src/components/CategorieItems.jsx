import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
const src = 'http://community.farmhousedelivery.com/wp-content/uploads/2018/06/FHD_20180619_Produce-Box.jpg'




function CategorieItems({categories, currentUser, fetchUrl, localFetchUrl, index}) {
    

    if (!categories || !currentUser) {
        return(<h1>hello waiting for data</h1>)
    }
   
    // const category_id = categories.category_id
    const category_id = categories.id
    const user_id = currentUser.id
    const index_id = index
    console.log(index, 'this this is ')

    function handleClick(e, data) {
    // console.log('just got clicked')
    
    setUserAndCategoriesId()
    console.log(`${localFetchUrl}`)
        fetch(`${localFetchUrl}/orders`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: currentUser.id, category_id: category_id})
            })
            .then(res => res.json())
            .then(newCartObj => { console.log(newCartObj)})
    }

    function setUserAndCategoriesId() {
        localStorage.setItem("category_id", JSON.stringify(parseInt(category_id)))
        localStorage.setItem("user_id", JSON.stringify(parseInt(user_id)))
        localStorage.setItem("index_id", JSON.stringify(parseInt(index_id)))
    }
   
    return(
        <>

 <Card id="categorieCard" as={Link} to={`/categories/${category_id}`} onClick={handleClick} link > 
        <Image src={categories.image} wrapped ui={false} size='tiny' circular/>
        <Card.Content>
            <Card.Meta textAlign="center">
                <span >{categories.name}</span>
            </Card.Meta>
        </Card.Content>
    </Card>
    
</>
    )
}

export default CategorieItems 