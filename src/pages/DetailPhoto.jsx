import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

export default function DetailPhoto(){
    const [dataPhoto, setDataPhoto] = useState([]);
    const { idPhoto } = useParams()

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/photos/${idPhoto}`)
            .then(res => {
                setDataPhoto(res.data);
                return res.data;
            })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const transformOptions = {
        initialScale: 1,
        minScale: 0.5,
        maxScale: 2
    }
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });
    console.log(dataPhoto.thumbnailUrl);
    return (
    <React.Fragment>
        <CssBaseline />
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div">
                  Photo Detail Page
                </Typography>
              </Toolbar>
            </AppBar>
      <Toolbar id="back-to-top-anchor" />
        <Box sx={{margin:"50px 100px"}}>
        <Typography my="10px" variant="h5">{dataPhoto.title}</Typography>
            <TransformWrapper
            initialScale={1}
            options={transformOptions}
        //   initialPositionX={50}
        //   initialPositionY={100}
            >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent>
                <Img alt="thumbnailphoto" src={dataPhoto.thumbnailUrl} sx={{
                    height: "500px",
                    width:"500px", 
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}/>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
        </Box>
    </React.Fragment>
      
    );
}