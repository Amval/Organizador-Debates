Template.controlPanel.events({
  'click  #agregateIdeas': function() {
    ideasCount = Ideas.find({debate: Session.get('currentDebate')}).count();
  }
});
