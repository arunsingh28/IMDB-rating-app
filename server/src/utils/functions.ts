import fs from 'fs'
import path from 'path'

// insert funtion
export const insertRecord = () => {

}

// delete function 
export const deleteRecord = () => {

}

export const readFile = async () => {
    const fileContent = fs.readFileSync(path.join(__dirname + '../../db/data.json'), 'utf-8')
    return JSON.parse(fileContent)
}

// create file if not exits
export const createFile = () => {
    if (!fs.existsSync(path.join(__dirname + '../../db/data.json'))) {
        fs.writeFileSync(path.join(__dirname + '../../db/data.json'), '')
    }
}