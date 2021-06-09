import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import CategorieList from "./components/CategorieList";
import Items from "./components/ItemsList";
import ItemCard from "./components/ItemCard";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp";
import ShoppingCart from "./components/ShoppingCart";
import Loading from "./components/Loading";


function App() {
  const [categoriesList, setCategories] = useState([])
  const [currentUser, setCurrentUser] = useState();
  // const [currentCart, setCurrentCart] = useState(1)
  const [triggerRerender, setTriggerRerender] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory();

  useEffect(() => {
      fetch("http://127.0.0.1:3000/categories")
      .then(res => res.json())
      .then(categoriesArray => {setCategories(categoriesArray, 'in the fetch')})
  }, [])
  
  useEffect(() => {
    // console.log('in autoLogin')
    autoLogin()
  }, []);

  
console.log(currentUser)
// /SignIn needs to be chaneged to a landing page
  useEffect(() => {
    
    if (currentUser) {
    //  console.log('current user is filled')
      // history.goBack();
    } else {
    //  history.push("/SignIn");
    }
  }, [currentUser, history]);


  function autoLogin() {
    setIsLoading(true)
    fetch("http://localhost:3000/autologin", {
      credentials: "include",
      // headers: {
      //   Authorization: `Bearer ${localStorage.token}`,
      // },
    })
      .then((r) => {
        if (!r.ok) throw Error("Not logged in!");
        return r.json();
      })
      .then((user) => { return ( setCurrentUser(user), setIsLoading(false))})
      .catch((err) => console.error(err));
  }

  function handleLogout() {
    // remove the userId from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("category_id");
    
    fetch("http://localhost:3000/logout", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(() => setCurrentUser(null));




    history.push('/SignIn')
  }

  function onUpdateUser(user) {
    setCurrentUser(user);
  }



  return (
<>

{/* {isLoading ? <Loading/>: null} */}
        <div>
            <NavBar currentUser={currentUser} onLogout={handleLogout}
               triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender}/>
            {/* {currentUser ?   <h1>welcome {currentUser.name}</h1>: null} */}
          
        </div>

  <Switch>

    <Route exact path="/SignUp">
      <SignUp/>
    </Route>

    <Route exact path="/SignIn">
      <SignIn setCurrentUser={setCurrentUser} autoLogin={autoLogin}/>
    </Route>

    <Route exact path="/ShoppingCart/:id">
      <ShoppingCart currentUser={currentUser} triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender} autoLogin={autoLogin}/>
    </Route>

  <Route exact path="/categories">
    <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser}/>
  </Route>

  <Route exact path="/categories/:id">
    <Items categoriesList={categoriesList} currentUser={currentUser}/>            
  </Route >

  <Route exact path="/">
  <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser}/>
  </Route>
  </Switch>
</>
  );
}

export default App;
