import * as React from "react"
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const MoreVertItems = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        <MenuItem onClick={handleClose}>
          {/* <Button className="MorevertButton" href={`admin/addHighlight/${props.id}`}> */}
          {<NavLink to={`verifiedShopsList/addHighlight/${props.id}`} sx={{ textDecoration: "none" }}> <Button fullWidth>Add Highlight</Button></NavLink>}
          {/* </Button> */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {<NavLink to={`verifiedShopsList/addproduct/${props.id}`} sx={{ textDecoration: "none" }} ><Button fullWidth>Add Product</Button></NavLink>}
          {/* <Button className="MorevertButton" href={`addproduct/${props.id}`}>
            Add Product
          </Button> */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {<NavLink to={`verifiedShopsList/addShopBanner/${props.id}`} sx={{ textDecoration: "none" }}><Button fullWidth>Add Shop Banner</Button></NavLink>}
          {/* <Button className="MorevertButton" href={`addShopBanner/${props.id}`}>
            Add Shop Banner
          </Button> */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {<NavLink to={`verifiedShopsList/showProducts/${props.id}`} sx={{ textDecoration: "none" }} ><Button fullWidth>Show All Products</Button></NavLink>}
          {/* <Button className="MorevertButton" href={`showProducts/${props.id}`}>
            Show All Products
          </Button> */}
        </MenuItem>

      </Menu>
    </div >
  );
};
export default MoreVertItems;
