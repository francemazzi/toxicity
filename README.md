# Analisi di Tossicità con TensorFlow.js

Questo progetto utilizza TensorFlow.js e il modello di tossicità per analizzare frasi e identificare potenziali contenuti tossici. L'applicazione permette agli utenti di inserire una frase, che viene poi analizzata per categorie di tossicità come insulti, minacce, linguaggio osceno, e altro.

## Funzionalità

- **Inserimento di una frase**: Gli utenti possono inserire una frase da analizzare.
- **Classificazione della tossicità**: La frase viene analizzata utilizzando un modello di tossicità pre-addestrato che fornisce risultati su diverse categorie.
- **Indicatore di caricamento**: Un messaggio di caricamento viene mostrato mentre il modello viene caricato e durante l'elaborazione della frase.

## Come avviare il progetto

### Prerequisiti

- [Node.js](https://nodejs.org/) (versione 12 o successiva)
- [npm](https://www.npmjs.com/) (incluso con Node.js)

### Installazione

1. **Clona il repository:**

   ```bash
   git clone https://github.com/tuo-username/analisi-tossicita-tfjs.git
   cd analisi-tossicita-tfjs
   ```

2. **Installa le dipendenze:**

   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo:**
   ```bash
   npm start
   ```
   Questo comando avvierà un server di sviluppo e aprirà automaticamente l'applicazione nel browser.

### Struttura del Progetto

- `index.html`: Il file HTML principale che contiene la struttura della pagina.
- `src/index.ts`: Il file TypeScript che contiene la logica per l'analisi della tossicità e la gestione del DOM.
- `package.json`: Configurazione del progetto e dipendenze.

### Come funziona

1. L'utente inserisce una frase nell'input e clicca sul pulsante "Analizza".
2. Viene mostrato un messaggio di caricamento mentre il modello di tossicità viene caricato.
3. La frase viene classificata per diverse categorie di tossicità (ad esempio, insulto, minaccia).
4. I risultati vengono visualizzati nella pagina.

### Personalizzazione

- **Soglia di confidenza**: È possibile modificare la soglia di confidenza per le previsioni cambiando il valore di `threshold` nel file `index.ts`. Questo valore determina la sensibilità del modello per identificare contenuti tossici.

### Esempio di codice TypeScript

```typescript
import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

const threshold: number = 0.5;

document
  .getElementById("analyzeButton")
  ?.addEventListener("click", async () => {
    const inputElement = document.getElementById(
      "sentenceInput"
    ) as HTMLInputElement | null;
    const loadingElement = document.getElementById("loading");
    const resultElement = document.getElementById("result");

    if (!inputElement || !loadingElement || !resultElement) {
      console.error("Elementi del DOM non trovati.");
      return;
    }

    const sentence = inputElement.value.trim();
    if (sentence === "") {
      alert("Per favore, inserisci una frase.");
      return;
    }

    loadingElement.style.display = "block";
    resultElement.innerHTML = ""; // Pulisce i risultati precedenti

    try {
      const model = await toxicity.load(threshold, []);
      const predictions = await model.classify([sentence]);

      resultElement.innerHTML = `
      <h3>Risultati:</h3>
      <pre>${JSON.stringify(predictions, null, 2)}</pre>
    `;
    } catch (error) {
      console.error("Errore durante la classificazione:", error);
      resultElement.innerHTML = `<p>Si è verificato un errore. Per favore, riprova più tardi.</p>`;
    } finally {
      loadingElement.style.display = "none";
    }
  });
```

### Contributi

Se desideri contribuire al progetto, sentiti libero di aprire issue o pull request nel repository GitHub. Assicurati di seguire le linee guida del progetto.

### Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file `LICENSE` per ulteriori dettagli.
