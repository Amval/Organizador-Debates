Ideas = new Mongo.Collection('ideas');

/**
 * IDEA
 * Esquema que han de cumplir los nuevos documentos.
 * - titulo
 * - descripcion
 * - Dueño de la idea
 * - Array de etiquetas
 * - Fecha de creacion
 * - Debate al que pertenece la Idea
 * - Numero de comentarios
 * - Numero de votos
 * - userId de los votantes
 * - Ha sido agregada?
 * - Contiene otras Ideas?
 * - Ideas que contiene
 */
IdeaSchema = new SimpleSchema({
    title: {
        type: String,
        max: 140,
        label: "Título"
    },
    description: {
        type: String,
        label: "Descripción"
    },
    owner: {
        type: String,
        optional: true
    },
    tags: {
      type: [String],
      optional: true,
    },
    createdAt: {
        type: Date,
        optional: true
    },
    debate: {
        type: String
    },
    commentsCount: {
        type: Number,
        min: 0,
    },
    votes: {
      type: Number,
      min: 1
    },
    voters: {
      type: [String],
    },
    isAgregated:  {
      type: Boolean,
    },
    containsIdeas: {
      type: Boolean,
    },
    ideas: {
      type: [String],
    },

});

Ideas.attachSchema(IdeaSchema);
/**
 * Contiene funciones para el poblado automatico de un nuevo elemento de la coleccion.
 */
IdeaAutovalues = {
  /**
   * Devuelve el id de Usuario al que pertenece el nuevo documento.
   * @return {String} - userId
   */
    owner: () => {
      return Meteor.userId();
    },
    /**
     * Devuelve el objeto fecha del momento de creacion del documento.
     * @return {Date} - fecha
     */
    createdAt: () => {
      return Date.now();
    },
    /**
     * Devuelve el id del Debate al que pertene el documento
     * @return {String} - debateId
     */
    debate: () => {
      return Session.get('currentDebate');
    },
    /**
     * Devuelve el numero inicial de comentarios del nuevo documento.
     * @return {number} - numero inicial de comentarios
     */
    commentsCount: () => {
      return 0;
    },
    /**
     * Devuelve las etiquetas relacionadas con la tematica de la idea.
     * Separa  la cadena inicial en un array de cadenas (etiquetas).
     * @return {[String]} tags - Etiquetas
     */
    tags: () => {
      tags = $('input[name=tags]').val();
      return tags.split(',');
    },
    /**
     * Devuelve el numero inicial de comentarios del nuevo documento.
     * Se considera que el usuario vota, por fuerza, su propia idea.
     * @return {number} votes - Voto inicial
     */
    votes: () => {
      return 1;
    },
    /**
     * Devuelve el id del Usuario duenyo de la idea.
     * @return {[String]} [userId] - userId correspondiente al voto inicial.
     */
    voters: () => {
      return [Meteor.userId()];
    },
    /**
     * Inicialmente la idea no ha sido agregada
     * @return {boolean} - false
     */
    isAgregated: () => {
      return false;
    },
    containsIdeas: () => {
      return false;
    },
    ideas: () => {
      return [];
    }
};

AgregatedIdeaAutovalues = Object.create(IdeaAutovalues);

AgregatedIdeaAutovalues.containsIdeas = () => {
  return true;
};
AgregatedIdeaAutovalues.ideas = () => {
  return Session.get('selection');
};
