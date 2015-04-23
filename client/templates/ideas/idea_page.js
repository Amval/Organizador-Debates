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
        Template.instance().newComment.set(!Template.instance().newComment.get());
    }
})