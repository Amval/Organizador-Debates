

Template.debatesList.helpers({
	debates: function() {
		return Debates.find();
	}
});