import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Abcjs from 'react-abcjs';
import Exercise from './models/Exercise';
import ExerciseEngine from './engines/ExcerciseEngine';
import GenerateSheetMusicConfig from './models/GenerateSheetMusicConfig';
import {FormControl, TextField, Tooltip,} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EInstrument from './Enums/EInstrument';
import ENoteVolume from './Enums/ENoteVolume';
import {PageDescription,} from './text/Descriptions';
import Modal from '@material-ui/core/Modal';
import AbcJsEngine from './engines/AbcJsEngine';
import Measure from './models/Measure';
import ConfigurationModal from './commonComponents/ConfigurationModal';
import {getModalStyle, useStyles} from './Styles/CommonStyles';
import AudioLoader from './audioComponents/AudioLoader';

function App() {

    //#region Variables
    const [config, setConfig] = useState<GenerateSheetMusicConfig>(new GenerateSheetMusicConfig());
    const [exercise, setExercise] = useState<Exercise>(new Exercise('', []));

    const [playbackAudioContext, setPlaybackAudioContext] = useState<AudioContext>()
    const playbackAudioContextRef = useRef(playbackAudioContext);
    playbackAudioContextRef.current = playbackAudioContext;
    
    const [playCount, setPlayCount] = useState<number>(0);
    const playCountRef = useRef(playCount);
    playCountRef.current = playCount;
    
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [configureOpen, setConfigureOpen] = useState<boolean>(false);
    const [modalStyle] = React.useState(getModalStyle);

    const [pageDescriptionOpen, setPageDescriptionOpen] = useState<boolean>(false);

    //#endregion

    //#region Effects

    const styleClasses = useStyles();

    useEffect(() => {
        const existingExercise = localStorage.getItem('savedExercise');
        if (existingExercise) {
            const value: Exercise = JSON.parse(existingExercise);
            setExercise(value);
        }

        const existingConfig = localStorage.getItem('config');
        if (existingConfig) {
            const value: GenerateSheetMusicConfig = JSON.parse(existingConfig);
            setConfig(value);
        }
    }, []);

    //#endregion

    //#region Playback

    // loops through measures and plays a single instrument
    // For accurate playback, the same time should be passed to every instrument
    const playAudio = (sampler: AudioLoader, time: number, measures: Measure[], bpm: number, instrument: EInstrument) => {
        // add a short delay to make sure everything plays at the same time
        time += 0.03;

        const quarterNoteInterval = 60 / bpm;
        const eighthNoteInterval = quarterNoteInterval / 2;

        const getGainFromVolume = (volume: ENoteVolume): number => {
            switch (volume) {
                case ENoteVolume.Pp:
                    return 0.3
                case ENoteVolume.P:
                    return 0.5
                case ENoteVolume.Mp:
                    return 0.7;
                case ENoteVolume.Mf:
                    return 1;
                case ENoteVolume.F:
                    return 1.4
                case ENoteVolume.Ff:
                    return 2;
            }
        };

        // Loop through each note cluster in each measure and figure out the timings based on the number of
        // notes in each note cluster. 
        let totalDuration = 0;
        measures.forEach((measure) => {
            measure.noteClusters.forEach((cluster) => {

                // determine timings
                const clusterLength = cluster.duration;
                const noteCount = cluster.notes.length;
                const durationCoefficient = clusterLength / noteCount;

                // see if our instrument has a note in the cluster, and play it if necessary
                for (let i = 0; i < noteCount; i++) {
                    const note = cluster.notes[i];
                    const noteMatchingInstrument = note.instruments.find((noteInstrument) => {
                        return noteInstrument === instrument;
                    });
                    if (noteMatchingInstrument != null) {
                        
                        // Balance the gain to fit the sounds of the audio files
                        let gain = getGainFromVolume(note.volume);
                        if (instrument === EInstrument.Kick)
                        {
                            gain = gain * 10;
                        }
                        if (instrument === EInstrument.Snare) {
                            gain = gain * 2;
                        }
                        sampler.trigger(time + totalDuration, gain);
                    }
                    totalDuration += durationCoefficient * eighthNoteInterval;
                }
            });
        });
    };

    // Build our audio context if necessary, and make requests to play our tracks
    const playTrack = (exercise: Exercise) => {
        let audioContext: AudioContext;

        if (playbackAudioContext == null) {
            audioContext = new AudioContext();
            setPlaybackAudioContext(audioContext);
        } else {
            audioContext = playbackAudioContext;
        }

        const currentPlayCount = playCount + 1;
        setPlayCount(currentPlayCount);
        setIsPlaying(true);

        // fetch the data for our sounds and prepare to play them
        const audioLoader = (url: any, context: any, callback: any) => {
            const request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer: AudioBuffer) => {
                    const time = audioContext.currentTime;
                    callback(buffer, time);
                });
            };
            request.withCredentials = false;
            request.send();
        };

        //TODO: Add additional instruments here

        audioLoader('CKV1_Snare Loud.wav', audioContext, (buffer: AudioBuffer, time: number) => {
            const snare = new AudioLoader(audioContext, buffer);
            //Not all of the audio files start at the same time, so adding in an offset to delay start
            playAudio(snare, time, exercise.measures, exercise.bpm, EInstrument.Snare);
        });
        audioLoader('CKV1_HH Slush Loud.wav', audioContext, (buffer: AudioBuffer, time: number) => {
            const hiHat = new AudioLoader(audioContext, buffer);
            playAudio(hiHat, time, exercise.measures, exercise.bpm, EInstrument.HiHat);
        });
        audioLoader('CKV1_Kick Soft.wav', audioContext, (buffer: AudioBuffer, time: number) => {
            const kick = new AudioLoader(audioContext, buffer);
            playAudio(kick, time, exercise.measures, exercise.bpm, EInstrument.Kick);
        });

        // figure out how long we expect the sample top lay for
        const quarterNoteInterval = 60 / exercise.bpm;
        // adding a delay just in case there is lag
        const totalDuration = exercise.measures.length * 4 * quarterNoteInterval * 1000 + 500;

        // If the audio has played and the user hasn't stopped it manually, let's stop it
        setTimeout(() => {
            if (playCountRef.current === currentPlayCount) {
                stopAudio();
            }
        }, totalDuration);

    };

    const stopAudio = () => {
        const audioContext = playbackAudioContextRef.current;
        if (audioContext) {
            if (audioContext.state !== 'closed') {
                audioContext.close().then(() => {
                    setIsPlaying(false);
                    setPlaybackAudioContext(new AudioContext());
                });
            } else {
                setIsPlaying(false);
            }
        }
    }

    //#endregion

    //#region Measure Manipulation
    const save = () => {
        const key = 'savedExercise';
        const value = JSON.stringify(exercise);
        localStorage.setItem(key, value);

        const configKey = 'config';
        const configValue = JSON.stringify(config);
        localStorage.setItem(configKey, configValue);
    };

    const createExercise = (measures: Measure[], bpm: number, title: string): Exercise => {
        return AbcJsEngine.createExerciseForAbcJs(measures, bpm, title, config);
    };

    const deleteMeasure = () => {
        const measureNumber = exercise.measures.length;
        const measureIndex = measureNumber - 1;
        if (measureIndex >= 0 && measureIndex <= exercise.measures.length) {
            const measures = exercise.measures.filter((_measure, index) => {
                return index !== measureIndex;
            });
            const updatedExercise = createExercise(measures, exercise.bpm, exercise.title);
            setExercise(updatedExercise);
        }
    };

    const GenerateMeasure = () => {
        let measures: Measure[] = [];
        if (exercise.measures.length > 0) {
            measures = [...exercise.measures];
        }
        measures.push(ExerciseEngine.generateNewMeasure(config));
        const updatedExercise = createExercise(measures, exercise.bpm, exercise.title);
        setExercise(updatedExercise);
    };

    //#endregion

    //#region UI controls

    const exerciseNameChange = (event: any) => {
        const measures = exercise.measures;
        const updatedExercise = createExercise(measures, exercise.bpm, event.target.value);
        setExercise(updatedExercise);
    };

    const bpmChange = (event: any) => {
        const measures = exercise.measures;
        const bpm = parseInt(event.target.value) || 0;
        const updatedExercise = createExercise(measures, bpm, exercise.title);
        setExercise(updatedExercise);
    };

    //#endregion

    //#region UiCallbacks
    const handleConfigureOpen = () => {
        setConfigureOpen(true);
    };

    const handleConfigureClose = () => {
        setConfigureOpen(false);
    };

    const handlePageDescriptionOpen = () => {
        setPageDescriptionOpen(true);
    };

    const handlePageDescriptionClose = () => {
        setPageDescriptionOpen(false);
    };
    //#endregion

    return (
        <div className='App'>
            <div className='App-header'>Random Drum Pattern Generator
                <Button variant='contained' color='primary' onClick={handlePageDescriptionOpen}>What is this?</Button>
            </div>
            <div style={{
                marginTop: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Abcjs
                    abcNotation={exercise.abcJsNotation}
                    parserParams={{}}
                    engraverParams={{responsive: 'resize'}}
                    renderParams={{viewportHorizontal: true}}
                />
                <div style={{
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip title={`Play Audio Preview`}>
                            <span>
                                <Button variant='contained' color='primary'
                                        disabled={isPlaying || exercise.bpm === 0 ||
                                            exercise.measures.length === 0}
                                        onClick={() => {
                                            playTrack(exercise);
                                        }}
                                >PLAY</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip title={`Stop Audio Preview`}>
                            <span>
                                <Button variant='contained' color='secondary'
                                        disabled={!isPlaying}
                                        onClick={() => {
                                            stopAudio();
                                        }}
                                >STOP</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                    <TextField style={{marginLeft: '18px'}}
                               disabled={isPlaying}
                               value={exercise.bpm} onChange={bpmChange}
                               id='standard-basic' label='BPM of Playback'/>
                </div>
                <FormControl style={{
                    marginLeft: '30px'
                }}>
                    <TextField value={exercise.title}
                               disabled={isPlaying}
                               inputProps={{maxLength: 30}}
                               onChange={exerciseNameChange} id='standard-basic'
                               label='Pattern Name'/>
                </FormControl>
                <div style={{
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip title={`Generates a new measure based on your settings`}>
                            <span>
                                <Button disabled={exercise.title === '' || isPlaying} variant='contained'
                                        color='primary'
                                        onClick={GenerateMeasure}>New Measure</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip
                            title={`Saves the exercise and settings, this exercise and settings will load next time you visit this page`}>
                            <span>
                                <Button variant='contained'
                                        disabled={exercise.bpm === 0 ||
                                            isPlaying}
                                        color='primary'
                                        onClick={save}>Save</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip title={`Deletes the last measure`}>
                            <span>
                                <Button variant='contained'
                                        disabled={isPlaying}
                                        color='secondary'
                                        onClick={deleteMeasure}>Delete</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                    <FormControl className={styleClasses.buttonArray}>
                        <Tooltip title={`Opens the options to configure how measures are generated`}>
                            <span>
                                <Button variant='contained' color='primary'
                                        disabled={isPlaying}
                                        onClick={handleConfigureOpen}>Settings</Button>
                            </span>
                        </Tooltip>
                    </FormControl>
                </div>
            </div>
            <Modal open={configureOpen} onClose={handleConfigureClose}>
                <ConfigurationModal config={config} handleConfigureClose={handleConfigureClose} setConfig={setConfig}/>
            </Modal>
            <Modal open={pageDescriptionOpen} onClose={handlePageDescriptionClose}>
                <div style={modalStyle} className={styleClasses.paper}>
                    <h2>What is this page and why does it exist?</h2>
                    <p>{PageDescription}</p>
                    <div style={{
                        marginTop: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <FormControl>
                            <Button variant='contained' color='primary'
                                    onClick={handlePageDescriptionClose}>Done</Button>
                        </FormControl>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default App;
