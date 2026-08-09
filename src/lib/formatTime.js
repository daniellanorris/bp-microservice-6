

export function formatTime(time) {
    // Time input as string
    if (typeof time !== 'string') return null;

    // Valid time formats HH:MM or HH:MM:SS
    const formatMatch = time.trim().match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);

    // If format does not match, return null
    if (!formatMatch) return null;

    // Get hour and minute from input string
    const hour = Number(formatMatch[1]);
    const minute = Number(formatMatch[2]);

    // If seconds are in format, else set to 0
    const hasSeconds = formatMatch[3] !== undefined;
    const seconds = Number(formatMatch[3] ?? 0);

    // Validate hour, minute, and seconds
    if (hour >= 24 || minute >= 60 || seconds >= 60) return null;

    let timePeriod = '';

    // Check for time period based on hour
    if (hour < 12) {
        timePeriod = 'AM';
    } else {
        timePeriod = 'PM';
    }

    const displayHours = hour % 12 || 12;

    // Format time to HH:MM:SS
    const hh = String(displayHours);
    const mm = String(minute).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    let formattedTime = '';

    // Format time with seconds
    if (hasSeconds) {
        formattedTime = `${hh}:${mm}:${ss}`;
    } else {
        formattedTime = `${hh}:${mm}`;
    }

    return `${formattedTime} ${timePeriod}`;
}
