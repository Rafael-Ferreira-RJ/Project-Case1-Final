import { Modal, Button, Form } from 'react-bootstrap'

function CreateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.createBook(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Inserir Livro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Título
            </Form.Label>
            <Form.Control type="varchar" />
          </Form.Group>

          <Form.Group controlId="total_de_paginas">
            <Form.Label>
              Total de Páginas
            </Form.Label>
            <Form.Control type="integer" />
          </Form.Group>

          <Form.Group controlId="paginas_lidas">
            <Form.Label>
              Páginas Lidas
            </Form.Label>
            <Form.Control type="integer" />
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

export default CreateModal
