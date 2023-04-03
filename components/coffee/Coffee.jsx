"use client"
import {styled,Box,Typography,Container,Grid,Button } from "@mui/material"
import Link from 'next/link'
import CoffeeItem from "./CoffeeItem";
import CardSkelet from "../skeleton/CardSkelet";

  const WrapHeading = styled(Box)({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
 })
const Coffee = ({coffees}) => {
  return (
    <Box marginTop="70px" mb={5} component="section">
      <WrapHeading>
        <Typography align="center" color="secondary" variant="h4" component="h3">
            منوی کافی شاپ
        </Typography>
        <Link href="/coffees">
          <Button align="center" size="large" variant="outlined" color="primary" sx={{margin:"2rem 0"}}>
              مشاهده همه
          </Button>
        </Link>
      </WrapHeading>
        <Container maxWidth="lg">
        <Grid container spacing={2}>
            {!coffees && <CardSkelet count={3}/>}
        {coffees.map(coffee => (
            <CoffeeItem key={coffee._id} coffee={coffee}/>
        ))}
      </Grid>
        </Container>
    </Box>
  )
}

export default Coffee