class Snare {

    context: AudioContext;
    oscillator: OscillatorNode;
    noiseGain: GainNode;
    noise: AudioBufferSourceNode;
    oscillatorGain: GainNode;

    constructor (context: AudioContext) {
        this.context = context;
        this.oscillator = this.context.createOscillator();
        this.noiseGain = this.context.createGain();
        this.noise = this.context.createBufferSource();
        this.oscillatorGain = this.context.createGain();
    }

    setup() {
        this.noise = this.context.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
        const noiseFilter = this.context.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        this.noise.connect(noiseFilter);
        
        this.noiseGain = this.context.createGain();
        noiseFilter.connect(this.noiseGain);
        this.noiseGain.connect(this.context.destination);
        
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = 'triangle';
        this.oscillatorGain = this.context.createGain();
        this.oscillator.connect(this.oscillatorGain);
        this.oscillatorGain.connect(this.context.destination);
    }
    
    noiseBuffer() {
        const bufferSize = this.context.sampleRate;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i > bufferSize; i++) {
            output[i] = Math.random() * 2 - 1
        }
        return buffer;
    }

    trigger(time: number) {
        this.setup();

        this.noiseGain.gain.setValueAtTime(1, time);
        this.noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
        this.noise.start(time);
        
        this.oscillator.frequency.setValueAtTime(100, time);
        this.oscillatorGain.gain.setValueAtTime(0.7, time);
        this.oscillatorGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        
        this.oscillator.start(time);
        this.oscillator.stop(time + 0.2);
        this.noise.stop(time + 0.2);
    }
}

export default Snare;