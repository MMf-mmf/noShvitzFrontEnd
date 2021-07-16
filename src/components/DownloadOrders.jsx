import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadOrders({localFetchUrl, categoriesList, setTriggerRerender, products, users}) {
    
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()
    


    let headers = [
        products.map(product => { return { label: product.name, key: product.name}})   
    ];

    headers[0].unshift({label: 'name', key: 'name'})
    headers = headers[0]
    console.log(headers)






    let itemsOrderdFinal = []
    let itemsOrderdFinalss = [{Name: 'fred', 'bart tenura': 4, kedem: 1}, { grape: 7, wine: 2, zmora: 1, Name: 'johan'}]
    function handleClick(e) {
        



        
        let itemsOrderd = {}
        // GET THE USERS WHICH ADDED ITEMS TO THE CART
        if (users.length > 0 && products.length > 0) {
            const usersWithItems = users.filter(user => user.orders.length > 0)
            // console.log(usersWithItems)
             for (let index = 0; index < usersWithItems.length; index++) {
                // console.log(usersWithItems[index])
                 
                 itemsOrderd[usersWithItems[index].name] = {items:[], quantity:[]}
                 // console.log(itemsOrderd)
                 for (let i = 0; i < usersWithItems[index].order_details.length; i++) {
                     //console.log(usersWithItems[index].order_details[i])
                     itemsOrderd[usersWithItems[index].name].items.push(usersWithItems[index].order_details[i].product_id)
                     itemsOrderd[usersWithItems[index].name].quantity.push(usersWithItems[index].order_details[i].quantity)
                 }
                 
             }
             
        }
       
       let peaple  // array of the keys (users names)
       // IF THE OBJECT HOLDING THE NAEMS ITEM ID'S AND QUANTITY EXIST BEGIN LOOP TO SWAP OUT THE 
       // ID'S FOR THE REAL NAMES
        if (itemsOrderd) {
            peaple = Object.keys(itemsOrderd)
            
            for (let x = 0; x < peaple.length; x++) {
                for (let i = 0; i < products.length; i++) {
                    let item = products[i].id
                let indexToBeChanged = itemsOrderd[peaple[x]].items.indexOf(item) 
                    if (indexToBeChanged != -1) {
                        itemsOrderd[peaple[x]].items[indexToBeChanged] = products[i].name
                    }
                }
                let orderDetails = {}
                for (let y = 0; y < itemsOrderd[peaple[x]].items.length; y++) {
                    orderDetails[itemsOrderd[peaple[x]].items[y]] =  itemsOrderd[peaple[x]].quantity[y]
                }
                itemsOrderd[peaple[x]] = { orderDetails }
                itemsOrderd[peaple[x]].orderDetails['name'] = peaple[x]
                itemsOrderdFinal.push(itemsOrderd[peaple[x]].orderDetails)
                
            }
            // console.log(itemsOrderdFinal)
     //console.log(itemsOrderd[peaple[1]].orderDetails)
    //  for (let u = 0; u < peaple.length; u++) {
    //     //console.log(itemsOrderd[peaple[u]].orderDetails)
    //     let orderdItems = Object.keys(itemsOrderd[peaple[u]].orderDetails)
       
            
    //  }
        }

        
        if (itemsOrderdFinal.length > 0) {
            console.log(itemsOrderdFinal)
            console.log(itemsOrderdFinalss)
            setOrders(itemsOrderdFinal)
            // itemsOrderdFinal = itemsOrderdFinalss
            setTimeout(() => {
                csvLink.current.link.click()
            },300)
           
            console.log('just clicked ')
        }
    }

    
    return(
        <>
<Grid.Column width={3}>

<Button content='Downloed orders.csv' secondary onClick={handleClick}  />


   <CSVLink
       data={orders}
       filename="orders.csv"
       className='hidden'
       ref={csvLink}
    //    headers={headers}
       target='_blank'
   />
</Grid.Column>
       

      </>
    )
 


}

export default DownloadOrders