import { hashPassword } from "@src/lib/hash";
import { prisma } from "@src/lib/prisma";

async function runSeed() {
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  await prisma.role.create({
    data: {
      name: "USER",
    },
  });

  await prisma.role.create({
    data: {
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
          name: "USER",
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
          name: "ADMIN",
        },
      },
    },
  });
}

runSeed();
