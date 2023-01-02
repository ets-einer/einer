import { hashPassword } from "@src/lib/hash";
import { prisma } from "@src/lib/prisma";

async function runSeed() {
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const roleUser = await prisma.role.create({
    data: {
      id: 0,
      name: "USER",
    },
  });

  const roleAdmin = await prisma.role.create({
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
      role: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });

  const userCelso = await prisma.user.create({
    data: {
      email: "celso@gmail.com",
      edv: "87654321",
      passwordHash: await hashPassword("celso"),
      role: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: userCelso.id,
    },
    data: {
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });
}

runSeed();
