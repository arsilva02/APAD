
import './App.css'

import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Project from './pages/Project';
import NewUser from './pages/newUser';
import Login from './pages/login';
import NewProject from './pages/newProject';
import Resource from './pages/resource';

function App() {


  return (
    <>
      
      <HashRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/Project' element={ <Project /> } />
          <Route path='/newUser' element={ <NewUser /> } />
          <Route path='/login' element={ <Login />}/>
          <Route path='/newProject' element={ <NewProject /> }/>
          <Route path='/recource' element = { <Resource /> } />

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
