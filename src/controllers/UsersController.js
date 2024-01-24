const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");



class UsersController { // pode ter no maximo 5 metodos ou funções

    /*

    index - GET para listar vários registros;
    show - GET para exibir um rgistro especifico;
    create - POST para criar um registro;
    update - PUT para atualizar um registro;
    delete - DELETE para remover um registro

    */



    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExist) {
            throw new AppError("este email já está em uso.");
        }

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]);

        return response.status(201).json()

    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if (!user) {
            throw new AppError("usuario nao encontrado");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("este email ja está em uso.");

        }

        user.name = name ?? user.name; //se existir algo dentro do primeiro name, entao ele permanece, se nao existir, o name anterior permanece
        user.email = email ?? user.email;

        if( password && !old_password) {
            throw new AppError("voce precisa informar a senha antiga para definir a nova senha");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            
            if (!checkOldPassword) {
                throw new AppError("a senha antiga está incorreta");
            }
            
            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
        `, [user.name, user.email, user.password, id]);

        return response.json();
    }


}

module.exports = UsersController;