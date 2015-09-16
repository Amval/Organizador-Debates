Template.commentsAndVotes.helpers({
  hasVoted: (ideaId, voters) => {
    userId = Meteor.userId();
    if (_.includes(voters, userId)) {
      return true
    }
  }
});

Template.commentsAndVotes.events({
  /**
   * Anyade o elimina el voto de un usuario a una idea.
   * Si el usuario es duenyo de la idea, su voto es fijo.
   * @param {event} e - evento click
   */
  'click .upvote': (e) => {
    userId = Meteor.userId();
    ideaId = $(e.target).data('id');
    //
    idea = Ideas.findOne({_id: ideaId});
    console.log(idea);
    if (userId !== idea.owner) {
      if (_.includes(idea.voters, userId) ) {
        Ideas.update({_id: ideaId}, {
          $inc: {votes:-1},
          $pull: {voters: Meteor.userId()}
        });
      }
      else {
        Ideas.update({_id: ideaId}, {
          $inc: {votes:1},
          $push: {voters: Meteor.userId()}
        });
      }
    }
  },

});
