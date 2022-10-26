import * as PIXI from "pixi.js";
import { BaseView } from "./BaseView";
import { GameApplication } from "../GameApplication";
import { EventDispatcher } from "../EventDispatcher";
import { GameEvents } from "../GameEvents";
export class StartScreen extends BaseView {
  private title: PIXI.Text;
  private description: PIXI.Text;
  constructor() {
    super();
  }

  protected init() {
    super.init();
    this.createText();
  }

  protected createBackground() {
    this.background = new PIXI.Graphics();
    this.background.lineStyle({ width: 2, color: 0xffffff });
    this.background.beginFill(0x000000);
    this.background.drawRect(
      0,
      0,
      GameApplication.STAGE_WIDTH,
      GameApplication.STAGE_HEIGHT
    );
    this.background.endFill();
    this.background.cacheAsBitmap = true;
    this.addChild(this.background);
  }
  private createText() {
    this.title = new PIXI.Text("BREAKOUT GAME", {
      fontFamily: "Minecraft",
      fontSize: 40,
      fill: 0xffffff,
    });
    this.title.resolution = 2;
    this.title.anchor.set(0.5);
    this.title.x = GameApplication.STAGE_WIDTH / 2;
    this.title.y = GameApplication.STAGE_HEIGHT * 0.45;
    this.addChild(this.title);

    this.description = new PIXI.Text("PRESS ANY KEY TO START", {
      fontFamily: "Minecraft",
      fontSize: 25,
      fill: 0xffffff,
    });
    this.description.resolution = 2;
    this.description.anchor.set(0.5);
    this.description.x = GameApplication.STAGE_WIDTH / 2;
    this.description.y = this.title.y + 50;
    this.addChild(this.description);
  }
}
