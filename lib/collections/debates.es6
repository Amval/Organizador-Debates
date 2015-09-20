Debates = new Mongo.Collection("debates");

/**
 * DEBATE
 * Esquema que han de cumplir los nuevos documentos.
 * - titulo
 * - descripcion
 * - Dueño del debate
 * - Fecha de creacion
 * - Array con userId de posibles participantes.
 * - Numero de comentarios
 * - Numero de votos
 * - Actividad (fecha de ultima idea/comentario introducida)
 * - userId de ultimos participantes (añadieron nueva idea/comentario)
 * - Numero de visitas a la página
 */
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
	},
	ideasCount: {
		type: Number,
		min: 0,
		optional: true
	},
	commentsCount: {
		type: Number,
		min: 0,
		optional: true
	},
	activity: {
		optional: true,
		type: Date
	},
	activeUsers: {
		type: [String]
	},
	views: {
		type: Number,
		min: 0
	}

});

Debates.attachSchema(DebateSchema);

DebateAutovalues = {
	owner: () => {
		return Meteor.userId();
	},
	createdAt: () => {
		return Date.now();
	},
	members: () => {
		return [Meteor.userId()];
	},
	ideasCount: () => {
		return 0;
	},
	commentsCount: () => {
		return 0;
	},
	activity: () => {
		return Date.now();
	},
	activeUsers: () => {
		return [Meteor.userId()];
	},
	views: () => {
		return 0;
	},
}
