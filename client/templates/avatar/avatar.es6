const getColor = (id) => {
  const user = Meteor.users.findOne({_id:id});
  const color = user.color;
  const fontColor = user.fontColor;
  return `background-color: ${color};color: ${fontColor}`;
};

const getLetter = (id) => {
  const letter = Meteor.users.findOne({_id:id}).emails[0].address[0][0].toUpperCase();
  return letter;
};

const registerDate = (id) => {
  const createdAt =  Meteor.users.findOne({_id:id}).createdAt;
  return moment(createdAt).fromNow();
};


Template.avatar.helpers({
  getColor: getColor,
  getLetter: getLetter,
  registerDate: registerDate
});

Template.bigAvatar.helpers({
  getColor: getColor,
  getLetter: getLetter,
  registerDate: registerDate
});


Template.avatar.onRendered(() => {
  $('.popup .avatar').popup()
});

Template.bigAvatar.onRendered(() => {
  $('.popup .avatar').popup()
});
