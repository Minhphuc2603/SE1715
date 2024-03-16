
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MovieDetail from './MovieDetail';
import AddProducts from './AddProduct';
import Login from './Login';
import EditMovie from './EditMovie';


const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/add" element={<AddProducts />} />
          <Route path='/edit/:id' element={<EditMovie />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;