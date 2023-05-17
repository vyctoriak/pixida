import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Art from "./components/Art/Art";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/art/:id" element={<Art />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
