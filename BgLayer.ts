import helper from '../helper';
import {res} from '../resource';

export default class BgLayer extends cc.Layer {
    backLayer: any;
    bgColor: any;
    drawNode: any;
    tileSize: any;
    mapWidth: any;
    mapHeight: any;
    constructor() {
        super();
        this.init();
    }
    
    init() {
        super.init();
        let size = cc.winSize;
        this.tileSize = 41;
        this.mapWidth = 10;
        this.mapHeight = 14;
        let offset = 20;
        this.bgColor = new cc.LayerColor(helper.GameHelper.hexToRgb("#011e3b"));
        this.addChild(this.bgColor);
        
        this.drawNode = new cc.DrawNode();
        this.addChild(this.drawNode,100);
        this.drawNode.drawRect(new cc.Point(size.width/2 - offset - (this.tileSize) * this.mapWidth/2, size.height/2 - offset - (this.tileSize) * this.mapHeight/2), 
                           new cc.Point(size.width/2 + offset + (this.tileSize) * this.mapWidth/2, size.height/2 + offset + (this.tileSize) * this.mapHeight/2),
                           cc.color(0,51,103,255),
                           1 ,
                           cc.color(0,51,103,255) );
        // this.addChild(this.backLayer);
        return true;
    }
}