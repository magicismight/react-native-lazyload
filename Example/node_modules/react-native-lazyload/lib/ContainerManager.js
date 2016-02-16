import isVisible from './isVisible';
import ContentManager from './ContentManager';
const managers = {};
const instances = {};

class ContainerManager{
    static getManagerByName = name => {
        return instances[name];
    };

    constructor(name, handle) {
        this._name = name;
        this._manager = managers[name] = {
            handle: handle,
            children: {}
        };
        instances[name] = this;
    }

    _manager = null;

    _name = null;

    calculate = ({x, y}) => {
        let children = this._manager.children;
        for (let key in children) {
            if (children.hasOwnProperty(key)) {
                let child = children[key];
                if (isVisible({x, y}, child, this.dimension, this.offset)) {
                    let manager = ContentManager.getManagerById(child.id);
                    manager.show();
                }

            }
        }
    };

    remove = id => {

    };

    add = (id, data) => {
        this._manager.children[id] = {
            ...data
        };
    };

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
