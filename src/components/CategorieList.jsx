import { useEffect, useState } from "react";
import { Input, Menu, Card, Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import CategorieItems from './CategorieItems'



function CategorieList({categoriesList, setCategories, currentUser}) {


const categories = categoriesList.map( cat => {
        return(<CategorieItems key={categoriesList.id} categories={cat} currentUser={currentUser}/>)})


   return(
        <>
        <Segment id="category-segment-top"></Segment>

       <Segment id="category-segment-middle">
   <Card.Group itemsPerRow={3}>
        {categories}
    </Card.Group>
       </Segment>

       <Segment id="category-segment-button">
          <Button style={{marginLeft: "38%"}} primary>Donate</Button>
          <Button style={{marginLeft: "4%"}} secondary>Report A Bug</Button>
       </Segment>
       </>
       

      
           
 
    

      

   ) 
}


export default CategorieList