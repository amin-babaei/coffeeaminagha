import {useEffect, useState,useContext} from "react";
import {DataContext} from "../../store/GlobaStore";
import {getData} from "../../services/fetchData";

export default function useFetch(url){
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(DataContext)
    const {loading} = state
    useEffect(() => {
        (
            async () => {
                dispatch({type:'LOADING', payload:true})
                try{
                    const response = await getData(url)
                    setData(response)
                    dispatch({type:'LOADING', payload:false})
                }catch(err){
                    console.log(err)
                    dispatch({type:'NOTIFY', payload: {error:err.message}})
                    dispatch({type:'LOADING', payload:false})
                }
            }
        )()
    }, [url])

    return { data, loading }
}