import GenerateSheetMusicConfig from '../models/GenerateSheetMusicConfig';
import Exercise from '../models/Exercise';
import Measure from '../models/Measure';
import ENoteVolume from '../Enums/ENoteVolume';
import EInstrument from '../Enums/EInstrument';
import Header from '../models/Header';
import NoteCluster from '../models/NoteCluster';
import Note from '../models/Note';

class AbcJsEngine {

    public static createExerciseForAbcJs = (measures: Measure[], bpm: number, title: string, config: GenerateSheetMusicConfig): Exercise => {
        const header = generateHeaderString(title);
        const formattedResult = convertToAbcJsString(measures);
        const abcjsString = `${header}${formattedResult}`;
        return new Exercise(abcjsString, measures, title, bpm);
    };
}

//#region Private Methods
const convertToAbcJsString = (measures: Measure[]) => {

    // Add in the note groupings, add a space every 4 units
    // TODO: Add more instruments here

    let resultString = '';
    
    // First off let's clean up the notation to make the string easier to create. This will
    // create equivalent music, but it'll make for neater sheet music
    cleanUpNotation(measures);

    // Keep track of some variables to handle the musical beaming on our sheet music
    let currentTime = 0;
    let previousBeamLength = 0;
    let previousCluster: NoteCluster;
    
    // Loop through the note clusters and create the sheet music
    measures.forEach((measure: Measure, index) => {
        resultString = `${resultString} |`
        
        measure.noteClusters.forEach((cluster: NoteCluster) => {
            const meter = cluster.notes.length;
            const clusterAbcjsNotes: string[] = [];
            
            cluster.notes.forEach((note) => {
                clusterAbcjsNotes.push(translateNoteToAbcjsNotes(note));
            });
                
            // figure out note beaming (the bars connecting notes in sheet music)
            if (!shouldBeamToPreviousCluster(cluster, previousCluster, currentTime, previousBeamLength)) {
                resultString += ` `;
                previousBeamLength = cluster.duration;
            } else {
                previousBeamLength += cluster.duration;
            }

            //TODO add sticking here

            switch (meter) {
                case 1:
                    if (cluster.duration === 1) {
                        resultString += `${clusterAbcjsNotes[0]}`;
                    }
                    if (cluster.duration > 1) {
                        resultString += `${clusterAbcjsNotes[0]}${cluster.duration}`;
                    }
                    break;
                case 2:
                    resultString += `${clusterAbcjsNotes[0]}/2${clusterAbcjsNotes[1]}/2`
                    break;
                case 3:
                    if (cluster.duration === 1) {
                        resultString += `(3${clusterAbcjsNotes[0]}/2${clusterAbcjsNotes[1]}/2${clusterAbcjsNotes[2]}/2`
                    }
                    if (cluster.duration === 2) {
                        resultString += `(3${clusterAbcjsNotes[0]}${clusterAbcjsNotes[1]}${clusterAbcjsNotes[2]}`
                    }
                    break;
                default:
                    //currently unsupported cluster type
                    break;
            }

            currentTime += cluster.duration;
            previousCluster = cluster;
        });
        
        // end of bar
        resultString = `${resultString}|`
        
        // only three measures per line
        if ((index+1) % 3 === 0) {
            resultString = `${resultString}\n`
        }
    });
    
    return resultString
};

const generateHeaderString = (title: string) => {
    const header = new Header(title);
    return `X:1\nT:${header.title}\nM:${header.meter}\nC:${header.composer}\nK:${header.key}\nL:${header.baseNoteDuration}\n`
};

const translateNoteToAbcjsNotes = (note: Note): string => {
    const instruments = note.instruments;
    
    // rest
    if (instruments.length === 0) {
        return 'z';
    }

    // accent
    let returnString = '';
    if (note.volume === ENoteVolume.F || note.volume === ENoteVolume.Ff) {
        returnString += '!>!'
    }
    
    // group multiple simultaneous hits in brackets
    if (instruments.length > 1) {
        returnString = '['
    }
    instruments.forEach((instrument) => {
        switch (instrument) {
            case EInstrument.HiHat:
                returnString += 'g';
                break;
            case EInstrument.Snare:
                returnString += 'B';
                break;
            case EInstrument.Kick:
                returnString += 'D';
                break;
            default:
                break;
        }
    });

    // group multiple simultaneous hits in brackets
    if (instruments.length > 1) {
        returnString += ']'
    }
    return returnString;
};

// Handle proper note beaming. Some rules are standard and some are up the the composer.
// I'll notate which rules aren't standard
const shouldBeamToPreviousCluster = (cluster: NoteCluster, previousCluster: NoteCluster, currentTime: number, previousBeamLength: number) => {

    // Don't beam over half notes
    if (previousCluster == null || currentTime % 4 === 0) {
        return false;
    }
    
    // don't beam longer than one beat
    if (previousBeamLength + cluster.duration > 2) {
        return false;
    }

    // Not Standard Rule:
    // We can bar triplets with other notes if the length is different
    // i.e. 8th note + 16th triplet is ok 
    if (cluster.notes.length === 3){
        if (previousCluster.notes.length === 2) {
            return false;
        }
    }
    if (previousCluster.notes.length === 3) {
        if (cluster.notes.length === 2) {
            return false
        }
    }
    
    // Otherwise it should be fine
    return true
}

// Combine rests into longer held notes to make the music look a little cleaner
const cleanUpNotation = (measures: Measure[]) => {

    measures.forEach((measure: Measure) => {
        measure.noteClusters.forEach((cluster) => {

            // If we have a note followed by only rests, it's really just one note
            let otherNotesAreAllRests = true;
            cluster.notes.forEach((note, index) => {
                if (index > 0 && note.instruments.length > 0) {
                    otherNotesAreAllRests = false;
                }
            });

            if (otherNotesAreAllRests) {
                cluster.notes = [cluster.notes[0]];
            }
        });
    });
    
    // Let's do another pass and combine noteClusters
    measures.forEach((measure: Measure) => {
        let previousCluster: NoteCluster;
        const clustersToCombine: NoteCluster[][] = [];
        
        measure.noteClusters.forEach((cluster) => {
            let currentIsRest = cluster.notes.length === 1 && cluster.notes[0].instruments.length === 0;
            let previousIsSingleNote = previousCluster != null &&
                previousCluster.notes.length === 1;
            
            if (currentIsRest && previousIsSingleNote) {
                clustersToCombine.push([previousCluster, cluster]);
            }
            previousCluster = cluster;
        });
        
        clustersToCombine.forEach((clusterPair) => {
            combineClusters(measure, clusterPair[0], clusterPair[1]);
        });
    });
};

const combineClusters = (measure: Measure, keepCluster: NoteCluster, removeCluster: NoteCluster) => {
    measure.noteClusters = measure.noteClusters.filter((cluster) => {
        return cluster !== removeCluster;
    });
    
    keepCluster.duration = keepCluster.duration + removeCluster.duration;
};

//#endregion
export default AbcJsEngine;