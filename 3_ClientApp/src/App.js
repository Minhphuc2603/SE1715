
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './ProductDetail';
import AddProducts from './AddProduct';


const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/add" element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;