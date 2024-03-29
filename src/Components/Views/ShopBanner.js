import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function ShopBanner() {
  const { shopId } = useParams();
  const [img, setImg] = useState({ preview: "", raw: "" });

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const [state, setState] = useState({
    shopId: [shopId],
    shopBanner: "",
  });

  const handleUpload = async (e) => {
    // console.log(state.shopId);
    e.preventDefault();
    const formData = new FormData();
    formData.append("shopBanner", img.preview);
    await axios
      .post("http://43.205.116.96:3000/uploadImage", formData)
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setState({

          shopBanner: img.replaceAll('"', "")
        });
      });
    const proData = {
      shopId: state.shopId[0],
      shopBanner: state.shopBanner,
    };
    await axios
      .post("http://43.205.116.96:3000/banner/create", proData)
      .then((response) => {
        if(response.status===200)
        {
          alert("Banner Uploaded");
          console.log(response.data);
        }
        
      });
    console.log(state.shopBanner);
  };

  return (
    <>
      <form onSubmit={handleUpload}>
        <Container>
        <Typography my='2' align="center" variant="h3" fontWeight="700">Add Shop Banner</Typography>

          <Box align="center" sx={{ marginY: 40 }}>
            <Box style={{ marginTop: "50px" }}>
              <img
                style={{ width: "250px", marginLeft: "30px" }}
                src={img.preview}
              />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <input width="100%" type="file" onChange={onImageChange} />
              <Button
                variant="contained"
                disabled={img.raw?false:true}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </>
  );
}
