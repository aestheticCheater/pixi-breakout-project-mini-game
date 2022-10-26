import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import { GameObject } from '../GameObject';
import { GameApplication } from '../../GameApplication';
import { BrickType } from './BrickType';
import { Model } from '../../Model';
import {BrickBehaviorLevel1} from "../behavior/BrickBehaviorLevel1";
import {BrickBehaviorLevel2} from "../behavior/BrickBehaviorLevel2";
import {BrickBehaviorLevel3} from "../behavior/BrickBehaviorLevel3";

export class LevelFactory extends PIXI.Container {

    public bricks: Array<GameObject>;
    private gameViewRef: GameView;
    private brickTop: number = 100;

    constructor(gameViewRef: GameView) {
        super();

        this.gameViewRef = gameViewRef;
        this.init();
    }

    public getNextLevel(level: number): Array<GameObject> {
        if (level === 1) {
            return this.getLevel(1);
        }

        if (level > 1) {
            return this.getLevel(3);
        }
    }

    private getLevel(difficulty: number): Array<GameObject> {
        let nbrBrickHorizontal: number;
        let nbrBrickVertical: number;
        let brickWidth: number;
        let brickHeight: number;
        const startPos: number = 2;

        this.bricks = [];

        if (difficulty === 1) {
            nbrBrickHorizontal = 2;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const brick: GameObject = this.brickFactory(1,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        if (difficulty === 2) {
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);

            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const targetDifficulty:number = Math.random() <= 0.6 ? 1 : 2 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 3) {
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 1; 
                    }else if(rand<=0.6){
                        targetDifficulty = 2; 
                    }else if(rand>0.6) {
                        targetDifficulty = 3;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        return this.bricks;
    }

    private getBrickPosition(x: number, y: number, width: number, height: number): PIXI.Point{
        const coord: PIXI.Point = new PIXI.Point();
        const startPos: number = 2;

        coord.x = x === 0 ? x*width + startPos :x*width;
        coord.y = (y*height)+this.brickTop;
        return coord;
    }

    private init() {
        this.bricks = [];
    }

    private brickFactory(difficulty: number, width: number, height: number): GameObject {
        const brick: GameObject = new GameObject(this.gameViewRef);
        const gfx: PIXI.Graphics = new PIXI.Graphics();

        switch (difficulty) {
            case 1:
                {
                    gfx.beginFill(0xa1c2f7);
                    gfx.lineStyle({width: 1, color:0x000000});
                    gfx.drawRect(0,0,width,height);
                    gfx.endFill();
                    gfx.cacheAsBitmap=true;
                    brick.registerRenderable('brickImg',gfx);
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brick.registerBehavior('brickBehavior', brickBehavior1)
                }
                break;
            case 2:
                {
                    gfx.beginFill(0xffffff);
                    gfx.lineStyle({width: 1, color:0x000000});
                    gfx.drawRect(0,0,width,height);
                    gfx.endFill();
                    gfx.cacheAsBitmap=true; 

                    const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
                    const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
                    sprite.tint = 0xff0000;
                    brick.registerRenderable('brickImg',sprite);
                    const brickBehavior2: BrickBehaviorLevel2 = new BrickBehaviorLevel2(brick);
                    brick.registerBehavior('brickBehavior', brickBehavior2);
                }
                break;
            case 3:
                {
                    gfx.beginFill(0x9732a8);
                    gfx.lineStyle({width: 1, color:0x000000});
                    gfx.drawRect(0,0,width,height);
                    gfx.endFill();
                    gfx.cacheAsBitmap=true;

                    brick.registerRenderable('brickImg',gfx);
                    const brickBehavior3: BrickBehaviorLevel3 = new BrickBehaviorLevel3(brick);
                    brick.registerBehavior('brickBehavior', brickBehavior3);
                }
                break;
        }

        
        return brick;

    }
}