import React from "react";

function Nav() {
  return (
    <div className="h-20 flex bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] justify-between items-center px-5 2xl:px-10">
      <img src="logo-digimon.png" alt="Logo digimon" className="p-2 w-32" />
      {/* Esto cambia según el usuario */}
      <a href="#" className="text-white">
        Iniciar Sesión
      </a>
    </div>
  );
}

export default Nav;
