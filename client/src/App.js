import {useState} from 'react';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import Login from './components/account/Login.jsx';
import DataProvider from './context/DataProvider.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx'

const PrivateRoute=({isAuthenticated, ...props})=>{
  return isAuthenticated?
  <>
    <Header/>
    <Outlet/>
  </>
  :<Navigate replace to='/login'/>
}
function App() {
  const [isAuthenticated, isUserAuthenticated] =useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      
    <div style={{marginTop: 64 }}>
        <Routes>
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>
          <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated}/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
    </BrowserRouter>
      </DataProvider>
    
  );
}

export default App;
