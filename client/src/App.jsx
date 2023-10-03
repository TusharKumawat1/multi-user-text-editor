import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import JoinRoom from './components/JoinRoom'
import Room from './components/room'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextApi from "./context/ContextApi"
export default function App() {
  return (
    <BrowserRouter>
    <ContextApi>
     <ToastContainer />
        <Routes>
          <Route path='/' element={<JoinRoom/>}/>
          <Route path='/:roomId' element={<Room/>}/>
        </Routes>
    </ContextApi>
    </BrowserRouter>
  )
}
