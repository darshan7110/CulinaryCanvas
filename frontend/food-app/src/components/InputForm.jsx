import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "signUp" : "login";
    const URL = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;

    try {
      const res = await axios.post(URL, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsOpen();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      {error && <h6 className="error">{error}</h6>}
      <p onClick={() => setIsSignUp((prev) => !prev)}>
        {isSignUp ? "Already have an account?" : "Create new account"}
      </p>
    </form>
  );
}
