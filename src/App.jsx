import "./App.css";
import Nav from "./components/Nav";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Tabla from "./components/Tabla";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [nivel, setNivel] = useState("");
  const [digimon, setDigimon] = useState("");
  const [imagenDigimon, setImagenDigimon] = useState("");

  const baseUrlName = "https://digimon-api.vercel.app/api/digimon/name/";

  function buscarDigimon(data) {
    fetch(`${baseUrlName}${data.digimon}`)
      .then((response) => response.json())
      .then((data) => {
        setDigimon(data[0].name);
        setNivel(data[0].level);
        setImagenDigimon(data[0].img);
        setIsLoading(false);
      });
  }

  function ImgCargada() {
    if (isLoading) {
      return (
        <img
          src="digihuevo.gif"
          alt="Digimon"
          className="rounded-lg h-[18rem] mt-14"
        />
      );
    }
    return <img src={imagenDigimon} alt="Digimon" className="rounded-lg" />;
  }

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center lg:h-[49rem]">
        <div className="grid lg:grid-cols-2 m-5 rounded-lg shadow-xl mb-20">
          <div className="p-2">
            <form onSubmit={handleSubmit((data) => buscarDigimon(data))}>
              <div className="flex h-10 justify-between">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="px-2 border rounded-l-lg w-full"
                  {...register("digimon", {
                    required: "El nombre del digimon no puede estar vacio!",
                  })}
                />

                <button
                  type="submit"
                  className="px-2 w-28 bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] rounded-r-lg text-white"
                >
                  Buscar
                </button>
              </div>
              <p className="px-2 pt-1 text-sm text-red-500">
                {errors.digimon?.message}
              </p>
            </form>
            <div className="border my-2 rounded-lg min-h-[25rem] max-w-[20rem]">
              <h2 className="text-center font-bold pt-2 text-xl">{digimon}</h2>
              <ImgCargada />
              <div className="border-t p-2">
                <p className="font-bold text-center">Nivel: {nivel}</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <Tabla />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
