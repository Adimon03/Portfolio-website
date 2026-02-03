// Sound effect utility for playing audio feedback

export const playSendSound = () => {
  try {
    // Create an AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Messenger notification sound - characteristic "pop" with two tones
    const playTone = (frequency, startTime, duration, volume) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      
      // Quick attack and decay for "pop" effect
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    
    // First tone - lower (like Messenger's first "pop")
    playTone(600, now, 0.08, 0.3);
    
    // Second tone - higher (like Messenger's second "pop")
    playTone(900, now + 0.05, 0.08, 0.25);
    
  } catch (error) {
    console.log('Audio playback not supported or failed:', error);
  }
};

export const playErrorSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Error sound - lower frequency
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
    
  } catch (error) {
    console.log('Audio playback not supported or failed:', error);
  }
};