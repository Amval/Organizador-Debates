Template.newDebate.events({
	'submit form': function(e) {
		e.preventDefault();

		var debate = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			owner: Meteor.userId(),
			createdAt: Date.now()
		};

		//var  schemaContext = DebateSchema.namedContext("insertForm");
		Debates.insert(debate, {validationContext: "insertForm"}, function(error, result) {
			console.log(error)	
		});
		Router.go('debatesList');
	}
})