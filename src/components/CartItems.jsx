import React, {useState, useEffect} from "react";
import { Button, Header, Icon, Segment,  Input } from 'semantic-ui-react'
import ShoppingCartItems from "./CartItems";


function CartItem({cartItem, handleDelete, handleQuantityChange}) {
    const [itemQuantity, setItemQuantity] =  useState(cartItem.quantity)


    function handleRemoveItem(e, data) {
      const id = parseInt(data.id)
        handleDelete(id)
    }

    function incrementQuantity(e, data) {
        if (itemQuantity < 15) {
            const newQuantity = itemQuantity + 1
            setItemQuantity(newQuantity)
            handleQuantityChange(data.id, newQuantity)
        }
    }

    // item limits are hard coded in Ultimately admin should control the limits with variables
    function decrementQuantity(e, data) {
        if (itemQuantity > 1 ) {
            const newQuantity = itemQuantity - 1
            setItemQuantity(newQuantity)
            handleQuantityChange(data.id, newQuantity)
        }
    }


    return(
        <>
        <Segment.Group  >
            <h3>Name: {cartItem.product.name}</h3>
            <h4>company: {cartItem.product.company}</h4>
            <Button.Group size="mini" >
                    <Button id={cartItem.id} icon='add' onClick={incrementQuantity}/>
                    <Button id={cartItem.id} icon='minus'  onClick={decrementQuantity}/>
            </Button.Group>
            <h5>quantity: {itemQuantity}</h5>
   
            <span>Price: ${cartItem.product.price}</span>
           
                   
            
            <Button id={cartItem.id} order_id={cartItem.order_id} circular icon='trash' onClick={handleRemoveItem } />
        </Segment.Group>
        </>
    )
}

export default CartItem