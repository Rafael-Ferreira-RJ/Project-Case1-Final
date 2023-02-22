const BooksApi = () => {
    const url = 'http://localhost:8080'
  
    return {
        getBooks () {
            return fetch(`${url}/livro`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deleteBook (bookId) {
          return fetch(`${url}/livro/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        },
        createBook (titulo, total_de_paginas, paginas_lidas) {
          return fetch(`${url}/livro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_paginas: total_de_paginas,
                paginas_lidas: paginas_lidas
              }
            )
         })
        },
        updateBook(bookId, titulo, total_de_paginas, paginas_lidas) {
          return fetch(`${url}/livro/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_paginas: total_de_paginas,
                paginas_lidas: paginas_lidas
              }
            )
         })
        },
    }
  }
  
  export default BooksApi