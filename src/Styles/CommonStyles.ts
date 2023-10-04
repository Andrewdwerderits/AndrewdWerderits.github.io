import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
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
        buttonArray: {
            margin: theme.spacing(0.5),
            minWidth: 50,
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
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

export function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        overflow: 'scroll',
        transform: `translate(-${top}%, -${left}%)`,
    };
}