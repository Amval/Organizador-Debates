Template.agregateIdeas.events({
  /**
   * Conmuta el menu de anyadir nuevas ideas agregadas.
   */
  "click #newAgregatedIdea": function(e){
    _.switch("newAgregatedIdea");
  },

	'submit form': function(e) {

      _.newDocument(e, 'Idea', {autovalues: AgregatedIdeaAutovalues});
      /**
  		const agregatedIdea = _.processForm(e, IdeaSchema, AgregatedIdeaAutovalues);
  		var  schemaContext = IdeaSchema.namedContext("insertForm");
  		Ideas.insert(agregatedIdea, {validationContext: "insertForm"}, function(error, result) {
        console.log(error);
  		});
      **/
      _.cleanForm("newAgregatedIdea");

      const selection = Session.get('selection');
      _.each(selection, (ideaId) => {
        Ideas.update({_id: ideaId}, {
          $set: {isAgregated: true},
        });
      })
      Session.set('selection',[]);
  	}
});

Template.newAgregatedIdea.helpers({
  /**
   * Devuelve una cadena indicando el numero de Ideas seleccionadas.
   * @return {string} - Cadena variable en funcion del numero de ideas (se cumple minimo, es plural?)
   */
  selectedIdeas: () => {
    const ideasCount = Session.get('selection').length;
    const numberIdeas = ideasCount !== 1 ? `ideas seleccionadas`: `idea seleccionada`;
    const msg = `${ideasCount} ${numberIdeas}.`
    return `${msg} ${ideasCount > 1 ? '': ' Mínimo 2.'}`;
  },
  /**
   * Devuelve una cadena indicando una clase css.
   * @return {string} - Cadena variable en funcion del numero de ideas (se cumple minimo?)
   */
  minimumIdeas: () => {
    const ideasCount = Session.get('selection').length;
    return ideasCount > 1 ? 'green' : 'disabled red'
  },
  /**
   *
   */
  tagsSuggestions: () => {
    const selection = Session.get('selection');
    let tags = [];
    // Reune todas las etiquetas de las ideas seleccionadas
    _.each(selection, (ideaId)=> {
      tags.push(Ideas.findOne(ideaId).tags);
    });
    tags = _.flatten(tags);
    // Agrupa por {"etiqueta": numero de apariciones}
    const countedTags = _.countBy(tags, (item) => {
      return item;
    });
    // Transforma en una estructura de datos accesible desde la plantilla
    let data = [];
    var totalTags = tags.length;
    _.each(countedTags, (value, key) => {
      data.push({tag: key, times: value, percentage: (value/totalTags).toFixed(2)*100});
    });
    Session.set('tagsSuggestions',data);
    return data;
  },

  activatePopup: () => {
    $('.popup .ui.label').popup()
  }
});

Tracker.autorun( () => {
  let tagsSuggestions = Session.get('tagsSuggestions');
  $('.popup .ui.label').popup()
});

Template.newAgregatedIdea.onRendered(()=> {
  _.standardValidation();
})
