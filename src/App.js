import './App.css';
// import Button from '@material-ui/core/Button';
// import Dashboard from './containers/templates/dashboard';
import ListPost from './pages/ListPost';
import DetailPost from './pages/DetailPost';
import DetailUserPage from './pages/DetailUserPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListPost/>} />
        <Route exact path="/user-detail-page/:idUser" element={<DetailUserPage/>} />
        <Route exact path="/detail-post-page/:idPost" element={<DetailPost/>} />
      </Routes>
    </Router>
  );
}


export default App;
