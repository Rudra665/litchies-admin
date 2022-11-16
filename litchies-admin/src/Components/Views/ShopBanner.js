import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
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
    shopId: shopId,
    shopBanner: "",
  });
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img.raw);
    await axios
      .post("http://43.205.116.96:3000/uploadImage", formData)
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setState({
          shopId: state.shopId,
          shopBanner: img.replaceAll('"', "")
        });
      });
    const proData = {
      shopId: state.shopId,
      shopBanner: state.shopBanner,
    };
    await axios
      .post("http://43.205.116.96:3000/banner/create", proData)
      .then((response) => {
        console.log(response.data);
      });
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleUpload}>
        <Container>
          <Box
            sx={{
              height: "70vh",
              width: 1,
              "& .MuiTextField-root": { m: 1, width: "65ch" },
            }}
          >
            <div className="Pdetails">
              <div className="CSimage" style={{ marginTop: "100px" }}>
                <input type="file" onChange={onImageChange} />
                <Button
                  variant="contained"
                  className="buttonCss"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
              <Box style={{ marginTop: "50px" }}>
                <img
                  style={{ width: "250px", marginLeft: "30px" }}
                  src={img.preview}
                  alt="..."
                  className="Pimage"
                />
              </Box>
            </div>
          </Box>
        </Container>
      </form>
    </>
  );
}
