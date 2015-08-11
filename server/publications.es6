Meteor.publish('debates', () => {
	return Debates.find();
});

Meteor.publish('debate', (id) => {
	return Debates.find({_id: id});
});

Meteor.publish('userData', () => {
	return Meteor.users.find();
});

Meteor.publish('ideas', (debateId) => {
    return Ideas.find({debate: debateId});
});

Meteor.publish('idea', (id) => {
    return Ideas.find({_id:id});
});

Meteor.publish('comments', (ideaId) => {
    return Comments.find({idea:ideaId});
});
