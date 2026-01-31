import React from 'react';
import './Header.css';
import CTA from './CTA';
import ME from '../../component/assets/samuel.png';
import HeaderSocials from './HeaderSocials';

const Header = () => {
  return (
    <header>
      <div className="container header_container">
        <h5>Hello I'm</h5>
        <h1>Samuel Onyedikachi</h1>
        <h5 className="text-light">Software Engineer</h5>
        <CTA />
        <HeaderSocials />
        <div className="me" aria-hidden="false">
          <figure
            className="me-figure"
            role="img"
            aria-label="Samuel Onyedikachi portrait"
          >
            <img
              src={ME}
              alt="Samuel Onyedikachi"
              loading="eager"
              decoding="async"
              width="600"
              height="600"
            />
          </figure>
        </div>

        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
      </div>
    </header>
  );
};

export default Header;
