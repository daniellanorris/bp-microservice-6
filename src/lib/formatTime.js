

export function formatTime(time) {
    // Time input as string
    if (typeof time !== 'string') return null;

    // Check for 12-hour time format with AM/PM
    const twelveHourMatch = time.trimEnd().match(
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i
    )

    if (twelveHourMatch) {
        let hour = Number(twelveHourMatch[1]);
        const minute = Number(twelveHourMatch[2]);
        const seconds = Number(twelveHourMatch[3] ?? 0);
        const period = twelveHourMatch[4].toUpperCase();

        if (hour < 1 || hour > 12 ||
            minute >= 60 || seconds >= 60) {
            return null;
        }

        // Convert 12-hour time to 24-hour time
        if (period === 'AM' && hour === 12) {
            hour = 0;
        } else if (period === 'PM' && hour !== 12) {
            hour += 12;
        }

        const displayHours = hour % 12 || 12;
        const hh = String(displayHours);
        const mm = String(minute).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');

        return twelveHourMatch[3] !== undefined
            ? `${hh}:${mm}:${ss} ${period}`
            : `${hh}:${mm} ${period}`;
    }

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
