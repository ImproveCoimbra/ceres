Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('produtores', {path: '/produtores'});
  this.route('sobre', {path: '/sobre'});
});