

export function formatTime(time, displaySeconds = false, hour12 = true, displayAmPm = true) {
    // Time input as string
    if (typeof time !== 'string') return null;

    // Valid time formats HH:MM or HH:MM:SS
    const formatMatch = time.trim().match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);

    // If format does not match, return null
    if (!formatMatch) return null;

    // Get hour and minute from input string
    const hour = Number(formatMatch[1]);
    const minute = Number(formatMatch[2]);

    // seconds are optional, default to 0
    const seconds = Number(formatMatch[3] ?? 0);

    // Validate each time component
    if (hour >= 24 || minute >= 60 || seconds >= 60) return null;

    let displayHours = hour;
    let timePeriod = ''; 

    //  convert to 12 hour format
    if (hour12) {
        if (hour < 12) {
            timePeriod = 'AM';
        } else {
            timePeriod = 'PM';
        }
        displayHours = hour % 12 || 12;
    }

    // format time
    const hh = hour12
        ? String(displayHours)
        : String(displayHours).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    let result = ``;

    // If displaySeconds, set format to HH:MM:SS
    if (displaySeconds) {
        result = `${hh}:${mm}:${ss}`;
    } else {
        result = `${hh}:${mm}`;
    }

    // Add AM/PM to final format
    if (hour12 && displayAmPm) {
        result += ` ${timePeriod}`;
    }

    // Return the formatted time
    return result;
}


