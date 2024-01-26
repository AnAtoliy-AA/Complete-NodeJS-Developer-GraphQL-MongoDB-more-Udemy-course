const model = require("../models/friends");

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);

  const friend = model.find((friend) => friend.id === friendId);

  if (!friend) {
    res.status(404).json({ error: "No friends found" });
  }

  res.status(200).json(friend);
}

function postFriend(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing friend name" });
  }

  const newFriend = {
    name,
    id: model.length,
  };

  model.push(newFriend);

  res.json(newFriend);
}

module.exports = {
  getFriend,
  getFriends,
  postFriend,
};
