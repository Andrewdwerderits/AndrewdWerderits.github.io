import {FormControl, InputLabel, MenuItem, Select, Tooltip} from '@material-ui/core';
import EDensity from '../Enums/EDensity';
import EKickPreset from '../Enums/EKickPreset';
import EHiHatPreset from '../Enums/EHiHatPreset';
import ESnarePreset from '../Enums/ESnarePreset';
import EStickingStyle from '../Enums/EStickingStyle';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {ConfigDescription, ConfigRules} from '../text/Descriptions';
import React, {useState} from 'react';
import GenerateSheetMusicConfig from '../models/GenerateSheetMusicConfig';
import {getModalStyle, useStyles} from '../Styles/CommonStyles';

interface ConfigurationProps {
    config: GenerateSheetMusicConfig;
    setConfig: (config: GenerateSheetMusicConfig) => void;
    handleConfigureClose: () => void;
}

function ConfigurationModal (props: ConfigurationProps) {

    const [configureDescriptionOpen, setConfigureDescriptionOpen] = useState<boolean>(false);

    const [kickDensityTooltipOpen, setKickDensityTooltipOpen] = useState<boolean>(false);
    const [kickPresetTooltipOpen, setKickPresetTooltipOpen] = useState<boolean>(false);
    const [snareDensityTooltipOpen, setSnareDensityTooltipOpen] = useState<boolean>(false);
    const [snarePresetTooltipOpen, setSnarePresetTooltipOpen] = useState<boolean>(false);
    const [hiHatDensityTooltipOpen, setHiHatDensityTooltipOpen] = useState<boolean>(false);
    const [hiHatPresetTooltipOpen, setHiHatPresetTooltipOpen] = useState<boolean>(false);
    const [accentDensityTooltipOpen, setAccentDensityTooltipOpen] = useState<boolean>(false);
    const [eighthNoteTooltipOpen, setEighthNoteTooltipOpen] = useState<boolean>(false);
    const [eighthNoteTripletTooltipOpen, setEighthNoteTripletTooltipOpen] = useState<boolean>(false);
    const [sixteenthNoteTooltipOpen, setSixteenthNoteTooltipOpen] = useState<boolean>(false);
    const [sixteenthNoteTripletTooltipOpen, setSixteenthNoteTripletTooltipOpen] = useState<boolean>(false);
    
    const [modalStyle] = React.useState(getModalStyle);

    const config = props.config;
    const setConfig = props.setConfig;

    const styleClasses = useStyles();

    //#region UI Events
    const stickingSelectionChange = (event: any) => {
        let newConfig = {...config, stickingStyle: parseInt(EStickingStyle[event.target.value])};
        setConfig(newConfig);
    };

    const accentDensitySelectionChange = (event: any) => {
        let newConfig = {...config, accentDensity: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const kickDensitySelectionChange = (event: any) => {
        let newConfig = {...config, kickDensity: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const kickPresetSelectionChange = (event: any) => {
        let newConfig = {...config, kickPreset: parseInt(EKickPreset[event.target.value])};
        setConfig(newConfig);
    };

    const hiHatDensitySelectionChange = (event: any) => {
        let newConfig = {...config, hiHatDensity: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const hiHatPresetSelectionChange = (event: any) => {
        let newConfig = {...config, hiHatPreset: parseInt(EHiHatPreset[event.target.value])};
        setConfig(newConfig);
    };

    const snareDensitySelectionChange = (event: any) => {
        let newConfig = {...config, snareDensity: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const snarePresetSelectionChange = (event: any) => {
        let newConfig = {...config, snarePreset: parseInt(ESnarePreset[event.target.value])};
        setConfig(newConfig);
    };

    const eighthTripletsSelectionChange = (event: any) => {
        let newConfig = {...config, eighthTriplets: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const sixteenthTripletsDensitySelectionChange = (event: any) => {
        let newConfig = {...config, sixteenthTriplets: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const eighthNotesDensitySelectionChange = (event: any) => {
        let newConfig = {...config, eighthNotes: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const sixteenthNotesDensitySelectionChange = (event: any) => {
        let newConfig = {...config, sixteenthNotes: parseInt(EDensity[event.target.value])};
        setConfig(newConfig);
    };

    const handleConfigureDescriptionClose = () => {
        setConfigureDescriptionOpen(false);
    };

    const handleConfigureDescriptionOpen = () => {
        setConfigureDescriptionOpen(true);
    };

    const handleResetClick = () => {
        const newConfig = new GenerateSheetMusicConfig();
        setConfig(newConfig);
    };
    
    const handleTooltipOpen = (tooltipName: string) => {
        const setterFunction = mapTooltipNameToSetterFunction(tooltipName);
        setterFunction(true);
    }

    const handleTooltipClose = (tooltipName: string) => {
        const setterFunction = mapTooltipNameToSetterFunction(tooltipName);
        setterFunction(false);
    }
    
    const mapTooltipNameToSetterFunction = (name: string) => {
        switch(name) {
            case 'kickDensity':
                return setKickDensityTooltipOpen;
            case 'kickPreset':
                return setKickPresetTooltipOpen;
            case 'snareDensity':
                return setSnareDensityTooltipOpen;
            case 'snarePreset':
                return setSnarePresetTooltipOpen;
            case 'hiHatDensity':
                return setHiHatDensityTooltipOpen;
            case 'hiHatPreset':
                return setHiHatPresetTooltipOpen;
            case 'accentDensity':
                return setAccentDensityTooltipOpen;
            case 'eighthNote':
                return setEighthNoteTooltipOpen;
            case 'eighthNoteTriplet':
                return setEighthNoteTripletTooltipOpen;
            case 'sixteenthNote':
                return setSixteenthNoteTooltipOpen;
            case 'sixteenthNoteTriplet':
                return setSixteenthNoteTripletTooltipOpen;
                
            // Hope we never get here    
            default:
                return () => {};
        }
    }

    //#endregion

    return (
        <div id={`configurationModal`}>
            <div style={modalStyle} className={styleClasses.paper}>
                <h2>Generation Settings</h2>
                <FormControl style={{
                    marginBottom: '50px'
                }}>
                    <Button variant='contained' color='primary'
                            onClick={handleResetClick}>Reset To Default</Button>
                </FormControl>
                <h3>Instrument Settings</h3>
                <p>Kick Drum Settings</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '20px'
                }}>
                    <Tooltip title={`Sets how many Kick Drums will appear in your measures`}
                             open={kickDensityTooltipOpen}
                    >
                        <FormControl className={styleClasses.formControl}
                                     onMouseEnter={() => {
                                         handleTooltipOpen('kickDensity')
                                     }}
                                     onMouseLeave={() => {
                                         handleTooltipClose('kickDensity')
                                     }}>
                            <InputLabel id='kick-density-label'>Kick Density</InputLabel>
                            <Select
                                labelId='kick-density-label'
                                id='kick-density-select'
                                onOpen={() => {
                                    handleTooltipClose('kickDensity')
                                }}
                                value={EDensity[config.kickDensity]}
                                onChange={kickDensitySelectionChange}
                            >
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                                <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                            </Select>
                        </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets mandatory note placements for the Kick Drum`}
                             open={kickPresetTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('kickPreset')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('kickPreset')
                                 }}>
                        <InputLabel id='kick-preset-label'>Kick Preset</InputLabel>
                        <Select
                            labelId='kick-preset-label'
                            id='kick-preset-select'
                            onOpen={() => {
                                handleTooltipClose('kickPreset')
                            }}
                            value={EKickPreset[config.kickPreset]}
                            onChange={kickPresetSelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'HalfNotes'}>Half Notes</MenuItem>
                            <MenuItem value={'QuarterNotes'}>Quarter Notes</MenuItem>
                            <MenuItem value={'EighthNotes'}>Eighth Notes</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                </div>

                <p>Hi Hat Settings</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '20px'
                }}>
                    <Tooltip title={`Sets how many HiHats will appear in your measures`}
                             open={hiHatDensityTooltipOpen}
                    >
                        <FormControl className={styleClasses.formControl}
                                     onMouseEnter={() => {
                                         handleTooltipOpen('hiHatDensity')
                                     }}
                                     onMouseLeave={() => {
                                         handleTooltipClose('hiHatDensity')
                                     }}>
                            <InputLabel id='hihat-density-label'>HiHat Density</InputLabel>
                            <Select
                                labelId='hihat-density-label'
                                id='hihat-density-select'
                                onOpen={() => {
                                    handleTooltipClose('hiHatDensity')
                                }}
                                value={EDensity[config.hiHatDensity]}
                                onChange={hiHatDensitySelectionChange}
                            >
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                                <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                            </Select>
                        </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets mandatory note placements for the HiHat`}
                             open={hiHatPresetTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('hiHatPreset')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('hiHatPreset')
                                 }}>
                        <InputLabel id='hihat-preset-label'>HiHat Preset</InputLabel>
                        <Select
                            labelId='hihat-preset-label'
                            id='hihat-preset-select'
                            onOpen={() => {
                                handleTooltipClose('hiHatPreset')
                            }}
                            value={EHiHatPreset[config.hiHatPreset]}
                            onChange={hiHatPresetSelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'HalfNotes'}>Half Notes</MenuItem>
                            <MenuItem value={'QuarterNotes'}>Quarter Notes</MenuItem>
                            <MenuItem value={'EighthNotes'}>Eighth Notes</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                </div>

                <p>Snare Drum Settings</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '20px'
                }}>
                    <Tooltip title={`Sets how many Snare Drums will appear in your measures`}
                             open={snareDensityTooltipOpen}
                    >
                        <FormControl className={styleClasses.formControl}
                                     onMouseEnter={() => {
                                         handleTooltipOpen('snareDensity')
                                     }}
                                     onMouseLeave={() => {
                                         handleTooltipClose('snareDensity')
                                     }}>
                            <InputLabel id='snare-density-label'>Snare Density</InputLabel>
                            <Select
                                labelId='snare-density-label'
                                id='snare-density-select'
                                onOpen={() => {
                                    handleTooltipClose('snareDensity')
                                }}
                                value={EDensity[config.snareDensity]}
                                onChange={snareDensitySelectionChange}
                            >
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                                <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                            </Select>
                        </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets mandatory note placements for the Snare Drum`}
                             open={snarePresetTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('snarePreset')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('snarePreset')
                                 }}>
                        <InputLabel id='snare-preset-label'>Snare Preset</InputLabel>
                        <Select
                            labelId='snare-preset-label'
                            id='snare-preset-select'
                            onOpen={() => {
                                handleTooltipClose('snarePreset')
                            }}
                            value={ESnarePreset[config.snarePreset]}
                            onChange={snarePresetSelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'BackBeat'}>Back Beat</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                </div>

                <p>Accent and Sticking Settings</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '20px'
                }}>
                    <Tooltip title={`Sets how many Accented Notes will appear in your measures`}
                             open={accentDensityTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('accentDensity')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('accentDensity')
                                 }}>
                        <InputLabel id='accent-density-label'>Accent Density</InputLabel>
                        <Select
                            labelId='accent-density-label'
                            id='accent-density-select'
                            onOpen={() => {
                                handleTooltipClose('accentDensity')
                            }}
                            value={EDensity[config.accentDensity]}
                            onChange={accentDensitySelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                            <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('stickingPreset')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('stickingPreset')
                                 }}>
                        <InputLabel id='sticking-preset-label'>Sticking Preset</InputLabel>
                        <Select
                            labelId='sticking-preset-label'
                            id='sticking-preset-select'
                            disabled={true}
                            value={EStickingStyle[config.stickingStyle]}
                            onChange={stickingSelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'NaturalSticking'}>Natural Sticking</MenuItem>
                            <MenuItem value={'Alternating'}>Alternating</MenuItem>
                            <MenuItem value={'Random'}>Random</MenuItem>

                        </Select>
                    </FormControl>
                </div>
                <h3>Subdivision Settings</h3>
                <div style={{
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Tooltip title={`Sets how 8th Note groupings will appear in your measures`}
                             open={eighthNoteTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('eighthNote')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('eighthNote')
                                 }}>
                        <InputLabel id='eighthnote-label'>8th Note Density</InputLabel>
                        <Select
                            labelId='eighthnote-label'
                            id='eighthnote-select'
                            onOpen={() => {
                                handleTooltipClose('eighthNote')
                            }}
                            value={EDensity[config.eighthNotes]}
                            onChange={eighthNotesDensitySelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                            <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets how 8th Note Triplet groupings will appear in your measures`}
                             open={eighthNoteTripletTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('eighthNoteTriplet')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('eighthNoteTriplet')
                                 }}>
                        <InputLabel id='eighthTriplets-label'>8th Note Triplet
                            Density</InputLabel>
                        <Select
                            labelId='eighthTriplets-label'
                            id='eighthTriplets-select'
                            onOpen={() => {
                                handleTooltipClose('eighthNoteTriplet')
                            }}
                            value={EDensity[config.eighthTriplets]}
                            onChange={eighthTripletsSelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                            <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets how 16th Note Groupings will appear in your measures`}
                             open={sixteenthNoteTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('sixteenthNote')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('sixteenthNote')
                                 }}>
                        <InputLabel id='sixteenthNotes-label'>16th Note Density</InputLabel>
                        <Select
                            labelId='sixteenthNotes-label'
                            id='sixteenthNotes-select'
                            onOpen={() => {
                                handleTooltipClose('sixteenthNote')
                            }}
                            value={EDensity[config.sixteenthNotes]}
                            onChange={sixteenthNotesDensitySelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                            <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                    <Tooltip title={`Sets how 16th Note Triplet groupings will appear in your measures`}
                             open={sixteenthNoteTripletTooltipOpen}
                    >
                    <FormControl className={styleClasses.formControl}
                                 onMouseEnter={() => {
                                     handleTooltipOpen('sixteenthNoteTriplet')
                                 }}
                                 onMouseLeave={() => {
                                     handleTooltipClose('sixteenthNoteTriplet')
                                 }}>
                        <InputLabel id='sixteenthTriplets-label'>16th Note Triplet
                            Density</InputLabel>
                        <Select
                            labelId='sixteenthTriplets-label'
                            id='sixteenthTriplets-select'
                            onOpen={() => {
                                handleTooltipClose('sixteenthNoteTriplet')
                            }}
                            value={EDensity[config.sixteenthTriplets]}
                            onChange={sixteenthTripletsDensitySelectionChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                            <MenuItem value={'VeryHigh'}>Very High</MenuItem>
                        </Select>
                    </FormControl>
                    </Tooltip>
                </div>
                <div style={{
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <FormControl className={styleClasses.formControl}>
                        <Button variant='contained' color='primary'
                                onClick={props.handleConfigureClose}>Done</Button>
                    </FormControl>
                    <FormControl className={styleClasses.formControl}>
                        <Button variant='contained'
                                color='primary'
                                onClick={handleConfigureDescriptionOpen}>Help</Button>
                    </FormControl>
                </div>
                <Modal open={configureDescriptionOpen} onClose={handleConfigureDescriptionClose}>
                    <div style={modalStyle} className={styleClasses.paper}>
                        <h2>Settings Help</h2>
                        <h4>{ConfigDescription}</h4>
                        {ConfigRules.map((configRule: string) => {
                                return (
                                    <p>{configRule}</p>
                                );
                        })}
                        <div style={{
                            marginTop: '50px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <FormControl>
                                <Button variant='contained' color='primary'
                                        onClick={handleConfigureDescriptionClose}>Done</Button>
                            </FormControl>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default ConfigurationModal;