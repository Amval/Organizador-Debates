Ideas = new Mongo.Collection('ideas');

IdeaSchema = new SimpleSchema({
    title: {
        type: String,
        max: 140,
        label: "Título"
    },
    description: {
        type: String,
        label: "Descripción"
    },
    owner: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true
    },
    debate: {
        type: String
    },
    commentsCount: {
        type: Number,
        min: 0,
        optional: true,

    }
});

Ideas.attachSchema(IdeaSchema);

IdeaAutovalues = {
    owner: function() {
      return Meteor.userId();
    },
    createdAt: function() {
      return Date.now();
    },
    debate: function() {
      return Session.get('currentDebate');
    },
    commentsCount: function() {
      return 0;
    },
}
