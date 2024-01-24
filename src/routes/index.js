//reunir todos os grupos de rotas

const Router = require("express");

const usersRouter = require("./users.routes"); //grupo de rotas do usuario

const routes = Router();

routes.use("/users", usersRouter); //contem todas as rotas da aplicação
//se o caminho requisitado for o "/users", o routes.use vai levar até o arquivo usersRouter

module.exports = routes; //o routes contém todas as rotas da api