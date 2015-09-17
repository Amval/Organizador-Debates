Template.ideaPage.created = function() {
    this.newComment = new ReactiveVar(false);
    this.newComment.set(false);
};

Template.ideaPage.helpers({
    newComment: () => {
      return Template.instance().newComment.get();
    },
    comments: () => {
        return Comments.find();
    }
});


Template.ideaPage.events({
    'click #new-comment': (e) => {
        e.preventDefault();
        _.switch("newComment");
    },

    'submit form': (e) => {

      _.newDocument(e, 'Comment');
      _.cleanForm('newComment');
        // Actualizar informacion relativa al debate
        debateId = Session.get('currentDebate');
        Debates.update({_id: debateId}, {
          $set: {activity: Date.now()},
          $inc: {commentsCount: 1},
          $push: {activeUsers: {$each: [Meteor.userId()], $sort: 1, $slice: -4}}
        });
        // Actualizar informacion relativa al debate
        ideaId = Session.get('currentIdea');
        Ideas.update({_id: ideaId}, {
          $inc: {commentsCount: 1},
        });
    },
})
