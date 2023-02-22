import { Modal, Button, Form } from 'react-bootstrap'

function UpdateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateBook(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Livro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Título
            </Form.Label>
            <Form.Control defaultValue={props.book.titulo} type="varchar" />
          </Form.Group>

          <Form.Group controlId="total_de_paginas">
            <Form.Label>
              Total de Páginas
            </Form.Label>
            <Form.Control defaultValue={props.book.total_de_paginas} type="number" />
          </Form.Group>

          <Form.Group controlId="paginas_lidas">
            <Form.Label>
              Páginas Lidas
            </Form.Label>
            <Form.Control defaultValue={props.book.paginas_lidas} type="number" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateModal
