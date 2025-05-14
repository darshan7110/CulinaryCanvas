import React from "react";
import './App.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipie from "./pages/AddFoodRecipie";
import EditRecipie from "./pages/EditRecipie";

// Always return an array
const getAllRecipies = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipie`);
    if (Array.isArray(res.data)) {
      return res.data;
    } else {
      console.warn("Unexpected response format:", res.data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return [];
  }
};

const getMyRecipie = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const allRecipies = await getAllRecipies();
  return allRecipies.filter(item => item.createdBy === user?._id);
};

const getFavRecipies = () => {
  return JSON.parse(localStorage.getItem("fav") || "[]");
};

const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/", element: <Home />, loader: getAllRecipies },
      { path: "/myRecipie", element: <Home />, loader: getMyRecipie },
      { path: "/favRecipie", element: <Home />, loader: getFavRecipies },
      { path: "/addRecipie", element: <AddFoodRecipie /> },
      { path: "/editRecipie/:id", element: <EditRecipie /> }
    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
