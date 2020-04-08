import React, { useState, useEffect } from "react";
import { MdDelete, MdDone, MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import api from "../../services/api";

import "./style.css";

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
      const response = await api.get("/books");
      setBooks(response.data);
    }
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      const book = books.filter((book) => book._id !== id);
      setBooks(book);
    } catch (err) {
      console.log("Não foi possível deletar o livro");
    }
  };
  const addBook = async () => {
    await api.post("/books", { ...values });
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

  return (
    <>
      <div className="now">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca"
        />
        <button>
          <a href="#addModal" className="modal-open">
            Clique para cadastrar um novo livro
          </a>
        </button>
      </div>
      <main className="main-container">
        {filteredBooks.map((book) => (
          <div className="box" key={book._id}>
            <div className="img-box">
              <img alt={book.title} src={book.image} />
            </div>
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
              <button onClick={() => deleteBook(book._id)}>
                <MdDelete size={20} />
              </button>
              <button>
                <FaEdit size={20} />
              </button>
            </div>
          </div>
        ))}
        <div className="modal__" id="addModal">
          <div className="modal__content">
            <a href="#" className="modal__close">
              &times;
            </a>
            <h2 className="modal__heading">Cadastrar novo livro</h2>
            <label>Título:</label>
            <input
              type="text"
              placeholder="Título do livro"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
            <label>Autor:</label>
            <input
              type="text"
              placeholder="Nome do autor"
              name="author"
              onChange={handleChange}
              value={values.author}
            />
            <label>Editora:</label>
            <input
              type="text"
              placeholder="Nome da editora"
              name="publisher"
              onChange={handleChange}
              value={values.publisher}
            />
            <label>URL da imagem</label>
            <input
              type="text"
              placeholder="Título do livro"
              name="image"
              onChange={handleChange}
            />
            <label>Possui esse livro?</label>
            <select
              name="acquired"
              value={values.acquired}
              onChange={handleChange}
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>

            <button onClick={() => addBook()}>Cadastrar</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
