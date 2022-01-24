import './App.css';
import ListPost from './pages/ListPost';
import DetailPost from './pages/DetailPost';
import DetailUserPage from './pages/DetailUserPage';
import DetailPhoto from './pages/DetailPhoto';
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
        <Route exact path="/user-detail-page/detail-photo/:idPhoto" element={<DetailPhoto/>} />
      </Routes>
    </Router>
  );
}


export default App;
