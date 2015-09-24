Template.containedIdeas.helpers({
  subscribeIdeas: (debateId) => {
    Meteor.subscribe('ideas',debateId);
  },
  getIdea: (ideaId) => {
     return Ideas.findOne(ideaId);
  }
});
