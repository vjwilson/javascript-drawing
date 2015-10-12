var Drawing = ( function( window, undefined ) {
  var LEFT = 75;
  var BASELINE = 450;
  var YEAR_WIDTH = 7;

  var myCanvas = document.getElementById( 'canvas' );

  context = myCanvas.getContext( "2d" )

  /**
   * draws a life line for the given person
   * @param {Object} person   a structure with birth and end dates
   */
  function drawLifeLine( person ) {
    var birthDate = (people[i].birthDate - 1900) * YEAR_WIDTH + LEFT;
    var endDate = (people[i].endDate - 1900) * YEAR_WIDTH + LEFT;
    var span = endDate - birthDate;

    context.beginPath();
    context.moveTo(birthDate, BASELINE);
    context.quadraticCurveTo(endDate - (span / 2), (BASELINE - span), endDate, BASELINE);
    context.stroke();
  }

  /**
   * draws a grid line with hash marks and labels
   * @param {number} width         the horizontal size of the grid
   * @param {number} numDivisions  the number of sections between hash marks
   */
  function drawGridLine( width, numDivisions ) {
    if ( numDivisions < 3 ) {
      numDivisions = 3;
    }
    var interval = width / numDivisions;
    var yearInterval = 125 / numDivisions ;

    var labelXposition = -35;
    var labelYposition;

    context.moveTo(LEFT, BASELINE);
    context.lineTo(LEFT + width, BASELINE);
    context.stroke();

    context.font = "12px Verdana";

    var i;
    for (i = 0; i <= numDivisions; i++) {
      context.moveTo(LEFT + (i * interval), BASELINE - 10);
      context.lineTo(LEFT + (i * interval), BASELINE + 10);

      context.save();
      context.translate(LEFT, BASELINE);
      context.rotate(-Math.PI/2);

      context.textAlign = "center";
      
      labelYposition = 5 + (i * interval);

      context.fillText( 
                        ( 1900 + Math.floor( i * yearInterval ) ).toString(), 
                        labelXposition,
                        labelYposition
                      );

      context.restore();
    }
    // draw in all the hash marks with just calculated in the loop
    context.stroke();
  }

  return {
    drawLifeLine: drawLifeLine,
    drawGridLine: drawGridLine
  };
 
} )( window );

var WIDTH = 875;

Drawing.drawGridLine( WIDTH, 30 );

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
    Drawing.drawLifeLine( people[i] );
}
