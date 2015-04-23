Debates = new Mongo.Collection("debates");


DebateSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Título",
		max: 140
	},
	description: {
		type: String,
		label: "Descripción",
		max: 4000
	},
	owner: {
		type: String,
	},
	createdAt:  {
		type: Date,
	},
	membershipRequest: {
		optional:true,
		type: [String]
	},
	members: {
		type: [String],
	}

});

Debates.attachSchema(DebateSchema);

DebateAutoValues = {
	owner: function () {
		return Meteor.userId();
	},
	createdAt: function() {
		return Date.now();
	},
	members: function() {
		return [Meteor.userId()];
	}
}