const fs = require("fs");

// access global mock db file
const users = require(global.users_db);

// write service method implementations
const user_service = {
    get(req, res) {
        return users;
    },
    insert(req, res) {
        let new_id = genRandId(4);

        const body = req.body;

        const user = {
            email: body.email,
            password: body.password,
        };

        users.push({
            id: new_id,
            user: user,
        });

        writeToFile(users);

        return {
            id: new_id,
            user: user,
        };
    },
};

// create function for overwriting the db file updated db content
let writeToFile = async (users) => {
    await fs.writeFileSync(
        global.mock_db,
        JSON.stringify(users, null, 4),
        "utf8"
    );
};
// generate random id inspired by uuid
let genRandId = (count) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

module.exports = user_service;