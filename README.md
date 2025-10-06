## Configurazione del file vercel.json

Il file *vercel.json* serve per configurare Vercel in modo che gestisca correttamente le chiamate API esterne e risolva gli errori di *CORS (Cross-Origin Resource Sharing)*.
In questo progetto viene usato per creare un proxy verso l’API pubblica di *GNews*, così il browser non blocca le richieste.

---

### Scopo

- Creare un proxy interno su Vercel per inoltrare le richieste API.

- Evitare errori di tipo:

1. Access to fetch ... has been blocked by CORS policy


2. Permettere di chiamare le API di GNews direttamente tramite:

/api/gnews/...


invece di:

https://gnews.io/api/v4/...


---

### Codice 
```js 
{
  // Sezione che dice a Vercel come riscrivere certe richieste
  "rewrites": [
    {
      // Qualsiasi chiamata dal browser che inizia con /api/gnews/
      "source": "/api/gnews/(.*)",

     // Viene "riscritta" (proxy) verso l'API ufficiale di GNews
      // Il simbolo $1 rappresenta la parte catturata dopo /api/gnews/
      // Esempio: /api/gnews/search → https://gnews.io/api/v4/search
      "destination": "https://gnews.io/api/v4/$1"
    }
  ],

  // HTTP personalizzate (headers)
  "headers": [
    {
     // Applica header a tutte le risposte che partono da /api/gnews/
      "source": "/api/gnews/(.*)",

      "headers": [
        {
        // Permette l'accesso da qualsiasi origine (risolve il CORS)
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
         // Specifica i metodi HTTP permessi
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS"
        },
        {
          // Permette qualsiasi intestazione (header) nelle richieste
          "key": "Access-Control-Allow-Headers",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Funzionamento

1. Il browser invia una richiesta al dominio del progetto, ad esempio:

https://meteo-black.vercel.app/api/gnews/search?q=Google


2. Vercel intercetta la chiamata e la riscrive come:

https://gnews.io/api/v4/search?q=Google


3. Aggiunge automaticamente gli header CORS:

Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,OPTIONS
Access-Control-Allow-Headers: *


4. Il browser riceve la risposta senza bloccarla.

### Sintesi

- *rewrites* → inoltra la richiesta a GNews come proxy.

- *headers* → aggiunge le regole CORS necessarie.

*Non è richiesto alcun backend: tutto è gestito da Vercel.*

---

## Proxy per GNews API

Questo file (`setupProxy.js`) viene utilizzato per creare un **proxy locale** che permette alla tua app React di comunicare con l'API di [GNews](https://gnews.io) **senza problemi di CORS** durante lo sviluppo in locale.

---

### Codice

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/gnews',
    createProxyMiddleware({
      target: 'https://gnews.io/api/v4',
      changeOrigin: true,
      pathRewrite: { '^/api/gnews': '' },
    })
  );
};
``` 


