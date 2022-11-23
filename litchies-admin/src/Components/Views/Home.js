import * as React from 'react'
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

import ShopCard from './ShopCard';


export default function Home() {
  const [verify, setVerify] = React.useState([]);

  const fetchData = () => {
    fetch("http://43.205.116.96:3000/Shop/GetAllVerifiedShops")
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        setVerify(data);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  console.log(verify);
  return (
    <>
      <Box
        sx={{
          width: "90vw",
          display: "flex",
          justifyContent: "center",
          margin: "50px",
          "& .MuiTableCell-root": { width: "1ch" },
          flexWrap: "wrap"
        }}
      > {verify.map((verified) => (<ShopCard Shop_Name={verified.name} Karta_Name={verified.kartaName} Mobile={verified.mobile} imgUrl={verified.shopImg} id={verified._id} />))

        }
        {/* <TableContainer component={Paper}>
          <Table size="large">
            <TableBody>
              {verify.map((verified) => (
                < TableRow >
                  <TableCell>
                    {verified.name}
                  </TableCell >
                  <TableCell align="right">
                    {verified.kartaName}
                  </TableCell>
                  <TableCell align="right">
                    {verified.mobile}
                  </TableCell>
                  <TableCell align="right">
                    <MoreVertItems id={verified._id}></MoreVertItems>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>

    </>
  )


};
