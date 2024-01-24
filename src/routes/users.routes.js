//rotas de usuario - esse arquivo guarda as rotas

//importando o app
const {Router} = require("express"); //importa o router

const UsersController = require("../controllers/UsersController");


const usersRoutes = Router(); //inicializa ele
//rotas do usuario

/*
function myMiddleware(request, response, next) {
    console.log("Você passou pelo middleware");

    if (!request.body.isAdmin){ //se nao eh admin. utilizamos o request
        return response.json({ message: "user unauthorized"}); //utilizamos o response

    } 

    next();
    
}*/

const usersController = new UsersController();

//vou passar o middleware aqui
//usersRoutes.post("/", myMiddleware, usersController.create); - a função middleware pode ser passada assim, para uma rota especifica
//usersRoutes.use(myMiddleware); //e pode ser usada assim. dessa forma eu passo o middlware para todas as rotas
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes; //para exportar o usersRoutes
