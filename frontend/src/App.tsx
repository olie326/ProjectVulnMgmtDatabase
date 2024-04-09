import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Database/Database";
import Landing from "./pages/Landing";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import { getData } from "./api_calls/get_data";
import SideNav from "./components/SideNav";

type userContextState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

type DataContext = [Data, React.Dispatch<React.SetStateAction<Data>>];

export const userContext = createContext<userContextState>([false, () => {}]);
export const dataContext = createContext<DataContext>([
  {
    vulnerability: [],
    asset: [],
    definition: [],
  },
  () => {},
]);

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<Data>({
    vulnerability: [],
    asset: [],
    definition: [],
  });

  //Update database on component mount
  useEffect(() => {
    getData().then((response) => {
      setData(response);
      console.log(response);
    });
  }, []);

  return (
    <dataContext.Provider value={[data, setData]}>
      <userContext.Provider value={[authenticated, setAuthenticated]}>
        <Routes>
          <Route index path="login" element={<Landing />} />
          <Route path="dashboard" element={<SideNav />} />
        </Routes>
      </userContext.Provider>
    </dataContext.Provider>
  );
}

export default App;
