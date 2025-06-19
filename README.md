# MeTro Type 🚀⌨️

A modern, sleek typing test application inspired by MonkeyType. Test your typing speed and accuracy with a beautiful, responsive interface.

![MeTro Type Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue) ![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow)

## 🌟 Features

### ⏱️ **Multiple Test Modes**
- **Time-based tests**: 15s, 30s, 60s, 120s
- **Word-based tests**: 25, 50, 100 words
- **Real-time switching** between modes

### 📊 **Live Statistics**
- **WPM (Words Per Minute)** calculation
- **Accuracy percentage** tracking
- **Character count** (correct/total)
- **Real-time updates** while typing

### 🎨 **Modern UI/UX**
- **Glassmorphism design** with gradient backgrounds
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Color-coded feedback** (green for correct, red for incorrect)

### ⌨️ **Smart Features**
- **Current word highlighting** with glowing effect
- **Character-by-character feedback**
- **Auto-focus** when typing starts
- **Sliding word container** (fixed size, scrolls through content)
- **"Test Complete" animation** before results

### 🎯 **User Experience**
- **Click anywhere to focus** input
- **Tab key to restart** test anytime
- **Escape key** to close results
- **Results modal** with detailed statistics
- **Clean, distraction-free** interface

## 🚀 Live Demo

**Try it now:** [https://wizis17.github.io/REPOSITORY-NAME/](https://wizis17.github.io/REPOSITORY-NAME/)

## 📱 Screenshots

### Main Interface
```
┌─────────────────────────────────────┐
│           MeTro Type                │
│                                     │
│  [15s] [30s] [60s] [120s]          │
│  [25] [50] [100]                   │
│                                     │
│  WPM: 0    Accuracy: 100%   Time: 60│
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [sunny] typing focus with lazy  │ │
│ │ runs dog attention and dog      │ │
│ │ attention dog improve improve   │ │
│ │ improve flow through typing     │ │
│ └─────────────────────────────────┘ │
│                                     │
│         [Restart Test]              │
└─────────────────────────────────────┘
```

### Results Modal
```
┌─────────────────────────────────────┐
│        Test Complete! 😁😎          │
│                                     │
│ ┌─────┐ ┌─────────┐ ┌─────────────┐ │
│ │ WPM │ │Accuracy │ │ Characters  │ │
│ │ 85  │ │  97%    │ │   142/146   │ │
│ └─────┘ └─────────┘ └─────────────┘ │
│                                     │
│        ┌──────┐                     │
│        │ Time │                     │
│        │ 60s  │                     │
│        └──────┘                     │
│                                     │
│          [Try Again]                │
└─────────────────────────────────────┘
```

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, animations, glassmorphism
- **JavaScript (ES6+)** - Interactive functionality and logic
- **GitHub Pages** - Free hosting and deployment

## 📂 Project Structure

```
metro-type/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── main.js             # Typing test logic and functionality
└── README.md           # Project documentation
```

## 🎯 How It Works

1. **Choose your test mode** - Select time-based or word-count-based test
2. **Start typing** - Test begins automatically when you start typing
3. **Real-time feedback** - See your progress with live WPM and accuracy
4. **Visual indicators** - Current word glows, correct/incorrect characters are color-coded
5. **Complete the test** - Finish when time runs out or all words are typed
6. **View results** - Detailed statistics in a beautiful modal overlay

## 🚀 Getting Started

### Option 1: Use Online
Just visit the live demo link above and start typing!

### Option 2: Run Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/wizis17/REPOSITORY-NAME.git
   ```

2. **Open in browser**
   ```bash
   cd REPOSITORY-NAME
   open index.html
   ```

That's it! No build process or dependencies needed.

## ✨ Key Features in Detail

### Adaptive Word Display
- Container shows ~30-40 words at a time
- Smoothly scrolls through content as you progress
- Previous words fade out, upcoming words stay visible
- Fixed container size regardless of total word count

### Smart Statistics
- **WPM Calculation**: Based on standard 5-characters-per-word metric
- **Live Updates**: Statistics update in real-time as you type
- **Accuracy Tracking**: Character-level accuracy measurement

### Responsive Design
- **Mobile-friendly**: Touch-optimized interface
- **Desktop-optimized**: Full keyboard support
- **Cross-browser**: Works on all modern browsers

## 🎨 Design Philosophy

### Visual Hierarchy
- **Clean, minimal interface** puts focus on typing
- **Gradient backgrounds** create depth without distraction
- **Color coding** provides instant feedback
- **Smooth animations** enhance user experience

### User Experience
- **Zero-friction start**: Just begin typing to start test
- **Immediate feedback**: Real-time visual and statistical feedback
- **Clean completion**: Beautiful results presentation

## 🔧 Customization

Want to modify the app? Here are key areas to customize:

### Word Pool (main.js)
```javascript
this.words = [
    "your", "custom", "words", "here"
    // Add more words to increase variety
];
```

### Colors (style.css)
```css
/* Main gradient */
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);

/* Accent colors */
--primary: #3b82f6;
--success: #10b981;
--error: #ef4444;
```

### Test Modes (main.js)
```javascript
// Add new time modes
data-time="300">5min</button>

// Add new word counts
data-words="200">200</button>
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### Feature Ideas
- [ ] **Dark/Light theme toggle**
- [ ] **Custom word lists** (programming, quotes, etc.)
- [ ] **Difficulty levels** (easy, medium, hard words)
- [ ] **Typing history** and progress tracking
- [ ] **Sound effects** for keystrokes
- [ ] **Multiplayer mode** for competitive typing
- [ ] **Export results** as image or PDF

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📊 Performance

- **Lightweight**: < 50KB total size
- **Fast loading**: Optimized CSS and JavaScript
- **Smooth animations**: 60fps performance
- **Memory efficient**: Minimal DOM manipulation

## 🐛 Known Issues

- None currently! Please report any bugs you find.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**wizis17** - [GitHub Profile](https://github.com/wizis17)

## 🙏 Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com/)
- Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- Hosted on [GitHub Pages](https://pages.github.com/)

## 📈 Future Updates

- **Version 2.0**: Theme customization
- **Version 2.1**: More word lists and languages
- **Version 2.2**: User accounts and progress tracking

---

**Made with ❤️ and lots of ⌨️ by wizis17**

*Happy typing! 🚀*