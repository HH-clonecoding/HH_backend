const add = 1;
const test2 = 1;

const userId = add;

const test = (userId, test2) => {
  console.log(userId);
  console.log(test2);
  const good = userId + test2;

  return console.log(good);
};

test(test2);
