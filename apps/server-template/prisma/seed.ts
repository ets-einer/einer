import { prisma } from './prisma'

async function runSeed() {
  await prisma.example.create({
    data: { name: "Foo", }
  })

  await prisma.example.create({
    data: { name: "Bar", }
  })

  await prisma.example.create({
    data: { name: "Baz", }
  })
}

runSeed()
