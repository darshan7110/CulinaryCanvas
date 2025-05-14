import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipie() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val;
    if (e.target.name === "ingredients") {
      val = e.target.value.split(",");
    } else if (e.target.name === "file") {
      val = e.target.files[0];
    } else {
      val = e.target.value;
    }
    setRecipeData(prev => ({ ...prev, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/recipie`, recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to add recipe. Please check your inputs and try again.");
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={onHandleSubmit}>
        <div className='form-control'>
          <label>Title</label>
          <input type="text" className='input' name="title" onChange={onHandleChange} required />
        </div>
        <div className='form-control'>
          <label>Time</label>
          <input type="text" className='input' name="time" onChange={onHandleChange} required />
        </div>
        <div className='form-control'>
          <label>Ingredients</label>
          <textarea
            className='input-textarea'
            name="ingredients"
            rows="5"
            placeholder="Enter ingredients separated by commas"
            onChange={onHandleChange}
            required
          />
        </div>
        <div className='form-control'>
          <label>Instructions</label>
          <textarea
            className='input-textarea'
            name="instructions"
            rows="5"
            onChange={onHandleChange}
            required
          />
        </div>
        <div className='form-control'>
          <label>Recipe Image</label>
          <input type="file" className='input' name="file" accept="image/*" onChange={onHandleChange} required />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
