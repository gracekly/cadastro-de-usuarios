const sqliteConnection = require('../../sqlite'); //immpotar conexao

const createUsers = require('./createUsers');

async function migrationsRun(){ //função para executar as tabelas
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas)) //executa os schemas
    .catch(error => console.error(error));
}

module.exports = migrationsRun;