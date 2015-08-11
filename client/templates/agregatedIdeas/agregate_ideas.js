Template.agregateIdeas.created = function() {
  this.newAgregatedIdea = new ReactiveVar(false);
  this.newAgregatedIdea.set(false);
};


Template.agregateIdeas.helpers({
  ideas: function(){
    return Ideas.find();
  },
  newIdea: function() {
    return Template.instance().newIdea.get()
  }
});


Template.agregateIdeas.events({
  "click #newAgregatedIdea": function(e){
    _.switch(Template.instance().newAgregatedIdea);
  }
});
