import DisasterMap from "./components/Map/DisasterMap";
import Landing from "./components/pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DisasterMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
