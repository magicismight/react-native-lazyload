import isVisible from './isVisible';
import ContentManager from './ContentManager';
const managers = {};
const instances = {};

class ContainerManager{
    static getManagerByName = name => {
        return instances[name];
    };

    constructor(name, handle, recycle) {
        this._name = name;
        this._manager = managers[name] = {
            handle: handle,
            children: {},
            recycle
        };
        instances[name] = this;
    }

    _manager = null;
    _empty = true;
    _name = null;

    calculate = ({x, y}) => {
        if (this._empty) {
            return;
        }

        // TODO: 优化算法，
        let children = this._manager.children;
        for (let key in children) {
            if (children.hasOwnProperty(key)) {
                let child = children[key];
                if (isVisible({x, y}, child, this.dimension, this.offset)) {
                    ContentManager.show(child.id);
                }
            }
        }
    };

    show = id => {
        let children = this._manager.children;
        if (this._manager.recycle) {
            //
        } else {
            delete children[id];
            let empty = true;
            for (let key in children) {
                if (children.hasOwnProperty(key)) {
                    empty = false;
                    break;
                }
            }
            if (empty) {
                this._empty = true;
            }
        }
    };

    add = (id, data) => {
        this._empty = false;
        this._manager.children[id] = {
            ...data
        };
    };

    get recycle() {
        return this._manager.recycle;
    }

    get handle() {
        return this._manager.handle;
    }

    get dimension() {
        return this._manager.dimension;
    }

    set dimension(dimension) {
        return this._manager.dimension = dimension;
    }

    get offset() {
        return this._manager.offset;
    }

    set offset(offset) {
        return this._manager.offset = offset;
    }
}

export default ContainerManager;
