import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Colors from "./Components/Colors"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Colors" element={<Colors />} />
      </Routes>
    </Router>
  );
}

export default App;
