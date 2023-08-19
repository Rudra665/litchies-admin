import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductImages() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/Product/GetProduct/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      });
  };

  return (
    <>
      {product && (
        <Box mx="1vh" align="center">
          {product?.imageURLs?.map((image) => (

            <img width="20%"
              src={`http://43.205.116.96:3000/images/${image}`}
              alt="FooterImage"
            />


          ))}
        </Box>
      )}
    </>
  );
}
