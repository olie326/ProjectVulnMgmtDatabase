import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
