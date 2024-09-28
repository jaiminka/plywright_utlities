const Excel = require('exceljs')

export const comapreExcel = async (expectedPath, actualPath) => {
    const expectedWb = new Excel.Workbook();
    const actualWb = new Excel.Workbook();

    await Promise.all([expectedWb.xlsx.readFile(expectedPath), actualWb.xlsx.readFile(actualPath)]);

    try {
        compareSheetName(expectedWb, actualWb);
        compareSheetData(expectedWb, actualWb);

    } catch (e) {
        throw e;
    }
}

const getSheetName = (wb) => {
    const sheets = [];
    wb.eachSheet((item) => {
        sheets.push(item.name)
    });
    return sheets;
}

const compareSheetName = (expectedWb, actualWb) => {

    try {

        const expectedSheets = getSheetName(expectedWb);
        const actualSheets = getSheetName(actualWb);

        for (let i = 0; i < expectedSheets.length; i++) {
            if (expectedSheets[i] !== actualSheets[i]) throw Error(`sheetname missmatch found :expected ${expectedSheets[i]} but found ${actualSheets[i]}`);
        }

    } catch (error) {
        throw error
    }
}

const compareSheetData = (expectedWb, actualWb) => {

    try {
        const sheetsName = getSheetName(expectedWb);
        for (let name = 0; name <= sheetsName.length; name++) {

            const rowCount = expectedWb.getWorksheet(sheetsName[name]).rowCount;
            const columnCount = expectedWb.getWorksheet(sheetsName[name]).columnCount;

            for (let row = 1; row <= rowCount; row++) {
                for (let column = 1; column <= columnCount; column++) {
                    const columnName = (column + 9).toString(36).toUpperCase();
                    const expCellValue = expectedWb.getWorksheet(sheetsName[name]).getCell(`${columnName}${row}`).value
                    const actCellValue = actualWb.getWorksheet(sheetsName[name]).getCell(`${columnName}${row}`).value
                    if (expCellValue !== actCellValue) throw Error(`in ${columnName}${row} cellValue missmatch found :expected ${expCellValue} but found ${actCellValue}`)

                }
            }
        }
    }
    catch (e) {
        throw e;
    }

}