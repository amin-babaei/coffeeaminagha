'use client'
import {Box, Button, InputAdornment, styled, TextField, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import {postData} from "../../services/fetchData";
import {useContext} from "react";
import {DataContext} from "../../store/GlobaStore";
import ButtonLoad from "../../helper/decoration/ButtonLoad";
import Notify from "../../helper/decoration/Notify";

const Wrapper = styled(Box)(({theme}) => ({
        width:"100%",
        padding:'0 20px',
    [theme.breakpoints.up("md")]: {
        width:'30%'
    },
}));
const ForgotPassPage = () => {
    const {state, dispatch} = useContext(DataContext);
    const {loading} = state;

    const {control, register, handleSubmit, formState} = useForm({
        mode: "onChange", reValidateMode: 'onBlur'
    });
    const forgotPass = async (data) => {
        dispatch({type: "LOADING", payload: true});
        try {
            const res = await postData("customers/forgot-password", data);
            if (res.ok === true){
                dispatch({type: "LOADING", payload: false});
                dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            }else{
                dispatch({type: "LOADING", payload: false});
                dispatch({type: 'NOTIFY', payload: {error: res.err}})
            }
        } catch (err) {
            console.log(err)
            dispatch({type: "LOADING", payload: false});
        }
    }
    return (
        <Box component='form' onSubmit={handleSubmit(forgotPass)} minHeight='90vh' display='flex' flexDirection='column' alignItems='center' mt={5}>
            <Box sx={{cursor:"pointer"}}>
                <Link href="/">
                    <Image
                        src={'/images/logo.png'}
                        width={60}
                        height={50}
                        alt="logo-twitch"
                    />
                </Link>
            </Box>
            <Typography color={"primary"} my={2}>برای بازیابی رمز عبور ، ایمیل حساب کاربری خود را وارد کنید</Typography>
            <Typography color={"primary"} my={2}>یک لینک برای ساختن رمز عبور جدید در ایمیل خود دریافت خواهید کرد</Typography>
            <Wrapper>
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
                {loading ? <ButtonLoad loading={loading} message="منتظر بمانید..."/> :
                    <Button type='submit' variant="outlined" color="secondary" fullWidth sx={{mt:2, fontSize:'16px'}}>بازیابی</Button>
                }
            </Wrapper>
            <Notify/>
        </Box>
    );
}

export default ForgotPassPage;