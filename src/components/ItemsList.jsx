import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
import ItemCard from "./ItemCard";



function Items({categoriesList, currentUser}) {
    const [newCategoryList, setNewCategoryList] = useState([])
    const [itemsCount, setItemsCount] = useState({})
    const [cartItems, setCartItems] = useState([])   
    const { id } = useParams()
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    const category_id = JSON.parse(localStorage.getItem("category_id"))

    if (currentUser === undefined) {
        console.log(currentUser, "this is the current user")
        console.log(user_id, 'this is the user id form local storedge')
        console.log(category_id, 'this is the category id form local storedge')
    }
    
    // console.log(cartItems, 'inCartItems')
    useEffect(() => {
        getCart(user_id, category_id)  
    }, [])

    function getCart(userId, categoryId) {
        fetch(`http://localhost:3000/cart`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: userId, category_id: categoryId}),
        })
        .then(res => res.json())
        .then((resCart) => setCartItems(resCart))
    }

    
    

    function handleAddToCart(id, category_id) {
        
        const cartDetails = {product_id: parseInt(id), quantity: itemsCount[id], user_id: currentUser.id, category_id: category_id}
    
        fetch('http://127.0.0.1:3000/order_details',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDetails)})
                .then(res => res.json())
                // .then(newCartDetail => {console.log(newCartDetail)})
    }



    let itemFrag = ''
    if (categoriesList.length > 0 && newCategoryList !== categoriesList) {
        console.log(categoriesList, 'in the if')
        setNewCategoryList(categoriesList) 
    }

    if (newCategoryList.length > 0) {
       
        const categories = newCategoryList[(id - 1)]
        itemFrag = categories.products.map(product => {return <ItemCard key={product.id} product={product} setItemsCount={setItemsCount} itemsCount={itemsCount} handleAddToCart={handleAddToCart} cartItems={cartItems}/>})
        // const categories = newCategoryList.filter( category =>  category.id === parseInt(id) )
        // console.log(categories)
        // itemFrag = categories[0].products.map(product => {return <ItemCard key={product.id} product={product} setItemsCount={setItemsCount} itemsCount={itemsCount} handleAddToCart={handleAddToCart} cartItems={cartItems}/>})
    }

    
    if (newCategoryList.length < 1) {
        return( <h1>Lodding</h1>)
    }

    return(
     <>
    <Card.Group className="cardGroup" itemsPerRow={3}>
        {itemFrag}
    </Card.Group>
    </>
      

  
    )
}

export default Items