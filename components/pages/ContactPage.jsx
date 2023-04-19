'use client'
import Image from "next/image";
import {useCallback, useContext, useEffect, useRef} from "react";
import emailjs from '@emailjs/browser';
import {useForm, Controller} from "react-hook-form";
import {Container, Button, Box, Grid, TextField, InputAdornment,} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import SendIcon from "@mui/icons-material/Send";

import {DataContext} from "../../store/GlobaStore";
import ButtonLoad from "../../helper/decoration/ButtonLoad";

export default function ContactPage() {
    const {control, register,reset, handleSubmit,formState, formState: {errors}} = useForm();
    const {state,dispatch} = useContext(DataContext)
    const {loading} = state;
    const form = useRef();
    const sendEmail = (e) => {
        dispatch({type: "LOADING", payload: true});
        emailjs.sendForm('service_wh4dxcl', 'template_y5vun3c', form.current, 'LXmB1SEQcsuxpVpRi')
            .then(() => {
                console.log('your message sent to aminbabaei_dev@yahoo.com');
                dispatch({type: 'NOTIFY', payload:{success: "ییام شما با موفقیت ارسال شد"}})
                dispatch({type: "LOADING", payload: false});
            }, (error) => {
                console.log(error.text);
                dispatch({type: "LOADING", payload: false});
            });
    };

    const resetAsyncForm = useCallback(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name:'',email: '',subject:'',message: ''});
        }
    }, [formState, reset]);

    useEffect(() => {
        resetAsyncForm()
    }, [formState, reset,resetAsyncForm])

    return (
        <>
             <Box marginTop="40px" minHeight="90vh" component="section">
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                                <Controller
                                    defaultValue = {''}
                                    name='name'
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) => {
                                        return (
                                            <TextField
                                                label="اسم شما"
                                                {...field}
                                                error={Boolean(errors.name)}
                                                helperText={errors.name && "این فیلد اجباری است"}
                                                autoComplete='off'
                                                margin="normal"
                                                name="name"
                                                placeholder="اسم خود را وارد کنید"
                                                type="text"
                                                fullWidth
                                                variant="outlined"
                                                sx={errors.name ? {borderColor: "red"} : {borderColor: "white"}}
                                                InputProps={{
                                                    style: {color: "white"},
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PersonIcon color="primary"/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )
                                    }}
                                >
                                </Controller>
                                <Controller
                                    defaultValue = {''}
                                    name='email'
                                    control={control}
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
                                                error={Boolean(errors.email)}
                                                helperText={errors?.email ? errors.email.message : null}
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
                                    defaultValue = {''}
                                    name="subject"
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) => {
                                        return (
                                            <TextField
                                                label="موضوع"
                                                {...field}
                                                error={Boolean(errors.subject)}
                                                helperText={errors.subject && "این فیلد اجباری است"}
                                                margin="normal"
                                                autoComplete='off'
                                                placeholder="موضوع مورد نظر خود را وارد کنید"
                                                type="text"
                                                name="subject"
                                                fullWidth
                                                variant="outlined"
                                                InputProps={{
                                                    style: {color: "white"},
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SubjectIcon color="primary"/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )
                                    }}
                                >
                                </Controller>
                                <Controller
                                    defaultValue = {''}
                                    name="message"
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) => {
                                        return (
                                            <TextField
                                                label="پیام"
                                                multiline
                                                {...field}
                                                error={Boolean(errors.message)}
                                                helperText={errors.message && "این فیلد اجباری است"}
                                                fullWidth
                                                autoComplete='off'
                                                margin="normal"
                                                type="text"
                                                name="message"
                                                minRows={4}
                                                placeholder="پیام خود را بنویسید"
                                                variant="outlined"
                                                InputProps={{
                                                    style: {color: "white"},
                                                }}
                                            />
                                        )
                                    }}
                                >
                                </Controller>
                                {loading ? (
                                    <ButtonLoad loading={loading.loading} message="درحال ارسال..."/>
                                ): (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        sx={{fontSize: "19px"}}
                                        startIcon={<SendIcon sx={{marginLeft: "10px"}}/>}
                                        type="submit"
                                    >
                                        ارسال
                                    </Button>
                                )}
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box width="100%" height="400px" position="relative">
                                <Image src="/images/contactus.svg" layout="fill" alt="contact us" priority={true}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>

    )
}