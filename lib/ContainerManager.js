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
        this._data = managers[name] = {
            handle: handle,
            children: {},
            recycle
        };
        instances[name] = this;
    }

    _data = null;
    _empty = true;
    _name = null;

    calculate = ({x, y}) => {
        if (this._empty) {
            return;
        }
        // TODO: 优化算法，
        let children = this._data.children;
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
        let children = this._data.children;
        if (this._data.recycle) {
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
        this._data.children[id] = {
            ...data
        };
    };

    destroy = () => {
        this._data = instances[this._name] = managers[this._name] = null;
    };

    get recycle() {
        return this._data.recycle;
    }

    get handle() {
        return this._data.handle;
    }

    get dimension() {
        return this._data.dimension;
    }

    set dimension(dimension) {
        return this._data.dimension = dimension;
    }

    get offset() {
        return this._data.offset;
    }

    set offset(offset) {
        return this._data.offset = offset;
    }
}

export default ContainerManager;
