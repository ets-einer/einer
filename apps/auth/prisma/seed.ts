import { hashPassword } from "@src/lib/hash";
import { prisma } from "@src/lib/prisma";

async function runSeed() {
  await prisma.user.deleteMany();
  await prisma.permission.deleteMany();

  const permissionUser = await prisma.permission.create({
    data: {
      id: 0,
      name: "USER",
    },
  });

  const permissionAdmin = await prisma.permission.create({
    data: {
      id: 1,
      name: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "zamudo@gmail.com",
      passwordHash: await hashPassword("123"),
      edv: "12345678",
      sector: "Cap/ETS",
      permissions: {
        connect: {
          id: permissionUser.id,
        },
      },
    },
  });

  const userCelso = await prisma.user.create({
    data: {
      email: "celso@gmail.com",
      edv: "87654321",
      passwordHash: await hashPassword("celso"),
      permissions: {
        connect: {
          id: permissionUser.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: userCelso.id,
    },
    data: {
      permissions: {
        connect: {
          id: permissionAdmin.id,
        },
      },
    },
  });
}

runSeed();
