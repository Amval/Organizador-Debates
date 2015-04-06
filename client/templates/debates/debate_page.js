Template.debatePage.helpers({
	debateOwner: function(id) {
		Meteor.subscribe('userData',id);
		return Meteor.user.findOne().username;
	}
})