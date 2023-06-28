import { AiFillHeart } from "react-icons/ai";
import useDigimones from "./hooks/useDigimones";

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
  const { digimones, masDigimones } = useDigimones();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 md:mx-0 md:flex-row md:flex-wrap">
      {digimones.map((digimon) => (
        <Digimon {...digimon} key={digimon.id} />
      ))}
      <button className="bg-green-700 p-2 text-white" onClick={masDigimones}>
        Mostar más digimones
      </button>
    </section>
  );
}
export default Digimones;
