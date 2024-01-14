import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = (props) => {
  const { name, username, img } = useSelector((store) => store.user);
  const id = props.id;
  const Navigation_Link = [
    {
      name: "Twiter",
      icon: faTwitter,
      path: "/",
    },
    {
      name: "Home",
      icon: faHouse,
      path: "/",
    },
    {
      name: "Pofile",
      icon: faUser,
      path: `/profilePage/${id}`,
    },
    {
      name: "Logout",
      icon: faRightFromBracket,
      path: "/logout",
    },
  ];
  return (
    <div className="relative w-20 md:w-[100%] ">
      <ul className="list-none flex flex-col font-sans text-xl  text-white/80  pt-5 w-min md:w-[100%] mx-auto px-auto align-middle sticky top-0 left-0 ml-3 ">
        {Navigation_Link.map((links, index) => {
          return (
            <NavLink
              to={links.path}
              key={index}
              className="flex flex-row my-3 justify-center rounded-xl hover:bg-sky-800  mx-auto w-fit  pl-3 md:px-5 py-2"
            >
              <div className="pr-8 md:pr-3">
                <FontAwesomeIcon icon={links.icon} />
              </div>
              <div id="name" className="font-bold hidden md:block">
                <h1>{links.name === "Twiter" ? "" : links.name}</h1>
              </div>
            </NavLink>
          );
        })}
        <button
          className="ml-2 md:mr-10 lg:mr-16  items-center flex flex-row my-3 justify-center rounded-3xl bg-sky-600 hover:bg-sky-800 md:mx-24 w-fit px-4 md:px-8 py-2 text-2xl"
          onClick={props.showTweetModal}
        >
          <FontAwesomeIcon icon={faCommentDots} />
          <h3 className="hidden md:block md:ml-2 ">Tweet</h3>
        </button>
        <div className="md:flex md:flex-row justify-center  mt-16 md:mt-36">
          <div className="h-10 w-10">
            <img
              src={`http://localhost:5000/${img}`}
              alt=""
              className="rounded-full mx-7 md:mx-0"
            />
          </div>
          <div className="flex flex-col text-sm pl-1 justify-center items-center mt-3 md:mt-0 mr-2 md:mr-0">
            <div>
              <p>${name}</p>
            </div>
            <div>
              <p>@{username}</p>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
