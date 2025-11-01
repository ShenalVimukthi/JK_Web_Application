const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (people, res, single = false) => {
  const doc = new PDFDocument();
  const filename = single ? `${people.name}.pdf` : 'all-people.pdf';

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(20).text(single ? people.name : 'All People', { align: 'center' });
  doc.moveDown();

  if (single) {
    doc.fontSize(12).text(`Email: ${people.email}`);
    doc.text(`Phone: ${people.phone || 'N/A'}`);
    doc.text(`Department: ${people.department || 'N/A'}`);
    doc.text(`Position: ${people.position || 'N/A'}`);
    doc.text(`Join Date: ${new Date(people.joinDate).toLocaleDateString()}`);
  } else {
    people.forEach((p, i) => {
      doc.fontSize(12).text(`${i + 1}. ${p.name}`);
      doc.text(`   Email: ${p.email}`);
      doc.text(`   Position: ${p.position || 'N/A'}`);
      doc.text(`   Department: ${p.department || 'N/A'}`);
      doc.moveDown(0.5);
    });
  }

  doc.end();
};

module.exports = { generatePDF };