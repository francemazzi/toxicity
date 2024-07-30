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
    resultElement.innerHTML = "";

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
