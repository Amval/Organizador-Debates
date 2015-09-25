Template.leaveDebate.events({
  'click #leave-debate': e => {
    $('.ui.basic.test.modal')
  .modal({
    onDeny: () => { return true },
    onApprove : () => {
      const debateId = Session.get('currentDebate');
      Debates.update({_id: debateId}, {$pull: {members: Meteor.userId()}});
      return true;
    }
  })
  .modal('show')
;

  }
});
