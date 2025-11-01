const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = (people, res, single = false) => {
  const doc = new PDFDocument();

  // Register Sinhala font (only for header)
  const sinhalaFontPath = path.join(__dirname, 'fonts', 'sinhala.ttf');
  doc.registerFont('Sinhala', sinhalaFontPath);

  const filename = single ? `${people.name || 'person'}.pdf` : 'all-people.pdf';
  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  // === HEADER: Use Sinhala font only here ===
  doc.font('Sinhala')
     .fontSize(26)
     .text(single ? (people.name || 'N/A') : 'මීගමු ජනතා ඒකාබද්ධ සංවිධානය', { align: 'center' });

  doc.font('Sinhala')
     .fontSize(20)
     .text(single ? (people.name || 'N/A') : 'අංක - 64. කාර්දිනල් කුරේ මාවත', { align: 'center' });

  doc.font('Sinhala')
     .fontSize(20)
     .text(single ? (people.name || 'N/A') : 'මීගමුව', { align: 'center' });

  doc.font('Sinhala')
     .fontSize(14)
     .text(single ? (people.name || 'N/A') : 'Registration No-මීග 4 / ස්වේච්ඡා: 155', { align: 'center' });

  doc.moveDown();

  // === ALL USER DATA: Use Helvetica only (even if Sinhala characters exist) ===
  const writeLine = (label, value) => {
    const val = value ?? 'N/A';
    doc.font('Helvetica').text(`${label}: ${val}`);
  };

  if (single) {
    writeLine('Name', people.name);
    writeLine('Address', people.addr);
    writeLine('NIC', people.nic);
    writeLine('GS Division', people.gsDiv);
    writeLine('Phone', people.phone);
    writeLine('No Of Family Members', people.family);
    writeLine('Residence Type', people.residenceTyp);
    writeLine('Join Date', new Date(people.joinDate).toLocaleDateString());
  } else {
    people.forEach((p, i) => {
      doc.font('Helvetica').fontSize(12)
         .text(`${i + 1}. ${p.name || 'N/A'}`);

      writeLine('   Name', p.name);
      writeLine('   NIC', p.nic);
      writeLine('   Address', p.addr);
      writeLine('   GS Division', p.gsDiv);
      writeLine('   Phone', p.phone);
      writeLine('   No Of Family Members', p.family);
      writeLine('   Residence Type', p.residenceTyp);

      doc.moveDown(0.5);
    });
  }

  doc.end();
};

module.exports = { generatePDF };



// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const generatePDF = (people, res, single = false) => {
//   const doc = new PDFDocument();

//   // Register Sinhala font
//   const sinhalaFontPath = path.join(__dirname, 'fonts', 'sinhala.ttf');
//   doc.registerFont('Sinhala', sinhalaFontPath);

//   const filename = single ? `${people.name}.pdf` : 'all-people.pdf';

//   res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
//   res.setHeader('Content-type', 'application/pdf');

//   doc.pipe(res);

//   // Use Sinhala font for headers
//   doc.font('Sinhala')
//      .fontSize(26)
//      .text(single ? people.name : 'මීගමු ජනතා ඒකාබද්ධ සංවිධානය', { align: 'center' });

//   doc.font('Sinhala')
//      .fontSize(20)
//      .text(single ? people.name : 'අංක - 64. කාර්දිනල් කුරේ මාවත', { align: 'center' });

//   doc.font('Sinhala')
//      .fontSize(20)
//      .text(single ? people.name : 'මීගමුව', { align: 'center' });

//   doc.font('Sinhala')
//      .fontSize(14)
//      .text(single ? people.name : 'Registration No-මීග 4 / ස්වේච්ඡා: 155', { align: 'center' });

//   doc.moveDown();

//   if (single) {
//     // Mix fonts: English labels in Helvetica, values in Sinhala if needed
//     doc.font('Helvetica').text(`Address: `, { continued: true });
//     doc.font('Sinhala').text(`${people.addr || 'N/A'}`);

//     doc.font('Helvetica').text(`NIC: `, { continued: true });
//     doc.font('Sinhala').text(`${people.nic || 'N/A'}`);

//     doc.font('Helvetica').text(`GS_Division: `, { continued: true });
//     doc.font('Sinhala').text(`${people.gsDiv || 'N/A'}`);

//     doc.font('Helvetica').text(`Phone: `, { continued: true });
//     doc.font('Sinhala').text(`${people.phone || 'N/A'}`);

//     doc.font('Helvetica').text(`No Of Family members: `, { continued: true });
//     doc.font('Sinhala').text(`${people.family || 'N/A'}`);

//     doc.font('Helvetica').text(`Residence type: `, { continued: true });
//     doc.font('Sinhala').text(`${people.residenceTyp || 'N/A'}`);

//     doc.font('Helvetica').text(`Join Date: `, { continued: true });
//     doc.font('Sinhala').text(`${new Date(people.joinDate).toLocaleDateString()}`);
//   } else {
//     people.forEach((p, i) => {
//       doc.font('Helvetica').fontSize(12).text(`${i + 1}. `, { continued: true });
//       doc.font('Sinhala').text(`${p.name}`);

//       doc.font('Helvetica').text(`   Name: `, { continued: true });
//       doc.font('Sinhala').text(`${p.name}`);

//       doc.font('Helvetica').text(`   NIC: `, { continued: true });
//       doc.font('Sinhala').text(`${p.nic || 'N/A'}`);

//       doc.font('Helvetica').text(`   Address: `, { continued: true });
//       doc.font('Sinhala').text(`${p.addr || 'N/A'}`);

//       doc.font('Helvetica').text(`   Phone: `, { continued: true });
//       doc.font('Sinhala').text(`${p.phone || 'N/A'}`);

//       doc.font('Helvetica').text(`   No Of Family members: `, { continued: true });
//       doc.font('Sinhala').text(`${p.family || 'N/A'}`);

//       doc.font('Helvetica').text(`   Residence type: `, { continued: true });
//       doc.font('Sinhala').text(`${p.residenceTyp || 'N/A'}`);

//       doc.moveDown(0.5);
//     });
//   }

//   doc.end();
// };

// module.exports = { generatePDF };



// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// const generatePDF = (people, res, single = false) => {

//   const doc = new PDFDocument();
//   const filename = single ? `${people.name}.pdf` : 'all-people.pdf';

//   res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
//   res.setHeader('Content-type', 'application/pdf');

//   doc.pipe(res);

//   doc.fontSize(26).text(single ? people.name : 'මීගමු ජනතා ඒකාබද්ධ සංවිධානය', { align: 'center' });
//   doc.fontSize(20).text(single ? people.name : 'අංක - 64. කාර්දිනල් කුරේ මාවත', { align: 'center'});
//   doc.fontSize(20).text(single ? people.name : 'මීගමුව', { align: 'center'});
//   doc.fontSize(14).text(single ? people.name : 'Registration No-මීග 4 / ස්වේච්ඡා: 155', { align: 'center'});
//   doc.moveDown();

//   if (single) {
//     doc.text(`Address: ${people.addr || 'N/A'}`);
//     doc.text(`NIC: ${people.nic || 'N/A'}`);
//     doc.text(`GS_Division: ${people.gsDiv || 'N/A'}`);
//     doc.text(`Phone: ${people.phone || 'N/A'}`);
//     doc.text(`No Of Family members :${people.family||'N/A'}`);
//     doc.text(`Residence type :${people.residenceTyp||'N/A'}`);
//     doc.text(`Join Date: ${new Date(people.joinDate).toLocaleDateString()}`);
//   } else {
//     people.forEach((p, i) => {
//       doc.fontSize(12).text(`${i + 1}. ${p.name}`);
//       doc.text(`   Name: ${p.name}`);
//       doc.text(`   NIC: ${p.nic || 'N/A'}`);
//       doc.text(`   Address: ${p.addr || 'N/A'}`);
//       doc.text(`   Phone: ${p.phone || 'N/A'}`);
//       doc.text(`   No Of Family members: ${p.family || 'N/A'}`);
//       doc.text(`   Residence type: ${p.residenceTyp || 'N/A'}`);
//       doc.moveDown(0.5);
//     });
//   }

//   doc.end();

// };

// module.exports = { generatePDF };

// const mongoose = require('mongoose');

// const personSchema = new mongoose.Schema({

//   name:  { type: String, required: true },
//   addr:  { type: String },
//   nic:   { type: String, required: true, unique: true },
//   gsDiv: { type: String, required:true },
//   phone: { type: String, required:true },
//   family:{ type:String,  required:true},
//   residenceTyp:{ type:String, required:true}
  
// });

// module.exports = mongoose.model('person', personSchema);