'use client'
import {Button, Grid, Typography} from "@mui/material";
import {useSession} from "next-auth/react";
import {useContext, useEffect, useState} from "react";
import {deleteData} from "../../../services/fetchData";
import {paginate} from "../../../utils/paginate";
import CoffeeItem from "../../../components/coffee/CoffeeItem";
import PaginationComponent from "../../../components/Pagination";
import {DataContext} from "../../../store/GlobaStore";
import Link from "next/link";
import CardSkelet from "../../../components/skeleton/CardSkelet";
import useFetch from "../../../helper/hooks/useFetch";
import usePaginate from "../../../helper/hooks/usePaginate";

const AdminProducts = () => {
    const {data: session} = useSession();
    const {currentPage, perPage, handlePage} = usePaginate(6)
    const [updated, setUpdated] = useState([]);
    const {dispatch} = useContext(DataContext)
    const {data: products, loading} = useFetch("/products")

    useEffect(() => {
        setUpdated(products.products);
    }, [products]);

    const remove = async (id) => {
        if (session && session.user.root) {
            const allCoffee = [...products.products];
            try {
                dispatch({type: "LOADING", payload: true});
                const response = await deleteData(`products/${id}`)
                if (response) {
                    setUpdated(allCoffee.filter(coffee => coffee._id !== id));
                    dispatch({type: "NOTIFY", payload: {success: "با موفقیت حذف شد"}});
                    dispatch({type: "LOADING", payload: false});
                }
            } catch (err) {
                dispatch({type: "NOTIFY", payload: {error: err.message}});
                dispatch({type: "LOADING", payload: false});
            }
        } else dispatch({type: "NOTIFY", payload: {error: "شما اجازه نداری"}});
    };
    const archive = paginate(updated, currentPage, perPage);
    return (
        <>
            <Link href="/admin/products/create">
                <Button color="info" variant="contained" sx={{mb: 3}}>اضافه کردن محصول +</Button>
            </Link>
            <Grid container spacing={4}>
                {loading ? <CardSkelet count={6}/> : archive.map(coffee => (
                    <CoffeeItem key={coffee._id} coffee={coffee} deleted={() => remove(coffee._id)} loading={loading}/>
                ))}
                {archive.length && !loading < 1 && <Typography color="primary" variant="h5" component="h3" mt={5}>
                    محصولی برای نمایش نداریم
                </Typography>}
            </Grid>
            <PaginationComponent totalProduct={updated && updated.length} currentPage={currentPage} perPage={perPage}
                                 onPageChange={handlePage}/>
        </>
    )
}
export default AdminProducts