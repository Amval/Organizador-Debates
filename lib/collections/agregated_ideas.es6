AgregatedIdeas = new Mongo.Collection('agregatedIdeas');

/**
 * IDEA AGREGADA
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
 */
AgregatedIdeaSchema = new SimpleSchema({
  title: {
    type: String,
    max: 140,
    label: "Título"
  },
  description: {
    type:String,
    label: "Descripción"
  },
  owner: {
    type: String,
    optional: true
  },
  debate: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  ideas: {
    type: [String],
    min: 2
  },
  tags: {
    type: [String],
    optional: true,
  },
});

AgregatedIdeas.attachSchema(AgregatedIdeaSchema);

/**
 * Contiene funciones para el poblado automatico de un nuevo elemento de la coleccion.
 */
AgregatedIdeaAutovalues = {
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
   * Devuelve las ideas seleccionadas para formar parte de la nueva idea agregada.
   * @return {{String}} cadenas de IdeaId/AgregatedIdeaId
   */
   ideas: () => {
     return Session.get('selection');
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

};
