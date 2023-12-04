import React from "react";
import axios from "axios";
import { HiTrash } from "react-icons/hi";

function remove(id) {
  axios({
    method: "delete",
    url: "http://127.0.0.1:5174/api/Post/" + String(id),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      window.location.reload(false);
    })
    .catch((err) => {
      console.log(err);
    });
}
function Post_card({ post, menu }) {
  let total = 0;

  return (
    <div className="flex justify-center">
      <div className="bg-amber-200 rounded-2xl w-72 relative pb-24 font-prom ">
        <img className=" rounded-t-2xl" src={post.restaurants.restPic} />
        <div>
          <h2 className="text-center text-lg sm:text-xl pt-2">
            {post.restaurants.restName}
          </h2>
          <h2 className="mx-4 text-base sm:text-lg text-center ">
            Status : {post.status == "use" ? "waiting" : "sending"}
          </h2>
          <ul className="text-center p-2">
            {menu.map((x, i) => {
              if (x.post.postId != post.postId) return null;
              total += x.price;
              return (
                <li className="flex justify-between items-center gap-x-3">
                  <div className="flex justify-between gap-x-2 text-base sm:text-lg ">
                    <div>{x.countFood}X</div>
                    <div>{x.menu.menuFood}</div>
                  </div>
                  <div className="text-base sm:text-lg">{x.price} ฿</div>
                </li>
              );
            })}
          </ul>
          <div className=" w-72 absolute bottom-1">
            <div className="flex justify-between p-4 border-t-2 border-amber-500 border-dashed text-base sm:text-lg ">
              <div>Total Amount :</div>
              <div>{total} ฿</div>
            </div>
            <div className="text-center text-2xl text-orange-500 ">
              <button>
                <HiTrash onClick={() => remove(post.postId)} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post_card;
