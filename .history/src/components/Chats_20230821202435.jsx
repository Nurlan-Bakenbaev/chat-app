import React, { useContext, useEffect, useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore"; // Import 'getFirestore'
import { AuthContext } from "./context/AuthContext";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);

  const db = getFirestore(); // Call 'getFirestore' to get the Firestore instance

  const [chats, setChats] = useState([]);
  useEffect(() => {
    const docRef = doc(db, "userChats", currentUser.uid); // Get a reference to the user's chat document
    const unsub = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setChats(docSnapshot.data()); // Set the chat data from the document
      } else {
        setChats([]); // Handle the case where the document doesn't exist
      }
    });
    return () => {
      unsub();
    };
  }, [currentUser.uid, db]); // Include 'db' as a dependency
  return (
    <div className="chats">
      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="User-img"
        />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>latest messages</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
