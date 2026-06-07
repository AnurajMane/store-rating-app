import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../api/axios";

function Register() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
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
      await api.post(
        "/auth/register",
        formData
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Registration Failed"
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
      <h1>Register</h1>

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
          type="text"
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
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
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Register
        </button>
      </form>

      <br />

      <Link to="/">
        Back To Login
      </Link>
    </div>
  );
}

export default Register;