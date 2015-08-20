/**
 * Coleccion de Comentarios
 */
Comments = new Mongo.Collection('comments');

/**
 * Esquema de Comentarios.
 * Para poder insertarse un nuevo elemento a esta coleccion, ha de cumplit el esquema.
 */
CommentSchema = new SimpleSchema({
  content: {
    label: "Comentario",
    type: String
  },
  owner: {
    type: String
  },
  createdAt: {
    type: Date
  },
  idea: {
    type: String
  }
});

/**
 * Anyade el esquema a la coleccion.
 */
Comments.attachSchema(CommentSchema);

/**
 * Funciones para la insercion automatica de valores
 */
CommentAutovalues = {
  owner: function() {
    return Meteor.userId();
  },
  createdAt: function() {
    return Date.now();
  },
  idea: function() {
    return Session.get('currentIdea');
  },

}
