
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import SubCategoryList from "./SubCategoryList";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import CategoryOptions from "./CategoryOption/CategoryOptions";
import DeleteCategory from "../Delete/DeleteCategory"
import { Container } from "@mui/system";

function Categories() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchCategories();

    }, []);

    const fetchCategories = () => {
        fetch("http://43.205.116.96:3000/productCategory/getAll")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategory(data);
            });
    };

    return (
        <Box>
            {category.length > 0 && (
                <Box
                    sx={{
                        
                        "& .MuiTableCell-root": { width: "100%" },
                        
                    }}
                >
                    <h1 className="head" style={{color:"#1e2328"}}>Categories</h1>
                    <CategoryOptions />
                    <TableContainer component={Paper}>
                        <Container>
                            <Table size="large">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>
                                            Category Name
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {category.map((cat) => (

                                        <TableRow>
                                            <TableCell >
                                                <TreeView
                                                    aria-label="file system navigator"
                                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                                    defaultExpandIcon={<ChevronRightIcon />}
                                                    sx={{ flexGrow: 1 }}
                                                >
                                                    <TreeItem nodeId="1" label={cat.name}>
                                                        <TreeItem
                                                            nodeId="2"
                                                            label={
                                                                <SubCategoryList id={cat._id}></SubCategoryList>
                                                            }
                                                        />
                                                    </TreeItem>
                                                </TreeView>

                                            </TableCell>
                                            <TableCell>
                                                <DeleteCategory variant="text" id={cat._id} />
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>

                            </Table>
                        </Container>
                    </TableContainer>
                </Box>
            )
            }
        </Box >
    );
}
export default Categories;
