import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {LevelFactory} from "../level/LevelFactory";
import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import {BaseBrickBehavior} from "./BaseBrickBehavior";
export class BrickBehaviorLevel2 extends BaseBrickBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    private hitCount: number = 0;
    private levelFactory: LevelFactory;
    private gameViewRef: GameView;
    protected onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            this.hitCount++;
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            // if(this.hitCount==1){
            //     // this.changeColorBrick1(e);
            //     this.gameObjRef.changeColorBrick1(e);
            // }
            // else if(this.hitCount==2){
            //     // this.changeColorBrick2(e);
            //     this.gameObjRef.changeColorBrick2(e);
            // }
            // else if(this.hitCount==3){
            //     EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_2});
            // }
            switch(this.hitCount){
                case 1:
                    renderable.tint = 0xff03fa;
                    break;
                case 2:
                    renderable.tint = 0x24d3fa;
                    break;
                case 3:
                    EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_2});
                    break;
            }
            
            
            
        }
        
        
    }
    // public changeColorBrick1(e: any){
    //     console.log(e.brickId);
        
    //     const gfx: PIXI.Graphics = new PIXI.Graphics;
    //     gfx.beginFill(0xF6BE00);
    //                 gfx.lineStyle({width: 1, color:0x000000});
    //                 gfx.drawRect(0,0,this.gameObjRef.width,this.gameObjRef.height-2);
    //                 gfx.endFill();
    //                 gfx.cacheAsBitmap=true;
    //                 this.gameObjRef.unregisterRenderable('brickImg');
    //                 this.gameObjRef.registerRenderable('brickImg',gfx);
    // }
    // public changeColorBrick2(e: any){
    //     console.log(e.brickId);
        
    //     const gfx: PIXI.Graphics = new PIXI.Graphics;
    //     gfx.beginFill(0xff0000);
    //                 gfx.lineStyle({width: 1, color:0x000000});
    //                 gfx.drawRect(0,0,this.gameObjRef.width,this.gameObjRef.height-2);
    //                 gfx.endFill();
    //                 gfx.cacheAsBitmap=true;
    //                 this.gameObjRef.unregisterRenderable('brickImg');
    //                 this.gameObjRef.registerRenderable('brickImg',gfx);

    // }
}