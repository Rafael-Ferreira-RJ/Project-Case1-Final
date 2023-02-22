import { Table, Container, Button } from 'react-bootstrap'
import BooksApi from './api/BooksApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [books, setBooks] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await BooksApi().getBooks().then(data => {
        return data.json()
      })
      .then(data => {
        setBooks(data)
      })
    }

    getData()
  }, [])

  async function createBook(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await BooksApi().createBook(
        req.titulo.value, Number(req.total_de_paginas.value), Number(req.paginas_lidas.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setBooks([...books, {
          id: res.bookId,
          titulo: req.titulo.value,
          total_de_paginas: Number(req.total_de_paginas.value),
          paginas_lidas: Number(req.paginas_lidas.value)
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteBook(bookId) {
    try {
      await BooksApi().deleteBook(bookId)

      const formattedBooks = books.filter(cont => {
        if(cont.id !== bookId){
          return cont
        }
      })

      setBooks(formattedBooks)
    } catch(err) {
      throw err
    }
  }

  async function updateBook(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await BooksApi().updateBook(
        selectedBook.id, req.titulo.value, Number(req.total_de_paginas.value), Number(req.paginas_lidas.value)
      )

      const formattedBooks = books.map(cont => {
        if(cont.id === selectedBook.id) {
          return {
            id: selectedBook.id,
            titulo: req.titulo.value,
            total_de_paginas: Number(req.total_de_paginas.value),
            paginas_lidas: Number(req.paginas_lidas.value)
          }
        }

        return cont
      })

      setBooks(formattedBooks)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container
    className="
    d-flex
    flex-column
    align-items-start
    justify-content-center
    h-100
    w-100
    "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir Livro
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Total de Páginas</th>
            <th>Páginas Lidas</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {books && books.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.total_de_paginas}</td>
              <td>{cont.paginas_lidas}</td>
              <td>
                <Button onClick={() => deleteBook(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedBook(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createBook={createBook} />
    {selectedBook && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateBook={updateBook} book={selectedBook} />
    )}
    </>
  )
}

export default App
