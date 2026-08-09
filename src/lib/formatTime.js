export function formatTime(time) {

    let parsedTime;

    // HH:MM
    if (/^\d{2}:\d{2}$/.test(time)) {
        const [hours, minutes] = time.split(":");

        parsedTime = new Date();
        parsedTime.setHours(Number(hours));
        parsedTime.setMinutes(Number(minutes)); 
    }
}