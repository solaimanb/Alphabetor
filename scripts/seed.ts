const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      { name: "Computer Science" },
      { name: "Engineering" },
      { name: "Medicine" },
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "History" },
      { name: "Geography" },
      { name: "Economics" },
      { name: "English" },
      { name: "Fitness" },
      { name: "Music" },
      { name: "Art" },
      { name: "Dance" },
      { name: "Cooking" },
      { name: "Photography" },
      { name: "Gardening" },
      { name: "Crafts" },
      { name: "Business" },
      { name: "Psychology" },
      { name: "Philosophy" },
      { name: "Languages" },
      { name: "Design" },
      { name: "Marketing" },
      { name: "Finance" },
      { name: "Law" },
      { name: "Other" },
    ];

    for (const category of categories) {
      const existingCategory = await database.category.findUnique({
        where: {
          name: category.name,
        },
      });

      if (!existingCategory) {
        await database.category.create({
          data: category,
        });
      }
    }
  } catch (error) {
    console.log("Error while seeding the database. Error: ", error);
  } finally {
    await database.$disconnect();
  }
}

main();
