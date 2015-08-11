Template.debatePage.created = function() {
    this.newIdea = new ReactiveVar(false);
    this.newIdea.set(false);
};

Template.debatePage.helpers({
	debateOwner: function(id) {
		return Meteor.users.findOne({_id:id}).emails[0].address;
	},
    accessRequest: function() {
        if (this.membershipRequest && this.membershipRequest.length > 0) {
            return true;
        }
    },
    newIdea: function() {
      return Template.instance().newIdea.get()
    },
    ideas: function() {
      return Ideas.find();
    },
  minimumIdeas: function() {
    min = 2;
    ideasCount = Ideas.find({debate: Session.get('currentDebate')}).count();
    return ideasCount > 2;
  }

});


Template.debatePage.events({
    'click .grant-access': function(e) {
        memberId = e.currentTarget.id;
        debateId = Session.get('currentDebate');
        Debates.update({_id: debateId}, {$addToSet: {members: memberId}});
        Debates.update({_id: debateId}, {$pull: {membershipRequest: memberId}});

    },
    // Cambia valor entre 'true' y 'false' de 'newIdea'.
    // Su valor rige la inserción dinámica de un formulario para
    // anyadir nuevas ideas.
    'click #new-idea': function(e) {
      //Template.instance().newIdea.set(!Template.instance().newIdea.get());
      _.switch(Template.instance().newIdea);
    },

    'submit form': function(e) {
        e.preventDefault();

        var idea = _.processForm(e, IdeaSchema, IdeaAutovalues);
        Ideas.insert(idea, {validationContext: "insertForm"}, function(error, result) {
            console.log(error)
        });

        debateId = Session.get('currentDebate');
        Debates.update({_id: debateId}, {$inc: {ideasCount: 1}});

        $('.form')[0].reset();
        Template.instance().newIdea.set(false);



    },
});
