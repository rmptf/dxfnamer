const fs = require('fs')
const XLSX = require("xlsx")
    
function getNames(data){
    //Read External Files and place in Variables
    // let dxfFile = fs.readFileSync('DECLAN_JKT.dxf', 'utf8')
    let dxfFile = data

    //Split each file Variable into an array containing each line as its on item.
    let arrayOfLines = (dxfFile.split(/\n/g)||[]);

    //Create an empty array for pc names
    let pieceNames = []

    //Create a search key variable
    let searchKey = ["-S_"]

    //For each item in the searchKey list
    for (let j = 0; j < searchKey.length; j++) {
        //Find all occurences of the piece name
        for (let i = 0; i < arrayOfLines.length; i++) {
            let eachLine = arrayOfLines[i].toString()
            if(eachLine.includes(searchKey[j])) {
                pieceNames.push(arrayOfLines[i])
                // console.log("OCCURENCE")
                // console.log(i)
                // console.log(arrayOfLines[i])
            }
        }
    }

    //Create an empty array for clean pc names 
    let cleanPieceNames = []

    //Remove the searchKey from each pieceName
    for (let i = 0; i < pieceNames.length; i++) {
            splitName = pieceNames[i].split(searchKey)
            cleanPieceNames.push(splitName[0])
        }

    //Eliminate duplicate pieceNames
    let uniqueNames = [...new Set(cleanPieceNames)];
    console.log(uniqueNames.length)

    createFile()
    function createFile(){
        const workbook1 = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook1, this.xlsxStats, 'Sheet1');
        
        XLSX.writeFile(workbook1, "Book1.xlsx")
    }

    editFile()
    function editFile(){
        const workbook = XLSX.readFile("Book1.xlsx")

        let worksheets = {}
        for(const sheetName of workbook.SheetNames) {
            worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        }

        for (let i = 0; i < uniqueNames.length; i++) {
            worksheets.Sheet1.push({
                OLD_NAME: uniqueNames[i],
                NEW_NAME: "",
                COMMENT: "",
            })
        }

        XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
        XLSX.writeFile(workbook, "Book1.xlsx")
    }

    //Turn array back into string keeping line breaks
    // let finalFile = ""

    // for( i=0; i<uniqueNames.length; i++ )
    // {
    //     if (i < uniqueNames.length - 1){
    //         finalFile = finalFile + uniqueNames[i].toString() + "\n"
    //     } else {
    //         finalFile = finalFile + uniqueNames[i].toString()
    //     }
    // }

    // //Create a file containing all the OldPieceNames
    // fs.writeFileSync('oldNamesList.txt', finalFile)
    // console.log(finalFile)
}

module.exports = getNames;