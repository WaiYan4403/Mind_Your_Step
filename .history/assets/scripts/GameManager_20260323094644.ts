import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({
        type: Prefab
    })
    curPrefab: Prefab | null = null;
    start() {

    }

    update(deltaTime: number) {
        
    }
}


