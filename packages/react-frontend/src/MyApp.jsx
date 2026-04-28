import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
  {
    name: "Charlie",
    job: "Janitor",
  },
  {
    name: "Mac",
    job: "Bouncer",
  },
  {
    name: "Dee",
    job: "Aspring actress",
  },
  {
    name: "Dennis",
    job: "Bartender",
  },
];

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character) => character._id !== id);
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json()
        }
      })
      .then((newUser) => { // newUser is the response from the backend, which includes the generated id also the return res.json()
        setCharacters([...characters, newUser]); // newUser has the id yay
      })
      .catch((error) => {
        console.log(error);
      });
  } 

  // from backend.js run
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
    </div>
  );
}




export default MyApp;