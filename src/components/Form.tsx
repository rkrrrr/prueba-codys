"use client";
import { useState } from "react";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  phone: string;
  birth: string;
  photo: File | null;
}

export default function Form() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    birth: "",
    photo: null,
  });

  console.log(user);
  // funcion para renderizar la foto de perfil
  const renderPhoto = () => {
    if (user.photo) {
      return (
        <Image
          src={URL.createObjectURL(user.photo)}
          alt="Foto de perfil"
          width={250}
          height={200}
          className="rounded-full h-60 mx-auto "
        />
      );
    }
  };

  // funcion para manejar la carga de foto de perfil y guardarla en el estado
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUser({ ...user, photo: e.target.files[0] });
    }
  };
  // funcion que hace la imagen en base64
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // funcion que guarda la imagen en LocalStorage en base64
  const saveImage = async (file: File) => {
    const base64 = await toBase64(file);
    localStorage.setItem(file.name, base64.toString());
  };

  // funcion para manejar el cambio de los inputs y guardarlos en el estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // funcion para enviar los datos al backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.photo) {
      const imgbase64 = await toBase64(user.photo);
      console.log(imgbase64);
      const data = JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        photo: imgbase64,
      });
      const res = fetch("http://localhost:3000/api/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <form
        action=""
        className="flex flex-col justify-center mx-auto w-2/5"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p>Foto de perfil</p>
        <input
          onChange={(e) => {
            handlePhoto(e);
          }}
          type="file"
        />
        {renderPhoto()}
        <p>Nombre y apellido</p>
        <input
          name="name"
          type="text"
          className="text-black"
          onChange={(e) => handleChange(e)}
        />
        <p>Correo electrónico</p>
        <input
          name="email"
          type="email"
          className="text-black"
          onChange={(e) => handleChange(e)}
        />
        <p>Telefono</p>
        <input
          name="phone"
          type="tel"
          className="text-black"
          onChange={(e) => handleChange(e)}
        />
        <p>Fecha de nacimiento</p>
        <input
          type="date"
          name="birth"
          className="text-black"
          onChange={(e) => handleChange(e)}
        />
        <button className="bg-slate-300 w-52 mx-auto mt-10 p-5 rounded-xl">
          Guardar usuario
        </button>
      </form>
    </div>
  );
}