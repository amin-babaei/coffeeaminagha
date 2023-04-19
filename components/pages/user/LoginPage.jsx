"use client"
import {useForm, Controller} from "react-hook-form";
import {Button, TextField, Paper, Box, Grid, InputAdornment, Typography} from '@mui/material';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock';
import Image from "next/image";
import Link from 'next/link'
import FooterSignup from "../../footers/FooterSignup"
import {DataContext} from "../../../store/GlobaStore";
import {useContext, useEffect} from "react";
import { useRouter } from 'next/navigation'
import Notify from "../../../helper/decoration/Notify";
import ButtonLoad from "../../../helper/decoration/ButtonLoad";
import {signIn, useSession} from "next-auth/react";

const LoginPage = () => {
    const {control, register, handleSubmit, formState} = useForm({
        mode: "onChange", reValidateMode: 'onBlur'
    });
    const router = useRouter();
    const { data: session } = useSession();
    const {state, dispatch} = useContext(DataContext)
    const { loading} = state;
    const handleLogin = async ({email,password}) => {
        dispatch({type: "LOADING", payload: true});
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.status === 200){
                dispatch({type: "LOADING", payload: false});
                return dispatch({ type: 'NOTIFY', payload: {success: "با موفقیت وارد شدی"}})
            }
            dispatch({type: "LOADING", payload: false});
            if (result.error.includes("Could not connect to any servers")){
                dispatch({type:'NOTIFY',payload:{error:"به نظر مشکلی از سمت سرور پیش اومده"}})
            }
            return dispatch({ type: 'NOTIFY', payload: {error: result.error} })
        } catch (err) {
            console.log(err);
            dispatch({type: "LOADING", payload: false});
            return dispatch({type: 'NOTIFY', payload: {error: err.error}})
        }
    }
    useEffect(() => {
        if (session?.user) {
            router.push("/");
        }
    }, [router, session]);
    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square bgcolor="#000000"
                  position="relative" className="border">
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={'/images/logo.png'}
                        width={60}
                        height={50}
                        alt="logo-twitch"
                    />
                    <Typography variant="h6" component="h3" color="secondary" marginTop="2rem">
                        برای دسترسی به سایت باید حساب کاربری داشته باشید
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{mt: 5}}>
                        <Controller
                            defaultValue={''}
                            name='email'
                            control={control}
                            rules={{required: true}}
                            render={({field}) => {
                                return (
                                    <TextField
                                        label="ایمیل"
                                        {...register("email", {
                                            required: "این فیلد اجباری است",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "ایمیل شما صحیح نیست"
                                            },
                                        })}
                                        error={Boolean(formState.errors.email)}
                                        helperText={formState.errors?.email ? formState.errors.email.message : null}
                                        margin="normal"
                                        autoComplete='off'
                                        placeholder="ایمیل خود را وارد کنید"
                                        type="email"
                                        name="email"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            style: {color: "white"},
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <EmailIcon color="primary"/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )
                            }}
                        >
                        </Controller>
                        <Controller
                            defaultValue={''}
                            name='password'
                            control={control}
                            rules={{required: true}}
                            render={({field}) => {
                                return (
                                    <TextField
                                        label="رمز عبور"
                                        {...register("password", {
                                            required: "این فیلد اجباری است",
                                            minLength: {
                                                value: 5,
                                                message: "رمز عبور باید حداقل 5 کاراکتر باشد"
                                            }
                                        })}
                                        error={Boolean(formState.errors.password)}
                                        helperText={formState.errors?.password ? formState.errors.password.message : null}
                                        margin="normal"
                                        autoComplete='off'
                                        placeholder="رمز عبور خود را وارد کنید"
                                        type="password"
                                        name="password"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            style: {color: "white"},
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LockIcon color="primary"/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )
                            }}
                        >
                        </Controller>
                        {loading ? (
                            <ButtonLoad loading={loading} message="منتظر بمانید..."/>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3,mb:2, p: 1, fontWeight: "bold"}}
                                disabled={!formState.isValid}
                            >
                                وارد شوید
                            </Button>
                        )}
                            <Link href="/register">
                                <Typography color="primary" fontSize='15px'
                                            sx={{cursor: "pointer", textDecoration: "underline"}}>
                                    حساب ندارم ! میخام بسازم
                                </Typography>
                            </Link>
                            <br/>
                            <br/>
                            <Link href="/forgot-password">
                                <Typography color="secondary" fontSize='15px'
                                            sx={{cursor: "pointer"}}>
                                    رمزعبور خود را فراموش کردید؟
                                </Typography>
                            </Link>
                    </Box>
                    <FooterSignup/>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/images/register.gif)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "black",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Notify/>
        </Grid>
    );
}
export default LoginPage;