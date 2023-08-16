import * as React from 'react'
import { Box } from "@mui/material";
import ShopCard from '../Cards/ShopCard';
import { bgcolor } from '@mui/system';
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
          width: "100%",
          height:"auto",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "30px",
          "& .MuiTableCell-root": { width: "2ch" },
          flexWrap: "wrap",
          bgcolor:"#4b5b84"
        }}
      > {verify.map((verified) => (<ShopCard Shop_Name={verified.name} Karta_Name={verified.kartaName} Mobile={verified.mobile} imgUrl={verified.shopImg} id={verified._id} />))
        }
      </Box>

    </>
  )


};
