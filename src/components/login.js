import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const [userData, setUserData] = useState(null);

  function handleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      setUserData(data.user);
      console.log(data);
    });
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUserData(null);
        console.log("로그아웃 되었습니다.");
      })
      .catch((error) => {
        console.log("로그아웃 중에 오류가 발생했습니다.", error);
      });
  }

  return (
    <div>
      {userData ? (
        <>
          <h1 onClick={handleLogout}>Logout</h1>
        </>
      ) : (
        <h1 onClick={handleLogin}>Login</h1>
      )}
    </div>
  );
}

export default Login;
