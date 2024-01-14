// src/components/Login.js
import React from "react";
import Input from "../input";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const notify = () => toast("Wow so easy!");

  const [message, setMessage] = useState(true);
  const [login, setLogin] = useState(false)
  const [msg,setMsg] =useState("")
  const [enteredValue, setEnteredValue] = useState({
    name:"",
    email: "",
    password: "",
    username:""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEnteredValue({ ...enteredValue, [name]: value });
  };
  const submitHandler = async (e) => {
    console.log(enteredValue)
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/auth/register",
        enteredValue
      );
      if (resp.status === 201) {
        setLogin(true)
      }
    } catch (err) {
      console.log(err);
          setMessage(true)
          setMsg(err.response.data.msg) 
    }
  };
  if(login===true){
        return <Navigate to= "/login"></Navigate>
  }
  return<>
  <ToastContainer
position="top-right"
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
{/* Same as */}
<ToastContainer />
 <div className="flex flex-col md:flex-row w-96 md:w-[50%] md:h-[40%]   md:translate-x-[60%]  md:pt-[20%] md:translate-y-[-12%] pb-32 md:pb-5">
            <div className={` bg-blue-500 text-white flex flex-col justify-center items-center   py-[20%] md:rounded-t-none md:px-10 md:rounded-l-2xl`}>
              <div className="text-capitalize font-bold md:text-2xl text-xl" >
                <h3 >Join Us</h3>
              </div>
              <div className="text-[5rem] md:text-[8rem]">
                <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
              </div>
            </div>
            <div className={`py-5 flex flex-col justify-center items-center my-auto rounded-b-2xl bg-blue-100 md:px-5 md:rounded-r-2xl md:rounded-b-none `}>
            <form action="" className="flex flex-col p-2" onSubmit={submitHandler}>
            <div className="text-capitalize font-bold text-2xl text-center text-sky-700 mb-5">Register</div>
              <Input type="text" name="name"  onChange={handleInputChange}
              value={enteredValue.name}/>
              <Input type="email" name="email" onChange={handleInputChange}
              value={enteredValue.email}/>
              <Input type="text" name="username" onChange={handleInputChange}
              value={enteredValue.username}/>
              <Input type="password" name="password" onChange={handleInputChange}
              value={enteredValue.password}/> 
              <button type="submit" onClick={notify} className="bg-sky-700 m-auto lg:mt-2 w-80 px-5 py-2 text-lg text-white  rounded-xl hover:bg-sky-500">Register</button>
            </form>
           <div className=" text-xl flex justify-center lg:pt-14 text-sky-800">
           <p className="font-medium">Already registered?</p>
          <Link to="/login" className="hover:underline font-semibold" >Login</Link> 
           </div>
           {message && <div className="text-xl flex justify-center lg:pt-14 text-red-700 text-md">{msg}</div>
}
            </div>
        </div>
  </>
  

 
};

export default Register;
