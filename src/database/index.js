import Sequelize from "sequelize";
import dbConfig from "../config/database";
import path from 'path';
import fs from "fs";

let models = [];

const normalizedPath = path.resolve("src/model");
fs.readdirSync(normalizedPath).forEach(file => {
  const importForEach = require(`../model/${file}`);
  models.push(Object.values(importForEach)[0]);
});

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
