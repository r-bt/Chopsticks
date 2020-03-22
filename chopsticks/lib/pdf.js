const puppeteer = require('puppeteer');
const files = require('./files');
const hummus = require('hummus');

async function createPdf(page, template, name) {
    const browser = await puppeteer.launch({ headless: true });
    const loc = await browser.newPage();
    const path = "file://" + files.getScriptDirectoryBase() + "/templates/" + template + "/template.html";
    await loc.goto(path);
    await loc.setContent(page);
    const pdf = await loc.pdf({format: 'A3', printBackground: true});
    await browser.close();
    return pdf;
}

function mergePdfs(pdfs, filename){

    if(pdfs.length < 2){
        throw new Error("Less than two pdfs were provided");
    }

    var pdfWriter = hummus.createWriter("final.pdf");

    pdfs.forEach((pdf, i) => {
        var pdfStream = new hummus.PDFRStreamForBuffer(pdf);
        pdfWriter.appendPDFPagesFromPDF(pdfStream);
    });

    pdfWriter.end();

}

module.exports.createPdf = createPdf;

module.exports.mergePdfs = mergePdfs;
