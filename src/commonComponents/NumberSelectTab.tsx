import {
    Card,
    CardContent,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Select, Switch, CardHeader
} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import GenerateSheetMusicConfig from "../models/GenerateSheetMusicConfig";
import Modal from "@material-ui/core/Modal";

interface RadioButtonArrayTabProps {
    config: GenerateSheetMusicConfig;
    setConfig: (arg: GenerateSheetMusicConfig) => void;
    selection: string;
    setSelection: (arg: string) => void;
    mode: string;
    description: string,
    title: string,
}

export default function NumberSelectTab(props: RadioButtonArrayTabProps) {

    const {config, setConfig, selection, setSelection, mode, description, title} = props;
    const [modalStyle] = React.useState(getModalStyle);
    const [descriptionOpen, setDescriptionOpen] = React.useState(false);

    const getConfigFieldFromSelection = (selection: string, mode: string, config: GenerateSheetMusicConfig) => {
        switch (selection) {
            case 'snare':
                return mode === 'consecutive' ? config.maxConsecutiveSnares : config.snareNoteCount;
            case 'kick':
                return mode === 'consecutive' ? config.maxConsecutiveKicks : config.kickNoteCount;
            case 'rests':
                return mode === 'consecutive' ? config.maxConsecutiveRests : config.restNoteCount;
            case 'accents':
                return mode === 'consecutive' ? config.maxConsecutiveAccents : config.accentNoteCount;
            case 'right':
                return config.maxConsecutiveRightHandStickings;
            case 'left':
                return config.maxConsecutiveLeftHandStickings;
            default:
                return mode === 'consecutive' ? 16 : 0;
        }
    };

    const setConfigFieldFromSelection = (value: number, selection: string, mode: string, config: GenerateSheetMusicConfig) => {
        switch (selection) {
            case 'snare':
                mode === 'consecutive' ? config.maxConsecutiveSnares = value : config.snareNoteCount = value;
                break;
            case 'kick':
                mode === 'consecutive' ? config.maxConsecutiveKicks = value : config.kickNoteCount = value;
                break;
            case 'rests':
                mode === 'consecutive' ? config.maxConsecutiveRests = value : config.restNoteCount = value;
                break;
            case 'accents':
                mode === 'consecutive' ? config.maxConsecutiveAccents = value : config.accentNoteCount = value;
                break;
            case 'right':
                config.maxConsecutiveRightHandStickings = value;
                break;
            case 'left':
                config.maxConsecutiveLeftHandStickings = value;
                break;
        }
    };
    
    const value = getConfigFieldFromSelection(selection, mode, config);

    const onChange = (event: any) => {
        setConfigFieldFromSelection(event.target.value, selection, mode, config);
        let newConfig = {...config, header: config.header};
        setConfig(newConfig);
    };

    const hitSelectionChange = (event: any) => {
        setSelection(event.target.value);
    };

    const handleCheckbox = (event: any) => {
        switch (selection) {
            case 'snare':
                config.snareNoteCountEnabled = event.target.checked;
                break;
            case 'kick':
                config.kickNoteCountEnabled = event.target.checked;
                break;
            case 'accents':
                config.accentNoteCountEnabled = event.target.checked;
                break;
            case 'rests':
                config.restNoteCountEnabled = event.target.checked;
                break;
        }

        let newConfig = {...config, header: config.header};
        setConfig(newConfig);
    };
    
    let checked = false;
    switch (selection) {
        case 'snare':
            checked = config.snareNoteCountEnabled;
            break;
        case 'kick':
            checked = config.kickNoteCountEnabled;
            break;
        case 'accents':
            checked = config.accentNoteCountEnabled;
            break;
        case 'rests':
            checked = config.restNoteCountEnabled;
            break;
    }

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
            input: {
                width: 42,
                height: 42,
            },
        }),
    );
    const classes = useStyles();

    const handleHitNumberChange = (event: any) => {
        onChange(event);
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
                        onChange={hitSelectionChange}
                    >
                        <MenuItem value={'snare'}>Snare</MenuItem>
                        <MenuItem value={'kick'}>Kick</MenuItem>
                        <MenuItem value={'rests'}>Rests</MenuItem>
                        <MenuItem value={'accents'}>Accents</MenuItem>
                        {mode === 'consecutive' &&
                        <MenuItem value={'right'}>Right Hand Sticking</MenuItem>}
                        {mode === 'consecutive' &&
                        <MenuItem value={'left'}>Left Hand Sticking</MenuItem>}
                    </Select>
                    {mode !== 'consecutive' &&
                    <FormControlLabel label="Enable"
                                      control={<Switch checked={checked} onChange={handleCheckbox} name="enable"/>}/>}
                </FormControl>
                <FormControl component="fieldset">
                    {mode === 'consecutive' &&
                    <FormLabel component="legend">Maximum Number of Consecutive Notes Allowed</FormLabel>}
                    {mode !== 'consecutive' &&
                    <FormLabel component="legend">Exact Number of Notes Allowed</FormLabel>}
                    <Select
                        labelId="hit-select"
                        id="hit-select"
                        value={value}
                        onChange={handleHitNumberChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
            <div>
                <button onClick={handleDescriptionClick}>Help</button>
                <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
                    <div style={modalStyle} className={classes.paper}>
                        <h2>{mode === 'consecutive'? `Maximum Consecutive Hit Description` : `Exact Note Number Description`}</h2>
                        <p>{description}</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
}