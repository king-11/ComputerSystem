import { SIGUSR2 } from "constants";
import { Hash } from "crypto";
import csv from "csvtojson"
const createCsvWriter = require("csv-writer").createObjectCsvWriter

interface result {
    Name: string,
    'Roll Number': string,
    Hash: string,
    'Check 1': string,
    'Check 1 Roll': string,
    'Check 1 Hash': string,
    'Check 1 Score': string,
    'Check 1 Comment': string,
    'Check 2': string,
    'Check 2 Roll': string,
    'Check 2 Hash': string,
    'Check 2 Score': string,
    'Check 2 Comment': string,
    'Check 3': string,
    'Check 3 Roll': string,
    'Check 3 Hash': string,
    'Check 3 Score': string,
    'Check 3 Comment': string,
}

interface hashes {
    Name: string,
    'Roll Number': string,
    DOB: string,
    Hash: string
}

let results: result[] = [];

const Hashes = async () => {
    let scores: any[] = [];
    let json: hashes[] = await csv().fromFile("./Final.csv")
    json.forEach((e: hashes) => {
        let { DOB, ...value } = e
        scores.push(value)
    })
    return scores
}

const Scores = async (scores: any[]) => {
    let json: result[] = await csv().fromFile("./result.csv")
    // console.log(scores)

    for (let x in scores) {
        let element = scores[x]
        // let element: result = json[x]
        let a1 = [...json.filter(e => parseInt(element['Hash']) === parseInt(e["Check 1 Hash"])), ...json.filter(e => parseInt(element['Hash']) === parseInt(e["Check 2 Hash"])), ...json.filter(e => parseInt(element['Hash']) === parseInt(e["Check 3 Hash"]))]
        // let a2 = scores.find(e => parseInt(e['Hash']) == parseInt(element["Check 2 Hash"]))
        // let a3 = scores.find(e => parseInt(e['Hash']) == parseInt(element["Check 3 Hash"]))
        let a2 = new Set(a1)
        a1 = [...a2].slice(0, 3)
        // // console.log(a1, element)
        for (let j in a1) {
            const i = parseInt(j)
            element[`Checked ${i + 1} Hash`] = a1[i].Hash
            element[`Checked ${i + 1}`] = a1[i]["Roll Number"]
            try {
                let person = Object.keys(a1[i]).find(key => parseInt(a1[i][key]) == element['Hash'])
                person = (person.split(" ").slice(0, 2)).join(" ")
                element[`Checked ${i + 1} Score`] = a1[i][`${person} Score`]
                element[`Checked ${i + 1} Comment`] = a1[i][`${person} Comment`]
            }
            catch (e) {
                console.log(element)
            }
            // console.log(a1)
        }
        // break;
    }

    return scores
}

const writeCsv = (records: any[]) => {
    const csvWriter = createCsvWriter({
        path: './score.csv',
        header: [
            { id: 'Name', title: 'Name' },
            { id: 'Roll Number', title: 'Roll Number' },
            { id: 'Hash', title: 'Hash' },
            { id: 'Checked 1', title: 'Checked 1' },
            { id: 'Checked 1 Hash', title: 'Checked 1 Hash' },
            { id: 'Checked 1 Score', title: 'Checked 1 Score' },
            { id: 'Checked 1 Comment', title: 'Checked 1 Comment' },
            { id: 'Checked 2', title: 'Checked 2' },
            { id: 'Checked 2 Hash', title: 'Checked 2 Hash' },
            { id: 'Checked 2 Score', title: 'Checked 2 Score' },
            { id: 'Checked 2 Comment', title: 'Checked 2 Comment' },
            { id: 'Checked 3', title: 'Checked 3' },
            { id: 'Checked 3 Hash', title: 'Checked 3 Hash' },
            { id: 'Checked 3 Score', title: 'Checked 3 Score' },
            { id: 'Checked 3 Comment', title: 'Checked 3 Comment' },
        ]
    })
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
}

Hashes().then(Scores).then(writeCsv)








