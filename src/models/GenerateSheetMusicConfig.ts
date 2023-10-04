import EStickingStyle from '../Enums/EStickingStyle';
import EHiHatPreset from "../Enums/EHiHatPreset";
import EKickPreset from "../Enums/EKickPreset";
import ESnarePreset from "../Enums/ESnarePreset";
import EDensity from "../Enums/EDensity";

class GenerateSheetMusicConfig {
    //Meter config
    eighthTriplets: EDensity;
    sixteenthTriplets: EDensity;
    eighthNotes: EDensity;
    sixteenthNotes: EDensity;
    
    accentDensity: EDensity;
    stickingStyle: EStickingStyle;
    
    //TODO: Add more instruments here
    hiHatPreset: EHiHatPreset;
    hiHatDensity: EDensity;
    
    kickPreset: EKickPreset;
    kickDensity: EDensity;
    
    snarePreset: ESnarePreset;
    snareDensity: EDensity;

    constructor(eighthTriplets: EDensity = EDensity.None,
                sixteenthTriplets: EDensity = EDensity.Medium,
                eighthNotes: EDensity = EDensity.Medium,
                sixteenthNotes: EDensity = EDensity.Medium,
                hiHatPreset: EHiHatPreset = EHiHatPreset.EighthNotes,
                hiHatDensity: EDensity = EDensity.VeryHigh,
                kickPreset: EKickPreset = EKickPreset.QuarterNotes,
                kickDensity: EDensity = EDensity.Medium,
                snarePreset: ESnarePreset = ESnarePreset.BackBeat,
                snareDensity: EDensity = EDensity.Low,
                stickingStyle: EStickingStyle = EStickingStyle.None,
                accentDensity: EDensity = EDensity.None) {
        
        this.eighthTriplets = eighthTriplets;
        this.sixteenthTriplets = sixteenthTriplets;
        this.eighthNotes = eighthNotes;
        this.sixteenthNotes = sixteenthNotes;
        this.hiHatPreset = hiHatPreset;
        this.hiHatDensity = hiHatDensity;
        this.kickPreset = kickPreset;
        this.kickDensity = kickDensity;
        this.snarePreset = snarePreset;
        this.snareDensity = snareDensity;
        this.stickingStyle = stickingStyle;
        this.accentDensity = accentDensity;
    }
}

export default GenerateSheetMusicConfig;