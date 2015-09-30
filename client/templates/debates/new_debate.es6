Template.newDebate.events({

	'submit form': e => {
		_.newDocument(e,'Debate',{route:'debatePage'});
	}
})

Template.newDebate.onRendered( () => {
	// Validacion del lado del cliente
	_.standardValidation();
});
