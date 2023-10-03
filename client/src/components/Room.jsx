import React, { useEffect, useState } from 'react'
import Aside from './Aside'
import Ide from './Ide'
import Styles from "../styles/room.module.css"
import { useNavigate} from 'react-router-dom';
import socket from '../Socket';
import { toast } from 'react-toastify';

export default function Room() {
  const navigate=useNavigate();
  const [members,setMembers]=useState([])
  if (!localStorage.getItem("username")) {
    navigate("/");
  }
  useEffect(()=>{
    async function init(){
      socket.on("joined",data=>{
        if (localStorage.getItem("username")!== data.username) {
          toast.success(`${data.username} join the room`)
        }
        console.log(data,"at the time of joining")
        setMembers(p=>p=data.clients)
      })
      socket.on("leave",data=>{
        console.log(data,"at the time of leaving")
        toast.success(`${data.username} leave the room`)
        setMembers((prev) => {
          return prev.filter(
              (client) => client.socketId !== data.socketId
          )
        
      })
    })
       
    }
    init();
    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <div className={Styles.container}>
      <Aside members={members} setMembers={setMembers}/>
      <Ide />
    </div>
  )
}
