import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const password = React.useRef({});
  password.current = watch("password", "");

  const registerUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        userName: data.nombre,
        email: data.email,
        password: data.password,
      });
      // Procesar la respuesta exitosa
      console.log(response.data);
      // Crear un objeto con email y userName
      return navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
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
            <div className="bg-gradient-to-r from-[#2e86c1] to-[#48c9b0] h-full rounded-l-lg">
              <img
                src="bg-register.png"
                alt=""
                aria-hidden="true"
                className="h-full"
              />
            </div>
          </section>
          <section className="relative p-5 bg-white lg:rounded-r-lg lg:rounded-l-none rounded-lg">
            <div className="flex justify-end p-5">
              <img src="logo-digimon.png" alt="Logo" className="w-20" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-5">
              Crear Cuenta
            </h1>
            <form onSubmit={handleSubmit(registerUser)}>
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
                  required: "Contraseña no puede estar vacio!",
                })}
                type="Password"
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">{errors.password?.message}</p>
              <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
              <input
                {...register("passwordConfirmation", {
                  required: "Confirmar Contraseña no puede estar vacio!",
                  validate: (value) =>
                    value === password.current ||
                    "Las contraseñas no coinciden!",
                })}
                type="Password"
                className="w-full border rounded-lg p-2"
              />
              <p className="text-red-500 mb-5">
                {errors.passwordConfirmation?.message}
              </p>
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
                Ya tienes cuenta? <br />
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
          </section>
        </div>
      </main>
    </>
  );
}

export default Register;
