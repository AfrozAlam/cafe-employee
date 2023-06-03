import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cafe from './components/pages/Cafe';
import Employee from './components/pages/Employee';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cafe' element={<Cafe />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
