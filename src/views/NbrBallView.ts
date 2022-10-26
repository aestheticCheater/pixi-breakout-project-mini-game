import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;

    constructor() {
        super();
    }
    public setNbrBall(score: number) {
        this.nbrBallText.text = score.toString(10).padStart(2, "0"); 
      }

    public createText() {
            this.nbrBallText = new PIXI.Text(`000`, {
              fontSize: 50,
              fontFamily: "Minecraft",
              fill: 0xffffff,
            });
            console.log(this.nbrBallText.text);
            this.label = new PIXI.Text ('Balls: ', {
              fontSize: 40,
              fontFamily: "Minecraft",
              fill: 0xffffff,
            });

            this.label.resolution = 2;
            this.label.anchor.set(0.5);
            this.label.x = this.background.width/4;
            this.label.y = this.background.height/2;
            this.nbrBallText.resolution = 2;
            this.nbrBallText.anchor.set(0.5);
            this.nbrBallText.x = this.background.width/1.5;
            this.nbrBallText.y = this.background.height/2;
            this.background.addChild(this.label);
            this.background.addChild(this.nbrBallText);
    }
    protected createBackground(){
    this.background = new PIXI.Graphics();
    this.background.lineStyle({ width: 2, color: 0xffffff });
    this.background.beginFill(0x000000);
    this.background.drawRect(0, 0, 250, 50);
    this.background.endFill();
    this.background.x = GameApplication.STAGE_WIDTH*0.01;
    this.background.y = GameApplication.STAGE_HEIGHT*0.9;
    this.addChild(this.background);
  }

    protected init() {
        super.init();
      this.createText();

        
    }
}
