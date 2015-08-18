Template.requestAccess.events({
    'click .join': function() {
        Debates.update({_id: this._id}, {$addToSet: {membershipRequest: Meteor.userId()}});
    },
    'click .cancel': function() {
        Debates.update({_id: this._id}, {$pull: {membershipRequest: Meteor.userId()}});
    },

});

Template.requestAccess.helpers({
    isMember: function() {
        debate = Debates.findOne({_id:this._id});
        return _.contains(debate.members, Meteor.userId())
    },
    hasRequested: function() {
        debate = Debates.findOne({_id:this._id});
        return _.contains(debate.membershipRequest, Meteor.userId())
    }
})
