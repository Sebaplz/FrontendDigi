import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="flex bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] justify-between items-center px-5 2xl:px-10 fixed w-full">
      <img src="logo-digimon.png" alt="Logo digimon" className="p-2 w-32" />
      {/* Esto cambia según el usuario */}
      <NavLink to={"/login"} className="text-white">
        Iniciar Sesión
      </NavLink>
    </div>
  );
}

export default Nav;
