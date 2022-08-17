import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Info from "./pages/Info";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcontact" element={<AddEdit />} />
        <Route path="/addcontact/:id" element={<AddEdit />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
