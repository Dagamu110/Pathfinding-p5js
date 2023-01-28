function World( seed ){

    this.rows = 10
    this.columns = 10
    this.sqSize = 40
    this.margin = 0

    randomSeed( seed )
    this.matrix = []
    for (let i = 0; i < this.rows; i++) {    
        let row = []
        for (let j = 0; j < this.columns; j++) {
           row.push( random([0,0,1]) ) 
        }
        this.matrix.push( row )
    }

    this.show = function(){
        this.matrix.forEach( (row, i) => {
            row.forEach( (sq, j) => {
                let color = sq ? [255] : [22, 24, 33]
                push()
                strokeWeight(1)
                stroke( '#586193' )
                fill(...color)
                rect( 
                    this.margin + j * this.sqSize,
                    this.margin + i * this.sqSize,
                    this.sqSize,
                    this.sqSize
                )
                pop()
            } )
        } )
    }

    this.collision = function( pos ){

        let outsideX = pos.x < 0 || pos.x > this.rows * this.sqSize
        let outsideY = pos.y < 0 || pos.y > this.columns * this.sqSize
        if( outsideX || outsideY ){
            return 1
        }

    
        let xIndex = floor( pos.x / this.sqSize )
        let yIndex = floor( pos.y / this.sqSize )

        let collision = this.matrix[ yIndex ][ xIndex ] 
        return collision

    }

}
