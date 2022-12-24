const users = [];

exports.addUser = ({ id, name, room }) => {
  name = name?.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user?.room === room && user?.name === name
  );
  if (existingUser) {
    return { error: "Username is taking choose another" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};
exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index) {
    return users.splice(index, 1)[0];
  }
};
exports.getUser = (id) => {
 return users.find((user) => user?.id === id);
};
exports.getUsersInRoom = (room) => {
 return users.find((user) => user?.room === room);
};
