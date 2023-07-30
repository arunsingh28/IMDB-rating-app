import fs from 'fs'
import path from 'path'

interface OMDB {
    Year: string
    Type: string
    Poster: string
    Title: string
    OMDBID: string
}

// read file
export const readFile = (): OMDB[] => {
    try {
        const fileContent = fs.readFileSync(path.join(__dirname + '../../db/data.json'), 'utf-8')
        return JSON.parse(fileContent) as OMDB[]
    } catch (error) {
        return []
    }
}

// insert funtion
export const insertRecord = async (data: OMDB): Promise<boolean> => {
    try {
        const file = readFile()
        // check duplicate OMDBID
        if (file.some((item) => item.OMDBID === data.OMDBID)) {
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
export const deleteRecord = async (OMDBID: string): Promise<boolean> => {
    let file = readFile();
    const index = file.findIndex((item) => item.OMDBID === OMDBID);
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

export const createDBDir = () => {
    const dbDir = path.join(__dirname + '../../db')
    fs.access(dbDir, (err) => {
        if (err) {
            fs.mkdir(dbDir, (err) => {
                if (err) {
                    console.log('Error creating db directory:', err)
                } else {
                    // db dir created successfully
                    console.log('db directory created successfully.');
                }
            })
        } else {
            // If 'db' directory exists, do nothing.
            console.log('db directory already exists.');
        }
    })
}