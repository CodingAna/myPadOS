class NoRAMAccess {constructor() {}}
class InvalidRAMAddress {constructor() {}}
class RAMOverFlow {constructor() {}}

class OS {
    constructor(pad, canvas, imageHolder) {
        this.FPS = 60;
        this.APPLICATIONS = [];
        this.ram = new RAM(1024);
        this.ram.flush();

        this.mouseX = 0;
        this.mouseY = 0;

        this.pad = pad || document.getElementById('pad');
        this.canvas = canvas || document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.imageHolder = imageHolder || document.getElementById('image');

        this.first = new Date().getTime();
        this.deltaTime = 1 / this.FPS;

        this.currentRenderer = setInterval(function() {}, (1 / this.FPS) * 1000);

        document.onmousemove = (event) => {
            event = event || window.event;
            this.mouseX = event.pageX - (this.pad.offsetLeft + this.canvas.offsetLeft);
            this.mouseY = event.pageY - (this.pad.offsetTop + this.canvas.offsetTop);
        }

        canvas.onmousedown = (event) => {
            event = event || canvas.event;
            this.onclick();
        }
    }

    onclick = () => {
        var ramData = this.ram.read(0, 'System');
        if (ramData === null) {
            var x = 0;
            var y = 0;
            for (var i=0; i<this.APPLICATIONS.length; i++) {
                var calcX = 31 + (95 * x);
                var calcY = 31 + (95 * y);
                if (this.mouseX >= calcX && this.mouseX < calcX + 64) {
                    if (this.mouseY >= calcY && this.mouseY < calcY + 64) {
                        var currentApp = this.APPLICATIONS[i];
                        this.ram.write(0, 'System', currentApp);
                        //var reserved = this.ram.reserve(currentApp.getName(), 128);
                        //var started = currentApp.start(reserved[0], reserved[1]);
                        //this.render(started.renderer, this.ramFunctions());
                        this.startApp(currentApp);
                        break;
                    }
                }

                x++;
                if (x >= 6) {
                    x = 0;
                    y++;
                }
                if (y >= 3) {
                    y = 0;
                    break;
                }
            }
        } else {
            var currentApp = ramData;
            currentApp.click({x: this.mouseX, y: this.mouseY}, this.ramFunctions());
        }
    }

    context = () => {
        return this.ctx;
    }

    applications = () => {
        return this.APPLICATIONS;
    }

    ramFunctions = () => {
        return {read: this.ram.read, write: this.ram.write};
    }

    addApp = (app) => {
        this.imageHolder.src = app.getImageSource();
        app.setImage(image.cloneNode());
        this.APPLICATIONS.push(app);
    }

    startApp = (app) => {
        this.render(app.renderer);
        var reserved = this.ram.reserve(app, app.getRequestedSize());
        return app.start(reserved);
    }

    homeScreen = () => {
        function hS(ctx, ram, mouse, deltaTime, animationFrames) {
            var x = 0;
            var y = 0;
            for (var i=0; i<os.applications().length; i++) {
                var currentApp = os.applications()[i];
                ctx.drawImage(currentApp.getImage(), 31 + (95 * x), 31 + (95 * y), 64, 64);
                x++;
                if (x >= 6) {
                    x = 0;
                    y++;
                }
                if (y >= 3) {
                    y = 0;
                    //Show apps after changing view
                    break;
                }
            }
        }
        this.render(hS);
        this.ram.flush();
    }

    render = (renderer) => {
        clearInterval(this.currentRenderer);
        this.first = new Date().getTime();

        var animationFrames = 0;
        this.currentRenderer = setInterval(() => {
            this.ctx.clearRect(0, 0, 600, 450);
            renderer(this.ctx, this.ramFunctions(), {x: this.mouseX, y: this.mouseY}, this.deltaTime, animationFrames);
            
            this.deltaTime = (new Date().getTime() - this.first) / 1000;
            this.first = new Date().getTime();
            animationFrames++;
        }, (1 / this.FPS) * 1000);
    }
}
