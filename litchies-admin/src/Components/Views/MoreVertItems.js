import * as React from "react"
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";

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
          {<NavLink to={`addHighlight/${props.id}`} className="MorevertButton">Add Highlight</NavLink>}
          {/* </Button> */}
        </MenuItem>
        <MenuItem>
          {<NavLink to={`addproduct/${props.id}`} className="MorevertButton">Add Product</NavLink>}
          {/* <Button className="MorevertButton" href={`addproduct/${props.id}`}>
            Add Product
          </Button> */}
        </MenuItem>
        <MenuItem>
          {<NavLink to={`addShopBanner/${props.id}`} className="MorevertButton">Add Shop Banner</NavLink>}
          {/* <Button className="MorevertButton" href={`addShopBanner/${props.id}`}>
            Add Shop Banner
          </Button> */}
        </MenuItem>
        <MenuItem>
          {<NavLink to={`showProducts/${props.id}`} className="MorevertButton">Show All Products</NavLink>}
          {/* <Button className="MorevertButton" href={`showProducts/${props.id}`}>
            Show All Products
          </Button> */}
        </MenuItem>
        <MenuItem>
          {<NavLink to={props.id} className="MorevertButton">View Shop</NavLink>}
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MoreVertItems;
