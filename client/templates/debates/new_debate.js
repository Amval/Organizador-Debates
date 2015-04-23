Template.newDebate.events({
	'submit form': function(e) {
		e.preventDefault();
/*
		var debate = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
		};

*/
		debate = _.processForm(e, DebateSchema, DebateAutoValues);
		var  schemaContext = DebateSchema.namedContext("insertForm");
		Debates.insert(debate, {validationContext: "insertForm"}, function(error, result) {
			console.log(error)	
		});
		Router.go('debatesList');
	}
})

