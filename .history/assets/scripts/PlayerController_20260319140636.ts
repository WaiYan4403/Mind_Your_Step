import { _decorator, Component, Node, SystemEvent, systemEvent, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    start() {
        systemEvent.on(SystemEvent.MOUSE_UP, this.onMouseUp, this);
    }

    update(deltaTime: number) {
        
    }
}


