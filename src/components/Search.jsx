import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const baseUrlName = "https://digimon-api.vercel.app/api/digimon/name/";

  const [isLoading, setIsLoading] = useState(true);
  const [nivel, setNivel] = useState("");
  const [digimon, setDigimon] = useState("");
  const [imagenDigimon, setImagenDigimon] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const buscarDigimon = async (data) => {
    try {
      const response = await axios.get(`${baseUrlName}${data.digimon}`);
      console.log(response);
      setImagenDigimon(response.data[0].img);
      setDigimon(response.data[0].name);
      setNivel(response.data[0].level);
      setIsLoading(false);
      setError("");
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.ErrorMsg);
      } else {
        console.log(error);
        setError("Ocurrió un error");
      }
    }
  };

  return (
    <section className="mx-auto w-[336px] pt-20 md:w-[600px]">
      <form onSubmit={handleSubmit(buscarDigimon)}>
        <div className="flex h-10">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full rounded-l-lg border px-2"
            {...register("digimon", {
              required: "El nombre del digimon no puede estar vacio!",
            })}
          />
          <button
            type="submit"
            className="w-28 rounded-r-lg bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] text-white"
          >
            Buscar
          </button>
        </div>
        <p className="m-2 text-sm text-red-500">{errors.digimon?.message}</p>
      </form>
      <p className="m-2 text-sm text-red-500">
        {error && <span>{error}</span>}
      </p>
    </section>
  );
}
export default Search;
