import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import { ProviderContext } from "./context/UseAuth";
import ProtectRouter from "./protectRouter/ProtectRouter";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Profile from "./components/profile/Profile";
import RainyBackground from "./Text";
function App() {
  return (
    <div className="App">
      <ProviderContext>
        <Menu />
        <Routes>
          <Route element={<ProtectRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/movie/:movieId" element={<SingleMovie />} />
          </Route>
          <Route path="/test" element={<RainyBackground />} />
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </ProviderContext>
    </div>
  );
}

export default App;
