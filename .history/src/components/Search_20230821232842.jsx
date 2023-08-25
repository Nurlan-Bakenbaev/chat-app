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
  getFirestore,
} from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const db = getFirestore();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("userName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((userDoc) => {
        setUser(userDoc.data());
      });
      setErr(false); // Reset error state if a user is found
    } catch (err) {
      console.log(err); // Log the error for debugging
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (!user) {
      return; // Return early if no user is selected
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const res = await getDoc(chatDocRef);

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(chatDocRef, { messages: [] });

        // create user chats
        const currentUserChatsRef = doc(db, "userChats", currentUser.uid);
        const otherUserChatsRef = doc(db, "usersChats", user.uid);

        await updateDoc(currentUserChatsRef, {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(otherUserChatsRef, {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err); // Log the error for debugging
    }

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
