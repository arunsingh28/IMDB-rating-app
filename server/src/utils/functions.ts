import fs from 'fs'
import path from 'path'

interface IMDB {
    Year: string
    Type: string
    Poster: string
    Title: string
    imdbID: string
}

// read file
export const readFile = (): IMDB[] => {
    try {
        const fileContent = fs.readFileSync(path.join(__dirname + '../../db/data.json'), 'utf-8')
        return JSON.parse(fileContent) as IMDB[]
    } catch (error) {
        return []
    }
}

// insert funtion
export const insertRecord = async (data: IMDB): Promise<boolean> => {
    try {
        const file = readFile()
        // check duplicate imdbID
        if (file.some((item) => item.imdbID === data.imdbID)) {
            return false
        }
        file.push(data)
        fs.writeFileSync(path.join(__dirname + '../../db/data.json'), JSON.stringify(file, null, 2), 'utf-8')
        return true
    } catch (error) {
        console.log('insert error', error)
        return false
    }
}

// delete function 
export const deleteRecord = async (imdbID: string): Promise<boolean> => {
    let file = readFile();
    const index = file.findIndex((item) => item.imdbID === imdbID);
    if (index !== -1) {
        file.splice(index, 1)
        // write file in json
        fs.writeFileSync(path.join(__dirname + '../../db/data.json'), JSON.stringify(file, null, 2), 'utf-8')
        return true
    } else {
        // record not found
        return false
    }
}
