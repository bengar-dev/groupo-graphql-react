import { Routes, Route } from "react-router-dom";
import EditProfil from "./pages/EditProfil";
import Forum from "./pages/Forum";

//pages
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Register from "./pages/Register";

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <div>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/profil/:id" element={<Profil />} />
          <Route path="/edit-profil" element={<EditProfil />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
