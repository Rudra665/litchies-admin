import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import MoreVertItems from "./MoreVertItems";
const Home = () => {
    const [verify, setVerify] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:3000/Shop/GetAllVerifiedShops")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setVerify(data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {verify.length > 0 && (
                <Box
                    sx={{
                        margin: "50px",
                        "& .MuiTableCell-root": { width: "1ch" },
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table size="large">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Shop Name
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">
                                        Karta Name
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">
                                        Mobile Number
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">
                                        Show More
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {verify.map((verifieduser) => (
                                    <TableRow
                                        key={verifieduser.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {verifieduser.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {verifieduser.kartaName}
                                        </TableCell>
                                        <TableCell align="right">{verifieduser.mobile}</TableCell>
                                        <TableCell align="right">
                                            <MoreVertItems id={verifieduser._id}></MoreVertItems>
                                        </TableCell>
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

export default Home

