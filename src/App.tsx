import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Colors from "./Components/Colors"; 
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Colors" element={<Colors />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
