//import { PrismaClient } from "@prisma/client";

const {PrismaClient} = require("@prisma/client");

const htSettingData = require("../init-data/ht-setting.json");
const db = new PrismaClient();

async function main() {
    // Your seeding logic here using Prisma Client
    console.log("-------- Seeding DB --------");

    const htSetting = await db.htSetting.count()
    if (htSetting === 0) {
        console.log("Seeding htSetting");
        await db.htSetting.createMany({data: htSettingData});
    }

    console.log("-------- Seed DB completed --------");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });