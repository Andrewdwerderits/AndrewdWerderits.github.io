import GenerateSheetMusicConfig from '../models/GenerateSheetMusicConfig';
import RandomizerEngine from './RandomizerEngine';
import Measure from '../models/Measure';
import EInstrument from '../Enums/EInstrument';
import Note from '../models/Note';
import ENoteVolume from '../Enums/ENoteVolume';
import EStickingStyle from '../Enums/EStickingStyle';
import EDensity from '../Enums/EDensity';
import NoteCluster from '../models/NoteCluster';
import EKickPreset from '../Enums/EKickPreset';
import EHiHatPreset from '../Enums/EHiHatPreset';
import ESnarePreset from '../Enums/ESnarePreset';

class ExerciseEngine {
    // Main entry point All configurations should be passed in here
    public static generateNewMeasure = (config: GenerateSheetMusicConfig): Measure => {
        try {
            const measure = generateMeasure(config);
            addStickingToMeasure(measure, config.stickingStyle);
            addAccentsToMeasure(measure, config.accentDensity);
            return measure;
        } catch (e) {
            throw e;
        }
    };
}

const generateMeasure = (config: GenerateSheetMusicConfig): Measure => {
    const measure = new Measure();

    generateMeasureMeter(config, measure);

    addMandatoryInstruments(measure, config);

    //add in the random instruments
    addInstrumentsToMeasure(measure, config.snareDensity, EInstrument.Snare);
    addInstrumentsToMeasure(measure, config.kickDensity, EInstrument.Kick);
    addInstrumentsToMeasure(measure, config.hiHatDensity, EInstrument.HiHat);

    return measure;
};

//#region Measure Length Calculations
const generateMeasureMeter = (config: GenerateSheetMusicConfig, measure: Measure) => {

    /*
    Generates the basic length and note value durations of the measure
    
    This is done based on the inputs the user selects, they can specify the density of
    each rhythm value type. If they have higher note density than is possible to fit into a measure,
    i.e. everything near high density, then select randomly
    
    There's a lot of hard coded numbers in here, but the idea is that a measure is broken up into 8 pieces,
    each representing 1/8 of a measure (1, 1&, 2, 2&, etc.)
    Each note cluster (i.e. 8th notes, 8th note triplet, 16th note, etc)
    takes up some portion of the total length
    
    We are using this assumption for now because ABCJS doesn't currently allow for polyrhythms
     */
    
    // Figure out what note types to try to add to the measure
    let allowableMeterTypes = [];

    if (config.sixteenthTriplets !== EDensity.None) {
        allowableMeterTypes.push('sixteenthTriplets');
    }
    if (config.eighthTriplets !== EDensity.None) {
        allowableMeterTypes.push('eighthTriplets');
    }
    if (config.sixteenthNotes !== EDensity.None) {
        allowableMeterTypes.push('sixteenthNotes');
    }
    if (config.eighthNotes !== EDensity.None) {
        allowableMeterTypes.push('eighthNotes');
    }

    while (allowableMeterTypes.length > 0) {

        // Pick a random note type to attempt to add to the measure
        const nextType = RandomizerEngine.getRandomItem(allowableMeterTypes);

        switch (nextType) {
            // Add in a note cluster with three 16th note triplets
            case 'sixteenthTriplets':
                addClustersToMeasure(measure, config.sixteenthTriplets, 3, 1)
                break;
            case 'eighthTriplets':
                // add in a note cluster with three 8th note triplets
                addClustersToMeasure(measure, config.eighthTriplets, 3, 2)
                break;
            case 'sixteenthNotes':
                // Add in a note cluster with two 16th notes
                addClustersToMeasure(measure, config.sixteenthNotes, 2, 1);
                break;
            case 'eighthNotes':
                // add in a note cluster with one 8th note
                addClustersToMeasure(measure, config.eighthNotes, 1, 1);
                break;
            default:
                break;
        }

        // we've tried this not type, remove it and loop, trying the next ones
        allowableMeterTypes = allowableMeterTypes.filter((meterType) => {
            return meterType !== nextType;
        });
    }
    
    // if the measure isn't full yet, add in 16th notes to fill it up!
    if (!measure.isMeasureFull()) {
        addClustersToMeasure(measure, EDensity.VeryHigh, 2, 1);
    }
    
    // Finally, shuffle the order of the clusters to make the measure more random
    RandomizerEngine.shuffleArray(measure.noteClusters)
};


// Note clusters represent groupings of notes with a common duration
// Like sixteenth notes or triplets
// We will add some to the measure based roughly on the density  that this particular cluster type is set to appear
// We might run out of room in the measure, but we'll fit in everything we can
const addClustersToMeasure = (measure: Measure, density: EDensity, amountOfNotesInCluster: number, clusterDuration: number) => {
    let addedItems = 0;
    const noteClustersToAdd = generateNumberBasedOnDensity(density, measure.measureDuration/clusterDuration)
    while (addedItems < noteClustersToAdd && canMeasureAcceptCluster(measure, clusterDuration)) {
        const clusterNotes = [];
        for(let i=0; i<amountOfNotesInCluster; i++) {
            clusterNotes.push(new Note([]));
        }
        const noteCluster = new NoteCluster(clusterNotes, clusterDuration);
        measure.noteClusters.push(noteCluster);
        addedItems++;
    }
}

// Each measure has an exact number of clusters it can accept, namely, clusters whose duration adds up to 8
const canMeasureAcceptCluster = (measure: Measure, newClusterDuration: number): boolean => {
    let currentDuration = 0;
    measure.noteClusters.forEach((cluster) => {
        currentDuration += cluster.duration;
    });
    return currentDuration + newClusterDuration <= measure.measureDuration;
}

// How many of a particular cluster to try to add to the measure based on the density
const generateNumberBasedOnDensity = (density: EDensity, amountMeasureCanHold: number): number => {
    switch (density) {
        case EDensity.Low:
            //1 - 25% 
            return RandomizerEngine.randomNumberInRange(1,amountMeasureCanHold/4);
        case EDensity.Medium:
            // >25% - 50%
            return RandomizerEngine.randomNumberInRange(amountMeasureCanHold/4+1,amountMeasureCanHold/2);
        case EDensity.High:
            // >50% - < amountMeasureCanHold
            return RandomizerEngine.randomNumberInRange(amountMeasureCanHold/2+1,amountMeasureCanHold-1);
        case EDensity.VeryHigh:
            // amountMeasureCanHold
            return amountMeasureCanHold;
        default:
            return 0;
    }
};

//#endregion

//#region Instrument Placement Calculations
const addInstrumentsToMeasure = (measure: Measure, density: EDensity, instrument: EInstrument) => {
    const notes = getAllNotesInMeasure(measure);
    const numberMeasureShouldHave = generateNumberBasedOnDensity(density, notes.length);
    const numberMeasureCurrentlyHas = howManyNotesWithInstrumentAreInTheMeasure(measure, instrument);

    // saving a function to check if the note has our instrument for later use
    const noteHasInstrumentCheck = ((note: Note): boolean => {
        const matchingInstrument = note.instruments.find((instrumentForNote) => {
            return instrument === instrumentForNote;
        });
        return matchingInstrument != null;
    });

    let remaining = numberMeasureShouldHave - numberMeasureCurrentlyHas;
    let retryCount = 0;
    while (remaining > 0 && retryCount < 100) {
        const randomIndex = RandomizerEngine.randomNumberInRange(0, notes.length - 1);
        const noteHasInstrument = noteHasInstrumentCheck(notes[randomIndex]);

        if (!noteHasInstrument) {
            notes[randomIndex].instruments.push(instrument);

            // Ok This part is a little confusing, but playing 3 consecutive notes can be difficult,
            // so for now I'm adding in a check that if the density is low or medium, we can't have more
            // than 3 consecutive hits of any instrument in a row
            if (density === EDensity.Medium || density === EDensity.Low) {
                if (noteVarietyDoesNotExceedConsecutiveCount(measure, 3, noteHasInstrumentCheck)) {
                    remaining--;
                } else {
                    // Too bad, 3 in a row rule is violated, revert it and try again
                    notes[randomIndex].instruments = notes[randomIndex].instruments.filter((instrumentForNote) => {
                        return instrumentForNote !== instrument;
                    });
                }
            }
        }

        retryCount++;
    }
};

// Put in the mandatory note placements based on the instrument presets, if it's not actually possible to place it,
// put it at the next available cluster
const addMandatoryInstruments = (measure: Measure, config: GenerateSheetMusicConfig) => {
    addMandatoryKicks(measure, config.kickPreset);
    addMandatoryHiHats(measure, config.hiHatPreset);
    addMandatorySnare(measure, config.snarePreset);
} 

const addMandatoryKicks = (measure: Measure, placement: EKickPreset) => {
    let noteClusters: NoteCluster[] = [];
    switch (placement) {
        case EKickPreset.HalfNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,4]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.Kick);
                cluster.notes[0].volume = ENoteVolume.Mf;
            });
            break;
        case EKickPreset.QuarterNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,2,4,6]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.Kick);
                cluster.notes[0].volume = ENoteVolume.Mf;
            });
            break;
        case EKickPreset.EighthNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,1,2,3,4,5,6,7]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.Kick);
                cluster.notes[0].volume = ENoteVolume.Mf;
            });
            break;
        case EKickPreset.None:
        default:
            break;
    }
};

const addMandatoryHiHats = (measure: Measure, placement: EHiHatPreset) => {
    let noteClusters: NoteCluster[] = [];
    switch (placement) {
        case EHiHatPreset.HalfNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,4]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.HiHat);
            });
            break;
        case EHiHatPreset.QuarterNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,2,4,6]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.HiHat);
            });
            break;
        case EHiHatPreset.EighthNotes:
            noteClusters = getClustersByElapsedDurations(measure, [0,1,2,3,4,5,6,7]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.HiHat);
            });
            break;
        case EHiHatPreset.None:
        default:
            break;
    }
};

const addMandatorySnare = (measure: Measure, placement: ESnarePreset) => {
    let noteClusters: NoteCluster[] = [];
    switch (placement) {
        case ESnarePreset.BackBeat:
            noteClusters = getClustersByElapsedDurations(measure, [2,6]);
            noteClusters.forEach((cluster) => {
                cluster.notes[0].instruments.push(EInstrument.Snare);
            });
            break;
        case ESnarePreset.None:
        default:
            break;
    }
};

//Attempt to get a cluster that happens at time Duration in the measure, or get the next one if it doesn't exist
const getClusterByElapsedDuration = (measure: Measure, duration: number): NoteCluster => {
    let currentElapsedDuration = 0;
    const cluster = measure.noteClusters.find((cluster) =>{
        if (currentElapsedDuration >= duration) {
            return true;
        }
        currentElapsedDuration += cluster.duration;
        return false;
    });
    
    if (cluster == null) {
        return measure.noteClusters[measure.noteClusters.length-1];
    }
    return cluster;
};

const getClustersByElapsedDurations = (measure: Measure, durations: number[]): NoteCluster[] => {
    let noteClusters: NoteCluster[] = [];
    durations.forEach((duration) => {
        noteClusters.push(getClusterByElapsedDuration(measure, duration));
    });

    const onlyUnique = (value: NoteCluster, index: number, array: NoteCluster[]) => {
        return array.indexOf(value) === index;
    };

    noteClusters = noteClusters.filter(onlyUnique);
    
    return noteClusters;
};

const noteVarietyDoesNotExceedConsecutiveCount = (measure: Measure, maximumNumber: number, isNoteVariety: (note: Note) => boolean) => {
    let consecutiveCount = 0;
    let hasNotSurpassedConsecutiveCount = true;
    const notes = getAllNotesInMeasure(measure);
    notes.forEach((note) => {
        if (isNoteVariety(note)) {
            consecutiveCount += 1;
        } else {
            consecutiveCount = 0;
        }
        
        if (consecutiveCount > maximumNumber) {
            hasNotSurpassedConsecutiveCount = false;
        }
    });
    return hasNotSurpassedConsecutiveCount;
};

const getAllNotesInMeasure = (measure: Measure): Note[] => {
    const notes: Note[] = [];
    measure.noteClusters.forEach((cluster) => {
        cluster.notes.forEach((note) => {
            notes.push(note);
        });
    });
    return notes;
}

const howManyNotesWithInstrumentAreInTheMeasure = (measure: Measure, instrumentType: EInstrument): number => {
    let notesWithInstrument = 0;
    const notes = getAllNotesInMeasure(measure);
    notes.forEach((note) => {
        const matchingInstrument = note.instruments.find((instrument) => {
            return instrument === instrumentType;
        });
        
        if (matchingInstrument) {
            notesWithInstrument++;
        }
    });
    return notesWithInstrument;
};

//#endregion

//#region Sticking and Accents
const addAccentsToMeasure = (measure: Measure, density: EDensity) => {
    const notes = getAllNotesInMeasure(measure);
    let remaining = generateNumberBasedOnDensity(density, notes.length);

    // saving a function to check if the note has an accent
    const noteHasAccentCheck = ((note: Note): boolean => {
        return note.volume === ENoteVolume.F;
    });

    let retryCount = 0;
    
    // Try to place notes on a retry count, if we fail, well then that's life 
    while (remaining > 0 && retryCount < 100) {
        const randomIndex = RandomizerEngine.randomNumberInRange(0, notes.length - 1);

        const accentInstrument = notes[randomIndex].instruments.find((instrumentForNote) => {
            // TODO add more instruments here
            return instrumentForNote === EInstrument.HiHat || instrumentForNote === EInstrument.Snare;
        });

        const noteHasAccent = noteHasAccentCheck(notes[randomIndex]);
        const placeAccent = accentInstrument && !noteHasAccent;

        if (placeAccent) {
            // Notes with volume F or Ff are accented
            notes[randomIndex].volume = ENoteVolume.F;
        }

        retryCount++;
    }
};

//TODO: Implement Sticking
const addStickingToMeasure = (measure: Measure, sticking: EStickingStyle) => {
    switch (sticking) {
        case EStickingStyle.Alternating:
            break;
        case EStickingStyle.NaturalSticking:
            break;
        case EStickingStyle.Random:
            break;
    }
};

//#endregion

export default ExerciseEngine;