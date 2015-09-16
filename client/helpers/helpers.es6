Template.registerHelper('formatDate', (date) => {
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
  if (_.isArray(elements)) {
    elements = elements.length;
  };
  if (string!=='') {
    return `${elements} ${string}${(elements!==1 ? 's':'')}`;
  }
  else {
    return elements;
  }
});


Template.registerHelper('thereIsNone', (collection)=> {
  console.log(collection.count());
  return (collection.count() === 0);
})
