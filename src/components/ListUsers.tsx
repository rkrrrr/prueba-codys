'use client'
import React from 'react'
import Image from 'next/image';
import { get } from 'http';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    photo: string;
}

export const dynamic='force-dynamic'


function ListUsers({ update, setUpdate }: { update: boolean, setUpdate: Function }) {
    // inicializamos el estado de los usuarios
    const [users, setUsers] = React.useState([]);
    // estado para actualizar los usuarios
    const [editUser, setEditUser] = React.useState<User>({
        id: '',
        name: '',
        email: '',
        phone: '',
        birthday: '',
        photo: ''
    })
    console.log(editUser)
    // estado para actualizar el formulario
    const [edit, setEdit] = React.useState<string>('')
    // funcion para obtener los usuarios y luego actualizar el estado
    React.useEffect(() => {
        fetch('http://localhost:3000/api/savedata')
        .then(response => response.json())
        .then(data => {
            setUsers(data)
        })

    }, [update])

    // funcion que elimina usuarios
    const deleteUser = (id: string) => {
        const res = fetch("http://localhost:3000/api/savedata", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
      console.log(res)
      setUpdate(!update)
    }

    // funcion para actualizar usuarios
    const updateUser = (editUser: User) => {
        const res = fetch("http://localhost:3000/api/savedata", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(editUser),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setUpdate(!update)
            setEdit("")
        }
        );
    }

    // funcion para obtener la Edad del usuario
    const getAge = (birthday: string) => {
        console.log(birthday)
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {age--;}
        return age;
    }



    // funcion para listar los usuarios
    const listUsers = () => {
        return users.map((user: User) => {
            return (
            edit === user.id ?
            
                <tr className='' key={user.id}>
                    <td> <Image src={`${user.photo}`} alt={'photo'} width={100} height={100} className='w-32 h-32 p-3 rounded-full'/> </td>
                    <td > <input type="text" value={editUser.name} className='text-black' onChange={(e)=>{setEditUser({...editUser, name: e.target.value})}}/> </td>
                    <td> <input type="text" value={editUser.email} className='text-black' onChange={(e)=>{setEditUser({...editUser, email: e.target.value})}}/> </td>
                    <td> <input type="text" value={editUser.phone} className='text-black' onChange={(e)=>{setEditUser({...editUser, phone: e.target.value})}}/> </td>
                    <td>  <input type="date" value={editUser.birthday} className='text-black' onChange={(e)=> {setEditUser({...editUser, birthday:e.target.value})}} />  </td>
                    <td>
                        <button onClick={()=>{
                            updateUser(editUser)
                            setEdit("")
                        }}
                        className='bg-green-500 p-5'>guardar</button>
                        <button onClick={()=>{
                            deleteUser(user.id)
                        }}  className='bg-red-500 p-5' >Eliminar</button>
                    </td>
                </tr>
             :
                <tr key={user.id}>
                    <td> <Image src={`${user.photo}`} alt={'photo'} width={100} height={100} className='w-32 h-32 p-3 rounded-full'/> </td>
                    <td >{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{getAge(user.birthday)} años</td>
                    <td>
                        <button onClick={()=>{
                            setEditUser(user)
                            setEdit(user.id)
                        }}
                        className='bg-green-500 p-5'>
                            Editar
                        </button>

                        <button onClick={()=>{
                            deleteUser(user.id)
                        }}  className='bg-red-500 p-5' >
                            Eliminar
                        </button>
                    </td>
                </tr>
        )})}
  return (
    <div >
        <h1 className='text-white text-center'>Lista de Usuarios</h1>
        <table className='table bg-slate-600 mx-auto w-4/5'>
            <thead className=''>
                <tr>
                    <th className='text-start'>Photo</th>
                    <th className='text-start' >Nombre </th>
                    <th className='text-start' >Email</th>
                    <th className='text-start' >Phone</th>
                    <th className='text-start'> Edad </th>
                    <th className='text-start' >Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listUsers()}
            </tbody>
        </table>

    </div>
  )
}

export default ListUsers