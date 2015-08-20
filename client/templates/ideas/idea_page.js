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
        _.switch(Template.instance().newComment);
    },

    'submit form': function(e) {
        e.preventDefault();

        var comment = _.processForm(e, CommentSchema, CommentAutovalues);
        Comments.insert(comment, {validationContext: "insertForm"}, function(error, result) {
            console.log(error)
        });

        debateId = Session.get('currentDebate');
        Debates.update({_id: debateId}, {
          $set: {activity: Date.now()},
          $inc: {ideasCount: 1},
          $push: {activeUsers: {$each: [Meteor.userId()], $sort: 1, $slice: -4}}
        });


        $('.form')[0].reset();
        Template.instance().newIdea.set(false);



    },
})
