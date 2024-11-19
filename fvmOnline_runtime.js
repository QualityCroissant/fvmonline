const SIZEOF_CHAR = 1;
const SIZEOF_CHAR_STAR = 8;

let editor,
    stdin_queue = [];

fvmor_assemble = function() {
    let binary,
        buff;

    FS.writeFile("buffers/asm_buffer.fa", editor.getValue());

    Module.ccall("fvma_assemble", null, [], []);

    binary = FS.readFile("buffers/bin_buffer.fb");
    
    document.getElementById("fvmo_rom_box").value = "";

    for(let i = 0; i < binary.length; i++) {
        if(i && !(i % 8))
            document.getElementById("fvmo_rom_box").value += "\n";

        document.getElementById("fvmo_rom_box").value += (buff = binary[i].toString(16).toUpperCase()) + " ".repeat(4 - buff.length);
    }
};

fvmor_run = function() {
    FS.writeFile("hardware/rom", FS.readFile("buffers/bin_buffer.fb"));

    Module.ccall("fvmr_run", "number", [], []);
};

io_input = function() {
    while(!stdin_queue.length);

    return stdin_queue.shift();
};

io_output = function(char) {
    document.getElementById("fvmo_execution_box").value += String.fromCharCode(char);
};

io_error = function(char) {
    document.getElementById("fvmo_execution_box").value += String.fromCharCode(char);
};

Module.preRun = function() {
    FS.init(io_input, io_output, io_error);
};

Module.onRuntimeInitialized = function() {
    editor = ace.edit("fvmo_source_box");
    editor.setTheme("ace/theme/monokai");

    fetch("defaultProgram.fa").then (
        (content) => content.text()
    ).then (
        (text) => {
            editor.setValue(text);
        }
    ).catch (
        (error) => {
            console.error(error);
        }
    );

    document.getElementById("assemble_button").addEventListener("click", fvmor_assemble);
    document.getElementById("run_button").addEventListener("click", fvmor_run);

    document.onkeypress = (keypress) => stdin_queue.push(keypress);
};

