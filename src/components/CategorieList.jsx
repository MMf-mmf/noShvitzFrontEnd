import { useEffect, useState } from "react";
import { Input, Menu, Card, Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

import CategorieObject from './CategorieObject'



function CategorieList({categoriesList, setCategories, currentUser}) {

// console.log(currentUser)

// console.log(categoriesList)
const categories = categoriesList.map( cat => {
        return(<CategorieObject key={categoriesList.id} categories={cat} currentUser={currentUser}/>)})

   return(
       <div>
           
    <Card.Group itemsPerRow={3}>
        {categories}
    </Card.Group>
    

       </div>

   ) 
}


export default CategorieList