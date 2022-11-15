import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const ChildCategoryList = (props) => {
    const [category, setCategory] = useState([]);
    const fetchChildCategories = () => {
        fetch(
            `http://43.205.116.96:3000/productChildCategory/getChildCategoriesBySubCategory/${props.id}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategory(data);
            });
    };
    useEffect(() => {
        fetchChildCategories();
    }, []);

    return (
        <>
            {category.length > 0 && (
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            {category.map((cat) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {cat.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};
export default ChildCategoryList;
