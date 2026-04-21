import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


// / is the url pattern that this eendpoint matches. the second argument is the callback function that will be called when a request is made to this endpoint. 
// the callback function takes two arguments: req and res. req is the request object that contains information about the request, 
// and res is the response object that we can use to send a response back to the client.
app.get("/", (req, res) => {
  res.send("Hello me!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};


const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};

// edited for name and job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
  else if (job != undefined) {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result);
  } 
  else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});


const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(
    (user) => user.id === id
  );

  const deletedUser = users["users_list"].splice(index, 1);
  return deletedUser;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deletedUser = deleteUserById(id);

  res.send({
    deletedUser
  });
})