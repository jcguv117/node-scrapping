const express = require("express");
const router = express.Router();

const { URL_SCRAPING } = require("../config/config");
const ScrappingService = require('../services/scraping.service');
const utilitiesService = require("../services/utilities.service");

router.post('/pdf', async (req, res) => {
    const url = URL_SCRAPING;
    const {dateStart, dateEnd} = req.body;
    try {
        const postData = {
            fechaInicial: utilitiesService.getDateConvert('dd/MM/yyyy', new Date([dateStart, "00:00"])),
            fechaFinal  : utilitiesService.getDateConvert('dd/MM/yyyy', new Date([dateEnd, , "00:00"])),
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