import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadItems({localFetchUrl, categoriesList, setTriggerRerender}) {
    
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()

   if (!loaded) {
       setLoaded(true)
        fetch(`${localFetchUrl}/products`,{
            credentials: "include",
        })
    .then(res => res.json())
    .then(productsData => {setProducts(productsData)})
   }

   
       



    function handleClick(e) {
       console.log(products, 'befor the if ')
        if (products.length > 0) {
            csvLink.current.link.click()
            console.log('just clicked ')
        }
    }
  

   const headers = [
        { label: "name", key: "name" },
        { label: "company", key: "company" },
        { label: "price", key: "price" },
        { label: "limit", key: "limit" },
        { label: "category_name", key: "category_name" },
        { label: "category_id", key: "category_id" },
        { label: "image", key: "image"}
      ];
             
    let data = [] 

    data = products.map((product, index) => { return (
      { name: product.name,
       company: product.company,
       price: product.price,
       limit: product.limit,
       category_name: product.category.name,
       category_id: product.category.category_id,
       image: product.image }
    )
    })

    // console.log(data)












    return(
        <>

        
        <Button content='Downloed Items.csv' primary onClick={handleClick}  />
   
        
        <CSVLink
            data={data}
            filename="products.csv"
            className='hidden'
            ref={csvLink}
            headers={headers}
            target='_blank'
        />

      </>
    )
 


}

export default DownloadItems