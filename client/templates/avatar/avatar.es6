Template.avatar.helpers({
  getColor: (id)=>{
    let user = Meteor.users.findOne({_id:id});
    let color = user.color;
    let fontColor = user.fontColor;
    return `background-color: ${color};color: ${fontColor}`;
  },
  getLetter: (id)=>{
    let letter= Meteor.users.findOne({_id:id}).emails[0].address[0][0].toUpperCase();
    console.log(letter);
    return letter;
  }
});
