import '../styles/globals.css'
import {ThemeProvider, CssBaseline} from "@mui/material";
import {theme} from '../styles/theme/theme';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from './../utils/createEmotionCache';
import MainLayout from './../layouts/MainLatout';
import NextNProgress from "nextjs-progressbar";
import {useRouter} from "next/router";
import {DataProvider} from "../store/GlobaStore";
import {SessionProvider} from "next-auth/react";

import AdminLayout from "../layouts/AdminLayout";
import AuthUser from "../utils/auth/AuthUser";
import AuthAdmin from "../utils/auth/AuthAdmin";

const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps: {session, ...pageProps}, emotionCache = clientSideEmotionCache}) {
    const Layout = Component.Layout || EmptyLayout;

    const router = useRouter();

    return (
        <CacheProvider value={emotionCache}>
            <SessionProvider session={session}>
                <DataProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <NextNProgress
                            color="#f4bf79"
                            startPosition={0.3}
                            stopDelayMs={200}
                            height={3}
                            showOnShallow={true}
                        />
                        {router.pathname === '/login' || router.pathname === '/register' ? (
                            <Component {...pageProps} />
                        ) : router.pathname.startsWith('/admin')
                            ? (
                           <AdminLayout>
                               <AuthAdmin>
                                 <Component {...pageProps} />
                                 </AuthAdmin>
                           </AdminLayout>
                        ) :(
                                    <AuthUser>
                            <MainLayout>
                                <Layout>
                                        <Component {...pageProps} />
                                </Layout>
                            </MainLayout>
                                    </AuthUser>
                        )}
                    </ThemeProvider>
                </DataProvider>
            </SessionProvider>
        </CacheProvider>
    )
}

const EmptyLayout = ({children}) => <>{children}</>;

export default MyApp
