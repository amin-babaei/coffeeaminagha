'use client'
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography, Stepper, Step, StepLabel, MenuItem, } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import FooterSignup from "../../footers/FooterSignup";
import { DataContext } from "../../../store/GlobaStore";
import Notify from "../../../helper/decoration/Notify";
import { useRouter } from "next/navigation";
import ButtonLoad from "../../../helper/decoration/ButtonLoad";
import { postData } from "../../../services/fetchData";

const RegisterPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { loading } = state;
    const router = useRouter();
    const { control, register, trigger, handleSubmit, formState } = useForm({
        mode: "onChange", reValidateMode: 'onBlur'
    });

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = ['مرحله 1', 'مرحله 2'];

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        let last = completed;
        last[activeStep] = false;
        return last
    };

    const handleNext = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    useEffect(() => {
        trigger();
    }, []);

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const res = await postData("auth/register", data);
            if (res) {
                dispatch({ type: "LOADING", payload: false });
                dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                await router.push("/login");
            }
            return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        } catch (err) {
            dispatch({ type: "LOADING", payload: false });
            return dispatch({ type: 'NOTIFY', payload: { error: err.err } })
        }
    };
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square bgcolor="#000000"
                position="relative" className="border">
                <Box
                    sx={{
                        my: 3,
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
                    <Box sx={{ width: '100%' }}>
                        <Stepper
                            activeStep={activeStep}
                        >
                            {steps.map((step) => (
                                <Step
                                    sx={{
                                        '& .MuiStepLabel-root .Mui-active': {
                                            color: 'secondary.main', // circle color (ACTIVE)
                                        },
                                    }}
                                    key={step}
                                >
                                    <StepLabel sx={{ color: "white" }}></StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box
                            sx={{
                                flexDirection: 'row', pt: 2,
                                ...(activeStep === 0 ? { display: 'none' } : { display: "flex" })
                            }}
                            width="100%"
                            justifyContent="center"
                        >
                            <Button
                                onClick={handleBack}
                                variant="contained"
                                disabled={activeStep === 0}
                                color="primary"
                            >
                                برگشت
                            </Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1.3rem" }}>
                        <Box sx={{
                            ...(activeStep === 0 ? { display: 'block' } : { display: "none" })
                        }}>
                            <Controller
                                defaultValue={''}
                                name='userName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label="نام کاربری"
                                            {...register("userName", {
                                                required: "این فیلد اجباری است",
                                                minLength: {
                                                    value: 7,
                                                    message: "نام کاربری باید حداقل 7 کاراکتر باشد"
                                                },
                                            })}
                                            error={Boolean(formState.errors.userName)}
                                            helperText={formState.errors?.userName ? formState.errors.userName.message : null}
                                            margin="normal"
                                            autoComplete='off'
                                            placeholder="نام کاربری خود را وارد کنید"
                                            type="text"
                                            name="userName"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                style: { color: "white" },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon color="primary" />
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
                                name='email'
                                control={control}
                                render={() => {
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
                                                style: { color: "white" },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EmailIcon color="primary" />
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
                                render={() => {
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
                                                style: { color: "white" },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LockIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )
                                }}
                            >
                            </Controller>
                            <Button
                                onClick={handleNext}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, p: 1, fontWeight: "bold" }}
                                disabled={formState.errors?.userName !== undefined || formState.errors?.email !== undefined || formState.errors?.password !== undefined}
                            >
                                مرحله بعد
                            </Button>
                            <Link href="/login" style={{color:'white',fontSize:'15px',textDecoration:'underline'}}>
                                حساب دارم ! میخام وارد بشم
                            </Link>
                        </Box>
                        <Box sx={{
                            ...(activeStep === 0 ? { display: 'none' } : { display: "block" })
                        }}>
                            <Controller
                                defaultValue={''}
                                name='phone'
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label="شماره تماس"
                                            {...register("phone", {
                                                required: "این فیلد اجباری است | مثال: 09121234567",
                                                pattern: {
                                                    value: /09([0-9])-?[0-9]{4}-?[0-9]{4}/,
                                                    message: "شماره شما صحیح نیست",
                                                },
                                                maxLength: {
                                                    value: 11,
                                                    message: "شماره شما صحیح نیست",
                                                }
                                            })}
                                            error={Boolean(formState.errors.phone)}
                                            helperText={formState.errors?.phone ? formState.errors.phone.message : null}
                                            margin="normal"
                                            autoComplete='off'
                                            placeholder="شماره خود را وارد کنید"
                                            type="tel"
                                            name="phone"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                style: { color: "white" },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PhoneIcon color="primary" />
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
                                name='city'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label="شهر"
                                            {...field}
                                            error={Boolean(formState.errors.city)}
                                            helperText={formState.errors.city && "این فیلد اجباری است"}
                                            margin="normal"
                                            select
                                            color="primary"
                                            name="city"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                '& .MuiSelect-icon': {
                                                    color: "white"
                                                },
                                                '& .MuiInputBase-root': {
                                                    color: 'white',
                                                },
                                            }}
                                            inputProps={{
                                                style: { color: "white" }
                                            }}
                                        >
                                            <MenuItem value="مشهد">مشهد</MenuItem>
                                            <MenuItem value="تهران">تهران</MenuItem>
                                            <MenuItem value="شیراز">شیراز</MenuItem>
                                        </TextField>
                                    )
                                }}
                            >
                            </Controller>
                            <Controller
                                defaultValue={''}
                                name="address"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label="آدرس"
                                            multiline
                                            {...field}
                                            error={Boolean(formState.errors.address)}
                                            helperText={formState.errors.address && "این فیلد اجباری است"}
                                            fullWidth
                                            autoComplete='off'
                                            margin="normal"
                                            type="text"
                                            name="address"
                                            minRows={4}
                                            placeholder="آدرس خود را بنویسید"
                                            variant="outlined"
                                            InputProps={{
                                                style: { color: "white" },
                                            }}
                                        />
                                    )
                                }}
                            >
                            </Controller>
                            {loading ? (
                                <ButtonLoad loading={loading} message="منتظر بمانید..." />
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1, mb: 4, p: 1, fontWeight: "bold" }}
                                    disabled={!formState.isValid}
                                >
                                    ثبت نام
                                </Button>
                            )}
                        </Box>

                    </form>
                    <FooterSignup />
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
            <Notify />
        </Grid>
    )
};
export default RegisterPage;