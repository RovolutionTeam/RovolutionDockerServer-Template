

export async function Logger(text: string, green: boolean = false) {
    console.log(`${green ? "\x1b[32m" : "\u001b[37m"}[${new Date().toLocaleString()}] ${text}\u001b[37m`);
}
