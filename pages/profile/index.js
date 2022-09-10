import ProfileLayout from "../../layouts/ProfileLayout";
import {Box, styled, TextField} from "@mui/material";
import {useSession} from "next-auth/react";
import Head from "next/head";

const WrapperAcc = styled('header')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down("md")]: {
        display: 'block',
        textAlign: 'center',
    },
}));
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'white',
        },
        '&:hover fieldset': {
            borderColor: "white",
        }
    },
});

const Account = () => {
    const {status, data: session} = useSession();
    return (
        <>
            <Head>
                <title>پروفایل</title>
            </Head>
            {status === 'loading' ? <div>loading...</div> : session?.user && (
                <>
                    <WrapperAcc>
                        <Box>
                            <CssTextField
                                id="filled-read-only-input"
                                defaultValue={` ایمیل : ${session.user.email}`}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        color: "white",
                                        display: "block"
                                    }
                                }}
                                variant="outlined"
                            />
                            <CssTextField
                                id="filled-read-only-input"
                                defaultValue={` نام کاربری : ${session.user.userName}`}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        color: "white",
                                        display: "block"
                                    }
                                }}
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <CssTextField
                                id="filled-read-only-input"
                                defaultValue={`شماره تماس : ${session.user.phone}`}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        color: "white",
                                        display: "block"
                                    }
                                }}
                                variant="outlined"
                            />
                            <CssTextField
                                id="filled-read-only-input"
                                defaultValue={`شهر : ${session.user.city}`}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        color: "white",
                                    }
                                }}
                                variant="outlined"
                            />
                        </Box>
                    </WrapperAcc>
                    <CssTextField
                        id="filled-read-only-input"
                        defaultValue={` آدرس : ${session.user.address}`}
                        fullWidth
                        multiline
                        minRows={3}
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: "white",
                                display: "block",
                                marginTop: "2rem"
                            }
                        }}
                        variant="outlined"
                    />
                </>
            )}
        </>
    )
}
export default Account;
Account.Layout = ProfileLayout;