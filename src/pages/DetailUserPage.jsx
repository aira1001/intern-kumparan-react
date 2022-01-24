import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from '@mui/material/Grid';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';

const ItemText = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
  maxWidth: "500px",
  marginLeft: "100px",
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function DetailUserPage(props) {
  const [data, setData] = useState([]);
  const [dataAlbums, setDataAlbums] = useState([]);
  const [albumsId, setAlbumsId] = useState([]);
  const [dataPhoto, setDataPhoto] = useState([]);
  const { idUser } = useParams();
  const [spacing, setSpacing] = React.useState(2);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${idUser}`)
      .then((res) => {
        setData([...new Array(res.data)]);
        return res.data;
      });
    axios
      .get(`https://jsonplaceholder.typicode.com/albums`)
      .then((res) => {
        setDataAlbums(res.data.filter((v) => v.userId == idUser));
        setAlbumsId(res.data.filter((v) => v.userId == idUser).map((v) => v.id))
        return res.data;
      });
    axios
      .get(`https://jsonplaceholder.typicode.com/photos`)
      .then((res) => {
        setDataPhoto(res.data);
        return res.data;
      });
  }, []);

 
  return (
    <React.Fragment>
        <CssBaseline />
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div">
                  User Detail Page
                </Typography>
              </Toolbar>
            </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {data.map((v) => {
        return (
          <Box>
            <Stack sx={{ marginLeft: "20px" }}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                variant="square"
                alt={v.name}
                sx={{ margin: "40px", width: "200px", height: "200px" }}
              />
              <Box
                sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}
              >
                <Typography sx={{ float: "left", marginTop: "5px" }}>
                  Username :
                </Typography>
                <ItemText>{v.name}</ItemText>
              </Box>
              <Box
                sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}
              >
                <Typography sx={{ float: "left", marginTop: "5px" }}>
                  Email :
                </Typography>
                <ItemText>{v.email}</ItemText>
              </Box>
              <Box sx={{ float: "left", marginLeft: "50px", marginBottom: "17px" }}>
                    <Stack>
                        <Typography sx={{ float: "left", marginTop: "5px" }}>
                        Address :
                        </Typography>
                        <Stack sx={{ marginLeft: "30px", marginBottom: "17px" }} direction="row">
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>Street : </Typography>
                                <ItemText sx={{ width: "100px", marginLeft:"70px" }}>{v.address.street}</ItemText>
                            </Box>
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>Suite : </Typography>
                                <ItemText sx={{ width: "100px", marginLeft:"60px" }}>{v.address.suite}</ItemText>
                            </Box>
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>City : </Typography>
                                <ItemText sx={{ width: "150px", marginLeft:"50px" }}>{v.address.city}</ItemText>
                            </Box>
                        </Stack>
                        <Stack sx={{ marginLeft: "30px", marginBottom: "17px" }} direction="row">
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>Zipcode : </Typography>
                                <ItemText sx={{ width: "100px", marginLeft:"70px" }}>{v.address.zipcode}</ItemText>
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
                                <ItemText sx={{ width: "170px", marginLeft:"60px" }}>{v.company.name}</ItemText>
                            </Box>
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>catchPhrase : </Typography>
                                <ItemText sx={{ width: "190px", marginLeft:"110px" }}>{v.company.catchPhrase}</ItemText>
                            </Box>
                        </Stack>
                        <Stack sx={{ marginLeft: "40px", marginBottom: "17px" }} direction="row">
                            <Box sx={{marginRight:"20px"}}>
                                <Typography sx={{ float: "left", marginTop: "5px" }}>bs : </Typography>
                                <ItemText sx={{ width: "170px", marginLeft:"40px" }}>{v.company.bs}</ItemText>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                <Typography variant="h5" gutterBottom component="div" mx="30px" my="20px">
                    List Of Albums
                </Typography>
                {dataAlbums.map((item) => {
                    return(
                        <div>
                            <Grid sx={{ flexGrow: 2 }} container spacing={2} mx={1}>
                                <Grid item xs={10}>
                                    <Grid container justify Content="center" spacing={spacing}>
                                        {dataPhoto.filter((v) => v.albumId == item.id).map((v) => (
                                            <Grid key={v.thumbnailUrl} item sx={{marginBottom:"5px"}}>
                                            <Paper sx={{ height: 230, width: 150 }}>
                                                <Item
                                                    original={v.thumbnailUrl}
                                                    thumbnail={v.thumbnailUrl}
                                                >
                                                    {({ ref, open }) => (
                                                         <Img alt="complex" src={v.thumbnailUrl} ref={ref} onClick={open}/>     
                                                    )}
                                                    </Item>                                  
                                                    <Typography align="center" sx={{marginTop:"5px"}}>{item.title}</Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>   
                        </div>
                    )
                })}  
            </Stack>
                <Gallery>
                    <Item
                    original="https://placekitten.com/1024/768?image=1"
                    thumbnail="https://placekitten.com/80/60?image=1"
                    width="1024"
                    height="768"
                    >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                    )}
                    </Item>
                    <Item
                    original="https://placekitten.com/1024/768?image=2"
                    thumbnail="https://placekitten.com/80/60?image=2"
                    width="1024"
                    height="768"
                    >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" />
                    )}
                    </Item>
                </Gallery>    
          </Box>
        )
    })}
     <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
