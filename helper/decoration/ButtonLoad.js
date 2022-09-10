import LoadingButton from "@mui/lab/LoadingButton";

const ButtonLoad = ({loading,message}) => {
    return(
        <LoadingButton
            loadingIndicator={message}
            loading={loading}
            variant="contained"
            fullWidth
            style={{color:"black",margin:"15px 0"}}
        >
            {message}
        </LoadingButton>
    )
}
export default ButtonLoad;