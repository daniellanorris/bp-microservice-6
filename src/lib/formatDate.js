// logic for handling date conversion to month (name), date (xx), year(xxxx)

const monthNames = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

function buildDayFirstDate(first, second, year, dayFirst) {
    const day = dayFirst ? Number(first) : Number(second);
    const month = dayFirst ? Number(second) : Number(first);
    return new Date(Number(year), month - 1, day);
}

export function formatDate(date) {
    let parsedDate;

    // YYYY-MM-DD or YYYY-DD-MM
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, first, second] = date.split("-");

        const month = dayFirst ? Number(second) : Number(first);
        const day = dayFirst ? Number(first) : Number(second);

        parsedDate = new Date(
            Number(year),
            month - 1,
            day
        );
    }

    // DD-MM-YYYY or MM-DD-YYYY
    else if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        const [first, second, year] = date.split("-");

        const day = dayFirst ? Number(first) : Number(second);
        const month = dayFirst ? Number(second) : Number(first);

        parsedDate = new Date(
            Number(year),
            month - 1,
            day
        );
    }

    // DD/MM/YYYY or MM/DD/YYYY
    else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        const [first, second, year] = date.split("/");
        parsedDate = buildDayFirstDate(first, second, year, dayFirst);
    }

    // DD.MM.YYYY or MM.DD.YYYY
    else if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
        const [first, second, year] = date.split(".");
        parsedDate = buildDayFirstDate(first, second, year, dayFirst);
    }

    // "April 5, 2027" or "April 5 2027"
    else if (/^[A-Za-z]+\s+\d{1,2},?\s+\d{4}$/.test(date)) {
        const [, monthName, day, year] = date.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
        const month = monthNames[monthName.toLowerCase()];

        if (month) {
            parsedDate = new Date(Number(year), month - 1, Number(day));
        }
    }

    // "5 April 2027"
    else if (/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(date)) {
        const [, day, monthName, year] = date.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
        const month = monthNames[monthName.toLowerCase()];

        if (month) {
            parsedDate = new Date(Number(year), month - 1, Number(day));
        }
    }

    else {
        return null;
    }

    // valid date?
    if (isNaN(parsedDate.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(parsedDate);
}