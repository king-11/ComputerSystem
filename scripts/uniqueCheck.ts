import csv from "csvtojson"

let store = new Set()
csv().fromFile("./Final.csv").then((json: any[]) => {
    json.forEach(element => {
        if (store.has(element['Hash']))
            console.log(element)
        else
            store.add(element['Hash'])
    });
}).then(() => console.log(store.size))