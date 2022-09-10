import {useState} from "react";

export default function usePaginate (count=0){
    const [perPage] = useState(count);
    const [currentPage,setCurrentPage] = useState(1);

    const handlePage = (page) =>{
        setCurrentPage(page)
    }

    return { perPage, currentPage, handlePage }
}