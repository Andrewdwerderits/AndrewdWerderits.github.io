import Measure from "./Measure";
import ENoteTypes from "../Enums/ENoteTypes";

class Exercise {
    
    sheetMusic: string;
    measures: Measure[];
    bpm: number;
    
    constructor(sheetMusic: string, measures: Measure[], bpm: number = 120) {
        this.sheetMusic = sheetMusic;
        this.measures = measures;
        this.bpm = bpm;
        
        if (!measures || measures.length === 0) {
            const measure = new Measure(16);
            for(let i = 0; i < 16; i++) {
                measure.notes[i].noteType = ENoteTypes.snare;
            }
            measures.push(measure);
        }
    }
}

export default Exercise;