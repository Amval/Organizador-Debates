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
});

Template.newComment.onRendered( () => {
  $('.ui .form').form({
  title: {
    identifier: 'content',
    rules: [
      {
        type: 'empty',
        prompt: 'Introduce el contenido del comentario.'
      },
      {
        type: 'minLength[20]',
        prompt: 'El comentario es demasiado corto (Mínimo 20 caracteres).'
      },
      {
        type: 'maxLength[2500]',
        prompt: 'El comentario es demasiado largo (Máximo 2500 caracteres).'
      },
    ]
  },
 })
});
