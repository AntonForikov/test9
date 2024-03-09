import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import AppBar from './components/AppBar/AppBar';

function App() {

  return (
    <>
      <AppBar/>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='*' element={<h1>Not found</h1> } />
      </Routes>
    </>
  );
}

export default App;
