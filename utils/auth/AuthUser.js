import {useSession} from "next-auth/react";
import {useContext, useEffect} from "react";
import {DataContext} from "../../store/GlobaStore";
import {useRouter} from "next/router";
import Head from "next/head";
import {Box} from "@mui/material";
import Image from "next/image";

function AuthUser({children}) {
    const {status, data: session} = useSession();
    const {dispatch} = useContext(DataContext);
    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated") {
            return dispatch({type: 'NOTIFY', payload: {error: 'شما اجازه دسترسی به این صفحه را ندارید'}})
        }
    }, [status]);
    if (status === "loading") {
        return <div>
            <Head>
                <title>درحال انتقال...</title>
            </Head>
            <Box height="100vh" width={"100%"} position="relative" display="flex" alignItems="center" justifyContent="center">
                <Image src='/images/logo.png' width="100px" height="100px" layout="fixed" className="loading"/>
            </Box>
        </div>
    }
    if (!session) {
        router.push('/login');
    }
    return children
}
export default AuthUser;