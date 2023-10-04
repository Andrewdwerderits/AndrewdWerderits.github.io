## Where does this website exist?
You can visit this website at: https://andrewdwerderits.github.io/

## What is this website, and what does it do?
This is a website to generate random drum patterns using Typescript. The intended user is a bored drummer with a basic knowledge of music notation. The patterns are written out in musical notation, with a playback option. Be warned, you can generate some rhythms complex enough that they may sound out of time, but they aren't. For now all rhythms are created in 4/4 time with a basic 8th note pulse. It uses local storage to save your exercises and settings for the next time you visit the page.

Drum patterns are generated according to user specified settings.
There are two categories of settings: Instrument Settings and Subdivision Settings.
Instrument settings control Instrument placements within the generated Measure.
Subdivision settings control the rhythmic structure of the generated Measure.
All Instruments and Subdivisions have a Density. This specifies how often they will occur in the generated pattern.
Instruments also have a Preset. This ensures some specific note placements in the generated pattern. All Presets are commonly occuring patterns in drum rhythms. They can help add a little structure to an otherwise random pattern.

Density values represent the following percentage ranges:
        None: 0%,
        Low: 1-25%, 
        Medium: 26-50%, 
        High: 51-99%,
        Very High: 100%`,
The number of available positions for Instruments will depend on the Subdivisions generated (i.e. a measure of 16th notes will have 16 available positions for an instrument, and a measure of 8th notes will have 8 available positions).

Multiple Instruments may appear at the same position. These are simultaneous hits and are common in drum beats.
The number of available positions for Subdivisions will always be 8, because we are working in 4/4 time with an 8th note pulse.
Multiple Subdivisions may not appear at the same position. This would create complex poly rhythms this application does not support.
If Subdivision Densities are set too high, (the sum of the densities is greater than 100%) the Densities used will be selected randomly each time a Measure is generated.
If your Density would add more notes than your Preset, place the notes in the Preset and add extra notes randomly. 
If your Density would add fewer notes than your Preset, place the notes in the Preset and add no additional notes.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
