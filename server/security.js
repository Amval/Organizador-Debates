Debates.allow({
	insert: function(userId, doc) {
		return !! userId;
	},
    update: function(userId, doc) {
        return !! userId;
    }
});

Ideas.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    }
});


Comments.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    }
});

AgregatedIdeas.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    }
});
