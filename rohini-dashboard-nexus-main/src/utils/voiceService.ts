export class VoiceService {
  private static speechSynthesis: SpeechSynthesis = window.speechSynthesis;
  private static voice: SpeechSynthesisVoice | null = null;

  static initialize() {
    // Wait for voices to be loaded
    speechSynthesis.addEventListener('voiceschanged', () => {
      const voices = speechSynthesis.getVoices();
      // Try to find a Hindi voice
      this.voice = voices.find(voice => voice.lang.includes('hi')) || voices[0];
    });
  }

  static speak(text: string, lang: 'en' | 'hi' = 'en') {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.voice = this.voice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    this.speechSynthesis.speak(utterance);
  }

  static welcomeMessage() {
    this.speak('Welcome to Zilla Parisad Gramin Vibhag', 'en');
    // Add a slight delay before Hindi message
    setTimeout(() => {
      this.speak('जिल्हा परिषद ग्रामीण विभागामध्ये आपले स्वागत आहे', 'hi');
    }, 2000);
  }

  static speakFieldName(fieldName: string) {
    switch(fieldName.toLowerCase()) {
      case 'daakhle':
        this.speak('दाखले', 'hi');
        break;
      case 'takraar':
        this.speak('तक्रार', 'hi');
        break;
      // Add more cases as needed
      default:
        this.speak(fieldName, 'en');
    }
  }
}
