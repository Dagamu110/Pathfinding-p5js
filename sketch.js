var world;
var pathPoints = []

var pause = false
function keyPressed(){
    if( key == 'q' ){
        pause = !pause
    }
}

function newPathFind( world ){
    pPoints = new Pathfind(
                pathPoints[0].x,
                pathPoints[0].y,
                pathPoints[1].x,
                pathPoints[1].y,
                10,
                world
)

}

function addNewPathPoint(){
    let newPoint = { x: mouseX, y: mouseY }
    if( !world.collision( newPoint ) ){
        pathPoints.push( newPoint )
    }

}

function mousePressed(){
    if( !world ){ return }
    switch( pathPoints.length ){
        case 2:
            pathPoints = []
        case 0:
            addNewPathPoint()
            break
        case 1: 
            addNewPathPoint()
            console.log( pathPoints )
            newPathFind( world )
    }
}

var seedInput;
function newWorld(){
    world = new World( seedInput.value() )
    pPoints = undefined
}

var pPoints;
function setup() {
    createCanvas(400, 400, P2D)

    seedInput = createInput()
    seedInput.parent('container')
    seedInput.attribute( 'placeholder', 'Seed')
    seedBtn = createButton('Create New Map')
    seedBtn.mousePressed( newWorld )
    seedBtn.parent('container')
}

function draw() {
    background(30)

    //frameRate(4)

    if( world ){

        world.show()
        let color = world.collision( {x:mouseX, y:mouseY} ) ? 'red' : 'white'
        fill( color )
        circle( mouseX, mouseY, 5 )
        fill( 255 )
        text( floor(mouseX)+', '+floor(mouseY), 10, 20 )

        if( pPoints ){
            if( !pause && !pPoints.ready ){
                pPoints.getNextPoints()
            }
            if ( pPoints.path.length == 0 && pPoints.ready ){
                pPoints.getPath().forEach( p => {
                    circle( p.x, p.y, 5 )
                } )
            } 

            if( pPoints.path.length ){
                pPoints.showPath()
            } else {
                pPoints.showPoints()
            }

        }
        drawPathPoints()
    }

}

function drawPathPoints(){
    pathPoints.forEach( (p, i) =>{
        push()
        let hue = i*160 + 10
        fill( color('hsl(' + hue + ', 54%, 55%)') )
        circle( p.x, p.y, 5 )
        pop()
    } )
}
