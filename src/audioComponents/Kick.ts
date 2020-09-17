class Kick {
    
    context: AudioContext;
    oscillator: OscillatorNode;
    gain: GainNode;
    
    constructor (context: AudioContext) {
        this.context = context;
        this.oscillator = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);
    }
    
    setup() {
        this.oscillator = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);
    }
    
    trigger(time: number) {
        this.setup();

        this.oscillator.frequency.setValueAtTime(80, time);
        this.gain.gain.setValueAtTime(2, time);
        this.gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        this.oscillator.start(time);
        this.oscillator.stop(time + 0.5);
    }
}

export default Kick;