import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Select, Switch,
} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import GenerateSheetMusicConfig from "../models/GenerateSheetMusicConfig";
import ENotePlacement from "../Enums/ENotePlacement";
import Modal from "@material-ui/core/Modal";

interface SwitchArrayTabProps {
    selection: string;
    setSelection: (arg: string) => void;
    config: GenerateSheetMusicConfig;
    description: string;
    help: string;
    setConfig: (arg: GenerateSheetMusicConfig) => void;
    title: string,
}

export default function SwitchArrayTab(props: SwitchArrayTabProps) {

    const {selection, setSelection, config, setConfig, description, help, title} = props;
    const [descriptionOpen, setDescriptionOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    const getConfigFieldFromSelection = (selection: string, switchIdentifier: ENotePlacement, config: GenerateSheetMusicConfig) => {
        switch (selection) {
            case 'snare':
                return config.mandatorySnarePlacements.find((item) => {
                    return item === switchIdentifier
                }) != null;
            case 'kick':
                return config.mandatoryKickPlacements.find((item) => {
                    return item === switchIdentifier
                }) != null;
            case 'rests':
                return config.mandatoryRestPlacements.find((item) => {
                    return item === switchIdentifier
                }) != null;
            case 'accents':
                return config.mandatoryAccentPlacements.find((item) => {
                    return item === switchIdentifier
                }) != null;
        }
        return false;
    };

    const addConfigFieldFromSelection = (value: ENotePlacement, selection: string, config: GenerateSheetMusicConfig) => {
        switch (selection) {
            case 'snare':
                if (!config.mandatorySnarePlacements.includes(value)) {
                    config.mandatorySnarePlacements.push(value);
                }
                break;
            case 'kick':
                if (!config.mandatoryKickPlacements.includes(value)) {
                    config.mandatoryKickPlacements.push(value);
                }
                break;
            case 'rests':
                if (!config.mandatoryRestPlacements.includes(value)) {
                    config.mandatoryRestPlacements.push(value);
                }
                break;
            case 'accents':
                if (!config.mandatoryAccentPlacements.includes(value)) {
                    config.mandatoryAccentPlacements.push(value);
                }
                break;
        }
    };

    const removeConfigFieldFromSelection = (value: ENotePlacement, selection: string, config: GenerateSheetMusicConfig) => {
        let index = 0;
        switch (selection) {
            case 'snare':
                index = config.mandatorySnarePlacements.findIndex((item) => {
                    return item === value
                });
                config.mandatorySnarePlacements.splice(index, 1);
                break;
            case 'kick':
                index = config.mandatoryKickPlacements.findIndex((item) => {
                    return item === value
                });
                config.mandatoryKickPlacements.splice(index, 1);
                break;
            case 'rests':
                index = config.mandatoryRestPlacements.findIndex((item) => {
                    return item === value
                });
                config.mandatoryRestPlacements.splice(index, 1);
                break;
            case 'accents':
                index = config.mandatoryAccentPlacements.findIndex((item) => {
                    return item === value
                });
                config.mandatoryAccentPlacements.splice(index, 1);
                break;
        }
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                marginTop: '50px',
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
                display: 'flex',
                marginTop: '50px',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            paper: {
                position: 'absolute',
                width: 600,
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
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
        }),
    );
    const classes = useStyles();

    const selectionChange = (event: any) => {
        setSelection(event.target.value);
    };

    const handleChange = (event: any) => {
        const notePlacement: ENotePlacement = parseInt(ENotePlacement[event.target.name]);
        if (event.target.checked) {
            addConfigFieldFromSelection(notePlacement, selection, config);
        } else {
            removeConfigFieldFromSelection(notePlacement, selection, config);
        }

        let newConfig = {...config, header: config.header};
        setConfig(newConfig);
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

    const handleDescriptionClick = (event: any) => {
        setDescriptionOpen(true);
    };

    const handleDescriptionClose = (event: any) => {
        setDescriptionOpen(false);
    };

    return (
        <div>
            <Card className={classes.cardRoot}>
                <CardHeader title={title}/>
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Hit Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selection}
                            onChange={selectionChange}

                        >
                            <MenuItem value={'snare'}>Snare</MenuItem>
                            <MenuItem value={'kick'}>Kick</MenuItem>
                            <MenuItem value={'rests'}>Rests</MenuItem>
                            <MenuItem value={'accents'}>Accents</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"/>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.one, config)}
                                    onChange={handleChange} name="one"/>}
                                label="1"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.oneE, config)}
                                    onChange={handleChange} name="oneE"/>}
                                label="1E"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.oneAnd, config)}
                                    onChange={handleChange} name="oneAnd"/>}
                                label="1&"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.oneA, config)}
                                    onChange={handleChange} name="oneA"/>}
                                label="1A"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"/>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.two, config)}
                                    onChange={handleChange} name="two"/>}
                                label="2"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.twoE, config)}
                                    onChange={handleChange} name="twoE"/>}
                                label="2E"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.twoAnd, config)}
                                    onChange={handleChange} name="twoAnd"/>}
                                label="2&"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.twoA, config)}
                                    onChange={handleChange} name="twoA"/>}
                                label="2A"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"/>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.three, config)}
                                    onChange={handleChange} name="three"/>}
                                label="3"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.threeE, config)}
                                    onChange={handleChange} name="threeE"/>}
                                label="3E"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.threeAnd, config)}
                                    onChange={handleChange} name="threeAnd"/>}
                                label="3&"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.threeA, config)}
                                    onChange={handleChange} name="threeA"/>}
                                label="3A"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"/>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.four, config)}
                                    onChange={handleChange} name="four"/>}
                                label="4"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.fourE, config)}
                                    onChange={handleChange} name="fourE"/>}
                                label="4E"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.fourAnd, config)}
                                    onChange={handleChange} name="fourAnd"/>}
                                label="4&"
                            />
                            <FormControlLabel
                                control={<Switch
                                    checked={getConfigFieldFromSelection(selection, ENotePlacement.fourA, config)}
                                    onChange={handleChange} name="fourA"/>}
                                label="4A"
                            />
                        </FormGroup>
                    </FormControl>
                </CardContent>
            </Card>
            <div>
                <button onClick={handleDescriptionClick}>Help</button>
                <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
                    <div style={modalStyle} className={classes.paper}>
                        <h2>Hit Placement Description</h2>
                        <p>{description}</p>
                        <h2>Musical Notation Help</h2>
                        <p>{help}</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
