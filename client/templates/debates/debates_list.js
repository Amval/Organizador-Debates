var debatesData = [
	{
	 title:"Prueba de Debate",
	 description: "Este es un debate de pega"
	},
	{
	 title:"Prueba de Debate 2",
	 description: "Este es un debate de pega, coponazo"
	}
];

Template.debatesList.helpers({
	debates: function() {
		return Debates.find();
	}
});