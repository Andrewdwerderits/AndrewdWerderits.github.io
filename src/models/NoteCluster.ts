import Note from './Note';
class NoteCluster {

    notes: Note[];
    
    // how many units of time the cluster takes up
    duration: number;

    constructor(notes: Note[], duration: number) {
        this.notes = notes;
        this.duration = duration;
    }
}

export default NoteCluster;