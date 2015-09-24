Template.newDebate.events({

	'submit form': e => {
		_.newDocument(e,'Debate',{route:'debatePage'});
	}
})

Template.newDebate.onRendered( () => {
	//const editor = new MediumEditor('#description');
});
