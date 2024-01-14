import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
const inputData = [
  { name: "name", type: "text" },
  { name: "location", type: "text" },
  { name: "dob", type: "date" },
];

const ModalEdit = (props) => {
  const notify = () => toast("Wow so easy!");
    const [turningRed,setTurningRed] = useState(false)
    const token = useSelector((store) => store.auth.token);
    let { userID } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        dob:""
      });
const onSubmitHandler = async(e) => {
        e.preventDefault();
        if(formData.dob ||  formData.location  || formData.name){
            const resp = await axios.patch(`http://localhost:5000/api/user/${userID}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if(resp.statusText === "OK"){
                 props.onClose()
              }
              else{
                setTurningRed(true)
              }
        }
        else{
            setTurningRed(true)
        } 
};

const onChangeHandler = (e) => {
       setTurningRed(false)
    let {name,value} = e.target
      console.log(name ,value)
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};
  return createPortal(
    <>
        <div className="h-screen w-screen absolute ">
        <div className=" text-white/80 md:px-6 px-4 py-2  fixed h-fit w-80 md:w-96 gap-2 lg:w-[542px] lg:h-[350px] lg:pl-2  md:translate-x-[80%] translate-y-[28%] bg-gray-900 z-50  rounded-2xl flex flex-col mx-6 md:mx-0">
            <div className="flex justify-between pb-2">
                <div className="text-2xl ">
                    <h3>Edit</h3>
                </div>
                <button className="text-2xl hover:text-white/20" onClick={props.onClose}>X</button>
            </div>
        <form
        encType="multipart/form-data"
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-2 md:mx-2"
      >
        {inputData.map((item,index)=>{
            return  <Input key={index} type={item.type} name={item.name} onTurningRed ={turningRed} onChange={onChangeHandler} />
        })}
        <div className="flex  justify-end ">
          <Button title="Edit" notify= {notify}></Button>
        </div>
      </form>
        </div>
    </div>
    </>
,
    document.getElementById("modal")
  );
};

export default ModalEdit;
