Meteor.publish('debates', function() {
	return Debates.find();
});

Meteor.publish('debate', function(id) {
	return Debates.find({_id: id});
});

Meteor.publish('userData', function(id) {
	return Meteor.users.find({_id: id});
})