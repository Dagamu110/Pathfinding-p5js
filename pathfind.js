function Pathfind( x1, y1, x2, y2, step, world, angleTest=PI/2 ){

    function vec( pos ){
        return createVector( pos.x, pos.y )
    }
    function pointDistance(a, b){
        return vec(a).dist(vec(b))
    }

    this.startPoint = { x: x1, y: y1 }
    this.endPoint = { x: x2, y: y2 }

    this.endPoint.counter = 0
    this.points = [ [this.endPoint] ]
    this.ready = false
    this.path = []


    this.getNextPoints = function(){

        var nPoints = []
        this.points[ this.points.length - 1 ].forEach( p => {            
            for (let i = 0; i <= 2 * PI ; i += angleTest) {

                let angleVector = p5.Vector.fromAngle( i )
                angleVector.setMag( step )  
                
                let vecNewPoint = vec(p).copy().add( angleVector ) 

                let newPoint = { 
                    x: vecNewPoint.x, y: vecNewPoint.y,
                    counter: p.counter + 1
                }

                if( pointDistance( this.startPoint, newPoint ) < step ){
                    this.ready = true
                }

                let lowestDistance = Infinity
                this.points.forEach( l => {
                    l.forEach( pp => {
                        let distance = vecNewPoint.dist( vec( pp ) ) 
                        lowestDistance = distance < lowestDistance ? distance : lowestDistance

                    } ) 
                } )
                nPoints.forEach( pp => {
                    let distance = vecNewPoint.dist( vec( pp ) ) 
                    lowestDistance = distance < lowestDistance ? distance : lowestDistance
                } )
                if( !world.collision( newPoint ) && lowestDistance > 9.9   ){
                    nPoints.push( newPoint )
                }
            }
        } )

        nPoints = nPoints.filter((item, index) => nPoints.indexOf(item) === index);

        this.points.push( nPoints )

    }

    this.showPath = function(){  
        this.path.forEach( p => {
                fill( 255 )
                circle( p.x, p.y, 5 )
            } )
    }

    this.showPoints = function(){  
        this.points.forEach( line => {
            line.forEach( p => {
                fill( p.counter * 255 / this.points.length )
                circle( p.x, p.y, 5 )
            } )
        } )
    }

    this.getPath = function (){
        var path = [ this.startPoint ]

        while( vec( path[ path.length -1 ] ).dist( vec(this.endPoint) ) > step ){
            path.push( nexStep(path[ path.length - 1], this.points) )
        }

        path.shift()
        this.path = path
        return path
    }
}

function nexStep( pos, points){
    nearPoints = []
    points.forEach( l => {
        l.forEach( p => {
            pVect = createVector( p.x, p.y )
            posVect = createVector( pos.x, pos.y )
            dist = pVect.dist( posVect )
            if (dist < 15){
                nearPoints.push( p )
            } 
        })
    } )

    lessCounter = { counter: Infinity }
    nearPoints.forEach( p => {
        lessCounter = p.counter < lessCounter.counter ? p : lessCounter
    } )
    return lessCounter
}
