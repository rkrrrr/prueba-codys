'use client'
import React from 'react'
import Image from 'next/image';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    photo: string;
}

export const dynamic='force-dynamic'


function ListUsers() {
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
    // funcion para obtener los usuarios y luego actualizar el estado
    React.useEffect(() => {
        fetch('http://localhost:3000/api/savedata')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [users])

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
    }
    // funcion para listar los usuarios
    const listUsers = () => {
        return users.map((user: User) => {
            return (
                <tr key={user.id}>
                    <td> <Image src={`${user.photo}`} alt={'photo'} width={100} height={100} className='w-32 h-32 p-3 rounded-full'/> </td>
                    <td >{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                        <button className='bg-green-500 p-5'>Editar</button>
                        <button onClick={()=>{
                            deleteUser(user.id)
                        }}  className='bg-red-500 p-5' >Eliminar</button>
                    </td>
                    
                </tr>
            )
        })}
  return (
    <div >
        <h1 className='text-white text-center'>Lista de Usuarios</h1>
        <table className='table bg-slate-600 mx-auto w-4/5'>
            <thead className=''>
                <tr>
                    <th className='text-start'>Photo</th>
                    <th className='text-start' >Nombre</th>
                    <th className='text-start' >Email</th>
                    <th className='text-start' >Phone</th>
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