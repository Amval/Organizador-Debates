Template.ideaCheckboxItem.events({
  'click .selection': (e) => {
    e.preventDefault();
    // Modifica el aspecto del boton para mostrar si esta seleccionado
    $(e.currentTarget).toggleClass('primary');
    $(e.currentTarget).children('i.icon').toggleClass('check');
    $(e.currentTarget).children('span').text(function(i, text){
          return text === "Seleccionado" ? "Seleccionar" : "Seleccionado";
      });

    /// Selecciona id de idea actual
    const ideaId = $(e.currentTarget).attr('id');
    // Anyade/Elimina id de variable de Session
    var selection = Session.get('selection');
    selection = _.xor(selection,[ideaId]);
    selection = _.remove(selection,(item)=>{
      return !_.isNull(item) && !_.isUndefined(item)
    });
    Session.set('selection',selection);
  }
});

Template.ideaCheckboxItem.onRendered(() => {
  $('.popup .sitemap').popup()
});
