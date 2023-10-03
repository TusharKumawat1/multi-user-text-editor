import { MyContext } from "./MyContext";
import React, { useState } from 'react'

export default function ContextApi({children}) {
  const [members,setMembers]=useState([])
  return (
    <MyContext.Provider value={ {members,setMembers }}>
    {children}
    </MyContext.Provider>
  )
}
