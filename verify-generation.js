const { GoogleGenerativeAI } = require("@google/generative-ai");

async function verifyGen() {
    const key = "AIzaSyBXedygkbldKi2vqppdtEOmzy7R_XHpvWw";
    const genAI = new GoogleGenerativeAI(key);

    // Test the specific model we are using in the app
    const modelName = "gemini-flash-lite-latest";
    console.log(`Testing generation with model: ${modelName}`);

    const model = genAI.getGenerativeModel({ model: modelName });

    try {
        const result = await model.generateContent("Hello, are you working?");
        console.log("Success!");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.error("Generation Failed:");
        console.error(e.message);
    }
}

verifyGen();
