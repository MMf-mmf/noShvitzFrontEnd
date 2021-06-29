import { useEffect, useState} from "react";
import { useParams,useLocation, useHistory } from "react-router-dom"
import { List ,Label, Button, Divider ,Header, Icon, Segment, Message } from 'semantic-ui-react'
import OrderCard from "./OrderCards";


function OrdersList({fetchUrl, localFetchUrl, currentUser, users}) {
 
    const [orders, setOrders] = useState([])
    const [getOrders, setGetOrders] = useState(true)
    const [userInQuestion, setUserInQuestion] = useState([])
    let { id } = useParams()


    // function getCart(userId, categoryId) {
    //     fetch(`${localFetchUrl}/cart`,{
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({user_id: userId, category_id: categoryId}),
    //     })
        
    //     .then(res => res.json())
    //     .then((resCart) => { return (
    //         // wasSubmitted(resCart),
    //         // setCartTotal(resCart[0].order.total),
    //         handleExceptions(resCart)
    //     )})
    // }



    if (userInQuestion.length < 1) {
        fetch(`${localFetchUrl}/users/${id}`,{
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(userX => {setUserInQuestion(userX, 'in the fetch')})
    }

      
      


if (currentUser && orders.length < 1 && getOrders ===  true) {
    // console.log(id, 'in the fetch request')
    setGetOrders(false)
    fetch(`${localFetchUrl}/orders/${id}`,{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then((ordersArray) => { return (
        // wasSubmitted(resCart),
        // setCartTotal(resCart[0].order.total),
        // handleExceptions(resCart)
        console.log(ordersArray, 'this is the orders array'),
        setOrders(ordersArray)
    )})
}

   

let orderFragments = ""
if (orders.length > 0) {
    orderFragments = orders.map(order =>
        <OrderCard key={orders.id} details={order}/>)
}

if (orderFragments === "") {
    return( 
      <Message  negative id="placeOrder-message">
      <Message.Header> No orders found for this user</Message.Header>
    </Message>
  )
}

// console.log(userInQuestion, 'this is the users list')
    return(
        <>
        <h1>{userInQuestion.name}s:   orders</h1>
        <div id="user_list" class="ui cards">
            {orderFragments}
        </div>
        </>
    )
}

export default OrdersList