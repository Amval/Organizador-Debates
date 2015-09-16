Template.ideaPage.created = function() {
    this.newComment = new ReactiveVar(false);
    this.newComment.set(false);
};

Template.ideaPage.helpers({
    newComment: function() {
      return Template.instance().newComment.get();
    },
    comments: function() {
        return Comments.find();
    }
});


Template.ideaPage.events({
    'click #new-comment': function(e) {
        e.preventDefault();
        _.switch("newComment");
    },

    'submit form': function(e) {
        e.preventDefault();
        // Leer formulario e insetar comentario
        var comment = _.processForm(e, CommentSchema, CommentAutovalues);
        Comments.insert(comment, {validationContext: "insertForm"}, function(error, result) {
            console.log(error)
        });
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


        $('.form')[0].reset();
        Template.instance().newComment.set(false);



    },
})
