import {range} from 'lodash';
import Stack from '@mui/material/Stack';
import {Button} from "@mui/material";

export default function PaginationComponent({totalProduct,currentPage,perPage,onPageChange}) {
    const pageCount = Math.ceil(totalProduct / perPage);
    if (pageCount === 1)return null;

    const pages = range(1,pageCount + 1);

    return (
        <Stack direction={"row"} color="primary.main" mt={5}>
            {pages.map(page =>(
                <Button key={page} color="secondary" variant={"outlined"}
                        sx={{
                            ...(page === currentPage && {borderColor: '#f4bf79'})
                        }}
                        onClick={()=> onPageChange(page)}
                >
                    {page}
                </Button>
            ))}
        </Stack>
    );
}
