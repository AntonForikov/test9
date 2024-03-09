import {NavLink} from 'react-router-dom';
import Modal from '../Modal/Modal';
import {useState} from 'react';

const AppBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(!show)
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-md">
          <NavLink className="navbar-brand" to="/">Finance Tracker</NavLink>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to='/categories' className='nav-link'>Categories</NavLink>
          </li>
          <li className="nav-item" style={{cursor: 'pointer'}}>
            <span className='nav-link' onClick={handleClose}>Add</span>
          </li>
        </ul>
      </nav>
      <Modal handleClose={handleClose} show={show}/>
    </>
  );
};

export default AppBar;