/**
* HOOKS - Funciones para ser llamadas antes, durante y después
* de cargar una ruta.
*
* NOTA: las funciones han de ser declaradas con function() {}
* Esto preserva el contexto 'this' que requiere el Iron Router.
*/

HOOKS = {};

/**
 * afterHook:
 * Incrementa el número de visitas del debate en una
 */

HOOKS.viewPage = function() {
  const debateId = Session.get('currentDebate');
/**
  Debates.update({_id: debateId}, {
    $inc: {views: 1},
  });
**/
  console.log(Debates.findOne({_id: debateId}));
 this.next();
};

/**
 * beforeHook:
 * Obliga a que el usuario esté registrado y le invita a registrarse
 */
 HOOKS.requireLoginWelcome = function() {
	 if (!Meteor.user()) {
		 if (Meteor.loggingIn()) {
			 this.render(this.loadingTemplate);
		 } else {
			 this.render('welcomeNewUser');
		 }
	 } else {
		 this.next();
	 }
 }

/**
 * beforeHook:
 * Obliga a que el usuario esté registrado.
 */
HOOKS.requireLogin = function() {
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


/**
 * beforeHook:
 * Obliga a que el usuario pertenezca al debate.
 */
HOOKS.requireMembership = function() {
	// Llamada a metodo del servidor para comprobar la pertenencia del usuario al debate.
	Meteor.call('requireMembership', Meteor.userId(), Session.get('currentDebate'), function(err, result){
		Session.set('isMember', result);
	});
	const isMember = Session.get('isMember');

	if (isMember) {
		this.next();
	}
	else {
		this.render('requestAccess');
	}
};
