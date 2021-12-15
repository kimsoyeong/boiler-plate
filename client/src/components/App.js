import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from "./views/NavBar/NavBar";
import Auth from '../hoc/auth';
import Footer from "./views/Footer/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div>
          
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)} />
            <Route exact path="/login" element={Auth(LoginPage, false)} />
            <Route exact path="/register" element={Auth(RegisterPage, false)} />
          </Routes> 
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
