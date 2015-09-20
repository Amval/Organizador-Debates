Meteor.publish('debates', (id) => {
	return Debates.find({members: id}, {sort: {activity: -1}});
});

Meteor.publish('debate', (id) => {
	return Debates.find({_id: id}, {limit:1});
});

Meteor.publish('userData', () => {
	return Meteor.users.find();
});

Meteor.publish('ideas', (debateId) => {
    return Ideas.find({debate: debateId});
});

Meteor.publish('idea', (id) => {
    return Ideas.find({_id:id},{limit: 1});
});

Meteor.publish('comments', (ideaId) => {
    return Comments.find({idea:ideaId});
});
