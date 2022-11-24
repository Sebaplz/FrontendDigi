import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2e86c1] to-[#48c9b0]">
      <div className="flex flex-col-reverse lg:flex-row lg:p-5">
        <div className="bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] lg:rounded-l-lg lg:w-1/2 w-0">
          <div className="flex items-end lg:h-[40rem]">
            <img
              src="bg-register.png"
              alt=""
              aria-hidden="true"
              className="lg:h-full"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg lg:rounded-none lg:rounded-r-lg lg:w-1/2">
          <div className="flex justify-end p-5">
            <img src="logo-digimon.png" alt="Logo" className="w-20" />
          </div>
          <h1 className="text-4xl font-bold text-center pb-20">Registrarse</h1>
          <div className="px-5">
            <form
              onSubmit={handleSubmit((data) => {
                axios
                  .post("http://localhost:9000/register", {
                    nombre: data.nombre,
                    email: data.email,
                    password: data.password,
                  })
                  .then(function (response) {
                    return navigate("/");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })}
            >
              <label htmlFor="nombre">Nombre</label>
              <input
                {...register("nombre", {
                  required: "El nombre no puede estar vacio!",
                })}
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">{errors.nombre?.message}</p>
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
                  required: "Password no puede estar vacio!",
                })}
                type="Password"
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">{errors.password?.message}</p>
              <button
                className="w-full bg-[#2e86c1] text-white h-12 mb-4 rounded-lg"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
          <div className="flex justify-between p-5">
            <p>
              Ya tienes cuenta?{" "}
              <span>
                <a href="/login" className="text-[#2e86c1] underline">
                  Inicia Sesión Aquí!
                </a>
              </span>
            </p>
            <a href="/" className="text-[#2e86c1] underline">
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
/* fetch("http://localhost:9000/api/users", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json; charset=utf-8",
                  },
                  
                  mode: "no-cors",
                  body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                  }),
                }); */
