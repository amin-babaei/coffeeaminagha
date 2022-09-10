import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Typography} from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snack({handleShow,msg,type}) {

    return (
        <>
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    onClose={handleShow}
                >
                    <Alert onClose={handleShow}
                           severity={type}
                           sx={{ width: '100%'}}
                            style={{alignItems:"center"}}>
                        <Typography color="primary" padding="0 20px">
                            {msg.msg}
                        </Typography>
                    </Alert>
                </Snackbar>
        </>

    );
}
