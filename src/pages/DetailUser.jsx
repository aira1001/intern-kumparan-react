import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    maxWidth: "500px",
    marginLeft: "100px",
  }));

export default function DetailUser() {
  const [dataUser, setDataUser] = useState();
  let user;
  const { idUser } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1`)
      .then((res) => {
        // setDataUser(res.data);
        return res.data;
      });
  }, []);


  fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`)
  .then(response => response.json())
  .then(json => {
      setDataUser([...new Array(json)])
      })
  console.log(dataUser)
  return (
    <Box>
      <Stack sx={{ marginLeft:"20px"}}>
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          variant="square"
          alt={dataUser.name}
          sx={{ margin: "40px", width: "200px", height: "200px" }}
        />
        <Box sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}>
          <Typography sx={{ float: "left", marginTop: "5px" }}>
            Username :
          </Typography>
          <Item>{dataUser.name}</Item>
        </Box>
        <Box sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}>
          <Typography sx={{ float: "left", marginTop: "5px" }}>
            Email :
          </Typography>
          <Item>{dataUser.email}</Item>
        </Box>
        <Box sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}>
          <Stack>
            <Typography sx={{ float: "left", marginTop: "5px" }}>
              Address :
            </Typography>
            <Stack sx={{ marginLeft: "30px", marginBottom: "17px" }} direction="row">
                <Box sx={{marginRight:"20px"}}>
                    <Typography sx={{ float: "left", marginTop: "5px" }}>Street : </Typography>
                    <Item sx={{ width: "100px", marginLeft:"70px" }}>{dataUser.address.street}</Item>
                </Box>
                <Box sx={{marginRight:"20px"}}>
                    <Typography sx={{ float: "left", marginTop: "5px" }}>Suite : </Typography>
                    <Item sx={{ width: "100px", marginLeft:"60px" }}>{dataUser.address.suite}</Item>
                </Box>
                <Box sx={{marginRight:"20px"}}>
                    <Typography sx={{ float: "left", marginTop: "5px" }}>City : </Typography>
                    <Item sx={{ width: "100px", marginLeft:"50px" }}>{dataUser.address.city}</Item>
                </Box>
            </Stack>
            <Stack sx={{ marginLeft: "30px", marginBottom: "17px" }} direction="row">
                <Box sx={{marginRight:"20px"}}>
                    <Typography sx={{ float: "left", marginTop: "5px" }}>Zipcode : </Typography>
                    <Item sx={{ width: "100px", marginLeft:"70px" }}>{dataUser.address.zipcode}</Item>
                </Box>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}>
            <Stack>
                <Typography sx={{ float: "left", marginTop: "5px" }}>
                    Company :
                </Typography>
                <Stack sx={{ marginLeft: "40px", marginBottom: "17px" }} direction="row">
                    <Box sx={{marginRight:"20px"}}>
                        <Typography sx={{ float: "left", marginTop: "5px" }}>name : </Typography>
                        <Item sx={{ width: "170px", marginLeft:"60px" }}>{dataUser.company.name}</Item>
                    </Box>
                    <Box sx={{marginRight:"20px"}}>
                        <Typography sx={{ float: "left", marginTop: "5px" }}>catchPhrase : </Typography>
                        <Item sx={{ width: "190px", marginLeft:"110px" }}>{dataUser.company.catchPhrase}</Item>
                    </Box>
                </Stack>
                <Stack sx={{ marginLeft: "40px", marginBottom: "17px" }} direction="row">
                    <Box sx={{marginRight:"20px"}}>
                        <Typography sx={{ float: "left", marginTop: "5px" }}>bs : </Typography>
                        <Item sx={{ width: "170px", marginLeft:"40px" }}>{dataUser.company.bs}</Item>
                    </Box>
                </Stack>
            </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
