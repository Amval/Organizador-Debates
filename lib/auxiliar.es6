/**
 * Variable Global que contiene los metodos auxiliares de Lo-Dash.
 * Es un substituto de Underscore (con una implementacion mas eficiente y soporte multinavegador).+
 * Todas las funciones auxiliares se colocaran en este 'namespace'.
 */
_ = lodash

/**
 * Selecciona un conjunto de valores de un array.
 * @param {array} array - conjunto a filtrar.
 * @param {array} selection - seleccion.
 */
_.filterSelection = function(array,selection) {
    return _.filter(array, function(num) {return _.contains(selection,num)})
}

/**
 * Cambia el estado de una variable reactiva booleana.
 * Usado como "switch" de variables para mostrar/ocultar bloques de interfaz.
 * @param {ReactiveVar} reactiveVar - variable a cambiar.
 */
_.switch = (reactiveVar) => {
  //reactiveVar.set(!reactiveVar.get());
  const tmp = Template.instance();
  tmp[reactiveVar].set(!tmp[reactiveVar].get())
};

/**
 * Procesa formulario a partir del nombre de esquema y
 * funciones de autovalores.
 * @param {event} e - evento de envío del formulario.
 * @param {SimpleSchema} schemaName - nombre del objeto esquema.
 * @param {object} autovalues - funciones para la generación de campos extra
 * @return {object} result - objeto con todos los campos requeridos de acuerdo al esquema
 */
_.processForm = (e, schemaName, autovalues) => {
    // Claves a comparar
    const keys = schemaName._schemaKeys;
    const schema = schemaName._schema;
    // Claves propias y heredadas
    const autoKeys = _.keysIn(autovalues);
    // Resultado a devolver
    let result = {};
    // Claves que el formulario debe cumplir para respetar el esquema.
    const formKeys = _.filter(keys, function(key) {
        return _.has(schema[key], "label");
    });
    // Buscar cada clave del esquema en el formulario
    _.each(formKeys,function(item) {
        result[item] = $(e.target).find('[name='+item+']').val()
   });
   // Anyadir valores al resultado a partir de funciones de autovalor.
    _.each(autoKeys, function(item) {
        result[item] = autovalues[item]();
    });
    return result;
};

/**
 * Limpiar formulario
 */
 _.cleanForm = (reactiveVar) => {
   $('.form')[0].reset();
   _.switch(reactiveVar);
 }
