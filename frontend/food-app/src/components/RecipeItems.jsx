import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipies = useLoaderData();
  const [allRecipies, setAllRecipies] = useState();
  let path = window.location.pathname === "/myRecipie" ? true : false;
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipie, setIsFavRecipie] = useState(false);
  const navigate = useNavigate();
  console.log(allRecipies);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    setAllRecipies(recipies);
  }, [recipies]);

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/recipie/${id}`)
      .then((res) => console.log(res));
    setAllRecipies((recipies) =>
      recipies.filter((recipie) => recipie._id !== id)
    );
    let filterItem = favItems.filter((recipie) => recipie._id !== id);
    localStorage.setItem("fav", JSON.stringify(filterItem));
  };

  const favRecipie = (item) => {
    let filterItem = favItems.filter((recipie) => recipie._id !== item._id);
    favItems =
      favItems.filter((recipie) => recipie._id === item._id).length === 0
        ? [...favItems, item]
        : filterItem;
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipie((pre) => !pre);
  };

  return (
    <>
      <div className="card-container">
        {allRecipies?.map((item, index) => {
          return (
            <div
              key={index}
              className="card"
              onClick={() =>
  setExpandedCard(expandedCard === item._id ? null : item._id)
}
            >
              <img
                src={`http://localhost:5000/images/${item.coverImg}`}  /*<img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img> */
                width="120px"
                height="100px"
                className="IconImage"
              ></img>
              <div className="card-body">
                <div className="title">{item.title}</div>
                <div className="icons">
                  <div className="timer">
                    <BsStopwatchFill />
                    {item.time}
                  </div>
                  {!path ? (
                    <FaHeart
                      onClick={() => favRecipie(item)}
                      style={{
                        color: favItems.some((res) => res._id === item._id)
                          ? "red"
                          : "",
                      }}
                    />
                  ) : (
                    <div className="action">
                      <Link
                        to={`/editRecipie/${item._id}`}
                        className="editIcon"
                      >
                        <FaEdit />
                      </Link>
                      <MdDelete
                        onClick={() => onDelete(item._id)}
                        className="deleteIcon"
                      />
                    </div>
                  )}
                </div>
              </div>
              {expandedCard === item._id && (
  <div className="expanded-content">
    <p className="Expanded-text"><strong className="expanded-heading">Ingredients:</strong> {item.ingredients}</p>
    <p className="Expanded-text"><strong className="expanded-heading" >Instructions:</strong> {item.instructions}</p>
  </div>
)}
            </div>
          );
        })}
      </div>
    </>
  );
}
