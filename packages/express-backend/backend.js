import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// / is the url pattern that this eendpoint matches. the second argument is the callback function that will be called when a request is made to this endpoint. 
// the callback function takes two arguments: req and res. req is the request object that contains information about the request, 
// and res is the response object that we can use to send a response back to the client.
app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.get("/users", (req, res) => {
  res.send(users);
});