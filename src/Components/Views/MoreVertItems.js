import * as React from "react"
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

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
        <Link to={`verifiedShopsList/addHighlight/${props.id}`} style={{ textDecoration: "none", color: "white" }}>
          <MenuItem onClick={handleClose}>
            Add Highlight
          </MenuItem></Link>
        <Link to={`verifiedShopsList/addproduct/${props.id}`} style={{ textDecoration: "none", color: "white" }} >
          <MenuItem onClick={handleClose}>
            Add Product
          </MenuItem></Link>
        <Link to={`verifiedShopsList/addShopBanner/${props.id}`} style={{ textDecoration: "none", color: "white" }}>
          <MenuItem onClick={handleClose}>
            Add Shop Banner
          </MenuItem></Link>
        <Link to={`verifiedShopsList/showProducts/${props.id}`} style={{ textDecoration: "none", color: "white" }} >
          <MenuItem onClick={handleClose}>
            Show All Products
          </MenuItem></Link>
      </Menu>
    </div >
  );
};
export default MoreVertItems;
