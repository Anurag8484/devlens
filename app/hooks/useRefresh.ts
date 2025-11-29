"use client"

import { useEffect } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();

export function emitGlobal(event:string){
listeners.forEach((comp)=>comp());
}

export function useGlobalEmmit(event:string,callback: Listener){
    useEffect(() => {
        listeners.add(callback);
        return () => { listeners.delete(callback); };
    },[callback]);
    
}

