//Drum Linearity relates to multiple drums being struck at the same time
//None allows any number of simultaneous instrument hits
//Hands allows for only one hand (currently hiHat and snare) to be hit at a time, with no limits on feet (kick)
//Full allows for only one instrument of any kind to be hit at a time
enum ELinearity {
    None,
    Hands,
    Full
}

export default ELinearity