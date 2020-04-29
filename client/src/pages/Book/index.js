import React, { useState, useEffect } from "react";
import { MdDelete, MdDone, MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Cookie from "js-cookie";

import { store } from "react-notifications-component";

import api from "../../services/api";

import "./style.css";

const notification = (message, type) => {
  store.addNotification({
    message,
    type,
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
const inicialValue = {
  title: "",
  author: "",
  image: "",
  publisher: "",
  acquired: false,
};

function App() {
  const [books, setBooks] = useState([]);
  const [values, setValues] = useState(inicialValue);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const authToken = Cookie.get("auth");
      console.log(authToken);
      const { data } = await api.get("/books", {
        headers: { Authorization: authToken },
      });
      setBooks(data);
    }
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const authToken = Cookie.get("auth");
      await api.delete(`/books/${id}`, {
        headers: { Authorization: authToken },
      });
      const book = books.filter((book) => book._id !== id);
      setBooks(book);
      notification("Livro deletado com sucesso", "success");
    } catch (err) {
      console.log(err);
      notification("Não foi possível deletar o livr", "danger");
    }
  };
  const addBook = async () => {
    try {
      const authToken = Cookie.get("auth");
      await api.post(
        "/books",
        { ...values },
        { headers: { Authorization: authToken } }
      );
      notification("O livro foi adicionado com sucesso.", "success");
    } catch (err) {
      console.log(err);
      notification("Não foi possível adicionar o livro.", "danger");
    } finally {
      setBooks([...books, { ...values, _id: String(Date.now()) }]);
      setValues(inicialValue);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const showEditModal = async (id) => {
    const authToken = Cookie.get("auth");
    try {
      const { data } = await api.get(`/book/${id}`, {
        headers: { Authorization: authToken },
      });
      setValues(data);
    } catch (e) {
      console.log(e);
    }
  };

  const edit = async (id) => {
    const authToken = Cookie.get("auth");
    try {
      await api.put(`/book/${id}`, values, {
        headers: { Authorization: authToken },
      });
      notification("As informações foram editadas com sucesso", "success");
    } catch (err) {
      console.log(err);
      notification("Não foi possível editar as informações", "danger");
    }
  };

  return (
    <>
      <main className="main-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca"
        />

        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addModal"
        >
          Clique para cadastrar um novo livro
        </button>

        {filteredBooks.map((book, index) => (
          <div className="box" key={book._id}>
            <img alt={book.title} src={book.image} width="150" height="180" />

            <div className="content-box">
              <p>
                <strong>Título: </strong>
                {book.title}
              </p>
              <p>
                <strong>Autor: </strong>
                {book.author}
              </p>
              <p>
                <strong>Editora: </strong>
                {book.publisher}
              </p>
              <p>
                <strong>Adquirido: </strong>
                {book.acquired ? (
                  <MdDone size={18} color="#0d6a0a" />
                ) : (
                  <MdClose size={18} color="#e02041" />
                )}
              </p>
            </div>
            <div className="button-box">
              <a onClick={() => deleteBook(book._id)}>
                <MdDelete size={20} />
              </a>

              <button
                onClick={() => showEditModal(book._id)}
                data-toggle="modal"
                data-target="#editModal"
              >
                <FaEdit size={20} />
              </button>
            </div>
          </div>
        ))}

        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Cadastrar novo livro
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>
                    <strong>Título:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Título do livro"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Autor:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome do autor"
                    name="author"
                    onChange={handleChange}
                    value={values.author}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Editora: </strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da editora"
                    name="publisher"
                    onChange={handleChange}
                    value={values.publisher}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>URL da imagem</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="URL da imagem"
                    name="image"
                    onChange={handleChange}
                    value={values.image}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <strong>Já possui esse livro?</strong>
                  </label>
                  <select
                    name="acquired"
                    value={values.acquired}
                    onChange={handleChange}
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => addBook()}
                  className="btn btn-primary"
                >
                  Adicionar novo livro
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Editar livro
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>
                    <strong>Título:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Título do livro"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Autor:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome do autor"
                    name="author"
                    onChange={handleChange}
                    value={values.author}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Editora: </strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da editora"
                    name="publisher"
                    onChange={handleChange}
                    value={values.publisher}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>URL da imagem</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="URL da imagem"
                    name="image"
                    onChange={handleChange}
                    value={values.image}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <strong>Possui esse livro?</strong>
                  </label>
                  <select
                    name="acquired"
                    value={values.acquired}
                    onChange={handleChange}
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => edit(values._id)}
                  className="btn btn-primary"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
