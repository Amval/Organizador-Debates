Accounts.onCreateUser(function(options, user) {
  [user.color, user.fontColor] = randomColor();
  return user;
});

const randomColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = ((Math.random() * 40) + 40);
  const l = ((Math.random() * 30) + 40);
  const l2 = 82;
  const color = `hsl(${h},${s}%,${l}%)`
  const fontColor = `hsl(${h},${s}%,${l2}%)`
  return [color, fontColor];
}
