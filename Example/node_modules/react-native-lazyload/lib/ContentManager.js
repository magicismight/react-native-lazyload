import ContainerManager from './ContainerManager';
import isVisible from './isVisible';
let instances = {};

class ContentManger {
    static show = id => {
        return instances[id].show();
    };

    constructor(host, id, show, hide) {
        this._container = ContainerManager.getManagerByName(host);
        this._id = id;
        this._show = show;
        this._hide = hide;
        instances[id] = this;
    }

    _show = null;
    _hide = null;
    _container = null;
    _id = null;

    hide = () => {
        this._hide();
    };

    show = () => {
        this._show();
        this._container.show(this._id);
        if (!this._container.recycle) {
            this._container = null;
            delete instances[this._id];
        }
    };

    layout = (node) => {
        let container = this._container;
        container && node.measureLayout(container.handle, (x, y, width, height) => {
            let data = {
                x,
                y,
                rx: x + width,
                ry: y + height,
                id: this._id
            };

            isVisible({x: 0, y: 0}, data, container.dimension, container.offset) && this.show();
            this._container && container.add(this._id, data);
        });
    }
}

export default ContentManger;
