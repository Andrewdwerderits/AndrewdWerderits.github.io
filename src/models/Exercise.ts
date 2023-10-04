import Measure from './Measure';

class Exercise {
    
    abcJsNotation: string;
    title: string;
    measures: Measure[];
    bpm: number;
    
    constructor(abcJsNotation: string, measures: Measure[], title: string = "New Exercise", bpm: number = 80) {
        this.abcJsNotation = abcJsNotation;
        this.title = title;
        this.measures = measures;
        this.bpm = bpm;
    }
}

export default Exercise;