// Schedule tasks to run every hour

let _Hour = 1000 * 60 * 60 * 12;
let _Previous = 0;

export async function startScheduler() {
    setInterval(() => {
        const d = new Date();

        let day = d.getDay();
        if (day !== 0) return;

        let hour = d.getHours();
        if (hour !== 22) return;

        let timeStamp = d.getTime();
        if (timeStamp - _Previous < _Hour) return;

        _Previous = Date.now();

        // Hourly scheduler
    }, _Hour);
}