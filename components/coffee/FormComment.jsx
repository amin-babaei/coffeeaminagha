import {Box, Button, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {DataContext} from "../../store/GlobaStore";
import {useContext, useEffect} from "react";
import {postData} from "../../services/fetchData";
import {useForm,Controller} from "react-hook-form";
import {useSession} from "next-auth/react";
import ButtonLoad from "../../helper/decoration/ButtonLoad";

const FormComment = ({productId}) => {
    const {control, handleSubmit,reset, formState} = useForm({
        mode: "onChange", reValidateMode: 'onBlur'
    });
    const {state,dispatch} = useContext(DataContext)
    const {loading} = state
    const {data:session} = useSession()

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: '' });
        }
    }, [formState, reset]);

    const handleSend = async ({text}) => {
        dispatch({type: 'LOADING',payload: true})
        try {
            const send = await postData(`comments/${productId}`,{
                user:session.user,
                text,
                productId
            })
            if (send.message === 'success'){
                dispatch({type: 'LOADING',payload: false})
                dispatch({type: 'NOTIFY',payload:{success:"کامنت شما ارسال شد"}})
            }
            dispatch({type: 'LOADING',payload: false})
        }catch (e) {
            console.log(e)
            dispatch({type: 'LOADING',payload: false})
        }
    }
    return(
        <>
            <Box component="form" onSubmit={handleSubmit(handleSend)}>
                <Box display="flex" alignItems="center" mt={5}>
                    <Image src="/images/profile.jpg" alt="profile" width={50} height={50}/>
                    <Typography component="span" color="primary.dark" px={1}>{session?.user?.userName}</Typography>
                </Box>
                <Controller
                    defaultValue={''}
                    name='text'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => {
                        return(
                            <TextField
                                multiline
                                fullWidth
                                {...field}
                                error={Boolean(formState.errors.text)}
                                helperText={formState.errors.text && "این فیلد اجباری است"}
                                autoComplete='off'
                                margin="normal"
                                type="text"
                                name="text"
                                minRows={4}
                                placeholder="نظر خود را بنویسید"
                                variant="outlined"
                                InputProps={{
                                    style: {color: "white"},
                                }}
                            />
                        )
                    }}
                >
                </Controller>
                <Typography color="primary.dark" component="p" fontSize={"14px"}>کامنت شما بعد از تایید ادمین سایت به نمایش گذاشته می شود</Typography>
                {loading ? <ButtonLoad loading={loading} message="درحال ارسال ..."/> :
                <Button type="submit" variant="contained" color="secondary" sx={{my:2}}>ارسال نظر</Button>
                }
            </Box>
        </>
    )
}
export default FormComment