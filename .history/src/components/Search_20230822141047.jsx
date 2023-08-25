import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getFirestore
} from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const db = getFirestore();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        const userChatsRef = doc(db, "userChats", currentUser.uid);
const userChatsData = {
  [combinedId + ".userInfo"]: {
    uid: user.uid,
    displayName: user.userName,
    photoURL: user.photoURL,
  },
  [combinedId + ".date"]: serverTimestamp(),
};
await setDoc(userChatsRef, userChatsData);

const otherUserChatsRef = doc(db, "userChats", user.uid);
const otherUserChatsData = {
  [combinedId + ".userInfo"]: {
    uid: currentUser.uid,
    displayName: currentUser.userName,
    photoURL: currentUser.photoURL,
  },
  [combinedId + ".date"]: serverTimestamp(),
};
await setDoc(otherUserChatsRef, otherUserChatsData);

      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
