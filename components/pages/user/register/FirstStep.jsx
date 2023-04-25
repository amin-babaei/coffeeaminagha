import { Box, Button, InputAdornment, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import Link from 'next/link';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';

const FirstStep = ({control,next,register,errors,watch}) => {
    const fields = watch(['userName','email','password'])
  return (
    <Box>
        <Controller
            name='userName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
                return (
                    <TextField
                        label="نام کاربری"
                        {...field}
                        {...register("userName", {
                            required: "این فیلد اجباری است",
                            minLength: {
                                value: 7,
                                message: "نام کاربری باید حداقل 7 کاراکتر باشد"
                            },
                        })}
                        error={Boolean(errors.userName)}
                        helperText={errors?.userName ? errors.userName.message : null}
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
            name='email'
            control={control}
            render={({ field }) => {
                return (
                    <TextField
                        label="ایمیل"
                        {...field}
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
            name='password'
            control={control}
            render={({ field }) => {
                return (
                    <TextField
                        label="رمز عبور"
                        {...field}
                        {...register("password", {
                            required: "این فیلد اجباری است",
                            minLength: {
                                value: 5,
                                message: "رمز عبور باید حداقل 5 کاراکتر باشد"
                            }
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors?.password ? errors.password.message : null}
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
            onClick={next}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1, fontWeight: "bold" }}
            disabled={fields.includes("") || errors?.userName || errors?.email || errors?.password}
        >
            مرحله بعد
        </Button>
        <Link href="/login" style={{color:'white',fontSize:'15px',textDecoration:'underline'}}>
            حساب دارم ! میخام وارد بشم
        </Link>
    </Box>
  )
}

export default FirstStep