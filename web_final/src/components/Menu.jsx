import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiChevronLeftCircle } from "react-icons/bi";

function Menu(props) {
  const [Num, setNum] = useState(0);
  const [Addcardalert, setAddcardalert] = useState(false);
  function AddtoCart() {
    if (Num == 0) return;
    props.setM(props.menu.menuFood);
    props.setText("Add");
    props.setPush(true);

    axios({
      method: "post",
      url: "http://127.0.0.1:5174/api/Cart",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify({
        menuId: String(props.menu.menuId),
        numFood: parseInt(Num),
      }),
    })
      .then(function (response) {
        // console.log(response.data);
        props.reload[1]((x) => x + 1);
      })
      .catch(function (response) {
        console.log("error");
      });

    return;
  }

  return (
    <div className="">
      <div className="overflow-hidden rounded-t-2xl " key={props.index}>
        <div className=" h-40 w-full object-cover rounded-t-xl overflow-hidden bg-white">
          <img src={props.menu.menuPic} alt={props.menu.menuFood} />
        </div>
      </div>
      <div className=" px-5 py-2  bg-amber-300 rounded-b-2xl">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="md:mt-1 md:mx-2 text-base lg:text-lg font-semibold text-gray-800 py-2">
              {props.menu.menuFood}
            </h2>
          </div>
          <div className=" inline-block py-2 text-base lg:text-xl">
            {props.menu.priceFood} <span>฿</span>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div>
            <button
              onClick={() => {
                setNum((x) => (x > 0 ? x - 1 : x));
              }}
              type="button"
              className="py-2 px-5 bg-amber-100 text-sm lg:text-lg hover:bg-orange-600 hover:text-amber-100  focus:ring-orange-600 focus:ring-offset-amber-200  text-orange-600 w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full  "
            >
              -
            </button>
          </div>
          <div>
            <button
              type="button"
              className="py-2 px-5 bg-amber-100 text-sm lg:text-lg hover:bg-orange-600 hover:text-amber-100  focus:ring-orange-600 focus:ring-offset-amber-200  text-orange-600 w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full  "
            >
              {Num}
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setNum((x) => x + 1);
              }}
              type="button"
              className="py-2 px-5 bg-amber-100 text-sm lg:text-lg hover:bg-orange-600 hover:text-amber-100  focus:ring-orange-600 focus:ring-offset-amber-200  text-orange-600 w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full  "
            >
              +
            </button>
          </div>
        </div>
        <div className="p-5">
          <button
            type="button"
            onClick={AddtoCart}
            className="py-2 px-2 bg-amber-100 text-sm lg:text-lg hover:bg-orange-600 hover:text-amber-100  focus:ring-orange-600 focus:ring-offset-amber-200  text-orange-600 w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full  "
          >
            Add to Cart
          </button>
        </div>
      </div>
      <a href="/Restaurant">
        <button className="fixed z-90 bottom-10 left-8 bg-amber-400 w-10 sm:w-14 h-10 sm:h-14 rounded-full flex justify-center items-center text-white text-2xl sm:text-4xl hover:bg-orange-600  duration-300">
          <BiChevronLeftCircle />
        </button>
      </a>
    </div>
  );
}

export default Menu;
