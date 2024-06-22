import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar bg-primary">
        <div className="container-md">
          <a className="navbar-brand text-white" href="/">
            AnimeFor.Us
          </a>
          <a
            href="https://github.com/eshuoo/animefor.us"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <Image
              src="/icons/github.svg"
              alt="Link to GitHub project"
              width={36}
              height={36}
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
