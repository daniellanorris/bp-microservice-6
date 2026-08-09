# Date-Time Formatter Microservice

## Description

The Date-Time Formatter Microservice converts dates from supported formats into a readable format containing the full month name, two-digit day, and four-digit year.

For example:

```text
2026-08-09
```

is converted to:

```text
August 09, 2026
```

The microservice is built with Express.js and provides a REST API endpoint for formatting dates.

## Supported Date Formats

The service accepts the following date formats:

- `YYYY-MM-DD`
- `MM-DD-YYYY`

Examples:

```text
2026-08-09
08-09-2026
```

Both produce:

```text
August 09, 2026
```

## Requirements

- Node.js
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/daniellanorris/bp-microservice-6.git
```

Navigate into the project:

```bash
cd bp-microservice-6
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
LOCALHOST=5555
```

`LOCALHOST` specifies the port on which the microservice runs.

## Running the Microservice

Start the development server with:

```bash
npm run dev
```

The service will be available at:

```text
http://localhost:5555
```

You should see:

```text
Listening on port 5555
```

## API Endpoint

### Format Date

**POST**

```text
/format-date
```

Full URL:

```text
http://localhost:5555/format-date
```

The endpoint accepts a date as plain text.

### Request Headers

```http
Content-Type: text/plain
```

### Request Body

The request body should contain a date string.

Example:

```text
2026-08-09
```

or:

```text
08-09-2026
```

### Example cURL Request

```bash
curl -X POST http://localhost:5555/format-date \
-H "Content-Type: text/plain" \
-d "08-09-2026"
```

### Successful Response

HTTP status:

```text
200 OK
```

Response:

```json
{
  "formattedDate": "August 09, 2026"
}
```

## Invalid Date Format

If the provided date does not match one of the supported formats, the service returns:

HTTP status:

```text
400 Bad Request
```

Response:

```json
{
  "error": "Invalid date format"
}
```

For example:

```bash
curl -X POST http://localhost:5555/format-date \
-H "Content-Type: text/plain" \
-d "August 9, 2026"
```

will return an error because `August 9, 2026` is not one of the supported input formats.

## Missing Date

If no date is provided, the service returns:

HTTP status:

```text
400 Bad Request
```

Response:

```json
{
  "error": "Date is required"
}
```

## Swagger Documentation

Interactive API documentation is available at:

```text
http://localhost:5555/api-docs
```

Swagger provides an interface for testing the `/format-date` endpoint.

## Example JavaScript Request

The microservice can also be called from another JavaScript application:

```javascript
const response = await fetch("http://localhost:5555/format-date", {
    method: "POST",
    headers: {
        "Content-Type": "text/plain",
    },
    body: "2026-08-09",
});

const data = await response.json();

console.log(data);
```

Output:

```json
{
  "formattedDate": "August 09, 2026"
}
```

## Project Structure

```text
bp-microservice-6/
├── src/
│   ├── index.js
│   └── lib/
│       └── formatDate.js
├── .env
├── package.json
└── README.md
```

### `src/index.js`

Contains the Express server, API endpoint, CORS configuration, Swagger documentation, and request handling.

### `src/lib/formatDate.js`

Contains the date formatting logic.

## Dependencies

The microservice uses:

- Express
- dotenv
- CORS
- Swagger UI Express
- Swagger JSDoc
- Nodemon

## Microservice Communication

Other applications can communicate with this microservice by sending a `POST` request to:

```text
http://localhost:5555/format-date
```

with the date supplied as a `text/plain` request body.

The microservice returns a JSON response containing the formatted date.