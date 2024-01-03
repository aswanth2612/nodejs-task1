const express = require ("express");
const fs = require ("fs");
const path = require ("path");

const app = express();

const outputFolder = "./output";

//check if the output folder is exists or create if it doesn't
 
if(!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

const PORT = 3000;

//endpoint to create a text file with timestamp

app.get("/createFile", (req, res)=> {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hours = currentTime.getHours().toString();
    const minutes = currentTime.getMinutes().toString();
    const seconds = currentTime.getSeconds().toString();

    //create a filename for timestamp

    const DateTimeForFileName =
    `${year}-${month}-${date}-${hours}-${minutes}-${seconds}.txt`;

    const filePath = path.join(outputFolder, DateTimeForFileName);

    //write current timestamp

    fs.writeFile(filePath,currentTime.toISOString(),(err)=> {
        if(err) {
            res.status(500).send(`Error occurs on creating file: ${err}`);
            return;
        }
        res.send(`File created sucessfully at: ${filePath}`);
    });
});

//endpoint to retrive all text files from the output folder

app.get("/getFile", (req,res) => {
    fs.readdir(outputFolder, (err, files) => {
        if(err) {
            res.status(500).send(`Error occur on reading file: ${err}`);
            return;
        }
        //filter the list of files to only include .txt files

        const textFiles = files.filter((file) => 
    path.extname(file) === ".txt");
        res.json(textFiles);
    });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});