import {Box, Button, InputAdornment, styled, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import LockIcon from "@mui/icons-material/Lock";
import {useContext,useState} from "react";
import {DataContext} from "../store/GlobaStore";
import {putData} from "../services/fetchData";
import ButtonLoad from "../helper/decoration/ButtonLoad";

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
    const initialSate = {
        password: "",
        cf_password: "",
    };
    const [data, setData] = useState(initialSate);
    const {password, cf_password } = data;
    const {state, dispatch} = useContext(DataContext);
    const {loading} = state;

    const updatePassword = ({password,cf_password}) => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        putData("customers/reset-password", { password,cf_password }).then((res) => {
            console.log(res)
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        });
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
                    name='password'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => {
                        return (
                            <TextField
                                label="تکرار رمز عبور"
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
                {loading ? <ButtonLoad loading={loading} message='منتظر بمانید ...'/>
                : <Button variant="outlined" color="secondary" fullWidth sx={{mt:2, fontSize:'16px'}}>تغیر پسورد</Button>
                }
            </Wrapper>
        </Box>
    );
}

export default ResetPassword;