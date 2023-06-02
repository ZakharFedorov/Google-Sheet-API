const express = require("express");
const {google} = require("googleapis")

const app = express();

async function getAuthSheets(){

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets Api
    const googleSheets = google.sheets({ version: "v4", auth: client});

    return {
        auth,
        client,
        googleSheets,
    };

}

const spreadsheetId = "1i3Y-gvdKLyL8LJ4wRBriSIKqKldovKDENpQXFDlFSc0";

app.get("/", async (req, res) => {

    const { googleSheets, auth } = await getAuthSheets();

    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(metadata, null, 6));

});

app.get("/read", async (req, res) => {

    const { googleSheets, auth } = await getAuthSheets();

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "A:AZ",
    });

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(getRows.data, null, 6));
});

app.get("/write", async (req, res) => {
    const { googleSheets, auth } = await getAuthSheets();
  
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "A:AZ",
    });

    // find index of column with name "users"
    const usersIndex = getRows.data.values[0].indexOf("user");
    const totalPointsIndex = getRows.data.values[0].indexOf("totalPoints");
    const averagePercentageIndex = getRows.data.values[0].indexOf("averagePercentage");
    const averagePercentageSolvedIndex = getRows.data.values[0].indexOf("averagePercentageSolved");

    let requests = [];
    for (let i = 0; i < pokusData.length; i++) {
        requests.push({
            updateCells: {
                start: {sheetId: 0, rowIndex: i+1, columnIndex: usersIndex},
                rows: [{values: [{userEnteredValue: {stringValue: pokusData[i].user}}]}],
                fields: 'userEnteredValue',
            }
        });
        requests.push({
            updateCells: {
                start: {sheetId: 0, rowIndex: i+1, columnIndex: totalPointsIndex},
                rows: [{values: [{userEnteredValue: {numberValue: pokusData[i].totalPoints}}]}],
                fields: 'userEnteredValue',
            }
        });
        requests.push({
            updateCells: {
                start: {sheetId: 0, rowIndex: i+1, columnIndex: averagePercentageIndex},
                rows: [{values: [{userEnteredValue: {numberValue: pokusData[i].averagePercentage}}]}],
                fields: 'userEnteredValue',
            }
        });
        requests.push({
            updateCells: {
                start: {sheetId: 0, rowIndex: i+1, columnIndex: averagePercentageSolvedIndex},
                rows: [{values: [{userEnteredValue: {numberValue: pokusData[i].averagePercentageSolved}}]}],
                fields: 'userEnteredValue',
            }
        });
    }

    await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: {
            requests,
        }
    });
  
    res.status(200).send("Data successfully written to Google Sheets!");
});


app.listen(1337, (req, res) => console.log("running on 1337"));

const pokusData = [
    {
        "user": "jan.hybs",
        "totalPoints": 100,
        "averagePercentage": 33.333332,
        "averagePercentageSolved": 100,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdead5995a332f02d25b4b",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": null,
                "points": 0,
                "status": 666
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": null,
                "points": 0,
                "status": 666
            }
        ],
        "tags": []
    },
    {
        "user": "david.broz",
        "totalPoints": 100,
        "averagePercentage": 33.333332,
        "averagePercentageSolved": 100,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdec1b67a1f5a75c7c63f1",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": "64075d2dd407eaace849da6f",
                "points": 0,
                "status": 100
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": "640752b0d407eaace849da6b",
                "points": 0,
                "status": 100
            }
        ],
        "tags": []
    },
    {
        "user": "kristian.jacik",
        "totalPoints": 200,
        "averagePercentage": 66.666664,
        "averagePercentageSolved": 100,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdeaf2995a332f02d25b4d",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": "6408793bd407eaace849dab4",
                "points": 0,
                "status": 100
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": "640643dad407eaace849d9e0",
                "points": 100,
                "status": 100
            }
        ],
        "tags": []
    },
    {
        "user": "vaclav.kesler",
        "totalPoints": 195,
        "averagePercentage": 65,
        "averagePercentageSolved": 97.5,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdedac67a1f5a75c7c63ff",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": null,
                "points": 0,
                "status": 666
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": "63fe046767a1f5a75c7c640e",
                "points": 95,
                "status": 100
            }
        ],
        "tags": []
    },
    {
        "user": "tomas.krechler",
        "totalPoints": 295,
        "averagePercentage": 98.333336,
        "averagePercentageSolved": 98.333336,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdeadb995a332f02d25b4c",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": "64072ee1d407eaace849da37",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": "63ff297c67a1f5a75c7c6427",
                "points": 95,
                "status": 100
            }
        ],
        "tags": []
    },
    {
        "user": "martin.matousek",
        "totalPoints": 100,
        "averagePercentage": 33.333332,
        "averagePercentageSolved": 100,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": "63fdec1867a1f5a75c7c63f0",
                "points": 100,
                "status": 100
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": "64074fd2d407eaace849da65",
                "points": 0,
                "status": 100
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": "640744a9d407eaace849da5e",
                "points": 0,
                "status": 100
            }
        ],
        "tags": []
    },
    {
        "user": "matej.stybr",
        "totalPoints": 0,
        "averagePercentage": 0,
        "averagePercentageSolved": 0,
        "problems": [
            {
                "problemName": "01 Hello World",
                "problemId": "01-hello-world",
                "objectId": null,
                "points": 0,
                "status": 666
            },
            {
                "problemName": "02 Locks",
                "problemId": "02-locks",
                "objectId": null,
                "points": 0,
                "status": 666
            },
            {
                "problemName": "02 Threads",
                "problemId": "02-threads",
                "objectId": null,
                "points": 0,
                "status": 666
            }
        ],
        "tags": []
    }
]