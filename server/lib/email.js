var NOTIFICATION_EMAIL, EMAIL_TEMPLATE;

NOTIFICATION_EMAIL = "me@lfac.me";
EMAIL_TEMPLATE = _.template('Olá!<br>Foi submetida um novo <%- collectionName %> chamado <%- name %>.<br>Para aprovar aceder <a href="<%- itemLink %>">à página do <%- collectionName %></a>.')

notifySubmission = function (collectionName, attributes, editRouteName, _id) {
  console.log(editRouteName)
  console.log(_id)
  Email.send({
    from: NOTIFICATION_EMAIL,
    to: NOTIFICATION_EMAIL,
    html: EMAIL_TEMPLATE({
      itemLink: Router.url(editRouteName, {_id: _id}),
      collectionName: collectionName,
      name: attributes.name
    })
  });
};