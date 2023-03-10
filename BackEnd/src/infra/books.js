// Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Livros

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const BOOKS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "LIVROS" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "titulo" varchar(90),
    "total_de_paginas" number,
    "paginas_lidas" number
);`;

// // inserção dos registros na tabela books.
// const ADD_BOOKS_DATA = `
// INSERT INTO books (id, titulo, total_de_paginas, paginas_lidas)
// VALUES
// (1, 'Pai Rico, Pai Pobre', 336, 7),
// (2, 'Pedagogia do Oprimido', 256, 153),
// (3, 'Investimentos inteligentes', 256, 250),
// (4, '20 regras de ouro para educar filhos e alunos', 208, 0),
// (5, 'Pais brilhantes, professores fascinantes', 176, 150),
// (6, 'É assim que acaba', 368, 0),
// (7, 'A revolução dos bichos', 152, 75),
// (8, 'O Diário Perdido de Gravity Falls', 288, 83),
// (9, 'A garota do lago', 296, 0),
// (10, 'Guardiola confidencial', 416, 12)
// `

// Função responsável por criar a tabela "BOOKS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function createTableBooks() {
    db.run(BOOKS_SCHEMA, (error)=> {
      if (error) console.log("Erro ao criar tabela de livros");
    });
}

// // Função responsável pela inserção dos registros na tabela "BOOKS" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
// function populateTableBooks() {
//     db.run(ADD_BOOKS_DATA, (error)=> {
//         if(error) console.log("Erro ao popular tabela de books");
//     });
// }

// Funções executadas de forma síncrona, uma após a outra, dentro da função serialize(). Ao final da execução dessas funções, o banco de dados estará criado e populado com as informações fornecidas.
db.serialize( ()=> {
    createTableBooks();
    //populateTableBooks();
});