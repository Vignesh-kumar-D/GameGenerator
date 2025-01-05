# 🎮 Game Generator: Live JavaScript Game Editor

## 🎯 Overview
Game Generator is an interactive JavaScript game development environment with live preview. Write game code and see it come to life instantly. Perfect for prototyping game ideas or learning game development concepts.

## ✨ Key Features
- Live JavaScript editor using CodeMirror
- Real-time preview with iframe
- Popular game library integrations
- One-click library selection
- Instant code execution
- Clean development interface

## 🛠️ Tech Stack
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![CodeMirror](https://img.shields.io/badge/CodeMirror-D30707?style=for-the-badge&logo=CodeMirror&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

## 🎮 Supported Game Libraries
- P5.js - Creative coding and visualization
- PixiJS - 2D WebGL renderer
- Phaser - Feature-rich 2D game framework

## 🏗️ Architecture
``` mermaid
flowchart TB
    subgraph IDE["Game Generator IDE"]
        Editor["CodeMirror Editor"]
        LibSelect["Library Selector"]
        Preview["Live Preview"]
    end

    subgraph Processing["Code Processing"]
        Parser["Code Parser"]
        Injector["Library Injector"]
        ErrorHandler["Error Handler"]
    end

    subgraph Output["Preview Environment"]
        IFrame["Sandboxed iFrame"]
        Renderer["Game Renderer"]
        Console["Error Console"]
    end

    Editor -->|"Code Changes"| Parser
    LibSelect -->|"Selected Libraries"| Injector
    Parser -->|"Processed Code"| Injector
    Injector -->|"Final Code"| IFrame
    IFrame -->|"Render"| Preview
    IFrame -->|"Errors"| ErrorHandler
    ErrorHandler -->|"Display"| Console

    classDef ide fill:#61DAFB,stroke:#20232a,stroke-width:2px,color:black
    classDef process fill:#FF4081,stroke:#1A1A1A,stroke-width:2px,color:white
    classDef output fill:#4CAF50,stroke:#1A1A1A,stroke-width:2px,color:white

    class IDE ide
    class Processing process
    class Output output
```

## 💡 Features

### Code Editor
- Syntax highlighting
- Auto-completion
- Error detection
- Multiple themes
- Code formatting

### Live Preview
- Real-time rendering
- Error reporting
- Responsive display
- Frame rate monitoring

### Library Integration
- One-click library addition
- Latest CDN versions
- Multiple library support
- Clean initialization

## 🔄 Future Plans
Currently working on an enhanced version:
- Partnership with [The Good Game Theory](https://www.thegoodgametheory.com/)
- No-code game development interface
- Advanced game mechanics
- Visual component system
- Asset management
- Project temporarily parked for future development

## ⚙️ Setup
1. Clone repository
2. Install dependencies
3. Start development server
4. Open browser and start coding

## 📝 How to Use

### Creating a Game
1. Select game libraries
2. Write JavaScript code
3. See live preview
4. Iterate and refine

### Example Game
A simple bouncing ball:
```javascript
// Simple bouncing ball using P5.js
let x = 200;
let y = 200;
let xSpeed = 5;
let ySpeed = 5;
const ballSize = 30;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Draw the ball
  fill(255, 0, 0);
  ellipse(x, y, ballSize, ballSize);
  
  // Move the ball
  x += xSpeed;
  y += ySpeed;
  
  // Check for collisions
  if (x + ballSize/2 > width || x - ballSize/2 < 0) {
    xSpeed *= -1;
  }
  if (y + ballSize/2 > height || y - ballSize/2 < 0) {
    ySpeed *= -1;
  }
}
```

## 🤝 Contributing
1. Fork repository
2. Create feature branch
3. Submit pull request

## 📜 License
[MIT](LICENSE)
