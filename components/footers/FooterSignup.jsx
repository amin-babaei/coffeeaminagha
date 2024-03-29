import {styled, Typography} from "@mui/material";
import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {useState} from "react";

const FooterCustom = styled('footer')({
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    bottom: "0",
    right: "0",
    borderTop: "1px solid rgba(255,255,255,0.3)",
    textAlign: "center"
})
const FooterSignup = () => {
    const [date] = useState(new DateObject({calendar: persian, locale: persian_fa}));
    return (
        <FooterCustom>
            <Typography variant="h6" component="h2" color="primary" sx={{paddingBottom: "15px"}}>توسعه
                داده شده با nextjs & mui</Typography>
            <Typography component="a" color="secondary" href="https://github.com/amin-babaei">تمامی حقوق محفوظ است
                | {date.year} ©</Typography>
        </FooterCustom>
    );
}
export default FooterSignup;