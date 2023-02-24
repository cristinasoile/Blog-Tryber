"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    title: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    content: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
}, { sequelize: _1.default, underscored: true, timestamps: false, modelName: "posts" });
exports.default = Post;
