import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
prisma.$connect()

export async function GET(request: NextRequest, response: NextResponse) {
// conseguir los datos de la base de datos
    const allUsers = await prisma.contact.findMany()
return NextResponse.json(allUsers);
}
// crear usuario
export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.json()
    // insertar datos en la base de datos
    const user = await prisma.contact.create({
        data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            birthday: body.birth,
            photo: body.photo
        },
    })

    return NextResponse.json(user);
}

// actualizar usuario
export async function PUT(request: NextRequest, response: NextResponse) {
    const body = await request.json()
    const user = await prisma.contact.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            birthday: body.birth,
            photo: body.photo
        },
    })
    return NextResponse.json(user);
}

// eliminar usuario
export async function DELETE(request: NextRequest, response: NextResponse) {
    const body = await request.json()
    const user = await prisma.contact.delete({
        where: {
            id: body,
        },
    })
    
    return NextResponse.json({ message: "eliminado"});
}

