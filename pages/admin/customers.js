import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import Head from "next/head";
import {useContext} from "react";
import {DataContext} from "../../store/GlobaStore";
import {useSession} from "next-auth/react";
import ButtonLoad from "../../helper/decoration/ButtonLoad";
import TableSkelet from "../../components/skeleton/TableSkelet";
import {deleteData} from "../../services/fetchData";
import useFetch from "../../helper/hooks/useFetch";
import {useEffect, useState} from "react";

export default function Customers() {
    const {data: session} = useSession();
    const {data: customers, loading} = useFetch("/customers")
    const {dispatch} = useContext(DataContext);
    const [updated, setUpdated] = useState([]);

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setUpdated(customers.users);
        }
    }, [customers, session]);

    const deleteCustomer = async (id) => {
        if (session && session.user.root) {
            const allUsers = [...customers.users];
            try {
                dispatch({type: "LOADING", payload: true});
                const res = await deleteData(`customers/${id}`);
                if (res) {
                    setUpdated(allUsers.filter(user => user._id !== id));
                    dispatch({type: "LOADING", payload: false});
                    return dispatch({type: "NOTIFY", payload: {success: res.msg}})
                }
                dispatch({type: "LOADING", payload: false});
            } catch (res) {
                console.log(res)
                dispatch({type: "LOADING", payload: false});
            }
        } else return dispatch({type: "NOTIFY", payload: {error: "شما اجازه حذف کاربر را ندارید"}})
    }
    return (<>
            <Head>
                <title>مشتری ها</title>
            </Head>
            {loading ? <TableSkelet/> : (<TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow color="white" style={{backgroundColor: "black"}}>
                                <TableCell color="white" align="center">نام کاربری</TableCell>
                                <TableCell color="white" align="center">ایمیل</TableCell>
                                <TableCell color="white" align="center">شماره تماس</TableCell>
                                <TableCell color="white" align="center">شهر</TableCell>
                                <TableCell color="white" align="center">حذف</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updated?.map((customer) => (<TableRow
                                    key={customer._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="center">{customer.userName}</TableCell>
                                    <TableCell align="center">{customer.email}</TableCell>
                                    <TableCell align="center">{customer.phone}</TableCell>
                                    <TableCell align="center">{customer.city}</TableCell>
                                    <TableCell align="center">
                                        {loading ? (<ButtonLoad loading={loading} message="منتظر بمانید..."/>) : (
                                            <Button variant="contained" color="error"
                                                    onClick={() => deleteCustomer(customer._id)}>حذف</Button>)}
                                    </TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </>);
}

