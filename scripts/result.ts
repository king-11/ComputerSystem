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

    for (let x in json) {
        let element: result = json[x]
        let a1 = scores.find(e => parseInt(e['Roll Number']) === parseInt(element["Check 1 Roll"]))
        let a2 = scores.find(e => parseInt(e['Roll Number']) === parseInt(element["Check 2 Roll"]))
        let a3 = scores.find(e => parseInt(e['Roll Number']) === parseInt(element["Check 3 Roll"]))
        // console.log(a1, element)
        try {
            a1["Checked 1"] = element["Roll Number"]
            a1["Checked 1 Hash"] = element["Hash"]
            a1["Checked 1 Score"] = element["Check 1 Score"]
            a1["Checked 1 Comment"] = element["Check 1 Comment"]

            a2["Checked 2"] = element["Roll Number"]
            a2["Checked 2 Hash"] = element["Hash"]
            a2["Checked 2 Score"] = element["Check 2 Score"]
            a2["Checked 2 Comment"] = element["Check 2 Comment"]

            a3["Checked 3"] = element["Roll Number"]
            a3["Checked 3 Hash"] = element["Hash"]
            a3["Checked 3 Score"] = element["Check 3 Score"]
            a3["Checked 3 Comment"] = element["Check 3 Comment"]
        } catch (e) {
            console.log(element)
            console.log(a1)
            console.log(a2)
            console.log(a3)
            break;
        }
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








