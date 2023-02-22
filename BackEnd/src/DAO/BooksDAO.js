// Importação do arquivo "db.js"
const db = require("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class BooksDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM LIVROS';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos ao usuário.
    static inserir(livro) {
        const query = 'INSERT INTO LIVROS (titulo, total_de_paginas, paginas_lidas) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [livro.titulo, livro.total_de_paginas, livro.paginas_lidas], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir o livro",
                        erro: err,
                    });
                }
                resolve(livro);
            });
        });
    }

    // DELETE -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM livros WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o livro",
                        erro: err
                    });
                }
                resolve({ mensagem: "Livro deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book atualizado com sucesso" }
    static atualizar(id, livro) {
        const query = 'UPDATE LIVROS SET titulo = ?, total_de_paginas = ?, paginas_lidas = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [livro.titulo, livro.total_de_paginas, livro.paginas_lidas, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o livro",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Book atualizado com sucesso" });
            });
        });
    }

}

// Exportação da classe
module.exports = BooksDAO