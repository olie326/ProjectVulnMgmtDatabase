import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Database/Database";
import Landing from "./pages/Landing";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
