require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const express = require("express"); //import express da node modules
const routes = require("./routes") //como n digo qual arquivo eu quero da pasta, por padrao ele carrega o index.js
migrationsRun();

const app = express() //inicializa o express
app.use(express.json()); //padrao utilizado para receber informações

app.use(routes);// as rotas estao aqui!!



app.use((error, request, response, next) => {

    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    });

});

const PORT = 3333; //porta para atender as requisições

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)); 
// O listen serve pra indicar uma espera naquela porta e executa a mensgame quando a aplicação iniciar
