const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Engineering" },
        { name: "Business" },
        { name: "History" },
        { name: "Geography" },
        { name: "Economics" },
        { name: "Music" },
        { name: "Art" },
        { name: "Photography" },
        { name: "Languages" },
        { name: "Design" },
        { name: "Marketing" },
        { name: "Law" },
        { name: "Other" },
      ],
    });

    console.log("Success seeding categories!");

    // for (const category of categories) {
    //   const existingCategory = await database.category.findUnique({
    //     where: {
    //       name: category.name,
    //     },
    //   });

    //   if (!existingCategory) {
    //     await database.category.create({
    //       data: category,
    //     });
    //   }
    // }
  } catch (error) {
    console.log("Error while seeding the database categories:", error);
  } finally {
    await database.$disconnect();
  }
}

main();
