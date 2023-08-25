import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  const [userName, setUserName] = useState();
  const [user, setUser] = useState(null);
  const [error, seterror] = useState(false);

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
          onKeyDown={handle}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
