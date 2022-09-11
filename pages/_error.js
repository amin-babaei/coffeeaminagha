import {Box, Typography} from "@mui/material";

function Error({ statusCode }) {
    return (
        <Box marginTop="40px" minHeight="90vh" component="section" display="flex" alignItems="center">
            <Typography textAlign="center" variant="h4" color="primary">
                {statusCode && `به نظر مشکلی از سمت سرور وجود داره ! ${statusCode}`}
            </Typography>
        </Box>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error