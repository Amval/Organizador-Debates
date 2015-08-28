Template.ideaItem.helpers({
  hasVoted: (ideaId, voters) => {
    userId = Meteor.userId();
    if (_.includes(voters, userId)) {
      return true
    }
  }
});
