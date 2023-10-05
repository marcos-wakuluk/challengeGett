import React from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar bg-primary fixed-top w-100">
      <div className="container-fluid d-flex align-items-center">
        <h3 className="navbar-brand text-center flex-grow-1 text-white">Todo App</h3>
        <Button
          type='button'
          color='primary'
          className='ml-auto'
          onClick={() => navigate('/')}
        >
          <BsBoxArrowRight size={25} onClick={() => navigate('/')} />
        </Button>
      </div>
    </nav>
  )
}

export default NavBar;