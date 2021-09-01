import React, {useEffect, useState} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Abcjs from 'react-abcjs';
import Exercise from './models/Exercise';
import ExerciseEngine from './engines/ExcerciseEngine';
import GenerateSheetMusicConfig from './models/GenerateSheetMusicConfig';
import Header from "./models/Header";
import NumberSelectTab from './commonComponents/NumberSelectTab';
import {
    AppBar,
    Box,
    Card,
    CardActions,
    CardContent, CardHeader,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Select, Switch,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SwitchArrayTab from "./commonComponents/SwitchArrayTab";
import ValidationEngine from "./engines/ValidationEngine";
import EStickingStyle from "./Enums/EStickingStyle";
import AudioSampler from "./audioComponents/AudioSampler";
import ENoteTypes from "./Enums/ENoteTypes";
import EAccents from "./Enums/EAccents";
import {
    ConsecutiveNoteDescription,
    MandatoryNoteMusicalHelp,
    MandatoryNotePlacementDescription, ExactNumberNoteDescription,
    PageDescription, StickingDescription
} from "./text/Descriptions";
import Modal from "@material-ui/core/Modal";

function App() {
    const [savedExercises, setSavedExercises] = useState<Exercise[]>([]);
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>();
    const [exercisesGenerated, setExercisesGenerated] = useState(1);
    const [config, setConfig] = useState<GenerateSheetMusicConfig>(new GenerateSheetMusicConfig(new Header(`New Exercise: ${exercisesGenerated}`),));

    const [constraintTabIndex, setConstraintTabIndex] = useState(0);
    const [constraintOpen, setConstraintOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    
    const [stickingDescriptionOpen, setStickingDescriptionOpen] = useState(false);
    const [pageDescriptionOpen, setPageDescriptionOpen] = useState(false);
    
    const [consecutiveHitsSelection, setConsecutiveHitsSelection] = useState('kick');
    const [noteCountSelection, setNoteCountSelection] = useState('kick');
    const [mandatoryNotePlacementSelection, setMandatoryNotePlacementSelection] = useState('kick');

    const [measureName, setMeasureName] = useState(`Exercise ${exercisesGenerated}`);
    const [errorList, setErrorList] = useState<string[]>([]);
    const [hiHatOnPlayback, setHiHatOnPlayback] = useState(true);


    const playTrack = (exercise: Exercise) => {

        const quarterNoteInterval = 60 / exercise.bpm;
        const sixteenthNoteInterval = quarterNoteInterval / 4;

        const audioContext = new AudioContext();
        // const kick = new Kick(audioContext);
        // const snare = new Snare(audioContext);
        // const now = audioContext.currentTime;

        // kick.trigger(now);
        // snare.trigger(now + 0.5);

        const sampleLoader = (url: any, context: any, callback: any) => {
            const request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer: AudioBuffer) => {
                    callback(buffer);
                });
            };
            request.withCredentials = false;
            request.send();
        };

        const hasAccents = exercise.measures[0].notes.findIndex((note) => {
            return note.accent === EAccents.accented;
        }) !== -1;

        sampleLoader('snare.wav', audioContext, (buffer: AudioBuffer) => {
            const snare = new AudioSampler(audioContext, buffer);


            sampleLoader('hihat.wav', audioContext, (buffer: AudioBuffer) => {
                const hiHat = new AudioSampler(audioContext, buffer);

                sampleLoader('kick1.wav', audioContext, (buffer: AudioBuffer) => {
                    const kick = new AudioSampler(audioContext, buffer);

                    if (exercise != null) {
                        exercise.measures[0].notes.forEach((note, index) => {
                            if (note.noteType === ENoteTypes.snare) {
                                const unaccentedHit = hasAccents ? 0.5 : 1;
                                const gain = note.accent === EAccents.accented ? 2 : unaccentedHit;
                                snare.trigger(audioContext.currentTime + sixteenthNoteInterval * index, gain);
                            } else if (note.noteType === ENoteTypes.kick) {
                                kick.trigger(audioContext.currentTime + sixteenthNoteInterval * index, 1);
                            }

                            if (index % 2 === 0 && hiHatOnPlayback) {
                                hiHat.trigger(audioContext.currentTime + sixteenthNoteInterval * index, 1);
                            }
                        });
                    }
                })
            })
        })
    };


    useEffect(() => {
        config.header.title = measureName;
        let newConfig = {...config, header: config.header};
        setConfig(newConfig);
    }, [measureName]);

    useEffect(() => {
        const newErrorList: string[] = [];
        ValidationEngine.configIsValid(config, newErrorList);
        setErrorList(newErrorList);
    }, [config]);

    const saveExercise = () => {
        if (currentExercise) {
            setSavedExercises([...savedExercises, currentExercise]);
            setExercisesGenerated(exercisesGenerated + 1);
            setMeasureName(`Exercise ${exercisesGenerated + 1}`);
            setCurrentExercise(null);
        }
    };

    const removeExercise = () => {
        setCurrentExercise(null);
    };

    const generateNewExercise = () => {
        const exercise = ExerciseEngine.generateNewSheetMusic(config);
        if (Array.isArray(exercise)) {
            setErrorList(exercise);
            return;
        } else {
            const abcjsString = exercise.abcjsString;
            const measures = exercise.measures;
            const newExercise = new Exercise(abcjsString, measures);
            setCurrentExercise(newExercise);
        }
    };

    const stickingSelectionChange = (event: any) => {
        config.stickingStyle = parseInt(EStickingStyle[event.target.value]);
        let newConfig = {...config, header: config.header};
        setConfig(newConfig);
    };

    const measureNameChange = (event: any) => {
        setMeasureName(event.target.value);
    };

    const updateHiHat = (event: any) => {
        setHiHatOnPlayback(event.target.checked);
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            cardRoot: {
                minWidth: 275,
            },
            bullet: {
                display: 'inline-block',
                margin: '0 2px',
                transform: 'scale(0.8)',
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 12,
            },
            toolTip: {
                fontSize: 20,
            },
            paper: {
                position: 'absolute',
                width: '60%',
                height: '60%',
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }),
    );
    const classes = useStyles();

    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
    }

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function tabProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleConstraintTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setConstraintTabIndex(newValue);
    };

    const bpmChange = (event: any) => {
        if (currentExercise) {
            let currentExerciseCopy = {
                ...currentExercise,
                bpm: parseInt(event.target.value),
                measures: currentExercise.measures
            };
            setCurrentExercise(currentExerciseCopy);
        }
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const handleConstraintOpen = (event: any) => {
        setConstraintOpen(true);
    };

    const handleConstraintClose = (event: any) => {
        setConstraintOpen(false);
    };
    
    const handleStickingDescriptionClick = (event: any) => {
        setStickingDescriptionOpen(true);
    };
    
    const handleStickingDescriptionClose = (event: any) => {
        setStickingDescriptionOpen(false);
    };
    
    const handlePageDescriptionClick = (event: any) => {
        setPageDescriptionOpen(true);
    };
    
    const handlePageDescriptionClose = (event: any) => {
        setPageDescriptionOpen(false);
    };
    
    return (
        <div className="App">
            <div className='App-header'>Random Drum Pattern Generator
                <Button variant="contained" color="primary" onClick={handlePageDescriptionClick}>What is this?</Button>
                <Modal open={pageDescriptionOpen} onClose={handlePageDescriptionClose}>
                    <div style={modalStyle} className={classes.paper}>
                        <h2>What is this page and why does it exist?</h2>
                        <p>{PageDescription}</p>
                    </div>
                </Modal>
            </div>
            <Card className={classes.cardRoot}>
                {savedExercises && savedExercises.length > 0 && <CardHeader title={'Saved Exercises'}/>}
                <CardContent>
                    {savedExercises.map((exercise) => {
                        const deleteCallback = () => {
                            const firstIndexOfExercise = savedExercises.indexOf(exercise);
                            const savedExercisesCopy = [...savedExercises];
                            savedExercisesCopy.splice(firstIndexOfExercise, 1);
                            setSavedExercises(savedExercisesCopy);
                        };
                        const playCallback = () => {
                            playTrack(exercise);
                        };
                        return (
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div>
                                        <Abcjs
                                            abcNotation={exercise.sheetMusic}
                                            parserParams={{}}
                                            engraverParams={{responsive: 'resize'}}
                                            renderParams={{viewportHorizontal: true}}
                                        />
                                        <Button variant="contained" color="secondary"
                                                onClick={deleteCallback}>Delete</Button>
                                        <Button variant="contained" color="primary"
                                                onClick={playCallback}
                                        >Play</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </CardContent>
            </Card>

            <Card className={classes.cardRoot}>
                <CardHeader title={'Unsaved (Current) Exercise'}/>
                {currentExercise &&
                <CardContent>
                    <Abcjs
                        abcNotation={currentExercise.sheetMusic}
                        parserParams={{}}
                        engraverParams={{responsive: 'resize'}}
                        renderParams={{viewportHorizontal: true}}
                    />
                    <Button variant="contained" color="primary"
                            onClick={() => {
                                playTrack(currentExercise)
                            }}
                    >PLAY</Button>
                    <TextField style={{marginLeft: '18px'}} value={currentExercise.bpm} onChange={bpmChange}
                               id="standard-basic" label="BPM of Playback"/>
                    <FormControlLabel
                        control={<Switch checked={hiHatOnPlayback} onChange={updateHiHat} name="oneAnd"/>}
                        label="Enable Hi-Hat on playback?"
                    />
                </CardContent>
                }
            </Card>

            <Card className={classes.cardRoot}>
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Generation Controls</FormLabel>
                        <TextField value={measureName} onChange={measureNameChange} id="standard-basic"
                                   label="Pattern Name"/>
                        <CardActions>
                            <Tooltip title={<span style={{fontSize: '18px'}}>{errorList}</span>}>
                                    <span style={{cursor: 'not-allowed'}}>
                                    <Button disabled={errorList.length > 0} variant="contained"
                                            onClick={generateNewExercise}>Generate Measure</Button>
                                    </span>
                            </Tooltip>
                            <Button variant="contained" color="primary" onClick={saveExercise}>Save</Button>
                            <Button variant="contained" color="primary" onClick={removeExercise}>Remove</Button>
                            <Button variant="contained" color="primary"
                                    onClick={handleConstraintOpen}>Configure</Button>
                            <Modal open={constraintOpen} onClose={handleConstraintClose}>
                                <div style={modalStyle} className={classes.paper}>
                                    <AppBar>
                                        <Tabs value={constraintTabIndex} onChange={handleConstraintTabChange}
                                              aria-label="configuration">
                                            <Tab label="Consecutive Notes" {...tabProps(0)} />
                                            <Tab label="Total Number of Notes" {...tabProps(1)} />
                                            <Tab label="Hit Placement" {...tabProps(2)} />
                                            <Tab label="Sticking Style" {...tabProps(3)} />
                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={constraintTabIndex} index={0}>
                                        <NumberSelectTab mode={'consecutive'} selection={consecutiveHitsSelection}
                                                         title={'Specify Maximum Consecutive Notes For A Drum Sound'}
                                                         setSelection={setConsecutiveHitsSelection} config={config}
                                                         description={ConsecutiveNoteDescription}
                                                         setConfig={setConfig}/>
                                    </TabPanel>
                                    <TabPanel value={constraintTabIndex} index={1}>
                                        <NumberSelectTab mode={'noteCount'} selection={noteCountSelection}
                                                         title={'Specify Exact Note Count For A Drum Sound'}
                                                         setSelection={setNoteCountSelection} config={config}
                                                         description={ExactNumberNoteDescription}
                                                         setConfig={setConfig}/>
                                    </TabPanel>
                                    <TabPanel value={constraintTabIndex} index={2}>
                                        <SwitchArrayTab selection={mandatoryNotePlacementSelection}
                                                        title={'Specify Mandatory Note Placements For A Drum Sound'}
                                                        description={MandatoryNotePlacementDescription}
                                                        help={MandatoryNoteMusicalHelp}
                                                        setSelection={setMandatoryNotePlacementSelection}
                                                        config={config}
                                                        setConfig={setConfig}/>
                                    </TabPanel>
                                    <TabPanel value={constraintTabIndex} index={3}>
                                        <div>
                                            <Card style={{
                                                display: 'flex',
                                                marginTop: '50px',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            }}>
                                                <CardHeader title={'Specify A Sticking Type'}/>
                                                <CardContent>
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-label">Sticking
                                                            Pattern</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={EStickingStyle[config.stickingStyle]}
                                                            onChange={stickingSelectionChange}
                                                        >
                                                            <MenuItem value={'none'}>None</MenuItem>
                                                            <MenuItem value={'naturalSticking'}>Natural</MenuItem>
                                                            <MenuItem value={'alternating'}>Alternating</MenuItem>
                                                            <MenuItem value={'random'}>Random</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </CardContent>
                                            </Card>
                                            <div>
                                                <button onClick={handleStickingDescriptionClick}>Help</button>
                                                <Modal open={stickingDescriptionOpen} onClose={handleStickingDescriptionClose}>
                                                    <div style={modalStyle} className={classes.paper}>
                                                        <h2>Sticking Type Description</h2>
                                                        <p>{StickingDescription}</p>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </Modal>
                        </CardActions>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
