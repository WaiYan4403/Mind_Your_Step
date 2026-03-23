import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum BlockType{
    BT_NONE,
    BT_STONE,
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property({
        type: Prefab
    })
    curPrefab: Prefab | null = null;
    @property
    roadLength = 50;

    private _road = [];
    start() {
        this.generateRoad();
    }

    update(deltaTime: number) {
        
    }

    generateRoad()
    {
        this._road.push(BlockType.BT_STONE);
        for(let i = 1; i < this.roadLength; i++)
        {
            if(this._road[i - 1] === BlockType.BT_NONE)
            {
                this._road.push(BlockType.BT_STONE);
            }else{
                this._road.push(Math.floor(Math.random() * 2));
            }
        }

        for(let j = 0; j < this._road.length; j++)
        {
            const child = this.spawnBlockByType(this._road[j]);
            if(child)
            {
                this.node.addChild(child);
                child.setPosition(j, 0, 0);
            }
        }
    }

    spawnBlockByType(type: BlockType)
    {
        if(!this.curPrefab)
        {
            return null;
        }

        let block: Node | null = null;
        switch(type)
        {
            case BlockType.BT_STONE:
                block = instantiate(this.curPrefab);
                break;
        }

        return block;
    }
}


