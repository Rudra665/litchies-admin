import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddHighlight() {
  const { shopId } = useParams();
  const [products, setProduct] = useState([]);
  const [img, setImg] = useState({ preview: "", raw: "" });

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/product/getAllProductsByShopId/${shopId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    title: "",
    desc: "",
    proId: "",
    discount: "",
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
          title: state.title,
          desc: state.desc,
          proId: state.proId,
          discount: state.discount,
          shopId: state.shopId,
          shopBanner: img.replaceAll('"', "")
        });
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const proData = {
      title: state.title,
      desc: state.desc,
      proId: state.proId,
      discount: state.discount,
      shopId: state.shopId,
      shopBanner: state.shopBanner,
    };

    axios
      .post("http://43.205.116.96:3000/productOffer/create", proData)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container>
          <Box
            sx={{
              height: "120vh",
              width: 1,
              "& .MuiTextField-root": { m: 1, width: "65ch" },
            }}
          >
            <div className="Pdetails">
              <TextField
                name="title"
                label="Highlight Title"
                value={state.title}
                onChange={handleChange}
              />

              <TextField
                name="desc"
                label="Description"
                value={state.desc}
                onChange={handleChange}
              />

              <TextField
                select
                name="proId"
                value={state.proId}
                lable="Product"
                onChange={handleChange}
                className="optionCat"
              >
                {products.map((product) => (
                  <MenuItem value={product._id}>{product.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="discount"
                label="Discount"
                value={state.discount}
                onChange={handleChange}
              />

              <TextField label="Upload Banner Image" value={state.shopBanner}>
                {" "}
              </TextField>
              <div className="CSimage">
                <div >
                  <input type="file" onChange={onImageChange} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              <Box sx={{ "& .MuiButton-root": { m: 1 } }} display="flex">
                <Button
                  variant="contained"
                  className="buttonCss"
                  style={{ width: "250px", marginTop: "30px" }}
                  startIcon={<AddIcon />}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
                <Box>
                  <img
                    style={{ width: "150px", marginLeft: "30px" }}
                    src={img.preview}
                    alt="..."
                    className="Pimage"
                  /></Box>
              </Box>
            </div>
          </Box>
        </Container>
      </form>
    </>
  );
}
