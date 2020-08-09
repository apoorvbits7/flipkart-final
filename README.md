# flipkart-final
IMPORTANT : Before running the program, please run the following commands on the terminal:
apt-get install tesseract-ocr
apt-get install -y poppler-utils
pip install -r requirements.txt


There are two ways to run the program:
Using the GUI provided by dragging and dropping the input file
Use the CLI to run the program by specifying the input, output and template file 

CLI
To run the program, change directory to the BITSkrieg folder where the program is contained. 
The program can be run using the following command :
 python3 file.py -i <PATH_TO_INPUT_PDF> -o <PATH_TO_SAVE_OUTPUT_EXCEL>


GUI

The files can be dragged onto the corresponding input bin
The backend located on AWS runs the program on the inputted pdf
The results are then returned and can be viewed on the UI


