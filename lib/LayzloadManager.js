const containers = {};
const instances = {};

class LazyloadChild{
    constructor({handle, dimension, offset, recycle, element, toggle, horizontal}) {
        this._recycle = recycle;
        this._toggle = toggle;
        this._horizontal = horizontal;
        if (offset >= recycle) {
            console.warn('Recycle distance should be much more than render distance.');
            recycle = offset;
        }
        element.measureLayout(handle, (x, y, width, height) => {
            let {width: sightWidth, height: sightHeight} = dimension();

            this._sight = horizontal ? {
                start: -(sightWidth - x + offset),
                end: x + width + offset
            } : {
                start: -(sightHeight - y + offset),
                end: y + height + offset
            };

            this._bound = horizontal ? {
                start: -(recycle + sightWidth - x),
                end: x + width + recycle
            } : {
                start: -(recycle + sightHeight - y),
                end: y + height + recycle
            };

            this.move(0, 0);
        });
    }

    _recycled = false;
    _visible = false;
    _horizontal = false;
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
        let scrolled = this._horizontal ? x : y;

        if (this._recycled && scrolled >= sight.start - this._recycle && scrolled <= sight.end + this._recycle) { // Recycled element back into recycle distance
            this._recycled = false;
            this._visible = true;
            this._toggle(true);
        } else if (!this._visible && scrolled >= sight.start && scrolled <= sight.end) { // Invisible element scroll into sight
            this._visible = true;
            this._toggle(true);
        } else if (this._visible && recycle) {
            if (scrolled > bound.end || scrolled < bound.start) {
                this._recycled = true;
                this._visible = false;
                this._toggle(false);
            }
        }
    }
}

class LayzloadManager{
    static add = (name, id, toggle, element) => {
        let container = containers[name];
        if (!container.children[id]) {
            container.count++;
        }

        container.children[id] = new LazyloadChild({
            handle: container.handle,
            dimension: () => container.dimension,
            offset: container.offset,
            recycle: container.recycle,
            element,
            toggle,
            horizontal: container.horizontal
        });
    };

    static remove = (name, id) => {
        let container = containers[name];
        if (container && container[id]) {
            container[id] = null;
            container.count--;
        }
    };

    constructor(name, handle, offset, recycle, horizontal) {
        this._name = name;
        this._data = containers[name] = {
            handle: handle,
            children: {},
            recycle,
            offset,
            horizontal,
            count: 0
        };
        instances[name] = this;
    }

    _data = null;
    _name = null;

    calculate = ({x, y}) => {
        if (this._data.count) {
            let children = this._data.children;
            for (let key in children) {
                if (children.hasOwnProperty(key)) {
                    children[key].move(x, y);
                }
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

export default LayzloadManager;
