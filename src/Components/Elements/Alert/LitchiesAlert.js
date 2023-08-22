import { Alert } from "@mui/material";
import { display } from "@mui/system";
import { useEffect, useState } from "react";

const LitchiesAlert=(props)=> {
  const [open, setOpen]= useState(false)
useEffect(()=>{setTimeout(setOpen(false), 4000)},[])
return(

<Alert severity={props.severity==='error'?'error':props.severity==='success'?'success': 'warning'} sx={open? {display:'block'}:{display:'none'}}>
  {props.message}
</Alert> 

)};
export default LitchiesAlert
