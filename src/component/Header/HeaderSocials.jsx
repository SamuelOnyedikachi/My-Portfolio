import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';

const HeaderSocials = () => {
  return (
    <div className="Header__socials" aria-label="Social links">
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn"
      >
        <BsLinkedin />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://dribbble.com"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Dribbble"
      >
        <FiDribbble />
      </a>
    </div>
  );
};

export default HeaderSocials;
