import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import imgprofile from '../assets/chocolate.gif';
import RecipeItems from '../components/RecipeItems';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const addRecipie = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipie");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="home">
        <div className="left">
          <h1 className="typewriter">Food Recipe</h1>
          <h5>
            Food history explores how humans have sourced, prepared, and consumed food throughout time, 
            shaped by culture, environment, technology, and trade—evolving from simple sustenance 
            to complex culinary traditions.
          </h5>
          <button id="btnShareRecipie" onClick={addRecipie}>
            Share Your Recipe
          </button>
        </div>

        <div className="right">
          <img
            src={imgprofile}
            height="300px"
            width="250px"
            alt="profilePic"
            className="profileImg"
          />
        </div>
      </section>

      <div className="bg"></div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <div className="recipe">
        <RecipeItems />
      </div>
    </>
  );
}
