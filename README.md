# myPadOS
## Setup
### Webserver-Setup
cd to the project directory (i.e. ~/Downloads/myPadOS)
Type "php -S 0.0.0.0:8000" to start the php server

## Usage
Open "localhost:8000/os3.html" in your browser to start myPadOS.

## Files
### index.html
Just a bouncy ball and a changing background.

### os.html and os2.html
Hardcoded and not working (anymore), see os3.html for a working Pad.

### os3.html
A canvas containing the Pad with some logic (code for an app ("Settings"))

### os.js
The heart of everything containing rendering, mouse functions and a homescreen showing all apps.
Furthermore it has a simple RAM class with restricted access to its data. Throws a total of three errors (NoRAMAccess, InvalidRAMAddress and RAMOverFlow).

### app.js
A simple app construct with a function to start the app and two methods meant to be overwriten (renderer = (ctx, ram, mouse, deltaTime, animationFrames) => {} and click = (mouseX, mouseY) => {}).

### hardware.js
A class for hardware (like the homebutton in os3.html) containing its name and HTML element.

### main.css
Barely used in os3.html to make elements unselectable (i.e. clicking on the homebutton multiple times a second would select the drawing canvas).
