const sqlite3 = require("sqlite3"); //drive
const sqlite = require("sqlite"); //responsael por conectar
const path = require("path"); //utilizado para salvar o banco de dado em qualquer pc


async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //salvando o banc de dados na pasta
        driver: sqlite3.Database
    });
    return database;
}

module.exports = sqliteConnection;