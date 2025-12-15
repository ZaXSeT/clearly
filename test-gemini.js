async function checkModels() {
    const key = "AIzaSyBXedygkbldKi2vqppdtEOmzy7R_XHpvWw";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        console.log("Fetching models...");
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
        } else if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
        } else {
            console.log("Unexpected response:", data);
        }
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

checkModels();
