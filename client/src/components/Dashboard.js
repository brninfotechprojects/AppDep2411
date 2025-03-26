import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
function Dashboard() {
  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });

  return (
    <div>
      <TopNavigation />
      <h1>
        Welcome to {storeObj.userDetails.firstName}{" "}
        {storeObj.userDetails.lastName}
      </h1>
      <img src={`/${storeObj.userDetails.profilePic}`}></img>
    </div>
  );
}

export default Dashboard;
