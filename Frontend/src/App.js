import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer'
import SignUp from './Components/SignUp';
import PrivateComponenet from './Components/PrivateComponent';
import Login from './Components/login';
import Home from './Components/Home';
import TimeSeries from './Components/TimeSeries';


function App() {
  
  return (
    <div className="mainContainer">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element = {<PrivateComponenet/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/timeSeries" element={<TimeSeries/>}></Route>
        <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
        {/* <Route path="/profile" element={<h1>Profile Component</h1>}></Route> */}
        </Route>
        <Route path="/signup" element= {<SignUp/>}/>
        <Route path="/login" element= {<Login/>}/>

      </Routes>
      </BrowserRouter>

      <Footer/>

    </div>
  );
}

export default App;
