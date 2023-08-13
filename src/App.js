import "./App.css";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Notfound from "./pages/Notfound";
import UserPage from "./pages/User";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
