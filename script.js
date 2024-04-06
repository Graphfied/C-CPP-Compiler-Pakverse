const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/c_cpp");

editor.setValue("#include <stdio.h>\n\nint main() {\n    \n}", 1);

document.getElementById("runCode").addEventListener("click", async () => {
    const code = editor.getValue();
    const userInputs = document.getElementById("userInput").value;

    const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a07e960ccbmsh03c456de94d6745p1175ccjsnb93679702511',
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        data: {
            language: "c",
            version: 'latest',
            code: code,
            input: userInputs // Send user inputs to the API
        }
    };

    try {
        const response = await axios.request(options);
        document.getElementById("output").innerText = response.data.output || "No output";
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Error: " + error;
    }

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
});
