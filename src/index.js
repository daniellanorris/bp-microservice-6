import 'dotenv/config';
import express from 'express';
import { formatDate } from "./lib/formatDate.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import cors from "cors";


const app = express();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// Parse JSON request bodies
app.use(express.json());
app.use(express.text());


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API documented with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.LOCALHOST}`,
            },
        ],
    },
    apis: ['./src/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send("Hello from Express!");
});

/**
 * @swagger
 * /format-date:
 *   post:
 *     summary: Format a date into Month (name), Day (xx), Year (xxxx)
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: 2026-08-09
 *     responses:
 *       200:
 *         description: Date formatted successfully
 *       400:
 *         description: Date is required
 *       500:
 *         description: Unable to format date
 */
app.post('/format-date', (req, res) => {
    try {
        const date = req.body;

        console.log("Request body:", req.body);
        console.log("Date:", date);

        if (!date) {
            return res.status(400).json({
                error: "Date is required"
            });
        }

        const data = formatDate(date);

        if (!data) {
            return res.status(400).json({
                error: "Invalid date format"
            });
        }

        return res.status(200).json({
            formattedDate: data
        });

    } catch (error) {
        console.error("Format date route error:", error);

        return res.status(500).json({
            error: "Unable to format date"
        });
    }
});

app.listen(process.env.LOCALHOST, () => {
    console.log('Listening on port', process.env.LOCALHOST);
});