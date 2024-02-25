const fs = require("fs");

const users = require(global.users_db);

const user_service = {
    get(req, res) {
        return users;
    },
    insert(req, res) {
        let new_id = Date.now();

        const body = req.body;

        const user = {
            fullname: body.fullname,
            phone_number: body.phone_number,
            address: body.address,
            gender: body.gender,
            birth_date: body.birth_date,
            analysis: body.analysis
        };
        users.unshift({
            id: new_id,
            user: user,
        })
        writeToFile(users);

        return {
            id: new_id,
            user: user,
        };
    },
};

let writeToFile = async (users) => {
    await fs.writeFileSync(
        global.users_db,
        JSON.stringify(users, null, 4),
        "utf8"
    );
};

module.exports = user_service;