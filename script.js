var myCanvas = document.getElementById('canvas');

var i;

var LEFT = 75;
var BASELINE = 450;
var WIDTH = 875;
var INTERVAL_WIDTH = 35;
var YEAR_WIDTH = 7;

context = myCanvas.getContext("2d")

drawGridLine(context, LEFT, WIDTH, BASELINE, INTERVAL_WIDTH);

var people = [
  {
    name: 'Van',
    birthDate: 1969,
    endDate: 2041
  },
  {
    name: 'Robin',
    birthDate: 1971,
    endDate: 2043
  },
  {
    name: 'Ben',
    birthDate: 2002,
    endDate: 2074
  },
  {
    name: 'Jessie',
    birthDate: 2006,
    endDate: 2078
  },
  {
    name: 'Kirk',
    birthDate: 1949,
    endDate: 2015
  },
  {
    name: 'Jesse',
    birthDate: 1930,
    endDate: 1998
  }
];

for (var i = 0; i < people.length; i ++) {
    drawLifeLine(context, people[i], BASELINE);
}

/**
 * draws a life line for the given person
 * @param {Object} context  the canvas object's context
 * @param {Object} person   a structure with birth and end dates
 * @param {number} baseline the Y-coordinate for the grid line
 */
function drawLifeLine(context, person, baseline) {
  var birthDate = (people[i].birthDate - 1900) * YEAR_WIDTH + LEFT;
  var endDate = (people[i].endDate - 1900) * YEAR_WIDTH + LEFT;
  var span = endDate - birthDate;

  context.beginPath();
  context.moveTo(birthDate, BASELINE);
  context.quadraticCurveTo(endDate - (span / 2), (BASELINE - span), endDate, BASELINE);
  context.closePath();
  context.stroke();
}

/**
 * draws a grid line with hash marks and labels
 * @param {Object} context       the canvas object's context
 * @param {number} startingPoint the X-coordinate to start from
 * @param {number} width         the horizontal size of the grid
 * @param {number} baseline      the Y-coordinate for the grid line
 * @param {number} interval      the distance between hash marks
 */
function drawGridLine(context, startingPoint, width, baseline, interval) {
  var labelXposition = -35;
  var labelYposition;

  context.moveTo(startingPoint, baseline);
  context.lineTo(startingPoint + width, baseline);
  context.stroke();

  context.font = "12px Verdana";

  for (i = 0; i <= 25; i++) {
    context.moveTo(startingPoint + (i * interval), baseline - 10);
    context.lineTo(startingPoint + (i * interval), baseline + 10);

    context.save();
    context.translate(startingPoint, baseline);
    context.rotate(-Math.PI/2);

    context.textAlign = "center";
    
    labelYposition = 5 + (i * interval);

    context.fillText((1900 + (i * 5)).toString(), labelXposition, labelYposition);

    context.restore();
  }
  // draw in all the hash marks with just calculated in the loop
  context.stroke();
}
