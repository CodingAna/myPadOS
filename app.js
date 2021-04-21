class App {
    constructor(name, imageSource, ramSize) {
        this.name = name;
        this.imageSource = imageSource;

        this.imageNode = null;
        this.startAddress = -1;
        this.size = -1;
        this.requestedSize = ramSize || 128;
    }
    
    setImage = (imageNode) => {
        this.imageNode = imageNode;
    }
    
    getImage = () => {
        return this.imageNode;
    }
    
    getImageSource = () => {
        return this.imageSource;
    }
    
    getName = () => {
        return this.name;
    }

    getStartAddress = () => {
        return this.startAddress;
    }

    getSize = () => {
        return this.size;
    }

    getRequestedSize = () => {
        return this.requestedSize;
    }

    click = (mouseX, mouseY) => {
        /* Overwrite this */
    };
    renderer = (ctx, ram, mouse, deltaTime, animationFrames) => {
        /* Overwrite this */
    };

    start = (ram) => {
        this.startAddress = ram.startAddress;
        this.size = ram.size;
        console.log('Opened ' + this.name);
        console.log('startAddress=' + ram.startAddress);
        console.log('size=' + ram.size);
        return this;
    }
}