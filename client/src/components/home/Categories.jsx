import {Button, Table, TableCell, TableRow, TableHead, TableBody, styled} from '@mui/material';
import {Link} from 'react-router-dom'
import {categories} from '../../constants/data';
const StyledTable=styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton=styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
`
const Categories=()=>{
    return(
        <>
            <Link to='/create' style={{textDecoration: 'none'}}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>(
                            <TableRow key={category.id}>
                         <TableCell>
                            {category.type}
                        </TableCell>
                    </TableRow>
                        ))
                    }
                    
                </TableBody>
            </StyledTable>
        </>
    )
}
export default Categories;