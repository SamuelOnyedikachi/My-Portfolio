import React from 'react';
import './Nav.css';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useState } from 'react';

export const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');
  return (
    <nav aria-label="Primary navigation">
      <a
        href="#"
        onClick={() => setActiveNav('#')}
        className={activeNav === '#' ? 'active' : ''}
        aria-label="Home"
      >
        <AiOutlineHome />{' '}
      </a>
      <a
        href="#about"
        onClick={() => setActiveNav('#about')}
        className={activeNav === '#about' ? 'active' : ''}
        aria-label="About"
      >
        <AiOutlineUser />{' '}
      </a>
      <a
        href="#experience"
        onClick={() => setActiveNav('#experience')}
        className={activeNav === '#experience' ? 'active' : ''}
        aria-label="Experience"
      >
        <BiBook />{' '}
      </a>
      <a
        href="#service"
        onClick={() => setActiveNav('#service')}
        className={activeNav === '#service' ? 'active' : ''}
        aria-label="Services"
      >
        <RiServiceLine />{' '}
      </a>
      <a
        href="#contact"
        onClick={() => setActiveNav('#contact')}
        className={activeNav === '#contact' ? 'active' : ''}
        aria-label="Contact"
      >
        <BiMessageSquareDetail />{' '}
      </a>
    </nav>
  );
};

export default Nav;
