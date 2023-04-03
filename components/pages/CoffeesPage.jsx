'use client'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import PaginationComponent from '../Pagination'
import CardSkelet from '../skeleton/CardSkelet'
import CoffeeItem from '../coffee/CoffeeItem'
import usePaginate from "../../helper/hooks/usePaginate";
import Searchbar from '../coffee/Searchbar'
import { DataContext } from '../../store/GlobaStore'
import { paginate } from "../../utils/paginate";
import { debounce } from 'lodash'

function CoffeesPage({ products }) {
    const { currentPage, perPage, handlePage } = usePaginate(6)
    const [coffeeList, setCoffeeList] = useState([]);
    const [search, setSearch] = useState('')
    const [loadingDebounce, setLoadingDebounce] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    const { loading } = state

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: true })
        if (products) {
            setCoffeeList(products);
        }
        dispatch({ type: 'LOADING', payload: false })
    }, [dispatch, products]);

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
            <Container maxWidth="lg">
                <Searchbar coffees={coffeeList} setCoffee={setCoffeeList} setSearch={setSearch} changed={handleChange} />
                <Grid container spacing={2}>
                    {loading ? <CardSkelet count={6} /> : (
                        loadingDebounce ?
                            <Typography color="primary" variant="h5" width="100%" mt={20} textAlign="center"> وایستا
                                ببینم 🤔 </Typography> :
                            archive.map(coffee => (
                                <CoffeeItem key={coffee._id} coffee={coffee} />
                            ))
                    )}
                    {archive.length === 0 && !loadingDebounce &&
                        <Typography color="primary" variant="h5" width="100%" mt={20} textAlign="center">
                            چیزی برای نمایش نداریم !
                        </Typography>}
                </Grid>
                {!loadingDebounce && search.length === 0 ?
                    <PaginationComponent totalProduct={products.length} currentPage={currentPage} perPage={perPage}
                        onPageChange={handlePage} />
                    : null
                }
            </Container>
        </Box>
    )
}

export default CoffeesPage