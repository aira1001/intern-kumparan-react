import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from '@mui/material/Link';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';

export default function DetailPost(props) {
  const [dataDetail, setDataDetail] = useState([]);
  const [idUser, setIdUser] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const { idPost } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
      .then((res) => {
        setDataDetail(res.data);
        setIdUser(res.data.userId);
        return res.data;
      });
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${idPost}`)
      .then((res) => {
        setDataComment(res.data);
        return res.data;
      });
  }, []);

  useEffect(() => {
    axios
    .get(
      `https://jsonplaceholder.typicode.com/users/${JSON.stringify(idUser)}`
    )
    .then((res) => {
      setDataUser(res.data);
      return res.data;
    });
  }, [idUser])

  let history = useNavigate();
  let handleDetailUser = (idUserSelect) => {
    history(`/user-detail-page/${idUserSelect}`);
  }
  return (
    <React.Fragment>
        <CssBaseline />
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div">
                  Detail Post Page
                </Typography>
              </Toolbar>
            </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Box
        sx={{
          width: 700,
          height: 300,
          backgroundColor: "white",
        }}
        my="50px"
        mx="30px"
      >
        <Stack direction="row" spacing={3}>
          <Avatar
            alt={dataUser.name}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <ListItemText
            primary={<Typography variant="h5">{dataDetail.title}</Typography>}
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline", fontWeight:"bold" }} color="text.primary">
                  Username : <Link variant="body2" sx={{fontWeight:"bold", cursor:"pointer"}} underline="hover" onClick={() => handleDetailUser(idUser)}>{dataUser.name}</Link>
                </Typography>
                <br></br>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                   {dataDetail.body}
                </Typography>
              </React.Fragment>
            }
          />
        </Stack>
        <Stack my="10px">
              <Typography sx={{fontWeight:"bold"}}>Komentar</Typography>
              <Typography sx={{marginLeft:"30px", fontWeight:"bold"}}>{dataComment.length} Komentar</Typography>
        </Stack>
        {dataComment.map((v) => {
          return (
              <List sx={{ marginLeft: "40px" }}>
                <Stack direction="row">
                  <ListItemAvatar>
                    <Avatar alt={v.name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="body2" sx={{fontWeight:"bold", marginBottom:"5px" }} >{v.name}</Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {v.body}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Stack>
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ marginBottom: "10px" }}
                />
              </List>
          );
        })}
      </Box>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
