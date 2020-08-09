# Bitskrieg2.0

### Installation
IMPORTANT : Before running the program, please run the following commands on the terminal:

```sh
$ sudo apt-get install tesseract-ocr
$ sudo apt-get install -y poppler-utils
$ pip install -r requirements.txt
```

### Running The Program with CLI
To run the program, change directory to the cli folder where the program is contained. 
The program can be run using the following command :
```sh
python3 digitize_invoice.py -i <PATH_TO_INPUT_PDF> -o <PATH_TO_SAVE_OUTPUT_EXCEL>
```

### Running The Program with GUI

### Setting Up The Frontend

cd into the frontend folder and run the following commands:
```sh
$ npm install
$ npm run start
```
You can then visit http://localhost:3000/ to view the frontend

### Setting Up The Backend

cd into the frontend folder and run the following commands:
```sh
$ npm install
$ npm run start:dev
```

The backend is now hosted on http://localhost:8000/

PS:
1. To make the backend work you will need to enter you database credentials in backend/server/config/config.json
2. For the chatbot to work you will need to enter your Twilio credentials in backend/server/controllers/chatbot.js


### GUI Snapshots

![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/1.PNG)


