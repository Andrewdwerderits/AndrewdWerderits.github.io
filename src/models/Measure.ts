import NoteCluster from './NoteCluster';

class Measure {
    
    noteClusters: NoteCluster[];
    measureDuration: number;
    
    constructor(measureDuration: number = 8) {
        this.measureDuration = measureDuration;
        this.noteClusters = [];
    }
    
    public isMeasureFull(): boolean {
        let currentDuration = 0;
        this.noteClusters.forEach((cluster) => {
            currentDuration += cluster.duration;
        });
        return currentDuration >= this.measureDuration;
    };
}

export default Measure;