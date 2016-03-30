const containers = {};
const instances = {};
import {Platform} from 'react-native';
import LazyloadChild from './LazyloadChild';
import Callbacks from 'jquery-callbacks';
const isAndroid = Platform.OS === 'android';

class LayzloadManager{
    static add = (name, id, toggle, element) => {
        let container = containers[name];
        if (!container.children[id]) {
            container.count++;
        }
        container.children[id] = new LazyloadChild(
            element,
            toggle,
            container
        );
    };

    static remove = (name, id) => {
        let container = containers[name];
        if (container && container.children[id]) {
            delete container.children[id];
            container.count--;
        }
    };

    constructor(name, handle, offset, recycle, horizontal) {
        this._name = name;
        this._data = containers[name] = {
            children: {},
            handle,
            recycle,
            offset,
            horizontal,
            count: 0,
            contentOffset: {x: 0, y: 0},
            callbacks: isAndroid && Callbacks(),
            dimension: null
        };
        instances[name] = this;
    }

    _data = null;
    _name = null;

    calculate = ({x, y}) => {
        this._data.contentOffset = {x, y};
        this.contentOffset = {x, y};
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
        let data = this._data;
        data.dimension = dimension;
        if (isAndroid && data.callbacks) {
            data.callbacks.fire().empty();
            data.callbacks = null;
        }
        return dimension;
    }
}

export default LayzloadManager;
