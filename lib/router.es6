Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});


Router.onBeforeAction('dataNotFound', {only: 'debatePage'});
Router.onBeforeAction(HOOKS.requireLogin, {only: 'newDebate'});
Router.onBeforeAction(HOOKS.requireMembership, {only: 'debatePage'});


Router.map( function() {
	// Rutas de la aplicacíon.
	// 'name': hace referencia al template correspondiente a la ruta.
	// 'waitOn': la plantilla no se renderiza hasta conseguir los datos de una suscripcion.


	// Pagina principal de la aplicacion.
	this.route('/', {
		name: 'debatesList',
		waitOn: function() {
			return [Meteor.subscribe('debates', Meteor.userId()), Meteor.subscribe('userData')];
		},
		onBeforeAction: HOOKS.requireLoginWelcome
	});

	// Nuevo debate
	this.route('/new_debate', {
		name: 'newDebate',
		waitOn: function() {
			return Meteor.subscribe('userData');
		},
	});


	// Ver tlas ideas contenidas en un debate
	this.route('/debate/:_id', {
		name: 'debatePage',
		subscriptions: function() {
			return Meteor.subscribe('ideas', this.params._id);
		},

		waitOn: function() {
			return [
				Meteor.subscribe('debate', this.params._id),
				Meteor.subscribe('userData'),
				Meteor.subscribe('ideas', this.params._id)
			];
		},
		data: function() {
			Session.set('currentDebate',this.params._id);
			return Debates.findOne();
		},
		yieldRegions: {
			'newIdea': {to: 'newIdea'},
			'accessRequest': {to: 'accessRequest'},
			'controlPanel': {to: 'controlPanel'},
			'statistics': {to: 'statistics'},
			'leaveDebate': {to: 'leaveDebate'},
		}
	});

	this.route('/debate/idea/:_id', {
		name: 'ideaPage',
		subscriptions: function() {
		  return [
				Meteor.subscribe('comments',this.params._id),
				Meteor.subscribe('debate', Session.get('currentDebate'))
			];
		},
		waitOn: function() {
		  return [
				Meteor.subscribe('idea',this.params._id),
				Meteor.subscribe('userData')
			];
		},
		data: function() {
		  Session.set('currentIdea',this.params._id);
		  return Ideas.findOne();
		},
		yieldRegions: {
			'newComment': {to: 'newComment'},
			'commentItem' : {to : 'commentItem'},
			'containedIdeas': {to: 'containedIdeas'}
		}
	});

	this.route('/agregate_ideas/:_id', {
		name: 'agregateIdeas',
		waitOn: function() {
			Session.set('selection',[]);
			Session.set('currentDebate',this.params._id);
			return [
				Meteor.subscribe('ideas', this.params._id),
				Meteor.subscribe('userData'),
			];
		},
		data: function() {
			return Ideas.find();
		},
		yieldRegions: {
			'newAgregatedIdea': {to: 'newAgregatedIdea'}
		}
	})


});
