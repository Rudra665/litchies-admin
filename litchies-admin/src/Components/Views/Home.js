import * as React from 'react'
import { Box, Typography } from "@mui/material";
import ShopCard from './Cards/ShopCard';
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
      </Box>

    </>
  )


};
