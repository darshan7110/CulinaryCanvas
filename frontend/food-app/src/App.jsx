import React from "react";
import './App.css'
// import './Main.css'
import Home from './pages/Home'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipie from "./pages/AddFoodRecipie";
import EditRecipie from "./pages/EditRecipie";
const getAllRecipies=async()=>{
  let allRecipies=[]
  await axios.get('http://localhost:5000/recipie').then(res=>{
    allRecipies=res.data
  })
  return allRecipies
}

const getMyRecipie=async()=>{
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipies=await getAllRecipies()
  return allRecipies.filter(item=>item.createdBy===user._id)
}

const getFavRecipies=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router= createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
  {path:"/",element:<Home/>,loader:getAllRecipies},
  {path:"/myRecipie",element:<Home/>,loader:getMyRecipie},
  {path:"/favRecipie",element:<Home/>,loader:getFavRecipies},
  {path:"/addRecipie",element:<AddFoodRecipie/>},
  {path:"/editRecipie/:id",element:<EditRecipie/>}
  ]}
])
export default function App(){

  return(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}