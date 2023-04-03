'use client'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from 'react'

function AuthUser({children}) {
    const router = useRouter();
    const {status, data: session} = useSession();
    useEffect(() => { 
        if (!session) {
            router.replace('/login')
        }
    },[router, session])
    
    return children
}
export default AuthUser;