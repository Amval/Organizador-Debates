Template.agregateIdeas.created = function() {
  this.newAgregatedIdea = new ReactiveVar(false);
  this.newAgregatedIdea.set(false);
};


Template.agregateIdeas.helpers({
  ideas: () => {
    return Ideas.find();
  },
  newAgregatedIdea: () => {
    return Template.instance().newAgregatedIdea.get()
  },
  isNotAgregated: (idea) => {
      return !idea.isAgregated;
  }
});
