class RAM {
    constructor(size) {
        this.size = size || 512;
        this.access = {};
        this.data = [];
    }

    reserve = (caller, size) => {
        var startAddress = 0;
        var lastKey = null;
        Object.keys(this.access).forEach((key) => {
            console.log(this.access[key]);
            lastKey = key;
        });
        if (lastKey !== null) startAddress = this.access[lastKey].startAddress + this.access[lastKey].size;
        if (startAddress + size > this.size) {
            return RAMOverFlow;
        }
        this.access[caller] = {
            startAddress: startAddress,
            size: size,
        }
        return {startAddress: startAddress, size: size};
    }

    flush = () => {
        this.access = {
            'System': {
                startAddress: 0,
                size: 128
            }
        };
        for (var i=0; i<this.size; i++) {
            this.data[i] = null;
        }
    }

    read = (address, caller) => {
        if (this.access[caller] === undefined) return NoRAMAccess;
        if (address >= this.access[caller].startAddress && address < this.access[caller].startAddress + this.access[caller].size) {
            return this.data[address];
        } else return InvalidRAMAddress;
    }
    
    write = (address, caller, data) => {
        if (this.access[caller] === undefined) return NoRAMAccess;
        if (address >= this.access[caller].startAddress && address < this.access[caller].startAddress + this.access[caller].size) {
            this.data[address] = data;
            return true;
        } else return InvalidRAMAddress;
    }
}
