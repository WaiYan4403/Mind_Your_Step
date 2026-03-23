import { _decorator, Component, Node, systemEvent, SystemEventType, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _startJump = false;
    private _jumpStep = 0;
    start() {
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);
    }

    onMouseUp(event: EventMouse)
    {
        if(event.getButton() === 0)
        {
            this.jumpByStep(1);
        }else if(event.getButton() === 2)
        {
            this.jumpByStep(2);
        }
    }

    jumpByStep(step: number)
    {

    }

    update(deltaTime: number) {
        
    }
}


