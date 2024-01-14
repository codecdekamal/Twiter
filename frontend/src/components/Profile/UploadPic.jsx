import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./input";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
const inputData = [
  { name: "name", type: "text" },
  { name: "location", type: "text" },
  { name: "dob", type: "date" },
];

const UploadPic = (props) => {
  const [turningRed, setTurningRed] = useState(false);
  const token = useSelector((store) => store.auth.token);
  let { userID } = useParams();
  const [photos, setPhotos] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!photos) {
        return setTurningRed(true);
      }
      console.log(photos);
      const fd = new FormData();
      fd.append("photos", photos);
      console.log(fd);
      const response = await axios.post(
        `http://localhost:5000/api/user/${userID}/uploadProfilePic`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.statusText === "OK") {
        if (response.data.msg === "success") {
          props.onUploadClose();
        }
      }
    } catch (error) {}
  };

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setPhotos(e.target.files[0]);
  };
  return createPortal(
    <div className="h-screen w-screen absolute ">
      <div className=" text-white/80 md:px-6 px-4 py-2 fixed h-fit md:w-[400px] gap-2 lg:w-[542px]  lg:pl-2 translate-x-14 md:translate-x-[80%] translate-y-[28%] bg-gray-900 z-50  rounded-2xl flex flex-col">
        <div className="flex justify-between pb-2">
          <div className="text-2xl ">
            <h3>Upload Profile Pic</h3>
          </div>
          <button
            className="text-2xl hover:text-white/20"
            onClick={props.onUploadClose}
          >
            X
          </button>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-2 md:mx-2"
          enctype="multipart/form-data"
        >
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0

      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
              onChange={onChangeHandler}
            />
          </label>
          <div className="flex  justify-end ">
            <Button title="Save Profile pic"></Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default UploadPic;
