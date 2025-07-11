import {Button, Table, TableCell, TableRow, TableHead, TableBody, styled} from '@mui/material';
import {Link,useSearchParams} from 'react-router-dom'
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
const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`
const Categories=()=>{
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');//to store the cotegory in which you are blogging
    return(
        <>
            <StyledLink to={`/create?category=${category || ''}`}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to='/'>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>(
                            <TableRow key={category.id}>
                         <TableCell>
                            <StyledLink to={`/?category=${encodeURIComponent(category.type)}`}>
                            {category.type}
                            </StyledLink>
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