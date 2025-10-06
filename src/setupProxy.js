// createProxyMiddleware -> per creare un proxy che inoltra le richieste da React a un altro server
const { createProxyMiddleware } = require('http-proxy-middleware');

// Funzione per i middleware personalizzati
module.exports = function (app) {
  app.use(
    '/api/gnews', //middlewere per le richieste che iniziano con '/api/gnews'
    createProxyMiddleware({
       // L'URL di destinazione: tutte le richieste verranno inoltrate qui
      target: 'https://gnews.io/api/v4',

      // Imposta l'header "Origin" della richiesta in modo che corrisponda al target,
      // per evitare problemi di CORS (Cross-Origin Resource Sharing)
      changeOrigin: true,

      // Riscrive il percorso della richiesta, rimuovendo la parte '/api/gnews'
      // Esempio: '/api/gnews/search' → '/search'
      pathRewrite: { '^/api/gnews': '' },
    })
  );
};
// Serve per fare funzionare le news anche lato localStorage