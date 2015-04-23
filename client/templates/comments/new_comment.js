Template.newComment.events({
    'submit form': function(e) {
        e.preventDefault();

        comment = _.processForm(e, CommentSchema, CommentAutovalues);
        Comments.insert(comment, {validationContext: "insertForm"}, function(error, result) {
            console.log(error)  
        });

        $('.form')[0].reset();
        this.newComment.set(false);

    }
});
