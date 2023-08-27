const inquirer = import("inquirer");
const fs = import("fs");
const shapes = import("../lib/shapes");

function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182 fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  fs.writeToFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What would you like your logo to display? (Three characters only please)",
        name: "text",
      },
      {
        type: "input",
        message: "Choose your text color (Input your color keyword or a hexadecimal color number)",
        name: "textColor",
      },
      {
        type: "list",
        message: "What shape would you like your logo to be? (Triangle, square, or circle)",
        name: "shape",
      },
      {
        type: "input",
        message: "Choose your shape color (Input your color keyword or hexadecimal color number",
        name: "shapeBackgroundColor"
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Characters entered must be 3 or less.");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}