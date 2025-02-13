export default class Sprite {
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.img = new Image();
        this.img.src = url; // ✅ Directly assign base64 image

        this.data = [];
        this.selectedData = null;
    }

    addItem(name, sx, sy, sw, sh) {
        this.data.push({ name, sx, sy, sw, sh });

        // ✅ Apply the first item by default
        if (this.data.length === 1) {
            this.selectedData = this.data[0];
        }
    }

    getItemNames() {
        return this.data.map(item => item.name);
    }

    applyItem(name) {
        for (let item of this.data) {
            if (item.name === name) {
                this.selectedData = item;
                return;
            }
        }
    }
}
