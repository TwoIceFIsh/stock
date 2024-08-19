import db from "@/lib/init/db";

export const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: {
            id
        }
    })
}