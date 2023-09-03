import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './Components/Views/LogIn/LogIn'
import RoutesFunc from './routes';
import ProtectedRoutes from './Components/Views/Protected/ProtectedRoutes';
function App() {
  return (
    
        <Routes>
          <Route exact path="/" element={<SignIn />}></Route>
          <Route exact path="/admin/*" element={<ProtectedRoutes Component={RoutesFunc}/>}></Route>
        </Routes>
   
  );
}

export default App;
