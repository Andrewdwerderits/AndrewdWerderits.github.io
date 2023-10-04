import ENoteVolume from '../Enums/ENoteVolume';
import EInstrument from '../Enums/EInstrument';
import EStickings from '../Enums/EStickings';
class Note {

    sticking: EStickings;
    volume: ENoteVolume;
    mandatoryPlacement: boolean;
    
    //Instruments is an array because more than one drum can be hit simultaneously
    instruments: EInstrument[];

    constructor(instruments = [], 
                mandatoryPlacement: boolean = false,
                sticking: EStickings = EStickings.None, 
                volume = ENoteVolume.Mp) {
        
        this.instruments = instruments;
        this.mandatoryPlacement = mandatoryPlacement;
        this.sticking = sticking;
        this.volume = volume;
    }
}

export default Note;