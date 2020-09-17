class AudioSampler {

    context: AudioContext;
    buffer: AudioBuffer;
    source: AudioBufferSourceNode;

    constructor (context: AudioContext, buffer: AudioBuffer) {
        this.context = context;
        this.buffer = buffer;
        this.source = this.context.createBufferSource();

    }

    setup() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
    }

    trigger(time: number) {
        this.setup();
        this.source.start(time);

    }
}

export default AudioSampler;