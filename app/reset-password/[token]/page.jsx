'use client'
import {Box, Button, InputAdornment, styled, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import {useContext} from "react";
import {DataContext} from "../../../store/GlobaStore";
import {patchData} from "../../../services/fetchData";
import ButtonLoad from "../../../helper/decoration/ButtonLoad";
import {useRouter} from "next/router";
import Notify from "../../../helper/decoration/Notify";

const Wrapper = styled(Box)(({theme}) => ({
    width:"100%",
    padding:'0 20px',
    [theme.breakpoints.up("md")]: {
        width:'30%'
    },
}));

const ResetPassword = () => {
    const {control, register, handleSubmit, formState} = useForm({
        mode: "onChange", reValidateMode: 'onBlur'
    });
    const router = useRouter()
    const {token} = router.query

    const {state, dispatch} = useContext(DataContext);
    const {loading} = state;

    const updatePassword = async ({password,cf_password}) => {
        dispatch({ type: "LOADING", payload: { loading: true } });
        try {
            const res = await patchData(`customers/reset-password/${token}`,{password,cf_password})
            console.log(res)
            if (res.ok === true){
                dispatch({type: "LOADING", payload: false});
                dispatch({type: 'NOTIFY', payload: {success: res.message}})
                await router.replace('/login')
            }else{
                dispatch({type: "LOADING", payload: false});
                dispatch({type: 'NOTIFY', payload: {error: res.err}})
            }
        }catch(err){
            dispatch({type: 'NOTIFY', payload: {error: 'شما اجازه دسترسی ندارید'}})
            dispatch({type: "LOADING", payload: false});
        }
    };

    return (
        <Box component='form' onSubmit={handleSubmit(updatePassword)} minHeight='90vh' display='flex' flexDirection='column' alignItems='center' mt={5}>
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
            <Wrapper>
                <Controller
                    defaultValue={''}
                    name='password'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => {
                        return (
                            <TextField
                                label="رمز عبور جدید"
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
                <Controller
                    defaultValue={''}
                    name='cf_password'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => {
                        return (
                            <TextField
                                label="تکرار رمز عبور"
                                {...register("cf_password", {
                                    required: "این فیلد اجباری است",
                                    minLength: {
                                        value: 5,
                                        message: "رمز عبور باید حداقل 5 کاراکتر باشد"
                                    }
                                })}
                                error={Boolean(formState.errors.cf_password)}
                                helperText={formState.errors?.cf_password ? formState.errors.cf_password.message : null}
                                margin="normal"
                                autoComplete='off'
                                type="password"
                                name="cf_password"
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
                {loading ? <ButtonLoad loading={loading} message='منتظر بمانید ...'/>
                    : <Button type='submit' variant="outlined" color="secondary" fullWidth sx={{mt:2, fontSize:'16px'}}>تغیر پسورد</Button>
                }
            </Wrapper>
            <Notify/>
        </Box>
    );
}

export default ResetPassword;