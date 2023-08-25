import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false); // Corrected state variable name
  const db = getFirestore();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("userName", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setUser(doc.data());
        setError(false); // Reset error state if user is found
      } else {
        setUser(null);
        setError(true); // Set error state if no user found
      }
    } catch (err) {
      setError(true); // Set error state on error
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
    setError(false); // Reset error state
  };

  const { currentUser } = useContext(AuthContext);
  const handleSelect = async () => {
    if (!user) {
      return; // Don't proceed if no user is selected
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        // Create chat collection on Firebase
        await setDoc(chatDocRef, { messages: [] });

        // Update userChats for both users
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        const currentUserChatData = {
          [combinedId]: {
            userInfo,
            date: serverTimestamp(),
          },
        };

        const otherUserChatData = {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        };

        // Update userChats for current user
        await updateDoc(
          doc(db, "userChats", currentUser.uid),
          currentUserChatData
        );

        // Update userChats for other user
        await updateDoc(doc(db, "userChats", user.uid), otherUserChatData);
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }setUser(null)
    set
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
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {error && <span style={{ marginLeft: "10px" }}>User not found :( </span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.userName} />
          <div className="userChatInfo">
            <span style={{ textTransform: "capitalize" }}>{user.userName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
