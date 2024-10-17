const express = require("express");
const router = express.Router();

const { URL_SCRAPING } = require("../config/config");
const ScrappingService = require('../services/scraping.service');

router.get('/pdf', async (req, res) => {
    const url = URL_SCRAPING;
    try {
        const postData = {
            fechaInicial: '10/10/2024',
            fechaFinal: '16/10/2024',
            idioma: 'sp',
        };
        const pdfBuffer = await ScrappingService.createPDF(url, postData);

        // Verificamos si el buffer del PDF es válido
        if (!pdfBuffer && !pdfBuffer instanceof Uint8Array) return res.status(500).send('Error al generar el PDF');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="output.pdf"');
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        // Manejo de errores
        console.error('Error al generar o enviar el PDF:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;