import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("objetoBackend", JSON.stringify(response.data));
      return navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data);
      } else {
        console.log(error);
        setError("Ocurrió un error");
      }
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2e86c1] to-[#48c9b0]">
        <div className="flex h-[750px] mx-5">
          <section className="hidden lg:block">
            <div className="bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] h-full rounded-l-lg relative w-[600px] xl:w-[650px] 2xl:w-[800px]">
              <img
                src="bg-digimon.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 w-full"
              />
            </div>
          </section>
          <section className="relative p-5 bg-white lg:rounded-r-lg lg:rounded-l-none rounded-lg xl:w-[500px]">
            <div className="flex justify-end p-5">
              <img src="logo-digimon.png" alt="Logo" className="w-20" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-32">Bienvenido</h1>
            <form onSubmit={handleSubmit(loginUser)}>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "El email no puede estar vacio!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Debe ser un email valido!",
                  },
                })}
                autoComplete="email"
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">{errors.email?.message}</p>
              <label htmlFor="password">Contraseña</label>
              <input
                {...register("password", {
                  required: "Contraseña no puede estar vacio!",
                })}
                type="Password"
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">{errors.password?.message}</p>
              <button
                className="w-full bg-[#2e86c1] text-white h-12 mb-4 rounded-lg"
                type="submit"
              >
                Registrarse
              </button>
              <p className="text-red-500 mb-5">
                {error && <span>{error}</span>}
              </p>
            </form>
            <div className="absolute bottom-5 flex justify-between w-[90%]">
              <p>
                No tienes cuenta?{" "}
                <span>
                  <a href="/register" className="text-[#2e86c1] underline">
                    Registrate Aquí!
                  </a>
                </span>
              </p>
              <Link to="/" className="text-[#2e86c1] underline">
                Volver al inicio
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
