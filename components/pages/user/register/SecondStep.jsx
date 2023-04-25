import { Box, Button, InputAdornment, MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import ButtonLoad from "../../../../helper/decoration/ButtonLoad"
import PhoneIcon from '@mui/icons-material/Phone';

const SecondStep = (props) => {
    const { control, isValid, errors, register, loading } = props
    return (
        <Box>
            <Controller
                defaultValue={''}
                name='phone'
                control={props.control}
                render={({ field }) => {
                    return (
                        <TextField
                            label="شماره تماس"
                            {...field}
                            {...register("phone", {
                                required: "این فیلد اجباری است | مثال: 09121234567",
                                pattern: {
                                    value: /09([0-9])-?[0-9]{4}-?[0-9]{4}/,
                                    message: "شماره شما صحیح نیست",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "شماره شما صحیح نیست",
                                }
                            })}
                            error={Boolean(errors.phone)}
                            helperText={errors?.phone ? errors.phone.message : null}
                            margin="normal"
                            autoComplete='off'
                            placeholder="شماره خود را وارد کنید"
                            type="tel"
                            name="phone"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                style: { color: "white" },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PhoneIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )
                }}
            >
            </Controller>
            <Controller
                defaultValue={''}
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                    return (
                        <TextField
                            label="شهر"
                            {...field}
                            error={Boolean(errors.city)}
                            helperText={errors.city && "این فیلد اجباری است"}
                            margin="normal"
                            select
                            color="primary"
                            name="city"
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiSelect-icon': {
                                    color: "white"
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                            }}
                            inputProps={{
                                style: { color: "white" }
                            }}
                        >
                            <MenuItem value="مشهد">مشهد</MenuItem>
                            <MenuItem value="تهران">تهران</MenuItem>
                            <MenuItem value="شیراز">شیراز</MenuItem>
                        </TextField>
                    )
                }}
            >
            </Controller>
            <Controller
                defaultValue={''}
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                    return (
                        <TextField
                            label="آدرس"
                            multiline
                            {...field}
                            error={Boolean(errors.address)}
                            helperText={errors.address && "این فیلد اجباری است"}
                            fullWidth
                            autoComplete='off'
                            margin="normal"
                            type="text"
                            name="address"
                            minRows={4}
                            placeholder="آدرس خود را بنویسید"
                            variant="outlined"
                            InputProps={{
                                style: { color: "white" },
                            }}
                        />
                    )
                }}
            >
            </Controller>
            {loading ? (
                <ButtonLoad loading={loading} message="منتظر بمانید..." />
            ) : (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 4, p: 1, fontWeight: "bold" }}
                    disabled={!isValid}
                >
                    ثبت نام
                </Button>
            )}
        </Box>
    )
}

export default SecondStep