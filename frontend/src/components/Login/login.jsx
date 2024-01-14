// src/components/Login.js
import React from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Input from "../input";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loggIn } from "../../feature/loginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const notify = () => toast("Wow so easy!");
  const dispatch = useDispatch();
  const login = useSelector((store) => store.auth.loggIn);
  const [message, setMessage] = useState(false);
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEnteredValue({ ...enteredValue, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/auth/login",
        enteredValue
      );
      if (resp.status === 200) {
        console.log(resp);
        const {
          data: { token, userID },
        } = resp;
        console.log(resp);
        localStorage.setItem("accesstoken", token);
        localStorage.setItem("id", userID);
        console.log(localStorage.getItem("accesstoken"));
        dispatch(loggIn({ token, loggIn: true, userID }));
        console.log(resp.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setMessage(true);
        setEnteredValue({
          email: "",
          password: "",
        });
      }
    }
  };
  if (login) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col md:flex-row w-96 md:w-[50%] md:h-[40%]   md:translate-x-[60%]  md:pt-[20%] md:translate-y-[-12%] pb-32 md:pb-5">
        <div
          className={`bg-blue-500 text-white flex flex-col justify-center items-center   py-[15%] md:rounded-t-none md:px-10 md:rounded-l-2xl`}
        >
          <div className="text-capitalize font-bold md:text-2xl text-xl ">
            <h3>Welcome Back</h3>
          </div>
          <div className="text-[8rem]">
            <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
          </div>
        </div>
        <div className="py-[15%] flex flex-col justify-center items-center my-auto rounded-b-2xl bg-blue-100 md:px-5 md:rounded-r-2xl md:rounded-b-none  ">
          <form
            action=""
            className="flex flex-col p-2 "
            onSubmit={submitHandler}
          >
            <div className="text-capitalize font-bold text-2xl text-center text-sky-700 mb-5">
              Login
            </div>
            <Input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={enteredValue}
            />
            <Input
              type="password"
              name="password"
              onChange={handleInputChange}
              value={enteredValue}
            />
            <button
              type="submit"
              className="bg-sky-700  lg:mt-2 w-80 px-5 py-2 text-lg text-white  rounded-xl hover:bg-sky-500"
              onClick={notify}
            >
              Login
            </button>
          </form>

          <div className="text-xl flex justify-center lg:pt-14 text-sky-800">
            <p>new to twiter?</p>
            <Link to="/register" className="hover:underline font-semibold">
              Register
            </Link>
          </div>
          {message && (
            <div className="text-xl flex justify-center lg:pt-14 text-red-700">
              wrong Password or email
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
