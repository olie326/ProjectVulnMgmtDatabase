import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Database/Database";
import Landing from "./pages/Landing";
import "./App.css";
import { createContext, useState } from "react";

type userContextState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];
export const userContext = createContext<userContextState>([false, () => {}]);

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <userContext.Provider value={[authenticated, setAuthenticated]}>
      <Routes>
        <Route index path="login" element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
