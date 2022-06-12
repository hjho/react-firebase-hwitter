import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { auth } from "fbaseConfig";
import { 
  onAuthStateChanged
} from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [hwitter, setHwitter] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if(user) {
        setHwitter({
          displayName: (user.displayName === null) ? "Hwitter" : user.displayName,
          uid: user.uid,
        });
      } else {
        setHwitter(null);
      }
      setInit(true);
    })
  }, [])
  const refreshHwitter = () => {
    const user = auth.currentUser;
    setHwitter({
      displayName: user.displayName,
      uid: user.uid,
    });
  }

  return (
    <>
      {init ? 
      (<AppRouter refreshHwitter={refreshHwitter} isLogin={Boolean(hwitter)} hwitter={hwitter} />)
       : 
      "접속 중,,,,"}
      <footer>
        &copy; {new Date().getFullYear()} HJHO's Hwitter 
      </footer>
    </>
  );
}

export default App;