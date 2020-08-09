# Bitskrieg2.0

### VIDEO
The video is present in the root of the GitHub Repository. Filename - **InvoiceExtraction__demo.mp4**

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

#### Use the Dashboard to Bulk Upload
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/1.PNG)

#### Downlaod the results individually or in bulk
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Analyze.PNG)

#### View your results on the dashboard itself with side by side view of the PDF
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Analyze-View.PNG)

#### Query and Sort your results by Date, Name and other quantities
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Query.PNG)

#### Sellers can use the chatbot to see if their invoices are all correct
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Whatsapp.PNG)

#### Check who needs support
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Chatbot.PNG)

#### Reply to each message individually
![Analyze](https://something-corona.s3.ap-south-1.amazonaws.com/flipkart/Chatbot-Reply.PNG)


