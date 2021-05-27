import { useEffect, useState} from "react";
import { useParams,useLocation, useHistory } from "react-router-dom"
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import CartItem from "./CartItems";



function ShoppingCart({currentUser, triggerRerender, setTriggerRerender}) {
        let { id } = useParams()
        const [cart, setCarts] = useState([])
        const [submitted, setSubmitted] = useState(false)
        // const [triggerRerender, setTriggerRerender] = useState(false)
   
      
       
        console.log(id, 'in params id')
        // let history = useHistory()
        // let currentId = history.location.pathname.split('/')[2]
        // console.log(currentId)
        // const [categoryId, setCategoryId] = useState(parseInt(currentId))
        // console.log(category_id)
        
        useEffect(() => {
            console.log('useEffect')
            // if (category_id == undefined) category_id = 2
            getCart(currentUser.id, parseInt(id))   // these values need to be changed to the user_id and to category_id 
                           // for the fetch to only return the cart for that user and a given category
        }, [triggerRerender])


    function getCart(userId, categoryId) {
        fetch(`http://localhost:3000/cart`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: userId, category_id: categoryId}),
        })
        .then(res => res.json())
        .then((resCart) => {wasSubmitted(resCart)})
    }


    function handleClick() {
        
        setSubmitted(!submitted)

        fetch("http://localhost:3000/submit", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({id: cart[0].order.id})
        })
        .then(res => res.json())
        .then(order => console.log( "order status has bean switched"))
        .catch((err) => console.error(err))
    }

    // this fuction will make sure the place order or cancel order button will display the corect state even if the page is refreshed
    function wasSubmitted(resCart) {
        if (resCart.length > 0) {
            if (resCart[0].order.submitted) {
            // console.log('it was submitted')
            setSubmitted(true)
            setCarts(resCart)
        }else{
            setCarts(resCart)
            setSubmitted(false)
        }
    }
    }

    function handleDelete(id){
            fetch(`http://localhost:3000/order_details/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.token}`
                }
            })
            .then(res => res.json())
            .then(() => setTriggerRerender(!triggerRerender))

    }

function handleQuantityChange(id, newQuantity) {
    console.log('in quantityChange', id, newQuantity)
    fetch(`http://localhost:3000/order_details/${id}`,{
        method: "PATCH",
        headers:{'Content-Type' : 'application/json'},
        Authorization: `Bearer ${localStorage.token}`,
        body: JSON.stringify({quantity: newQuantity})
      })
      .then(res => res.json())
    //   .then((newItemDetail) => console.log(newItemDetail))
}

    
    

   


    
    let cartItemFragment = ""
    if (cart.length > 0) {
        cartItemFragment = cart.map(order =>
            <CartItem key={order.name} cartItem={order} setCarts={setCarts} handleDelete={handleDelete} handleQuantityChange={handleQuantityChange}/>)
    }

    if (cartItemFragment === "") {
        return <h1>lodding</h1>
    }


    return(
        <>
            <Segment placeholder floated="left" size="huge" padded>
            {cartItemFragment}
            </Segment>
            <Segment placeholder floated="right">
            <h1>order total</h1>
            <Button onClick={handleClick}>
            {submitted ?
             <Button.Content visible>Cancel order</Button.Content>:
             <Button.Content visible>Place Order</Button.Content>
            }
            </Button>
        </Segment>
       
        </>
    )
}

export default ShoppingCart





    // if (carts.length > 0) {
    //     console.log(carts[0].order.category_id, 'in')
    //     // const category_id = toInteger(carts[0].order.category_id)  ${currentUser.id}/${parseInt(carts[0].order.category_id)
    //     fetch(`http://localhost:3000/orders}`, {
    //         method: "POST", 
    //         headers: {
    //             'Content-Type': 'application/json',
    //               Authorization: `Bearer ${localStorage.token}`
    //         },
    //         body: JSON.stringify({user_id: currentUser.id, category_id: parseInt(carts[0].order.order_id)})
    //     })
    //     .then(res => res.json())
    //     .then((order) => console.log(order, 'in the bla bla'))
    // }
