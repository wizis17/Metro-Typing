class TypingTest {
    constructor() {
        this.words = [
            "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and", "runs",
            "fast", "through", "trees", "with", "grace", "sunny", "day", "typing", "words",
            "like", "machine", "keyboard", "speed", "focus", "practice", "skill", "improve",
            "challenge", "test", "performance", "accuracy", "precision", "rhythm", "flow",
            "concentrate", "attention", "mindful", "steady", "consistent", "progress"
        ];
        
        this.currentWords = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timeLimit = 60;
        this.wordCount = 25;
        this.mode = 'time'; // 'time' or 'words'
        this.timer = null;
        this.timeLeft = this.timeLimit;
        this.isStarted = false;
        this.isFinished = false;
        
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalChars = 0;
        
        this.initializeElements();
        this.setupEventListeners();
        this.generateWords();
        this.updateDisplay();
    }

    initializeElements() {
        this.wordDisplay = document.getElementById('wordDisplay');
        this.textInput = document.getElementById('textInput');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timerDisplay = document.getElementById('timer');
        this.restartBtn = document.getElementById('restartBtn');
        this.restartFromResults = document.getElementById('restartFromResults');
        this.results = document.getElementById('result'); // Changed to 'result' to match HTML
        this.mainContent = document.getElementById('mainContent');
    }

    setupEventListeners() {
        this.textInput.addEventListener('input', (e) => this.handleInput(e));
        this.textInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.restartBtn.addEventListener('click', () => this.restart());
        this.restartFromResults.addEventListener('click', () => this.restart());
        
        // Config buttons
        document.querySelectorAll('[data-time]').forEach(btn => {
            btn.addEventListener('click', (e) => this.setTimeMode(parseInt(e.target.dataset.time)));
        });
        
        document.querySelectorAll('[data-words]').forEach(btn => {
            btn.addEventListener('click', (e) => this.setWordsMode(parseInt(e.target.dataset.words)));
        });

        // Focus input when clicking on word display
        this.wordDisplay.addEventListener('click', () => {
            this.textInput.focus();
        });

        // Auto-focus
        document.addEventListener('keydown', (e) => {
            if (!this.isFinished && e.key.length === 1) {
                this.textInput.focus();
            }
        });

        // Close results with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFinished) {
                this.restart();
            }
        });
    }

    setTimeMode(time) {
        this.timeLimit = time;
        this.mode = 'time';
        this.timeLeft = time;
        this.updateConfigButtons();
        this.restart();
    }

    setWordsMode(words) {
        this.wordCount = words;
        this.mode = 'words';
        this.updateConfigButtons();
        this.restart();
    }

    updateConfigButtons() {
        document.querySelectorAll('.config-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (this.mode === 'time') {
            document.querySelector(`[data-time="${this.timeLimit}"]`).classList.add('active');
        } else {
            document.querySelector(`[data-words="${this.wordCount}"]`).classList.add('active');
        }
    }

    generateWords() {
        // Always generate exactly what we need based on mode
        const count = this.mode === 'words' ? this.wordCount : 100;
        this.currentWords = [];
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            this.currentWords.push(this.words[randomIndex]);
        }
    }

    updateDisplay() {
        this.wordDisplay.innerHTML = '';
        
        // Always show only about 30-40 words that fit in the container
        const wordsPerLine = Math.floor(this.wordDisplay.offsetWidth / 100) || 8; // Estimate words per line
        const maxVisibleWords = wordsPerLine * 4; // About 4 lines worth
        
        // Calculate which words to show (sliding window)
        let startIndex = Math.max(0, this.currentWordIndex - Math.floor(maxVisibleWords / 3));
        let endIndex = Math.min(this.currentWords.length, startIndex + maxVisibleWords);
        
        // Adjust if we're near the end
        if (endIndex - startIndex < maxVisibleWords && startIndex > 0) {
            startIndex = Math.max(0, endIndex - maxVisibleWords);
        }
        
        for (let wordIndex = startIndex; wordIndex < endIndex; wordIndex++) {
            const word = this.currentWords[wordIndex];
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.dataset.index = wordIndex;
            
            if (wordIndex === this.currentWordIndex) {
                wordElement.classList.add('current');
            } else if (wordIndex < this.currentWordIndex) {
                wordElement.classList.add('completed');
            }
            
            word.split('').forEach((char, charIndex) => {
                const charElement = document.createElement('span');
                charElement.className = 'char';
                charElement.textContent = char;
                
                if (wordIndex === this.currentWordIndex && charIndex === this.currentCharIndex) {
                    charElement.classList.add('current');
                }
                
                wordElement.appendChild(charElement);
            });
            
            this.wordDisplay.appendChild(wordElement);
        }
    }

    handleInput(e) {
        if (this.isFinished) return;
        
        if (!this.isStarted) {
            this.start();
        }

        const inputValue = e.target.value;
        const currentWord = this.currentWords[this.currentWordIndex];
        
        if (inputValue.includes(' ')) {
            // Word completed
            const typedWord = inputValue.trim();
            this.checkWord(typedWord, currentWord);
            this.nextWord();
            e.target.value = '';
        } else {
            // Update character-by-character
            this.updateCurrentWord(inputValue, currentWord);
        }
        
        this.updateStats();
    }

    handleKeydown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            this.restart();
        }
    }

    checkWord(typedWord, correctWord) {
        const currentWordElement = this.wordDisplay.querySelector(`[data-index="${this.currentWordIndex}"]`);
        if (!currentWordElement) return;
        
        const chars = currentWordElement.querySelectorAll('.char');
        
        for (let i = 0; i < Math.max(typedWord.length, correctWord.length); i++) {
            const typedChar = typedWord[i] || '';
            const correctChar = correctWord[i] || '';
            
            if (i < chars.length) {
                if (typedChar === correctChar) {
                    chars[i].classList.add('correct');
                    this.correctChars++;
                } else {
                    chars[i].classList.add('incorrect');
                    this.incorrectChars++;
                }
            }
            this.totalChars++;
        }
    }

    updateCurrentWord(inputValue, currentWord) {
        const currentWordElement = this.wordDisplay.querySelector(`[data-index="${this.currentWordIndex}"]`);
        if (!currentWordElement) return;
        
        const chars = currentWordElement.querySelectorAll('.char');
        
        chars.forEach((char, index) => {
            char.classList.remove('correct', 'incorrect', 'current');
            
            if (index < inputValue.length) {
                if (inputValue[index] === currentWord[index]) {
                    char.classList.add('correct');
                } else {
                    char.classList.add('incorrect');
                }
            } else if (index === inputValue.length) {
                char.classList.add('current');
            }
        });
        
        this.currentCharIndex = inputValue.length;
    }

    nextWord() {
        this.currentWordIndex++;
        this.currentCharIndex = 0;
        
        if (this.mode === 'words' && this.currentWordIndex >= this.wordCount) {
            this.finish();
            return;
        }
        
        // For time mode, generate more words if needed
        if (this.mode === 'time' && this.currentWordIndex >= this.currentWords.length - 10) {
            const additionalWords = [];
            for (let i = 0; i < 30; i++) {
                const randomIndex = Math.floor(Math.random() * this.words.length);
                additionalWords.push(this.words[randomIndex]);
            }
            this.currentWords.push(...additionalWords);
        }
        
        this.updateDisplay();
    }

    start() {
        this.isStarted = true;
        this.startTime = Date.now();
        
        if (this.mode === 'time') {
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.timerDisplay.textContent = this.timeLeft;
                
                if (this.timeLeft <= 0) {
                    this.finish();
                }
            }, 1000);
        }
    }

    finish() {
        this.isFinished = true;
        this.endTime = Date.now();
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Show "Test Complete!" message
        this.showFinishMessage();
        
        // Wait 3 seconds before showing results (longer delay)
        setTimeout(() => {
            this.showResults();
        }, 3000);
    }

    showFinishMessage() {
        // Create and show temporary finish message
        const finishMessage = document.createElement('div');
        finishMessage.className = 'test-finished';
        finishMessage.textContent = 'Test Complete! ✨';
        this.wordDisplay.appendChild(finishMessage);
        
        // Remove the message after 3 seconds (same as delay)
        setTimeout(() => {
            if (finishMessage.parentNode) {
                finishMessage.parentNode.removeChild(finishMessage);
            }
        }, 3000);
    }

    updateStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.correctChars / 5; // Standard: 5 chars = 1 word
        const wpm = Math.round(wordsTyped / timeElapsed) || 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        
        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy + '%';
    }

    showResults() {
        const timeElapsed = this.endTime - this.startTime;
        const minutes = timeElapsed / 1000 / 60;
        const wpm = Math.round((this.correctChars / 5) / minutes) || 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        
        document.getElementById('finalWPM').textContent = wpm;
        document.getElementById('finalAccuracy').textContent = accuracy + '%';
        document.getElementById('finalChars').textContent = `${this.correctChars}/${this.totalChars}`;
        document.getElementById('finalTime').textContent = Math.round(timeElapsed / 1000) + 's';
        
        // Show results immediately
        this.mainContent.classList.add('hidden');
        this.results.classList.add('show');
        
        console.log('Results should be showing now'); // Debug line
    }

    restart() {
        // Reset all state
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = this.timeLimit;
        this.isStarted = false;
        this.isFinished = false;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalChars = 0;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Reset display
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100%';
        this.timerDisplay.textContent = this.mode === 'time' ? this.timeLimit.toString() : '--';
        this.textInput.value = '';
        
        // Ensure results are completely hidden and main content is visible
        this.results.classList.remove('show');
        this.mainContent.classList.remove('hidden');
        
        // Generate new words and update display
        this.generateWords();
        this.updateDisplay();
        
        // Focus input
        setTimeout(() => {
            this.textInput.focus();
        }, 100);
    }
}

// Initialize the typing test
const typingTest = new TypingTest();