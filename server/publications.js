Meteor.publish('debates', function() {
	return Debates.find();
});

Meteor.publish('debate', function(id) {
	return Debates.find({_id: id});
});

Meteor.publish('userData', function() {
	return Meteor.users.find();
});

Meteor.publish('ideas', function(debateId) {
    return Ideas.find({debate: debateId});
});

Meteor.publish('idea', function(id) {
    return Ideas.find({_id:id});
});

Meteor.publish('comments', function(ideaId) {
    return Comments.find({idea:ideaId});
});



