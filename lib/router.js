Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notfound'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('produtores', {path: '/produtores'});
  this.route('sobre', {path: '/sobre'});
});