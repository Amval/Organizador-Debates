Comments = new Mongo.Collection('comments');

CommentSchema = new SimpleSchema({
  title: {
    label: "Título",
    type: String,
    optional: true
  },
  content: {
    label: "Comentario",
    type: String
  },
  owner: {
    type: String
  },
  createdAt: {
    type: Date
  },
  idea: {
    type: String
  }
});

Comments.attachSchema(CommentSchema);

CommentAutovalues = {
  owner: function() {
    return Meteor.userId();  
  }, 
  createdAt: function() {
    return Date.now();  
  },
  idea: function() {
    return Session.get('currentIdea');  
  }, 

}
