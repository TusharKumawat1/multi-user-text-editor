import React, { useEffect,} from 'react'
import Styles from "../styles/joinRoom.module.css"
import { useForm } from 'react-hook-form';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import socket from '../Socket';
export default function JoinRoom() {
   
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    async function onsubmit (data, e) {
        e.preventDefault();
        localStorage.setItem("username", data.username)
        socket.emit("join room",data)
        navigate(`/${data.roomId}`)
        
    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$&';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const generateRoomId = () => {
        setValue("roomId", makeid(20))
    }
    useEffect(() => {
        let username = localStorage.getItem("username")
        if (username) {
            setValue("username", username)
        }
    }, [])
    return (
        <div className={Styles.container}>
            <div className={Styles.heading}><Typewriter
                options={{
                    strings: ['Real-time coding with team', 'Multiuser code collaboration.', 'Shared text editor enhances productivity.'],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20,

                }}
            /></div>
            <form onSubmit={handleSubmit(onsubmit)} className={Styles.form}>
                <label htmlFor="roomId">
                    Room id
                </label>
                <input type="text" id={"roomId"} name='roomId' required={true} minLength={20} autoComplete='off' {...register('roomId', { required: true })} />
                <label htmlFor="username">
                    Username
                </label>
                <input type="text" id={"username"} name='username' required={true} autoComplete='off' {...register('username', { required: true })} />
                <p className={Styles.para}>Create a new <button type="button" onClick={generateRoomId}>Room</button></p>
                <button type="submit" className={Styles.btn}>Join</button>
            </form>
        </div>
    )
}
