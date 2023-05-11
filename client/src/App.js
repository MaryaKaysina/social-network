import Home from "@core/pages/home/Home";
import Profile from "@core/pages/profile/Profile";
import Auth from "@core/pages/auth/Auth";

import "./App.css";

function App() {
  return (
    <div className="App">
        <div className="blur blur--top"></div>
        <div className="blur blur--bottom"></div>
        {/* <Home /> */}
        {/* <Profile /> */}
        <Auth />
    </div>
  );
}

export default App;
