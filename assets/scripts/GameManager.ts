import { _decorator, Component, Game, instantiate, Node, Prefab } from "cc";
import { PlayerController } from "./PlayerController";
const { ccclass, property } = _decorator;

enum BlockType {
  BT_NONE,
  BT_STONE,
}

enum GameState {
  GS_INIT,
  GS_PLAYING,
  GS_END,
}

@ccclass("GameManager")
export class GameManager extends Component {
  @property({
    type: Prefab,
  })
  curPrefab: Prefab | null = null;

  @property
  roadLength = 50;

  @property(PlayerController)
  playerCtrl: PlayerController | null = null;

  @property(Node)
  startMenu: Node | null = null;

  private _road = [];

  set curState(value: GameState) {
    switch (value) {
      case GameState.GS_PLAYING:
        this.startMenu.active = false;
        setTimeout(() => {
          this.playerCtrl.setInputActive(true);
        }, 0.1);
        break;
      case GameState.GS_END:
        break;
      default:
        this.init();
    }
  }

  init() {
    this.generateRoad();
    this.startMenu.active = true;
    this.playerCtrl.setInputActive(false);
    this.playerCtrl.node.setPosition(0, 0, 0);
  }

  start() {
    this.curState = GameState.GS_INIT;
    this.playerCtrl.node.on("jumpEnd", this.onPlayerJumpEnd, this);
  }

  generateRoad() {
    this.node.removeAllChildren();
    this._road.length = 0;
    this._road.push(BlockType.BT_STONE);
    for (let i = 1; i < this.roadLength; i++) {
      if (this._road[i - 1] === BlockType.BT_NONE) {
        this._road.push(BlockType.BT_STONE);
      } else {
        this._road.push(Math.floor(Math.random() * 2));
      }
    }

    for (let j = 0; j < this._road.length; j++) {
      const child = this.spawnBlockByType(this._road[j]);
      if (child) {
        this.node.addChild(child);
        child.setPosition(j, 0, 0);
      }
    }
  }

  spawnBlockByType(type: BlockType) {
    if (!this.curPrefab) {
      return null;
    }

    let block: Node | null = null;
    switch (type) {
      case BlockType.BT_STONE:
        block = instantiate(this.curPrefab);
        break;
    }

    return block;
  }

  onStartButtonClicked() {
    this.curState = GameState.GS_PLAYING;
  }

  checkResult(moveIndex: number) {
    if (moveIndex < this._road.length) {
      if (this._road[moveIndex] === BlockType.BT_NONE) {
        this.curState = GameState.GS_INIT;
      } else {
      }
    }
  }

  onPlayerJumpEnd(moveIndex: number) {
    this.checkResult(moveIndex);
  }
}
