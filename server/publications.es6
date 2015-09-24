Meteor.publish('debates', id => Debates.find({members: id}, {sort: {activity: -1}}) );

Meteor.publish('debate', id => Debates.find({_id: id}, {limit:1}) );

Meteor.publish('userData', () => { return Meteor.users.find() } );

Meteor.publish('ideas', debateId => Ideas.find({debate: debateId}) );

Meteor.publish('idea', id => Ideas.find({_id:id},{limit: 1}) );

Meteor.publish('comments', ideaId => Comments.find({idea:ideaId}) );
