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

There are two ways to run the program:
Using the GUI provided by dragging and dropping the input file
Use the CLI to run the program by specifying the input, output and template file 


