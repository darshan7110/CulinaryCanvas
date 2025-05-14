import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipie() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipie/${id}`);
        const res = response.data;
        setRecipeData({
          title: res.title,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          time: res.time
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    getData();
  }, [id]);

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setSelectedFile(files[0]);
    } else if (name === "ingredients") {
      setRecipeData(prev => ({ ...prev, [name]: value }));
    } else {
      setRecipeData(prev => ({ ...prev, [name]: value }));
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/recipie/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={onHandleSubmit}>
        <div className='form-control'>
          <label>Title</label>
          <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title} required />
        </div>
        <div className='form-control'>
          <label>Time</label>
          <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time} required />
        </div>
        <div className='form-control'>
          <label>Ingredients</label>
          <textarea
            className='input-textarea'
            name="ingredients"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.ingredients}
            placeholder="Separate ingredients with commas"
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
            value={recipeData.instructions}
            required
          />
        </div>
        <div className='form-control'>
          <label>Recipe Image</label>
          <input type="file" className='input' name="file" accept="image/*" onChange={onHandleChange} />
        </div>
        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  );
}
