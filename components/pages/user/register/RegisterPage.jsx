'use client'
import { Box, Button, Grid, Paper, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Image from "next/image";
import FooterSignup from "../../../footers/FooterSignup";
import { DataContext } from "../../../../store/GlobaStore";
import Notify from "../../../../helper/decoration/Notify";
import { postData } from "../../../../services/fetchData";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { loading } = state;

    const { control, register, watch, handleSubmit, formState:{errors,isValid} } = useForm({
        mode: "all", reValidateMode: 'onBlur',defaultValues:{
            userName: '',
            email: '',
            password:''
        }
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
    
    const onSubmit = async (data) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const res = await postData("auth/register", data);
            if (res) {
                dispatch({ type: "LOADING", payload: false });
                dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: true,
                    callbackUrl: "/",
                })
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
                        {activeStep === 0 && <FirstStep control={control} next={handleNext} errors={errors} register={register} watch={watch}/>}
                        {activeStep === 1 && <SecondStep control={control} isValid={isValid} errors={errors} register={register} loading={loading}/>}
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