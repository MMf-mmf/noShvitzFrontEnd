// import { useRef, useState } from "react";
// import { CSVLink } from "react-csv";
// import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


// function DownloadOrders({localFetchUrl, categoriesList, setTriggerRerender}) {
    
//     const [orders, setOrders] = useState([])
//     const [loaded, setLoaded] = useState(false)
//     const csvLink = useRef()

//    if (!loaded) {
//        setLoaded(true)
//         fetch(`${localFetchUrl}/users`,{
//             credentials: "include",
//         })
//     .then(res => res.json())
//     .then(ordersData => {setOrders(ordersData)})
//    }

// console.log(orders)
   
       



//     function handleClick(e) {
       
//         if (orders.length > 0) {
//             csvLink.current.link.click()
//             console.log('just clicked ')
//         }
//     }
  

// //    const headers = [
// //         { label: "name", key: "name" },
// //         { label: "phone_number_1", key: "phone_number_1" },
// //         { label: "phone_number_2", key: "phone_number_2" },
// //         { label: ""}
// //       ];

//     let data = [] 

//     data = orders.map((orders, index) => { return (
//       { name: orders.name,
//        email: orders.email,
//        phone_number_1: orders.phoneNumber1,
//        phone_number_2: orders.phoneNumber2,
//        total_items: orders
//         }
//     )
//     })

//     // console.log(data)


//     return(
//         <>

//         <Button content='Downloed orders.csv' secondary onClick={handleClick}  />
   
//         <CSVLink
//             data={data}
//             filename="orders.csv"
//             className='hidden'
//             ref={csvLink}
//             // headers={headers}
//             target='_blank'
//         />

//       </>
//     )
 


// }

// export default DownloadOrders