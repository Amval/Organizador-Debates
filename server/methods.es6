Meteor.methods({
    'requireMembership': (userId, currentDebate) => {
      members = Debates.findOne({_id:currentDebate}).members;
      return _.includes(members,userId);
    }
});
