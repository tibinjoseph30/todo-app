import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  Row,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import "./todo.css";

class Todo extends Component {
  state = {
    input: "",
    todos: [],
    currentIndex: 0,
    warning: false,
    warningmessage: "",
    noDataWarningMessage: "No todos added yet!",
    modal: false,
    inputEdit: "",
    currentPage: 1,
    todosPerPage: 3,
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  addTodo = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if (input === "") {
      this.setState({
        warning: true,
        warningmessage: "Please type a todo name first!",
      });
    } else {
      this.setState({
        warning: false,
        warningmessage: "",
        todos: [...this.state.todos, input],
        input: "",
      });
    }
  };

  deleteTodo = (key) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((data, index) => index !== key),
    });
  };

  editTodo = (key) => {
    this.setState({
      modal: !this.state.modal,
      inputEdit: this.state.todos.filter((data, index) => index === key.index),
      currentIndex: key.index,
    });
    console.log(key.index);
  };

  editHandleChange = (event) => {
    this.setState({
      inputEdit: event.target.value,
    });
  };

  updateTodo = (event, key) => {
    event.preventDefault();
    const { inputEdit } = this.state;
    const updateTodos = [...this.state.todos];

    updateTodos[this.state.currentIndex] = inputEdit;
    this.setState({
      todos: updateTodos,
      modal: !this.state.modal,
    });
  };

  pageClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    const { input, todos, inputEdit, currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const indexOfCurrentTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = indexOfCurrentTodo.map((item, index) => (
      <ListGroupItem key={index}>
        {item}
        <Button
          color="primary"
          className="ml-auto"
          size="sm"
          onClick={() => this.editTodo({ index })}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
        <Button
          color="danger"
          className="ml-2"
          size="sm"
          onClick={() => this.deleteTodo(index)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </ListGroupItem>
    ));

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
      <PaginationItem key={number}>
        <PaginationLink href="#" id={number} onClick={this.pageClick}>
          {number}
        </PaginationLink>
      </PaginationItem>
    ));

    return (
      <div>
        <Container>
          <Row>
            <Col md={6} className="mx-auto pt-5">
              <h3 className="text-white text-center">Todos</h3>
              <div className="todo-container mt-3 mb-4">
                <form onSubmit={this.addTodo}>
                  <div className="d-flex">
                    <Input
                      type="text"
                      placeholder="type todo"
                      value={input}
                      onChange={this.handleChange}
                    />
                    <Button color="primary" className="ml-3 px-4">
                      Add
                    </Button>
                  </div>
                </form>
                {this.state.warning && (
                  <Alert color="warning" className="mt-3 mb-0">
                    {this.state.warningmessage}
                  </Alert>
                )}
              </div>
              <ListGroup className="todo-list mb-3">
                {todos.length === 0 ? (
                  <Alert color="warning" className="mb-0">
                    {this.state.noDataWarningMessage}
                  </Alert>
                ) : (
                  renderTodos
                )}
              </ListGroup>
              <Pagination aria-label="Page navigation example">
                {renderPageNumbers}
              </Pagination>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.editTodo}>
          <form onSubmit={this.updateTodo}>
            <ModalHeader toggle={this.editTodo} className="border-0">
              Edit Todo
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                value={inputEdit}
                onChange={this.editHandleChange}
              />
            </ModalBody>
            <ModalFooter className="border-0">
              <Button color="primary">Update</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Todo;
