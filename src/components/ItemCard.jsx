import React, { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Card, Segment, Icon, Image, Container, Button, Divider, Form } from 'semantic-ui-react'

// start here by after shabbos 

function ItemCard({product, setItemsCount, itemsCount, handleAddToCart, cartItems}) {
    const [inCart, setInCart] = useState(false)
    
    let itemsInCart = cartItems.filter(item => item.product_id === product.id)

    if (itemsInCart.length > 0) {
      console.log('item', product.id, 'is in the cart already')
      // setInCart(true)
    }

    // console.log(itemsInCart, 'items in cart')
    // const [item1, setItem1] = useState({[product.name]: 0})
   


    // const [item2, setItem2] = useState({[product.name]: 0})
    // console.log(product.category_id)
    // console.log(formQuantity, 'formQuantity')



      function handleSubmit(e, data) {
        e.preventDefault()
       
        // before adding to cart test if the object holds a value and that the value is more then 0
        if (Object.keys(itemsCount).length !== 0 && itemsCount[`${data.id}`] !== 0) {
          console.log(itemsCount,'in if statement')
          handleAddToCart(data.id, data.category_id)
          setInCart(true)
        }
        
      }

      function handleChange(e, data) {
         setItemsCount({...itemsCount, [data.id]: data.value})
      }

      const options = [
        { key: '0', text: '0', value: 0 },
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 },
        { key: '5', text: '5', value: 5 },
        { key: '6', text: '6', value: 6 },
      ]

    return(
         <Card link style={{width: '18rem'}} className="itemCard" >
          {inCart || itemsInCart.length > 0 ? <Image src={product.image} wrapped ui={false} size='tiny' circular  label={{ as: 'a', corner: 'left', icon: 'cart' }}/>:
          <Image src={product.image} wrapped ui={false} size='tiny' circular />

}
        
        <Card.Content >
            <Card.Meta textAlign="center">
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>{product.company}</Card.Meta> 
                <Card.Description>${product.price}</Card.Description> 
            </Card.Meta>
        </Card.Content>
        <Card.Content extra >
        {/* <div className='ui two button ' > */}
            <Form id={product.id} category_id={product.category_id} onSubmit={handleSubmit}>
            <Form.Select
            fluid
            name={product.name}
            options={options}
            placeholder='quantity'
            id={product.id}
            onChange={handleChange}
          />
          <Button type='submit'  >Add to cart</Button>
            </Form>
          {/* </div> */}
          </Card.Content>
    </Card>

  
    )
}

export default ItemCard