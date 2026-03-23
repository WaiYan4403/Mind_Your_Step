import { _decorator, Component, Node, systemEvent, SystemEventType, EventMouse, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property({
        type: Animation
    })
    cocosAnim: Animation | null = null; //= null! or | null
    private _startJump = false;
    private _isMoving = false;
    private _jumpStep = 0;
    private _curJumpTime = 0;
    private _jumpTime = 0.1;
    private _curJumpSpeed = 0;
    private _curPos = new Vec3();
    private _targetPos = new Vec3();
    private _deltaPos = new Vec3();

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
        if(this._isMoving)
            return;
        
        this._isMoving = true;
        this._startJump = true;
        this._jumpStep = step;
        this._curJumpSpeed = this._jumpStep / this._jumpTime;
        this._curJumpTime = 0;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, new Vec3(step, 0, 0));

        if(this.cocosAnim)
        {
            this.cocosAnim.play("cocos_anim_jump");
        }
    }
    onOnceJumpEnd()
    {
        this._isMoving = false;
    }

    update(deltaTime: number) {
        if(this._startJump)
        {
            this._curJumpTime += deltaTime;
            if(this._curJumpTime >= this._jumpTime)
            {
                this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
            }else{
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }
}


