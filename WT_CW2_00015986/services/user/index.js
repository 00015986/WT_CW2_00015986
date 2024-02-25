const fs = require("fs");

const users = require(global.users_db);

const user_service = {
    get(req, res) {
        return users;
    },
    insert(req, res) {
        let new_id = Date.now();

        const body = req.body;
        console.log(body)
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

const updateUser = (userId, newData) => {
    return new Promise((resolve, reject) => {
        fs.readFile(global.users_db, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            try {
                let users_data = JSON.parse(data);
                const userIndex = users_data.findIndex(user => user.id === parseInt(userId));
                if (userIndex !== -1) {
                    // Update user data
                    users_data[userIndex].user = { ...users_data[userIndex].user, ...newData };

                    // Write updated data back to the file
                    fs.writeFile(global.users_db, JSON.stringify(users_data, null, 4), (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                } else {
                    reject(new Error('User not found'));
                }
            } catch (error) {
                reject(error);
            }
        });
    });
};

module.exports = updateUser;

module.exports = user_service;