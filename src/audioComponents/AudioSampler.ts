class AudioSampler {

    context: AudioContext;
    buffer: AudioBuffer;
    source: AudioBufferSourceNode;
    gain: GainNode;

    constructor (context: AudioContext, buffer: AudioBuffer) {
        this.context = context;
        this.buffer = buffer;
        this.source = this.context.createBufferSource();
        this.gain = context.createGain();
    }

    setup() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gain);
        this.gain.connect(this.context.destination);
        // this.source.connect(this.context.destination);
    }

    trigger(time: number, gain: number) {
        this.setup();
        this.gain.gain.setValueAtTime(gain, time);
        this.source.start(time);
        this.gain.gain.setValueAtTime(1, time + 0.1);
        this.source.stop(time + 0.2)
    }
}

export default AudioSampler;