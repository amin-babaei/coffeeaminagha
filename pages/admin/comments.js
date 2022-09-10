import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {useEffect, useContext, useState} from "react";
import {deleteData,putData} from "../../services/fetchData";
import {useSession} from "next-auth/react";
import {DataContext} from "../../store/GlobaStore";
import Image from "next/image";
import CardSkelet from "../../components/skeleton/CardSkelet";
import useFetch from "../../helper/hooks/useFetch";
import Head from "next/head";

const Comments = () => {
    const {data: session} = useSession();
    const {data:comments,loading} = useFetch("/comments")
    const [updated, setUpdated] = useState([]);
    const {dispatch} = useContext(DataContext);

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setUpdated(comments.comments);
            }
        }, [comments, session]);

    const handleUpdate = async (productId,commentId) => {
        if(session && session.user.root) {
            try {
                dispatch({type: "LOADING", payload: true});
                const res = await putData(`comments/${productId}/comment/${commentId}`)
                if (res) {
                    dispatch({type: "NOTIFY", payload: {success: "با موفقیت تایید شد"}});
                    dispatch({type: "LOADING", payload: false});
                }
            }catch (e) {
                console.log(e)
                dispatch({type: "LOADING", payload: false});
            }
        }else dispatch({type: "NOTIFY", payload: {error: "شما اجازه نداری"}});

    }
    const remove = async (productId,commentId) => {
        if (session && session.user.root) {
            const allComments = [...comments.comments];
            try {
                dispatch({type: "LOADING", payload: true});
                const response = await deleteData(`comments/${productId}/comment/${commentId}`)
                if (response) {
                    setUpdated(allComments.filter(comment => comment._id !== commentId));
                    dispatch({type: "NOTIFY", payload: {success: "با موفقیت حذف شد"}});
                    dispatch({type: "LOADING", payload: false});
                }
            } catch (err) {
                console.log(err.message);
                dispatch({type: "LOADING", payload: false});
            }
        } else dispatch({type: "NOTIFY", payload: {error: "شما اجازه حذف کامنت نداری"}});

    }

    return (
        <Grid container spacing={2}>
            <Head>
                <title>نظرات</title>
            </Head>
            {loading ? <CardSkelet count={6}/>
            :updated && updated.map(comment => (
                comment.comments.length > 0 && (
                    <Grid item xs={12} sm={4} key={comment._id}>
                        <Box
                            className="border"
                            bgcolor="#3c3c3c"
                            mb={1}
                            mt={3} p={1}
                            borderRadius="5px">
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="primary" my={2}>{comment.title}</Typography>

                            </Box>
                            {comment.comments.map(comment => (
                                <div key={comment._id}>
                                    <Box display="flex" alignItems="center" >
                                        <Image src="/images/profile.jpg" alt="profile" width={50} height={50}/>
                                        <Typography component="span" color="primary.dark"
                                                    px={1}>{comment.user.userName}</Typography>
                                    </Box>
                                    <Typography component="p" color="primary" my={2} p={1} height="85px" overflow="scroll">{comment.text}</Typography>
                                    <Stack direction="row" justifyContent="flex-end" height="50px">
                                        <Button variant="contained" color="success" sx={{mx:1}}
                                                onClick={() =>handleUpdate(comment.productId,comment._id)}
                                                disabled={comment.checked}
                                        >تایید</Button>
                                        <Button variant="contained" color="error"
                                                onClick={() =>remove(comment.productId,comment._id)}
                                        >حذف</Button>
                                    </Stack>
                                </div>
                            ))}
                        </Box>
                    </Grid>
                )
            ))}
        </Grid>
    )
}
export default Comments