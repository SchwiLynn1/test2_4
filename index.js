import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL; 
    //const use to declare a constant variable, 
    // which means that once a value is assigned to it, it cannot be reassigned
    var qr_svg = qr.image(url);
    //qr.image is a function provided by the qr-image library in Node.js to generate a QR code in PNG format
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    //qr_svg.pipr() is a function provided by the qr-image library in Node.js to save the QR vcode image to a file
    //this function pipes the generated QR code image to a writable stream, saving it as qr_img.png

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });