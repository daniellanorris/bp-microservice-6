// logic for handling date conversion to month (name), date (xx), year(xxxx)

export function formatDate(date) {
    let parsedDate;

    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, month, day] = date.split("-");

        parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );
    }

    // MM-DD-YYYY
    else if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        const [month, day, year] = date.split("-");

        parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );
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