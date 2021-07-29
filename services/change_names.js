var fs = require('fs')
const XLSX = require("xlsx")



//Read the file into memory
const workbook = XLSX.readFile("Book1.xlsx")

//Convert the XLSX into JSON
let worksheets = {}

for(const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

//Put the data in a variable
let data = worksheets.Sheet1

let oldName123 = []
let newName123 = []
let comment123 = []

data.forEach(dataSet => oldName123.push(dataSet.OLD_NAME))
data.forEach(dataSet => newName123.push(dataSet.NEW_NAME))
data.forEach(dataSet => comment123.push(dataSet.COMMENT))

//Read External Files and place in Variables
let dxfFile = fs.readFileSync('DECLAN_JKT.dxf', 'utf8')
// let newNamesList = fs.readFileSync('newNamesList.txt', 'utf8')
// let oldNamesList = fs.readFileSync('oldNamesList.txt', 'utf8')
// let newAnnotationList = fs.readFileSync('newAnnotationList.txt', 'utf8')

//Split each file Variable into an array containing each line as its on item.
let fileEachLineArray = (dxfFile.split(/\n/g)||[]);
// let newNamesArray = (newNamesList.split(/\n/g)||[]);
// let oldNamesArray = (oldNamesList.split(/\n/g)||[]);
// let newAnnotationArray = (newAnnotationList.split(/\n/g)||[]);
let newNamesArray = newName123
let oldNamesArray = oldName123
let newAnnotationArray = comment123


//Change each line of dxf file to a string
let arrayOfLinesStrings = []
for (let i = 0; i < fileEachLineArray.length; i++) {
    arrayOfLinesStrings.push(fileEachLineArray[i].toString())
}

//Loop through each oldName
for (let j = 0; j < oldNamesArray.length; j++) {
    //Clean up any linebreaks or white spaces
    let oldName = oldNamesArray[j]
    //Loop through each line of dxf file
    for (let i = 0; i < fileEachLineArray.length; i++) {
        //For each old name, loop through each line of dxf file and check is old name is on that line.
        if(arrayOfLinesStrings[i].includes(oldName)) {
            // console.log(arrayOfLinesStrings[i])
            let lineToEdit = arrayOfLinesStrings[i]
            editLineName(lineToEdit, oldName, j, i)
        }
    }
}

//Replace portion (oldname) of line with newname but keep the rest of the name.
function editLineName(lineToEdit, oldName, j, i){
    let newName = newNamesArray[j]
    let newLine = lineToEdit.replace(oldName, newName);
    arrayOfLinesStrings[i] = newLine
    // console.log(arrayOfLinesStrings[i])
}

//Repeat similar process for piece Data.
//Loop through each oldName
let t = -1
for (let i = 0; i < fileEachLineArray.length; i++) {
    if(arrayOfLinesStrings[i].includes("Annotation: ")) {
        t = t + 1
        let lineToEdit = arrayOfLinesStrings[i]
        let oldAssName = lineToEdit.split("Annotation: ")
        let oldOldAssName = oldAssName[1].toString()
        editLineAnnotation(lineToEdit, oldOldAssName, t, i)
    }
}

//Replace portion (oldname) of line with newname but keep the rest of the name.
function editLineAnnotation(lineToEdit, oldOldAssName, t, i){
    let newAnnotation = newAnnotationArray[t]
    let newLine = lineToEdit.replace(oldOldAssName, newAnnotation);
    arrayOfLinesStrings[i] = newLine
    // console.log(arrayOfLinesStrings[i])
}

// Turn array back into string keeping line breaks
let finalFile = ""

for( i=0; i<arrayOfLinesStrings.length; i++ )
{
    if (i < arrayOfLinesStrings.length - 1){
        finalFile = finalFile + arrayOfLinesStrings[i] + "\n"
    } else {
        finalFile = finalFile + arrayOfLinesStrings[i]
    }
}

//Rewrite new data in string onto its own file.
fs.writeFileSync('newPattern.dxf', finalFile)