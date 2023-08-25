import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";

const Search = () => {
  const [userName, setUserName] = useState();
  const [user, setUser] = useState(null);
  const [error, seterror] = useState(false);
  const db = getFirestore();
  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", userName)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

      seterror(false);
    } catch (err) {
      seterror(true);
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <label htmlFor="search">
          <SearchIcon />
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search User"
          onKeyDown={handlekey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="userChat">
        <img
          src={user.pho}
          alt="User-img"
        />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
