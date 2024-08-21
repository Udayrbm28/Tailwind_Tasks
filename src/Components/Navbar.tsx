import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div>
        <nav className="bg-zinc-500 text-cyan-50 w-full">
          <ul className="flex ">
            <Link to="/" className="p-4">
              Rockets
            </Link>
            <Link to="/shipData" className="p-4">
              Ships
            </Link>
          </ul>
        </nav>
      </div>
    );
}

export default Navbar;