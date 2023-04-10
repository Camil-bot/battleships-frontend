import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Header from "../components/Header/Header";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Unauthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return;
    }
    navigate("/user/dashboard");
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />;
        <Route path="/register" element={<Register />} />;
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default Unauthenticated;
