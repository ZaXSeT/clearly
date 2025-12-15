const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function listModels() {
    const key = "AIzaSyCh5zqKnM5VSKjLbjLl7Bg4lyy1EABweq8";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            const names = data.models.map(m => m.name);
            fs.writeFileSync('models.txt', names.join('\n'));
            console.log("Saved models to models.txt");
        } else {
            console.log("No models found.");
        }
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

listModels();
