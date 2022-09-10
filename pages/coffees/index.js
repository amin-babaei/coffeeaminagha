import {Box, Container, Grid, Typography} from "@mui/material";
import CoffeeItem from "../../components/coffee/CoffeeItem";
import Head from "next/head";
import PaginationComponent from "../../components/Pagination";
import {useContext, useEffect, useState} from "react";
import {paginate} from "../../utils/paginate";
import {DataContext} from "../../store/GlobaStore";
import CardSkelet from "../../components/skeleton/CardSkelet";
import Searchbar from "../../components/coffee/Searchbar";
import {debounce} from "lodash";
import usePaginate from "../../helper/hooks/usePaginate";
import Products from "../../models/ProductModel";
import connectDB from "../../utils/connectDB";

const Coffees = ({products}) => {
    const {currentPage, perPage, handlePage} = usePaginate(6)

    const [coffeeList, setCoffeeList] = useState([]);
    const [search, setSearch] = useState('')
    const [loadingDebounce, setLoadingDebounce] = useState(false)
    const {state, dispatch} = useContext(DataContext)
    const {loading} = state

    useEffect(() => {
        dispatch({type: 'LOADING', payload: true})
        setCoffeeList(products);
        dispatch({type: 'LOADING', payload: false})
    }, [products]);

    const handleChange = (e) => {
        const handleChangeInput = debounce(() => {
            setLoadingDebounce(false)
        }, 2000)
        handleChangeInput(setSearch(e.target.value))
        setLoadingDebounce(true)
    }

    const productFilter = coffeeList.filter(product => product.title.toLowerCase().includes(search.split(' ').join('-')));

    const archive = paginate(productFilter, currentPage, perPage);

    return (
        <Box component="section" minHeight="100vh" padding="50px 0">
            <Head>
                <title>کافی ها</title>
            </Head>
            <Container maxWidth="lg">
                <Searchbar coffees={coffeeList} setCoffee={setCoffeeList} setSearch={setSearch} changed={handleChange}/>
                <Grid container spacing={2}>
                    {loading ? <CardSkelet count={6}/> : (
                        loadingDebounce ?
                            <Typography color="primary" variant="h5" width="100%" mt={20} textAlign="center"> وایستا
                                ببینم 🤔 </Typography> :
                            archive.map(coffee => (
                                <CoffeeItem key={coffee._id} coffee={coffee}/>
                            ))
                    )}
                    {archive.length === 0 && !loadingDebounce &&
                        <Typography color="primary" variant="h5" width="100%" mt={20} textAlign="center">
                            چیزی برای نمایش نداریم !
                        </Typography>}
                </Grid>
                {!loadingDebounce && search.length === 0 ?
                    <PaginationComponent totalProduct={products.length} currentPage={currentPage} perPage={perPage}
                                         onPageChange={handlePage}/>
                    : null
                }
            </Container>
        </Box>
    )
}
export const getServerSideProps = async () => {
    await connectDB()
    const response = await Products.find()
    const products = JSON.parse(JSON.stringify(response));
    return {
        props: {
            products
        }
    }
}
export default Coffees;