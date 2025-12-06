document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('text-input');
    const status = document.getElementById('status-msg');
    let timer;

    const showStatus = (msg, isErr = false) => {
        clearTimeout(timer);
        status.textContent = msg;
        status.className = `status visible ${isErr ? 'error' : ''}`;
        timer = setTimeout(() => status.className = 'status', 2000);
    };

    document.getElementById('btn-copy').onclick = async () => {
        if (!input.value) return showStatus("Nothing to copy!", true);
        try {
            await navigator.clipboard.writeText(input.value);
            showStatus("Copied to clipboard!");
        } catch { showStatus("Failed to copy", true); }
    };

    document.getElementById('btn-paste').onclick = async () => {
        try {
            input.value = await navigator.clipboard.readText();
            showStatus("Pasted from clipboard!");
        } catch { showStatus("Failed to paste", true); }
    };
});