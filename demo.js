//This file contains the logic to call the REST API, here by using AXIOS
let Auth = require("./auth.js");
let axios = require("axios");

//URL of the REST API
axios.defaults.baseURL = "http://localhost:5000";

let auth = new Auth();

let demoData = [
    { usrid: 1, car: 'Fiat', type: 'Sedan', ps: 28 },
    { usrid: 1, car: 'Yaris', type: 'Sedan', ps: 68 },
    { usrid: 1, car: 'Corolla', type: 'Sedan', ps: 89 },
    { usrid: 1, car: 'BMW M3', type: 'Sedan', ps: 420 },
    { usrid: 2, car: 'Eclipse', type: 'Coupe', ps: 200 },
    { usrid: 2, car: 'Passat', type: 'Sedan', ps: 200 },
]

//Login to the REST API - returns the token.
//I created two users on the database:
//username: "admin",password:"admin" - has role "ROLE_ADMIN" and "ROLE_USER"
//username: "user",password:"user" - has role "ROLE_USER"
axios
    .post("/login", {
        username: "admin",
        password: "admin",
    })
    .then((res) => {
        auth.login(res.data.token);
        crud(auth);
    })
    .catch((error) => {
        console.log(error);
    });

//Only admin users is allowed to modify data, normal users can only view data
//async and await is used to view the steps sequentially.
async function crud(auth) {
    axios.defaults.headers.common["Authorization"] = auth.getBearerToken();

    await initTable();

    await logTable();

    await axios
        .get("/data/2")
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });

    if (auth.hasRole("ROLE_ADMIN")) {
        await axios
            .post("/data", {
                usrid: 2,
                car: "Ferrari",
                type: "Coupe",
                ps: 550
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await logTable();

        await axios
            .put("/data/1", {
                car: "Mercedes",
                type: "Coupe",
                ps: 218
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await logTable();

        await axios
            .delete("/data/1")
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await logTable();
    }
}

//Reset table "data" on the database
//First: delete all data - not the users
//Second: reset sequence for the table
//Third: import demo data
async function initTable() {
    if (auth.hasRole("ROLE_ADMIN")) {
        await axios
            .delete("/data")
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await axios
            .delete("/data/del/seq")
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        for (let i = 0; i < demoData.length; i++) {
            //Destructuring data
            let { usrid, car, type, ps } = demoData[i];
            await axios
                .post("/data", {
                    usrid,
                    car,
                    type,
                    ps
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

function logTable() {
    axios
        .get("/data")
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
}