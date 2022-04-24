const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));



const {User, Thought} = require('./models');
const { db } = require("./models/User");

app.get('/api/users', (req, res) => {
  User.find({})
  .then(User => {
    res.json(User);
  })
  .catch(err => {
    res.json(err);
  });
});

app.get('/api/users/:id', ({ params }, res) => {
  User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(UserData => res.json(UserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
})

app.post('/api/users', ({ body }, res) => {
    User.create(body)
      .then(UserData => res.json(UserData))
      .catch(err => res.json(err))
});

app.put('/api/users/:id', ({ params, body }, res) => {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(UserData => {
      if (!UserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(UserData);
    })
    .catch(err => res.json(err));
});

app.delete('/api/users/:id', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then(UserData => res.json(UserData))
    .catch(err => res.json(err))
});

app.post('/api/users/:userId/friends/:friendId', ({ params }, res) => {
  User.findOneAndUpdate(
    { _id: params.id },
    { $push: { friends: params.friendId } },
    { new: true }
  )
  .then(UserData => {
    if (!UserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(UserData);
  })
  .catch(err => res.json(err));
});


app.delete('/api/users/:userId/friends/:friendId', ({ params }, res) => {
  User.findOneAndUpdate(
    { _id: params.id },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
  .then(UserData => {
    if (!UserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(UserData);
  })
  .catch(err => res.json(err));
});

app.get('/api/thoughts', ( req, res) => {
  Thought.find({})
    .then(UserData => res.json(UserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});


app.get('/api/thoughts/:id', ({ params }, res) => {
  Thought.findOne({ _id: params.id })
    .then(UserData => res.json(UserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post('/api/thoughts', ({ body }, res) => {
  Thought.create(body)
    .then(UserData => res.json(UserData))
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.pizzaId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .catch(err => res.json(err))
});