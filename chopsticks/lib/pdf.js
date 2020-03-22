const puppeteer = require('puppeteer');
const files = require('./files');
const hummus = require('hummus');

async function createPdf(page, template, name) {
    const browser = await puppeteer.launch({ headless: true });
    const loc = await browser.newPage();
    const path = "file://" + files.getScriptDirectoryBase() + "/templates/" + template + "/template/template.html";
    await loc.goto(path);
    await loc.setContent(page);
    const pdf = await loc.pdf({format: 'A3', printBackground: true});
    await browser.close();
    return pdf;
}

function savePdfs(pdfs, filename){

    var pdfWriter = hummus.createWriter(filename);

    pdfs.forEach((pdf, i) => {
        var pdfStream = new hummus.PDFRStreamForBuffer(pdf);
        pdfWriter.appendPDFPagesFromPDF(pdfStream);
    });

    pdfWriter.end();

}

module.exports.createPdf = createPdf;

module.exports.savePdfs = savePdfs;
