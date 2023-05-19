'use client'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from 'react'

function AuthUser({children}) {
    const router = useRouter();
    const {status, data: session} = useSession();
    console.log(status);
    useEffect(() => { 
        if (!session) {
            router.replace('/login')
        }
    },[router, session])
    
    return <main style={ status === 'loading' ? {filter: 'blur(20px)'} : {filter: 'blur(0)'} }>{children}</main>
}
export default AuthUser;