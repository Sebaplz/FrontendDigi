import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const baseUrl = "https://www.digi-api.com/api/v1/digimon?page=221";

function Digimon({ id, name, image }) {
  return (
    <div key={id} className="m-2 rounded-lg bg-slate-200 p-2 text-center">
      <p>#{id}</p>
      <img
        src={image}
        alt={name}
        className="h-[320px] w-[320px] rounded-lg md:h-[250px] md:w-[250px] xl:h-[400px] xl:w-[400px]"
      />
      <div className="mt-2 flex items-center justify-center">
        {/* TODO: Tiene que cambiar cuando se inicie sesion */}
        <AiFillHeart className="text-3xl text-red-600" />
        <p className="mx-2 md:mx-10">{name}</p>
      </div>
    </div>
  );
}

function Digimones() {
  const [digimones, setDigimones] = useState([]);
  const [pagina, setPagina] = useState([]);

  useEffect(() => {
    const getDigimones = async () => {
      //Recuperar listado de Digimones
      const response = await fetch(baseUrl);
      const listaDigimons = await response.json();
      const { content, pageable } = listaDigimons;
      setDigimones(content);
      console.log(pageable);
      //Ver detalles del digimon
      /* const newDigimon = content.map(async (digimon) => {
        const response = await fetch(digimon.href);
        const digi = await response.json();
        console.log(digi);
      }); */
    };
    getDigimones();
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 md:mx-0 md:flex-row md:flex-wrap">
      {digimones.map((digimon) => {
        return Digimon(digimon);
      })}
    </section>
  );
}
export default Digimones;
