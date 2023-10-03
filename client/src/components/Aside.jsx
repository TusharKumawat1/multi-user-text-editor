import React from 'react'
import Styles from "../styles/aside.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Aside({members}) {
    const users=[1,2,3];
    const navigate=useNavigate();
    const params=useParams();
    function leaveRoom(){
        navigate("/")
    }
    function copyRoomId(){
        navigator.clipboard.writeText(params.roomId)
        toast.success("Copied!",{
            autoClose:3000
        })
    }

  return (
    <div className={Styles.container}>
      <div className={Styles.section1}>
        <h2 className={Styles.logo}>AtomizeCoLab <i className="fa-solid fa-laptop-code"></i></h2>
        <div className={Styles.memberSection}>
            <h2>Members</h2>
            <div className={Styles.members}>
            {members?.map((data,i)=>{
                return  <div key={i} className={Styles.member}>
                <span className={Styles.pfp}>{data.username[0]}</span><span>{data.username}</span>
            </div>
            })}
            </div>
        </div>
      </div>
      <div className={Styles.section2}>
        <button className={Styles.copyBtn} type='button'  onClick={copyRoomId}>Copy Room Id</button>
        <button className={Styles.leaveBtn} type='button' onClick={leaveRoom}>Leave Room</button>
      </div>
    </div>
  )
}
