import {res} from '../resource';
import AppConstants, {clearAppConstants} from '../AppConstants';

export default class TankWatchLayer extends cc.Layer {
    sprite: any;
    tileSize: any;
    mapWidth: any;
    mapHeight: any;
    tileMap: any;
    piece: any;
    center: any;
    rotated: any;
    movedLeft: any;
    movedRight: any;
    obstacle: any;
    constructor() {
        super();
        console.log("inside constructor");
        let size = cc.winSize;
        this.tileSize = 41;
        this.mapWidth = 10;
        this.mapHeight = 14;
        this.center = 4;
        this.rotated = false;
        this.movedLeft = false;
        this.movedRight = false;
        
        this.piece = new cc.Node();
        this.addChild(this.piece);
        this.piece.type = null;
        this.piece.height = null;
        this.piece.width = null;
        this.piece.y = null;
        this.piece.x = null;
        this.piece.rotate = null;
        this.piece.array = null;
        this.piece.colour = null;
        // console.log(this.piece);
        this.obstacle = [];
        for(let i = 0; i < this.mapHeight; i++) {
            this.obstacle[i] = [];
            for(let j = 0; j < this.mapWidth; j++) {
                this.obstacle[i][j] = 0;
            }
        }
        // console.log(this.obstacle);
        // this.printObstacle();
        
        this.tileMap = new flax.TileMap();
        this.tileMap.init(this.tileSize, this.tileSize);
        this.tileMap.setMapSize(this.mapWidth, this.mapHeight);
        let mapSize = this.tileMap.getMapSizePixel();
        this.tileMap.setPosition(size.width/2 - mapSize.width/2,  size.height/2 - mapSize.height/2);
        this.addChild(this.tileMap);
        // this.tileMap.showDebugGrid();
        // console.log(this.tileMap.getTileSize());
        
        for(let i = 0; i < this.mapWidth; i++){
            for(let j = 0; j < this.mapHeight; j++){
                this.putColorAt("Cube", i, j);
            }
        }
        
        // for(let i = 0; i < this.mapWidth; i++){
        //     for(let j = 3; j < this.mapHeight - i; j++){
        //         this.putColorAt("Purple", i, j);
        //     }
        // }
    
        let self = this; 
        cc.eventManager.addListener({ 
        	event: cc.EventListener.KEYBOARD,
        	onKeyReleased: function(key, event){
       		    self.handleKeyPress(key.toString());
       		}
       	}, this);
           
           
        this.typeGenerator();
        
        
        // this.createPiece("L");
        // this.test();
        // this.printObstacle();
        // this.checkRow();
        // this.printObstacle();
        
        
    };
    
    gameOver(){
        console.log("Game over, Reload to play again");
        this.removeAllChildren();    
    };
    
    typeGenerator(){
        let types = ["Square", "L", "ReverseL", "Line", "T", "Z", "ReverseZ"];
        let random = Math.floor(Math.random()*100)%7;
        // console.log(random);
        this.createPiece(types[random]);
    }   
    
    createPiece(type){
        console.log("inside create"+ type);
        if (type === "Square"){
            this.piece.type = type;
            this.piece.height = 2;
            this.piece.width = 2;
            this.piece.array = [
                [[0, 0], [0, -1], [1, 0], [1, -1]],
                [[0, 0], [0, -1], [1, 0], [1, -1]],
                [[0, 0], [0, -1], [1, 0], [1, -1]],
                [[0, 0], [0, -1], [1, 0], [1, -1]]
            ];
            this.piece.colour = "Yellow";
        }
        else if (type === "L"){
            this.piece.type = type;
            this.piece.height = 3;
            this.piece.width = 2;
            this.piece.array = [
                [[0, 0], [0, -1], [0, -2], [1, -2]],
                [[0, -1], [1, -1], [2, -1], [2, 0]],
                [[0, 0], [1, 0], [1, -1], [1, -2]],
                [[0, 0], [0, -1], [1, 0], [2, 0]]
            ];
            this.piece.colour = "Purple";
        }
        else if (type === "ReverseL"){
            this.piece.type = type;
            this.piece.height = 3;
            this.piece.width = 2;
            this.piece.array = [
                [[1, 0], [1, -1], [1, -2], [0, -2]],
                [[0, 0], [1, 0], [2, 0], [2, -1]],
                [[0, 0], [1, 0], [0, -1], [0, -2]],
                [[0, 0], [0, -1], [1, -1], [2, -1]]
            ];
            this.piece.colour = "Blue";
        }
        else if (type === "Line"){
            this.piece.type = type;
            this.piece.height = 4;
            this.piece.width = 1;
            this.piece.array = [
                [[0, 0], [0, -1], [0, -2], [0, -3]],
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                [[0, 0], [0, -1], [0, -2], [0, -3]],
                [[0, 0], [1, 0], [2, 0], [3, 0]]
            ];
            this.piece.colour = "Green";
        }
        else if (type === "T"){
            this.piece.type = type;
            this.piece.height = 2;
            this.piece.width = 3;
            this.piece.array = [
                [[1, 0], [0, -1], [1, -1], [2, -1]],
                [[1, 0], [0, -1], [1, -1], [1, -2]],
                [[0, 0], [1, 0], [2, 0], [1, -1]],
                [[0, 0], [0, -1], [0, -2], [1, -1]]
            ];
            this.piece.colour = "Pink";
        }
        else if (type === "Z"){
            this.piece.type = type;
            this.piece.height = 2;
            this.piece.width = 3;
            this.piece.array = [
                [[0, 0], [1, 0], [1, -1], [2, -1]],
                [[1, 0], [0, -1], [1, -1], [0, -2]],
                [[0, 0], [1, 0], [1, -1], [2, -1]],
                [[1, 0], [0, -1], [1, -1], [0, -2]]
            ];
            this.piece.colour = "Red";
        }
        else if (type === "ReverseZ"){
            this.piece.type = type;
            this.piece.height = 2;
            this.piece.width = 3;
            this.piece.array = [
                [[1, 0], [2, 0], [0, -1], [1, -1]],
                [[0, 0], [0, -1], [1, -1], [1, -2]],
                [[1, 0], [2, 0], [0, -1], [1, -1]],
                [[0, 0], [0, -1], [1, -1], [1, -2]]
            ];
            this.piece.colour = "Orange";
        }
        
        else{
            console.log("invalid type");
            return;
        }
        this.piece.y = this.mapHeight + this.piece.height - 1;
        this.piece.x = this.center;
        this.piece.rotate = 0;
        console.log(this.piece.type, this.piece.height, this.piece.width, this.piece.x, this.piece.y, this.piece.rotate,this.piece.colour);
        this.schedule(this.movePieceDown, 1, null, null, null);
        
    };
    
    movePieceDown(){
        console.log("inside move piece down");
        // console.log(this.piece.type, this.piece.height, this.piece.width, this.piece.x, this.piece.y, this.piece.rotate,this.piece.colour);
        // if(this.rotated || this.movedLeft || this.movedRight){
            this.rotated = false;
            this.movedLeft = false;
            this.movedRight = false;
        // }
        // else{
            if (!this.checkCollision(0, -1, null)){
                this.unschedule(this.movePieceDown);
                console.log("Hi");
                
                this.solidifyPiece();
                console.log(this.piece.y - this.piece.height);
                if(this.piece.y - this.piece.height >= this.mapHeight-1){
                    this.gameOver();
                }
                
                this.piece.type = null;
                this.scheduleOnce(this.typeGenerator, 0.8, null);
            }
            else{
                this.clearPiece();
                this.piece.y -= 1;
                this.renderPiece();
            }
        // }
        // this.printObstacle();  
    };
    
    checkCollision(x, y, rotation){        
        console.log("inside check collision");
        if(rotation == null){
            rotation = this.piece.rotate;
        }
        // console.log(rotation);
        let array = this.piece.array[rotation];
        let answer = true;
        // console.log(array);
        let line = "";
        for (let i = 0; i < array.length; i++){
            // console.log(array[i]);  
            let tileX = this.piece.x + x + array[i][0];
            let tileY = this.piece.y + y + array[i][1];
            
            if(this.tileMap.isValideTile(tileX, tileY)){
                let value = this.obstacle[tileY][tileX];
                if (value == 2){
                    answer = false;
                    break;
                }
                line += value + " ";    
            }
            else{
                line += "# ";
                if(tileY < this.mapHeight){
                    answer = false;
                    break;
                }
                
            }            
        }
        console.log(line);
        console.log(answer);
        return answer;    
    };
    
    clearPiece(){
        // console.log("inside clear piece");
        this.renderPieceHelper("Cube", this.piece.array[this.piece.rotate], this.piece.x, this.piece.y);
    };
    
    renderPiece(){
        // console.log("inside render piece");
        this.renderPieceHelper(this.piece.colour, this.piece.array[this.piece.rotate], this.piece.x, this.piece.y);            
        
    };
    
    renderPieceHelper(color, arr, x, y){
        // console.log("inside render piece helper");
        // console.log(color, arr.length,x, y);
        for (let i = 0; i < arr.length; i++){
            this.putColorAt(color, x + arr[i][0], y + arr[i][1]);
            
        }
        
        
    };
    
    putColorAt(color, x, y){
        // console.log("inside put color at");
        if(this.tileMap.isValideTile(x, y)){
            if (color == "Cube"){
                this.obstacle[y][x] = 0;
            }
            else{
                this.obstacle[y][x] = 1;
            }
            let objs = this.tileMap.getObjects(x, y);
            if(objs.length > 0){
                objs[0].removeFromParent();                
            }
            this.tileMap.removeObjects(x, y);
            let tile = flax.assetsManager.createDisplay(res.tetris_plist, color, {parent : this});
            tile.setAnchorPoint(0.5, 0.5);
            if (AppConstants.RESOURCE_FOLDER == "mdpi"){
                tile.setScale(2, 2);
            }
            // console.log(tile.getContentSize());
            // console.log(tile.widht, tile.height);
            this.tileMap.snapToTile(tile, x, y, true);
        }
        else{
            console.log("Out of index", x, y);
        }
        
    };
    
    solidifyPiece(){
        let array = this.piece.array[this.piece.rotate];
        for (let i = 0; i < array.length; i++){
            let tileX = this.piece.x + array[i][0];
            let tileY = this.piece.y + array[i][1];
            if(this.tileMap.isValideTile(tileX, tileY)){
                this.obstacle[tileY][tileX] = 2;                            
            }            
        }  
        this.checkRow();          
    };
    
    checkRow(){
        console.log("inside check last row");
        let answer = true;
        for(let i = 0; i< this.mapHeight; i++){
            for (let j = 0; j < this.mapWidth; j++) {
                // console.log(this.obstacle[i]);
                if(this.obstacle[i][j] == 0){
                    // console.log("hi");
                    answer = false;
                    // console.log(answer);
                    break;
                }
            }    
            // console.log(answer);
            if (answer){
                this.removeRow(i);
                break;
            }
            else{
                answer = true;
            }
        }
        
    }
    
    removeRow(row){
        console.log("inside remove last row", row);
        for(let i = row + 1; i < this.mapHeight; i++){
            let array = this.tileMap.getCol(i, true);//actually gets row number i
            for(let j = 0; j < array.length; j++){
                this.putColorAt(array[j].assetID, j, i-1);
                this.obstacle[i-1][j] = this.obstacle[i][j];
            }        
        }
        // this.printObstacle();
        this.checkRow();
    }
    
    handleKeyPress(key){
        if(key === "82"){
            this.handleRotate();
        }
        else if (key === "37"){
            this.handleLeft();
        }  
        else if (key ==="39"){
            this.handleRight();
        }
        else if (key ==="40"){
            this.handleDown();
        }
        else {
            console.log("only R, Left and Right allowed!");
        }
    };
    
    handleLeft(){
        console.log("Left arrow pressed");
        if (this.piece.type != null && this.checkCollision(-1, 0, null)){
            console.log("left success");
            this.movedLeft = true;
            this.clearPiece();
            this.piece.x -= 1;
            this.renderPiece();
            
        }
    };
    
    handleRight(){
        console.log("right arrow pressed");
        if (this.piece.type != null && this.checkCollision(1, 0, null)){
            console.log("right success");
            this.movedRight = true;
            this.clearPiece();
            this.piece.x += 1;
            this.renderPiece();
            
        }
    }
    
    handleDown(){
        console.log("inside handle down");
        this.unschedule(this.movePieceDown);
        this.schedule(this.movePieceDown, 0.1, null, null, null);
    }
    
    handleRotate(){
        console.log("R pressed");
        if (this.piece.type != null && this.checkCollision(0, 0, this.nextRotation())){
            this.rotated = true;
            this.clearPiece()
            this.piece.rotate = this.nextRotation();
            let temp = this.piece.height;
            this.piece.height = this.piece.width;
            this.piece.width = temp;
            this.renderPiece();
        }        
    };
    
    previousRotate(){
        if(this.piece.rotate == 0){
            return 3;
        }  
        else{
            return this.piece.rotate - 1;
        }
    };
    
    nextRotation(){
        if(this.piece.rotate == 3){
            return 0;
        }  
        else{
            return this.piece.rotate + 1;
        }
    }
    
    printObstacle(){
        console.log("inside print obstacle");
        for (let i = this.mapHeight -1; i >= 0; i--) {
            let line = "";
            for (let j = 0; j < this.mapWidth; j++) {
                line += this.obstacle[i][j] + " ";
            }
            line += "        "+i;
            console.log(line);
        }
    };
    
}