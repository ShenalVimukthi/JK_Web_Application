// utils/generateExcel.js
const ExcelJS = require('exceljs');

const generateExcel = async (people, res, single = false) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('People');

  // Define columns
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Address', key: 'addr', width: 35 },
    { header: 'NIC', key: 'nic', width: 18 },
    { header: 'GS Division', key: 'gsDiv', width: 20 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Family', key: 'family', width: 15 },
    { header: 'Residence Type', key: 'residenceTyp', width: 20 },
  ];

  // Add rows
  if (single) {
    const p = people;
    worksheet.addRow({
      name: p.name,
      addr: p.addr || 'N/A',
      nic: p.nic || 'N/A',
      gsDiv: p.gsDiv || 'N/A',
      phone: p.phone || 'N/A',
      family: p.family || 'N/A',
      residenceTyp: p.residenceTyp || 'N/A',
    });
  } else {
    people.forEach(p => {
      worksheet.addRow({
        name: p.name,
        addr: p.addr || 'N/A',
        nic: p.nic || 'N/A',
        gsDiv: p.gsDiv || 'N/A',
        phone: p.phone || 'N/A',
        family: p.family || 'N/A',
        residenceTyp: p.residenceTyp || 'N/A',
      });
    });
  }

  // Style header
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1f2937' }, // dark gray
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  // Set filename
  const safeName = (name) => name.replace(/[^a-zA-Z0-9]/g, '-');
  const filename = single ? `${safeName(people.name)}.xlsx` : 'all-people.xlsx';

  // Set headers
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Stream to response
  await workbook.xlsx.write(res);
  res.end();
};

module.exports = { generateExcel };