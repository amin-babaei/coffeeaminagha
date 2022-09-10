import Head from 'next/head'
import {Fragment} from 'react';
import Header from '../components/Header'
import Coffee from '../components/coffee/Coffee'

import connectDB from "../utils/connectDB";
import Products from "../models/ProductModel";

const Home = ({products}) => {

  return (
    <Fragment>
      <Head>
        <title>کافی شاپ امین آقا</title>
      </Head>
        <Header/>
        <Coffee coffees={products}/>
    </Fragment>
  )
}
export const getServerSideProps = async () => {
    await connectDB()
    let coffees = await Products.find().sort({ createdAt: -1 }).limit(3)
    const coffeeConvert = JSON.parse(JSON.stringify(coffees));

    return {
        props:{
            products:coffeeConvert
        }
    }
}
export default Home;