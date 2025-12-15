const { GoogleGenerativeAI } = require("@google/generative-ai");

async function checkModels() {
    const genAI = new GoogleGenerativeAI("AIzaSyCh5zqKnM5VSKjLbjLl7Bg4lyy1EABweq8");
    try {
        console.log("Trying gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro Success:", result.response.text());
    } catch (error) {
        console.error("gemini-pro Error:", error.message);
    }

    try {
        console.log("Trying gemini-1.5-flash-latest...");
        const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result2 = await model2.generateContent("Hello");
        console.log("gemini-1.5-flash-latest Success:", result2.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash-latest Error:", error.message);
    }
}

checkModels();
