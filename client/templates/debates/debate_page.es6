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
      _.switch("newIdea");
    },

    'submit form': function(e) {

        _.newDocument(e, 'Idea',{});
        _.cleanForm('newIdea');
        // Actividad
        debateId = Session.get('currentDebate');
        Debates.update({_id: debateId}, {
          $set: {activity: Date.now()},
          $inc: {ideasCount: 1},
          $push: {activeUsers: {$each: [Meteor.userId()], $sort: 1, $slice: -4}}
        });

    },


});
