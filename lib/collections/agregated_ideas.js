AgregatedIdeas = new Mongo.Collection('agregatedIdeas');

AgregatedIdeaSchema = new SimpleSchema({
  title: {
    type: String,
    max: 140,
    label: "Título"
  },
  description: {
    type:String,
    label: "Descripción"
  },
  owner: {
    type: String,
    optional: true
  },
  debate: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  ideas: {
    type: [String],
    min: 2
  }
});

AgregatedIdeas.attachSchema(AgregatedIdeaSchema);

AgregatedIdeaAutovalues = {
  owner: function() {
    return Meteor.userId();
  },
  createdAt: function() {
    return Date.now();
  },
  debate: function() {
    return Session.get('currentDebate');
  },

};
