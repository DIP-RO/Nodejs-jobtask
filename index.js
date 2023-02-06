const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./controllers/middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/creators", require("./routes/creatorRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.get("/api/contacts", (req, res) => {
  res.send("Get all contacts");
});
app.get("/api/creators", (req, res) => {
  res.send("Get all creators");
});

// Create a paginated api listing all creators containing all information required to  render ‘All Creators Screen’
//demo

const allCreators = [
  {
    id: 1,
    name: "Creator 1",
    avatar: "https://example.com/avatar1.png",
    bio: "Bio for creator 1",
    totalFollowers: 1000,
  },
  {
    id: 2,
    name: "Creator 2",
    avatar: "https://example.com/avatar2.png",
    bio: "Bio for creator 2",
    totalFollowers: 2000,
  },
];

const ITEMS_PER_PAGE = 10;

app.get("/allCreators", (req, res) => {
  const page = Number(req.query.page) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCreators = creators.slice(startIndex, endIndex);
  res.send(paginatedCreators);
});

//   Create a Donation API which stores all the information when a creator donates another creator.
//   Payload consists => currency, amount, name, message and to creator

//   Note: This api is protected, meaning the creator who is logged in can only call this api demo

let donations = [];

app.use((req, res, next) => {
  const { loggedInCreator } = req;
  if (!loggedInCreator) return res.status(401).send("Unauthorized");
  next();
});

app.post("/donate", (req, res) => {
  const { currency, amount, name, message, toCreator } = req.body;
  const { loggedInCreator } = req;
  donations = [
    ...donations,
    {
      fromCreator: loggedInCreator,
      toCreator,
      currency,
      amount,
      name,
      message,
    },
  ];
  res.send("Donation successful");
});

// Create an api to return all donations from a particular creator A to a particular creator B

// Note:
//  This api is protected, meaning the creator who is logged in can only call this api demo.

app.use((req, res, next) => {
  const { loggedInCreator } = req;
  if (!loggedInCreator) return res.status(401).send("Unauthorized");
  next();
});

app.get("/donations/:fromCreator/:toCreator", (req, res) => {
  const { fromCreator, toCreator } = req.params;
  const donationsFromAtoB = donations.filter(
    (d) => d.fromCreator === fromCreator && d.toCreator === toCreator
  );
  res.send(donationsFromAtoB);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
