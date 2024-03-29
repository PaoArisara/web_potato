import axios from "axios";
import React, { useEffect, useState } from "react";
import Password from "../components/Password";
import Swal from "sweetalert2";

const User = () => {
  document.title = "Edit Profile";

  const [user, setuser] = useState([]);
  const [spaceCheck, setSpacecheck] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [displayname, setdisplayname] = useState("");
  const [showConfirm, setShowconfirm] = useState(false);
  const handleOnClose = () => setShowconfirm(false);

  const fetchData = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5174/api/userJWT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setuser(response.data);
        setdisplayname(response.data.displayname);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen  min-h-screen bg-repeat-y bg-cover pb-20  bg-[url('https://sv1.picz.in.th/images/2023/04/27/ycNIzv.png')] font-prom">
      <div className="pt-[100px] flex flex-col justify-center items-center ">
        <div className="">
          <div className="font-bold rounded-md bg-orange-600 text-[30px] text-white px-5 py-2 duration-500 text-center ">
            Account Setting
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-5 text-left"
            for="first-name"
          />
          Username
          <input
            className={`shadow appearance-none border rounded-lg w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
              spaceCheck ? "" : ""
            }`}
            id="username"
            type="text"
            value={user.username}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-5"
            for="display-name"
          />
          Display Name
          <input
            className="shadow appearance-none border rounded-lg w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="displayname"
            type="text"
            value={displayname}
            onChange={(e) => {
              if (e.target.value[e.target.value.length - 1] == " ") {
                setSpacecheck(true);
              } else {
                setdisplayname(e.target.value);
                console.log(e.target.value);
              }
            }}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-5"
            for="email"
          />
          Email
          <input
            className="shadow appearance-none border rounded-lg w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={user.email}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-5"
            for="password"
          />
          New Password
          <input
            className="shadow appearance-none border rounded-lg w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="new password"
            onChange={(e) => setpassword((x) => e.target.value)}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-5"
            for="password"
          />
          Comfirm Password
          <input
            className="shadow appearance-none border rounded-lg w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="confirm password"
            onChange={(e) => setconfirmpassword((x) => e.target.value)}
          />
        </div>
        <div className="pt-10">
          <button
            className="font-bold rounded-lg bg-orange-600 text-[20px] text-white px-5 py-2  hover:bg-orange-700 duration-500 text-center "
            onClick={() => {
              if (password == confirmpassword) return setShowconfirm(true);
              else
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <Password
          password={password == "" ? user.password : password}
          userpassword={user.password}
          displayname={displayname}
          onClose={handleOnClose}
          visible={showConfirm}
        />
      </div>
    </div>
  );
};

export default User;
