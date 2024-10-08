import {createTheme} from "@mui/material";

export const theme= createTheme({
    direction: 'rtl',
    palette:{
        black:'#000000',
        secondary:{
            main: '#f4bf79'  
        },
        primary:{
            light:'#e3e3e3',
            main: '#fff',
        },
    },
   typography:{
    h1:{
        '@media (min-width:600px)': {
            fontSize: '3.7rem',
        },
        '@media (max-width:600px)': {
            fontSize: '2rem',
        },
    },
    h2:{
        '@media (min-width:600px)': {
            fontSize: '2.1rem',
        },
        '@media (max-width:600px)': {
            fontSize: '2rem',
        },
    },
    subtitle1:{
        fontSize: '22px',
        '@media (max-width:600px)': {
            fontSize: '18px',
        },
    },
    body2:{
        fontSize: '14px',
    },
   },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": {
                        color: "black",
                        backgroundColor: "white",
                        opacity: 0.6
                    },
                    "&.Mui-loading": {
                        display: "flex",
                        justifyContent: "space-between",
                    },

                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color:"white"
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    "& label": {
                        color: "white",
                    },
                    '& label.Mui-focused': {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                            color: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                    },
                }
            }
        },
        MuiStep:{
            styleOverrides:{
                root:{
                    '& .MuiStepLabel-root .Mui-completed': {
                        color: 'green', // circle color (COMPLETED)
                    },
                    '& .MuiStepLabel-root .Mui-disabled': {
                        color: 'primary.main', // circle color (ACTIVE)
                    },
                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'white', // circle's number (ACTIVE)
                    },
                    "& .Mui-disabled .MuiStepIcon-root": {color: "white"},
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#f4bf79',
                    }
                }
            },
        },
        MuiTableRow:{
            styleOverrides:{
                root:{
                    '&:nth-of-type(odd)': {
                        backgroundColor: 'rgb(170, 133, 84)',
                        color: "primary.main",
                    }, '&:nth-of-type(even)': {
                        backgroundColor: "black",
                        color: "white",
                    },
                    '&:last-child td, &:last-child th': {
                        border: 0,
                    },
                }
            }
        },
        MuiPaper:{
            styleOverrides:{
                root:{
                    '& .MuiMenu-list':{
                        paddingTop:0,
                        paddingBottom:0,
                        backgroundColor:'#f4bf795c'
                    }
                }
            }
        }
    }
})