class Header {

    title: string;
    meter: string;
    composer: string;
    key: string;
    baseNoteDuration: string;


    // For now, only supporting measures with:
    // baseNoteDuration value of 1/8th
    // meter of 4/4
    constructor(title: string, meter: string = '4/4', composer: string = '', key: string = 'C', baseNoteDuration: string = '1/8') {
        this.title = title;
        this.meter = meter;
        this.composer = composer;
        this.key = key;
        this.baseNoteDuration = baseNoteDuration;
    }
}

export default Header;