const path = require('path');

function getMessages(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'mountain.jpg'))
  // res.send("<ul><li>Hello there!</li></ul>");
}

function postMessage(req, res) {
    const friendId = Number(req.params.friendId);
  
    const friend = friends.find((friend) => friend.id === friendId);
  
    if (!friend) {
      res.status(404).json({ error: "No friends found" });
    }
  
    res.status(200).json(friend);
  }

module.exports = {
  getMessages,
  postMessage,
};
