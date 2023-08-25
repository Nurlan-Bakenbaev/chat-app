import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, seterror] = useState(false);
  const db = getFirestore();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        
      });
    } catch (err) {
      console.log(err)
      seterror(true);
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  };
console.log(user)
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
      {error && "User not found"}
      {user && (
        <div className="userChat">
          <img style={{width:'40px',height:'40px'}} src={user.photoURL} alt={user.userName} />
          <div className="userChatInfo">
            <span style={{textTransform:'capitalize'}}>{user.userName} </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
