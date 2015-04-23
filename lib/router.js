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
			return [Meteor.subscribe('debates'), Meteor.subscribe('userData')];
		}
	}); 

	// Nuevo debate
	this.route('/new_debate', { name: 'newDebate'});

	// Ver tlas ideas contenidas en un debate
	this.route('/debate/:_id', {
		name: 'debatePage',
		subscriptions: function() {
			return Meteor.subscribe('ideas', this.params._id);
		},
		waitOn: function() {
			return [Meteor.subscribe('debate', this.params._id),Meteor.subscribe('userData')];
		},
		data: function() {
			Session.set('currentDebate',this.params._id);
			return Debates.findOne();
		},
		yieldRegions: {
			'newIdea': {to: 'newIdea'},
			'accessRequest': {to: 'accessRequest'}
		}
	});

	this.route('/debate/idea/:_id', {
		name: 'ideaPage',
		subscriptions: function() {
		  return Meteor.subscribe('comments',this.params._id);  
		}, 
		waitOn: function() {
		  return Meteor.subscribe('idea',this.params._id);  
		}, 
		data: function() {
		  Session.set('currentIdea',this.params._id);
		  return Ideas.findOne();  
		}, 
		yieldRegions: {
			'newComment': {to: 'newComment'},
			'commentItem' : {to : 'commentItem'}
		}
	});


});