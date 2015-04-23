Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY')
});

Template.registerHelper('whoIs', function(id) {
    return Meteor.users.findOne({_id:id}).emails[0].address;
});

Template.registerHelper('isOwner', function(id) {
    if (Meteor.userId() == id) {
        return true;
    }
});

