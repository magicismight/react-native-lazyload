const containers = {};
const instances = {};

class LazyloadChild{
    constructor({handle, dimension, offset, recycle, element, toggle}) {
        this._recycle = recycle;
        this._toggle = toggle;
        if (offset >= recycle) {
            console.warn('Recycle distance should be much more than render distance.');
            recycle = offset;
        }

        element.measureLayout(handle, (x, y, width, height) => {
            let {width: sightWidth, height: sightHeight} = dimension();

            this._sight = {
                top: y + height + offset,
                right: -(sightWidth - x + offset),
                bottom: -(sightHeight - y + offset),
                left: x + width + offset
            };

            this._bound = {
                top: y + height + recycle,
                right: recycle + sightWidth - x,
                bottom: recycle + sightHeight - y,
                left: x + width + recycle
            };
            this.move(0, 0);
        });
    }

    _recycled = false;
    _visible = false;
    _bound = null;
    _recycle = null;
    _toggle = null;
    _sight = null;

    move = (x, y) => {
        if (!this._sight) {
            return;
        }

        let sight = this._sight;
        let bound = this._bound;
        let recycle = this._recycle;
        if (this._recycled && y >= sight.bottom - this._recycle && y <= sight.top + this._recycle) { // Recycled element back into recycle distance
            this._recycled = false;
            this._visible = true;
            this._toggle(true);
        } else if (!this._visible && y >= sight.bottom && y <= sight.top && x >= sight.right && x <= sight.left) { // Invisible element scroll into sight
            this._visible = true;
            this._toggle(true);
        } else if (this._visible && recycle) {
            if (
                y > bound.top || // Visible element scroll out of recycle distance, recycle its memory
                y < -bound.bottom ||
                x > bound.left ||
                x < -bound.right
            ) {
                this._recycled = true;
                this._visible = false;
                this._toggle(false);
            }
        }
    }
}

class ContainerManager{
    static add = (name, id, toggle, element) => {
        let container = containers[name];
        container.children[id] = new LazyloadChild({
            handle: container.handle,
            dimension: () => container.dimension,
            offset: container.offset,
            recycle: container.recycle,
            element,
            toggle
        });
    };

    static remove = (name, id) => {
        if (containers[name]) {
            containers[name][id] = null;
        }
        //TODO: check if empty
    };

    constructor(name, handle, offset, recycle) {
        this._name = name;
        this._data = containers[name] = {
            handle: handle,
            children: {},
            recycle,
            offset
        };
        instances[name] = this;
    }

    _data = null;
    _name = null;

    calculate = ({x, y}) => {
        if (this._empty) {
            return;
        }
        // TODO: 优化遍历算法，拖过快速排序减少检测无效检查
        let children = this._data.children;
        for (let key in children) {
            if (children.hasOwnProperty(key)) {
                children[key].move(x, y);
            }
        }
    };


    destroy = () => {
        this._data = instances[this._name] = containers[this._name] = null;
    };

    set dimension(dimension) {
        return this._data.dimension = dimension;
    }
}

export default ContainerManager;
