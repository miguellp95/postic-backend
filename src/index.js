"use strict";

const app = require("./app");
const Connection = require("./database");

async function main() {
  try {
    Connection.conectar();
    await app.listen(app.get("port"));
    console.log(`Server funcionando en puerto ${app.get("port")}. `);
  } catch (error) {
    console.log(error);
  }
}

main();
