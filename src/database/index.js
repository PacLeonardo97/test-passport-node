import Sequelize from "sequelize";
import dbConfig from "../config/database";
import path from "path";
import fs from "fs";

let models = [];

const normalizedPath = path.resolve("src/model");

fs.readdirSync(normalizedPath).forEach((file) => {
  const importForEach = require(`../model/${file}`);
  models.push(Object.values(importForEach)[0]);
});

// class Database {
//   constructor() {
//     this.init();
//     this.associate();
//   }
//   init() {
//     this.connection = new Sequelize(dbConfig);
//     models.map((model) => model.init(this.connection));
//   }
//   associate() {
//     this.connection = new Sequelize(dbConfig);
//     const ola = models.map((model) => {
//       return null;
//     });
//   }
// }

// export default new Database;

const con = new Sequelize(dbConfig);

const Base = {
  init: models.map((model) => model.init(con)),
  associate: models.map(
    (model) => model.associate && model.associate(con.models)
  ),
};

export default Base;
