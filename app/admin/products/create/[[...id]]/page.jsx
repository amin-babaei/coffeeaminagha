'use client'
import { getData, postData, putData } from "../../../../../services/fetchData";
import { DataContext } from "../../../../../store/GlobaStore";
import { useContext, useEffect, useState } from "react";
import { imageUpload } from "../../../../../services/imageUploads";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import ButtonLoad from "../../../../../helper/decoration/ButtonLoad";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const CreateEditProduct = () => {
    const initialState = { title: '', price: 0, inStock: 0, description: '' }
    const [product, setProduct] = useState(initialState)
    const { title, price, inStock, description } = product
    const [images, setImages] = useState([])
    const [edit, setEdit] = useState(false)
    const { data: session } = useSession()
    const { state, dispatch } = useContext(DataContext)
    const { loading } = state
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            setEdit(true)
            getData(`products/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        } else {
            setEdit(false)
            setProduct(initialState)
            setImages([])
        }
    }, [id])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    const handleUploadInput = e => {
        let newImages = []
        const files = [...e.target.files]

        if (files.length === 0)
            return dispatch({ type: 'NOTIFY', payload: { error: 'عکسی انتخاب نکردی' } })

        files.forEach(file => {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
                return dispatch({ type: 'NOTIFY', payload: { error: "این عکس نیست" } })

            newImages.push(file)
            return newImages;
        })

        setImages([...images, ...newImages])
    }
    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (session && session.user.root) {
            if (!title || !price || !inStock || !description || images.length === 0)
                return dispatch({ type: 'NOTIFY', payload: { error: 'همه فیلد ها را پر کن' } })

            dispatch({ type: 'LOADING', payload: true })
            let media = []
            const imgNewURL = images.filter(img => !img.url)
            const imgOldURL = images.filter(img => img.url)

            if (imgNewURL.length > 0) media = await imageUpload(imgNewURL)
            let res
            if (edit) {
                res = await putData(`products/${id}`, { ...product, images: [...imgOldURL, ...media] })
                if (res.err) {
                    dispatch({ type: 'LOADING', payload: false })
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                }
            } else {
                res = await postData('products', { ...product, images: [...imgOldURL, ...media] })
                if (res.err) {
                    dispatch({ type: 'LOADING', payload: false })
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                }
            }
            dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            dispatch({ type: 'LOADING', payload: false })
        } else dispatch({ type: "NOTIFY", payload: { error: "شما اجازه نداری" } });
    }
    return (
        <Grid container columnSpacing={4} alignItems="flex-start">
            <Grid item xs={12} sm={7}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="نام محصول"
                        margin="normal"
                        autoComplete='off'
                        placeholder="نام محصول را وارد کنید"
                        type="text"
                        name="title"
                        value={title.split(' ').join("-")}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: { color: "white" },
                        }}
                        onChange={handleChangeInput}
                    />
                    <Box display="flex">
                        <TextField
                            label="قیمت"
                            margin="normal"
                            autoComplete='off'
                            fullWidth
                            placeholder="قیمت محصول"
                            type="number"
                            name="price"
                            value={price}
                            variant="outlined"
                            InputProps={{
                                style: { color: "white" },
                            }}
                            onChange={handleChangeInput}
                        />
                        <TextField
                            label="تعداد"
                            margin="normal"
                            autoComplete='off'
                            placeholder="تعداد محصول"
                            type="number"
                            name="inStock"
                            value={inStock}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                style: { color: "white" },
                            }}
                            onChange={handleChangeInput}
                        />
                    </Box>
                    <TextField
                        label="توضیحات"
                        multiline
                        fullWidth
                        autoComplete='off'
                        margin="normal"
                        type="text"
                        name="description"
                        value={description}
                        minRows={4}
                        placeholder="توضیحات محصول را بنویسید"
                        variant="outlined"
                        InputProps={{
                            style: { color: "white" },
                        }}
                        onChange={handleChangeInput}
                    />

                    {loading ? <ButtonLoad loading={loading} message="منتظر بمانید..." /> :
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>{edit ? 'بروزرسانی' : 'اضافه کن'}</Button>
                    }
                </form>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Button variant="contained" component="label" color="secondary" sx={{ display: "block", width: "max-content", mt: 2 }}>
                    آپلود عکس
                    <input
                        type="file"
                        hidden
                        onChange={handleUploadInput}
                    />
                </Button>
                <div className="grid grid-cols-2 w-full my-2">
                    {
                        images.map((img, index) => (
                            <Box key={index} position="relative" width="100%" height="120px" my={1}>
                                <Image src={img.url ? img.url : URL.createObjectURL(img)}
                                    alt={img.url}
                                    width={0}
                                    height={0}
                                    sizes="100vw" style={{ width: '100%', height: '150px' }} />
                                <Typography color="error" position="absolute" top="0" sx={{ cursor: "pointer" }} onClick={() => deleteImage(index)}>
                                    X
                                </Typography>
                            </Box>
                        ))
                    }
                </div>
            </Grid>
        </Grid>
    );

}

export default CreateEditProduct;