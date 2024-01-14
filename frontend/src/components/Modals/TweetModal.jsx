import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createPortal } from "react-dom";
const TweetModal = (props) => {
  const token = useSelector((store) => store.auth.token);
  console.log(token);
  const [formData, setFormData] = useState({
    photos: "",
    content: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "photos") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const fd = new FormData();
      fd.append("photos", formData.photos);
      fd.append("content", formData.content);
      console.log(fd);
      const resp = await axios.post(`http://localhost:5000/api/tweet${props.url?props.url:""}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      props.onPostSuccess()
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
 <div className="h-screen w-screen absolute ">
    <form
      encType="multipart/form-data"
      onSubmit={onSubmitHandler}
      className=" fixed h-fit w-[300px] md:w-[400px] lg:w-[542px] lg:h-[274px] lg:pl-2 translate-x-[15%] md:translate-x-[80%] translate-y-[28%] bg-gray-900 z-50  rounded-2xl "
    >
      <button onClick={props.onClose} className="p-3 border-b border-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600 hover:text-blue-400 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap  ="round"
            strokeLinejoin ="round"
            strokeWidth       ="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <section className="w-fit flex px-3 py-2 ">
       
        <div className="flex-1 lg:w-[500px] lg:h-[114px]">
          <textarea
            className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-white resize-none"
            rows="4"
            name="content"
            placeholder={props.heading}
            onChange={onChangeHandler}
          ></textarea>
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex">
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-600 hover:text-blue-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap   ="round"
                      strokeLinejoin  ="round"
                      strokeWidth     ="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>{" "}
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    name="photos"
                    className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-none file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100   "
                    onChange={onChangeHandler}
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="transition duration-500 ease-in-out bg-blue-500 bg-opacity-50 hover:bg-opacity-100 text-white text-opacity-50 hover:text-opacity-100 py-2 px-3 rounded-full text-base font-bold focus:outline-none"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
 </div>
,
    document.getElementById("modal")
  );
};

export default TweetModal;
