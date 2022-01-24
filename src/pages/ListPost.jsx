import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from "@mui/material/Stack";
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';


export default function ListPost(props) {
  const [dataPost, setDataPost] = React.useState([]);
  const [dataUser, setDataUser] = React.useState([]);
  React.useEffect(() => {
    const promisePost = axios.get(`https://jsonplaceholder.typicode.com/posts`);
    const promiseUser = axios.get(`https://jsonplaceholder.typicode.com/users`);

    Promise.all([promisePost, promiseUser]).then((results) => {
        let resultKelas, resultPegawai;
        [resultKelas, resultPegawai] = results;
        setDataPost(resultKelas.data);
        setDataUser(resultPegawai.data);
    });
  }, []);

  let history = useNavigate();
  let handleOnClick = (idPostSelect) => {
      history(`/detail-post-page/${idPostSelect}`)
  }
  return (
       <React.Fragment>
          <CssBaseline />
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div">
                  List Post Page
                </Typography>
              </Toolbar>
            </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {dataPost.map((v) => {
          return(
          <List
            sx={{ width: "100%", maxWidth: "700px", bgcolor: "background.paper", ml: "40px"}}
          >
          {dataUser.filter((item) => item.id == v.userId).map((item) => (
            <ListItemButton alignItems="flex-start" onClick={()=> handleOnClick(v.id)}>
              <ListItemAvatar>
                <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={v.title}
                secondary={
                  <React.Fragment>
                         <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                                {item.name + " - "}
                          </Typography>
                          <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.grey"
                            >
                                {v.body}
                            </Typography> 
                         <Stack>
                            <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{marginTop:"3px"}}
                            >
                              {"Company : " + item.company.name}
                            </Typography>
                         </Stack>
                  </React.Fragment>
                }
              />
            </ListItemButton>
        ))}
            <Divider variant="inset" component="li" />
          </List>
          );
      })}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
