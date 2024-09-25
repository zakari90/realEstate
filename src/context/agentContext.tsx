"use client"
import { createContext, useContext, useState } from "react";



const Context = createContext<any>(undefined)



export function AgentContextWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const name= "bismi lah"
    const [first, setfirst] = useState({name :"second"})
    return(
        <Context.Provider value={first}>
            {children}
        </Context.Provider>
    )
  }

export function UseagentContext(){
    return useContext(Context)
  }