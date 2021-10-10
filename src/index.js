"use strict";
const app = require("./app");

app.listen(app.get("port"), () => {
  try {
    console.log("servidor encendido en puerto " + app.get("port"));
  } catch (error) {
    console.log(error);
  }
});
