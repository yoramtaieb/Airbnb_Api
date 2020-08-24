const app = require('./server');

app.listen('4000', (err) => {
  if (err) console.error(err);
  else console.log('Serveur Démarré');
});
