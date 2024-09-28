// @ts-check
const { test, expect } = require('@playwright/test');
const Excel = require('exceljs');
const { comapreExcel } = require('../utilities/comparexlsx');
const expectedPath = 'resources/expected.xlsx';
const actualPath = 'resources/actual.xlsx';

test('has title', async ({ page }) => {


  // const excel = fs.realpathSync(path, { encoding: 'utf8' });

  comapreExcel(expectedPath, actualPath, { ignoreBgColor: true });
  // const wb = new Excel.Workbook();
  // await Promise.all([wb.xlsx.readFile(path)])

  // const sheet = wb.eachSheet((item) => {
  //   const sheetName = item.name;
  //   console.log(sheetName)
  // });

});

