export class Hardware {
    constructor(name, element) {
        this.name = name;
        this.element = element;
    }
    
    getName = () => {
        return this.name;
    }
    
    getElement = () => {
        return this.element;
    }
}
