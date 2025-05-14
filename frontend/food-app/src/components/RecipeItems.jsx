import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipies = useLoaderData();
  const [allRecipies, setAllRecipies] = useState([]);
  const [isFavRecipie, setIsFavRecipie] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const path = window.location.pathname === "/myRecipie";
  let favItems = JSON.parse(localStorage.getItem("fav") || "[]");

  useEffect(() => {
    setAllRecipies(recipies || []);
  }, [recipies]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/recipie/${id}`);
      setAllRecipies((prev) => prev.filter((recipie) => recipie._id !== id));
      const updatedFavs = favItems.filter((recipie) => recipie._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFavs));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const favRecipie = (item) => {
    const alreadyFav = favItems.some((recipie) => recipie._id === item._id);
    const updatedFavs = alreadyFav
      ? favItems.filter((recipie) => recipie._id !== item._id)
      : [...favItems, item];

    localStorage.setItem("fav", JSON.stringify(updatedFavs));
    setIsFavRecipie((prev) => !prev);
  };

  return (
    <div className="card-container">
      {Array.isArray(allRecipies) && allRecipies.length > 0 ? (
        allRecipies.map((item) => (
          <div
            key={item._id}
            className="card"
            onClick={() =>
              setExpandedCard(expandedCard === item._id ? null : item._id)
            }
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.coverImg}`}
              width="120px"
              height="100px"
              className="IconImage"
              alt={item.title}
            />
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
                    <Link to={`/editRecipie/${item._id}`} className="editIcon">
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
                <p className="Expanded-text">
                  <strong className="expanded-heading">Ingredients:</strong>{" "}
                  {item.ingredients}
                </p>
                <p className="Expanded-text">
                  <strong className="expanded-heading">Instructions:</strong>{" "}
                  {item.instructions}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
