import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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
          <div className="flex items-end h-full">
            <img src="bg-digimon.png" alt="" aria-hidden="true" className="" />
          </div>
        </div>
        <div className="bg-white rounded-lg lg:rounded-none lg:rounded-r-lg lg:w-1/2">
          <div className="flex justify-end p-5">
            <img src="logo-digimon.png" alt="Logo" className="w-20" />
          </div>
          <h1 className="text-4xl font-bold text-center pb-20">Bienvenido</h1>
          <div className="px-5">
            <form
              onSubmit={handleSubmit((data) => {
                axios
                  .post("http://localhost:9000/authenticate", {
                    email: data.email,
                    password: data.password,
                  })
                  .then(function (response) {
                    console.log(response.data);
                    return navigate("/");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })}
            >
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
        </div>
      </div>
    </div>
  );
}

export default Login;
