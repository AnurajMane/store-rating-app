import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          "/auth/login",
          formData
        );

      const {
        token,
        user,
      } = response.data;

      login(token, user);

      if (
        user.role === "ADMIN"
      ) {
        navigate("/admin");
      } else if (
        user.role ===
        "STORE_OWNER"
      ) {
        navigate(
          "/store-owner"
        );
      } else {
        navigate("/user");
      }
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Login</h1>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>

      <br />

      <Link to="/register">
        Register Here
      </Link>
    </div>
  );
}

export default Login;