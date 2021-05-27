import React, { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
import ItemCard from "./ItemCard";

const src = 'https://image.flaticon.com/icons/png/512/883/883806.png'

function Items({categoriesList, currentUser}) {
    const [newCategoryList, setNewCategoryList] = useState([])
    const [itemsCount, setItemsCount] = useState({})    
    const { id } = useParams()

    // console.log(categoriesList)

    function handleAddToCart(id, category_id) {
        // const cartObj = {id: itemsCount[id], category_id: category_id}
        // console.log(itemsCount[id], 'count') // this is the quantity the user has fer that item
        console.log(category_id)

        const cartDetails = {product_id: parseInt(id), quantity: itemsCount[id], user_id: currentUser.id, category_id: category_id}
        console.log(cartDetails)
        fetch('http://127.0.0.1:3000/order_details',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDetails)})
                .then(res => res.json())
                .then(newCartDetail => {console.log(newCartDetail)})
    }



    let itemFrag = ''
    if (categoriesList.length > 0 && newCategoryList !== categoriesList) {
        setNewCategoryList(categoriesList) 
    }

    if (newCategoryList.length > 0) {
        const categories = newCategoryList[(id - 1)]
        itemFrag = categories.products.map(product => {return <ItemCard key={product.id} product={product} setItemsCount={setItemsCount} itemsCount={itemsCount} handleAddToCart={handleAddToCart}/>})
    }



    return(
    <Card.Group itemsPerRow={3}>
        {itemFrag}
    </Card.Group>
  
    )
}

export default Items