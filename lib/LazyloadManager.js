import LazyloadChild from './LazyloadChild';

const containers = {};

class LazyloadManager{
    static add = ({name, id}, measureLayout, toggle) => {
        let container = containers[name];
        if (!container) {
            container = containers[name] = {
                children: {},
                count: 0,
                contentOffset: {x: 0, y: 0},
                uninitiated: []
            }
        }

        if (container.dimensions) {
            if (!container.children[id]) {
                container.count++;
            }

            container.children[id] = new LazyloadChild(
                container,
                measureLayout,
                toggle
            );
        } else {
            container.uninitiated.unshift(() => {
                LazyloadManager.add({name, id}, measureLayout, toggle);
            });
        }
    };

    static remove = (name, id) => {
        let container = containers[name];
        if (container && container.children[id]) {
            delete container.children[id];
            container.count--;
        }
    };

    constructor({name, dimensions, offset = 0, recycle, horizontal, contentOffset = {x: 0, y: 0}}, data) {
        this._name = name;

        if (!name || !dimensions) {

        }

        let content = {
            offset,
            recycle,
            horizontal,
            contentOffset,
            dimensions,
            data
        };
        if (!containers[name]) {
            containers[name] = {
                children: {},
                count: 0,
                uninitiated: [],
                ...content
            };
        } else {
            Object.assign(containers[name], content);
        }

        let uninitiated;
        while (uninitiated = containers[name].uninitiated.pop()) {
            uninitiated();
        }
    }

    _name = null;

    calculate = ({x, y}) => {
        let container = containers[this._name];

        container.contentOffset = {x, y};
        if (container.count) {
            let children = container.children;
            for (let key in children) {
                if (children.hasOwnProperty(key)) {
                    children[key].move(x, y);
                }
            }
        }
    };


    destroy = () => {
        this._container = containers[this._name] = null;
    };
}

export default LazyloadManager;
