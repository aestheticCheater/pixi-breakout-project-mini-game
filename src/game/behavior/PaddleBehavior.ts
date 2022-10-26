import { GameObject } from '../GameObject';
import { GameObjectBehavior } from './GameObjectBehavior';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../../GameApplication';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import {BallBehavior} from './BallBehavior';
import { BrickType } from '../level/BrickType';

export class PaddleBehavior extends GameObjectBehavior {

    public VELOCITY: number = 15;
    private direction: number = 0;
    private paddleImg: PIXI.Sprite;
    private ball: BallBehavior;
    public justHit: boolean = false;


    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public update(deltaTime: number) {
            
        if(this.direction === 1) {
            this.moveRight(deltaTime);
            return;
        }

        if(this.direction === -1) {
            this.moveLeft(deltaTime);
            return;
        }
    }

    protected init() {
        this.paddleImg = this.gameObjRef.getRenderableById("paddleImg") as PIXI.Sprite;
        this.setInitialPosition();

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, this.onBrickHit  , this);

        EventDispatcher.getInstance().getDispatcher().on(GameEvents.NEXT_LEVEL, this.setInitialPosition, this);
    }

    private setInitialPosition() {
        this.paddleImg.tint = 0xffffff;
        this.paddleImg.scale.set(1);
        this.gameObjRef.x = (GameApplication.STAGE_WIDTH * 0.5) - (this.gameObjRef.width * 0.5);
        this.gameObjRef.y = GameApplication.STAGE_HEIGHT * 0.8;
    }

    private onKeyUp(e: any) {
        switch(e.code) {
            case "ArrowRight":
                if(this.direction === 1) {
                    this.direction = 0;
                }
                break;
            case "ArrowLeft":
                if(this.direction === -1) {
                    this.direction = 0;
                }
                break;
        }
    }

    private onKeyDown(e: any) {
        if(this.direction !== 0) {
            return;
        }

        switch(e.code) {
            case "ArrowRight":
                this.direction = 1;
                break;
            case "ArrowLeft":
                this.direction = -1;
                break;
        }
    }

    private moveLeft(deltaTime: number) {
        if(!this.gameObjRef.isActive()) {
            return;
        }

        if(this.gameObjRef.x - this.VELOCITY > 0) {
            this.gameObjRef.x -= this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = 0;
        }
    }

    private moveRight(deltaTime: number) {
        if(!this.gameObjRef.isActive()) {
            return;
        }
        if (BrickType.TYPE_3) {
            
        }
        

        if(this.gameObjRef.x + this.gameObjRef.width + this.VELOCITY < GameApplication.STAGE_WIDTH) {
            this.gameObjRef.x += this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = GameApplication.STAGE_WIDTH - this.gameObjRef.width;
        }
    }
    private onBrickHit(e: any) {

 
        if(this.justHit) {
            return;
        }

        this.justHit = true;


        setTimeout(() => {
            this.justHit = false;
        }, 5000);

        if (e.brickType === BrickType.TYPE_3) { 
            
            this.VELOCITY = 30;
            this.paddleImg.tint = 0xff0000;
            
           setTimeout(() => {
                this.VELOCITY = 15;
                this.paddleImg.tint = 0xffffff;
            }, 5000);
        }
    }
}