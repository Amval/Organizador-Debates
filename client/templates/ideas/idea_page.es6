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
      _.updateActiveUsers('comments');
      // Actualizar informacion relativa al debate
      const ideaId = Session.get('currentIdea');
      Ideas.update({_id: ideaId}, {
        $inc: {commentsCount: 1},
      });
    },
})
