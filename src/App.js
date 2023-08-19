import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Components/Views/LogIn/LogIn'
import RoutesFunc from './routes';
function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />}></Route>
          <Route exact path="admin/*" element={<RoutesFunc />}></Route>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
