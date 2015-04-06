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
		max: 400
	},
	owner: {
		type: String,
		optional: true
	},
	createdAt:  {
		type: Date,
		optional: true,
	}

});

Debates.attachSchema(DebateSchema);

