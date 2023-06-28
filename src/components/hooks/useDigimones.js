import { useEffect, useState } from "react";
import { async } from "regenerator-runtime";

const URL_DEFAULT = "https://www.digi-api.com/api/v1/digimon?page=0";

function useDigimones() {
  const [digimones, setDigimones] = useState([]);
  const [pagina, setPagina] = useState("");

  const getDigimones = async (url = URL_DEFAULT) => {
    //Recuperar listado de Digimones
    const response = await fetch(url);
    const listaDigimons = await response.json();
    const { content, pageable } = listaDigimons;
    return { content, pageable };
  };

  const obtenerDigimones = async () => {
    const { content, pageable } = await getDigimones();
    setDigimones(content);
    setPagina(pageable.nextPage);
  };

  const masDigimones = async () => {
    const { content, pageable } = await getDigimones(pagina);
    setDigimones((prev) => [...prev, ...content]);
    setPagina(pageable.nextPage);
  };

  useEffect(() => {
    obtenerDigimones();
  }, []);

  return { digimones, masDigimones };
}

export default useDigimones;
