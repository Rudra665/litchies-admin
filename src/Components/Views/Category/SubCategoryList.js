import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import ChildCategoryList from "./ChildCategory.js";
import DeleteSubCategory from "../Delete/DeleteSubCategory"
const SubCategoryList = (props) => {
    const [category, setCategory] = useState([]);
    const fetchSubCategories = async () => {
        fetch(
            `http://43.205.116.96:3000/productSubCategory/getSubCategoriesByProductCategory/${props.id}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategory(data);
            });

    };
    useEffect(() => {
        fetchSubCategories();
    }, []);

    return (
        <>
            {category.length > 0 && (
                <Box
                >
                    <TableContainer component={Paper}>
                        <Table >
                            <TableBody>
                                {category.map((cat) => (
                                    <TableRow
                                        key={cat.name}
                                    >
                                        <TableCell component="th" scope="row">
                                            <TreeView
                                                aria-label="file system navigator"
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                sx={{ flexGrow: 1, }}
                                            >
                                                <TreeItem nodeId="1" label={cat.name}>
                                                    <TreeItem
                                                        nodeId="2"
                                                        label={
                                                            <ChildCategoryList id={cat._id}></ChildCategoryList>
                                                        }
                                                    />
                                                </TreeItem>
                                            </TreeView>
                                        </TableCell>
                                        <TableCell><DeleteSubCategory variant="text" id={cat._id} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
}
export default SubCategoryList;
