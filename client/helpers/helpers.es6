Template.registerHelper('formatDate', (date) => {
  moment.locale('es');
  return moment(date).fromNow();
  //return moment(date).format('DD-MM-YYYY');
});

Template.registerHelper('whoIs', (id) => {
    return Meteor.users.findOne({_id:id}).emails[0].address;
});

Template.registerHelper('isOwner', (id) => {
    if (Meteor.userId() == id) {
        return true;
    }
});

Template.registerHelper('whoAmI', (id) => {
  return Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
});

Template.registerHelper('log', (arg) => {
  console.log(arg);
});

Template.registerHelper('howMany', (elements, string) => {
  //return (elements!==1) ? `${elements} ${string}s` : `${elements} ${string}`
  return `${elements} ${string}${(elements!==1 ? 's':'')}`;
});
