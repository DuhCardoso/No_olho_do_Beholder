import "./global.css";

import { BrowserRouter, Route, Routes, } from "react-router-dom";

// Pages
import FichaPage from "./pages/FichaPage/FichaPage";


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FichaPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
