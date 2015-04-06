Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});


// Funciones auxiliares

// Requiere estar registrado
var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};


Router.onBeforeAction('dataNotFound', {only: 'debatePage'});
Router.onBeforeAction(requireLogin, {only: 'newDebate'});


Router.map( function() {
	// Rutas de la aplicacíon.
	// 'name': hace referencia al template correspondiente a la ruta.
	// 'waitOn': la plantilla no se renderiza hasta conseguir los datos de una suscripcion.


	// Raiz de la aplicacion.
	this.route('/', { 
		name: 'debatesList',
		waitOn: function() {
			return Meteor.subscribe('debates'); 
		}
	});

	// Nuevo debate
	this.route('/new_debate', { name: 'newDebate'});

	// 
	this.route('/debate/:_id', {
		name: 'debatePage',
		waitOn: function() {
			return Meteor.subscribe('debate', this.params._id);
		},
		data: function() {
			return Debates.findOne();
		}
	});
});