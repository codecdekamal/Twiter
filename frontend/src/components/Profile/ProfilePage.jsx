import Sidebar from "../homepage/Sidebar";
import ModalEdit from "./ModalEdit";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UploadPic from "./UploadPic";
import "../homepage/homepage.css";
import Content from "./Content";
const ProfilePage = () => {
  const id = localStorage.getItem("id")
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  let token = useSelector((store) => store.auth.token);
  if (token === "") {
    return <Navigate to="/login"></Navigate>;
  }
  const onClose = () => {
    setShow(false);
  };
  const onOpening = () => {
    setShow(true);
  };
  const uploadHandler = () => {
    setShowUpload(true);
  };
  const onUploadClose = () => {
    setShowUpload(false);
  };
  return (
    <>
      {showUpload && <UploadPic onUploadClose={onUploadClose} />}{" "}
      {show && <ModalEdit onClose={onClose} />}
      <div className="bg-black/95 min-h-screen min-w-fit outerLayout text-white/70 ">
        <Sidebar id={id} />
        <div className="w-60 md:w-[100%] border-x-[1px] border-gray-400 text-white relative overflow-hidden flex justify-center ">
          <div className="w-[100%]">
            <Content
              onClose={onClose}
              onClick={onOpening}
              onOpeningUpload={uploadHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
