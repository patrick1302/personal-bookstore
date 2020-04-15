import React from "react";
import Book from "./pages/Book";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <>
      <ReactNotification />
      <Book />
    </>
  );
}

export default App;
