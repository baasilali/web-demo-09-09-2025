'use client';

import { useEffect, useState, useRef } from 'react';

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'prompt';
  content: string;
  delay?: number;
}

const terminalCommands: TerminalLine[] = [
  { id: 1, type: 'prompt', content: '$ ', delay: 500 },
  { id: 2, type: 'command', content: 'elide --version', delay: 1500 },
  { id: 3, type: 'output', content: 'Elide Runtime v1.0.8', delay: 800 },
  { id: 4, type: 'output', content: '', delay: 300 },
  
  { id: 5, type: 'prompt', content: '$ ', delay: 500 },
  { id: 6, type: 'command', content: 'elide run hello.py', delay: 1200 },
  { id: 7, type: 'output', content: 'Loading Python runtime...', delay: 600 },
  { id: 8, type: 'output', content: 'Hello from Python! 🐍', delay: 400 },
  { id: 9, type: 'output', content: '', delay: 300 },
  
  { id: 10, type: 'prompt', content: '$ ', delay: 500 },
  { id: 11, type: 'command', content: 'elide run app.js', delay: 1000 },
  { id: 12, type: 'output', content: 'Loading JavaScript runtime...', delay: 600 },
  { id: 13, type: 'output', content: 'Hello from Node.js! ⚡', delay: 400 },
  { id: 14, type: 'output', content: '', delay: 300 },
  
  { id: 15, type: 'prompt', content: '$ ', delay: 500 },
  { id: 16, type: 'command', content: 'elide run server.rb', delay: 1100 },
  { id: 17, type: 'output', content: 'Loading Ruby runtime...', delay: 600 },
  { id: 18, type: 'output', content: 'Hello from Ruby! 💎', delay: 400 },
  { id: 19, type: 'output', content: '', delay: 300 },
  
  { id: 20, type: 'prompt', content: '$ ', delay: 500 },
  { id: 21, type: 'command', content: 'elide polyglot --mix', delay: 1300 },
  { id: 22, type: 'output', content: 'Initializing polyglot environment...', delay: 700 },
  { id: 23, type: 'output', content: 'Python ✓  JavaScript ✓  Ruby ✓  Java ✓', delay: 500 },
  { id: 24, type: 'output', content: 'All languages ready! 🚀', delay: 400 },
  { id: 25, type: 'output', content: '', delay: 300 },
  
  { id: 26, type: 'prompt', content: '$ ', delay: 500 },
  { id: 27, type: 'command', content: '', delay: 0 }, // Blinking cursor
];

export default function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex >= terminalCommands.length) {
      // Animation complete, restart after delay
      const restartTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsTyping(false);
      }, 3000);
      return () => clearTimeout(restartTimer);
    }

    const currentLine = terminalCommands[currentLineIndex];
    
    if (!isTyping && currentCharIndex === 0) {
      // Start typing after delay
      const startTimer = setTimeout(() => {
        setIsTyping(true);
      }, currentLine.delay || 100);
      return () => clearTimeout(startTimer);
    }

    if (isTyping && currentCharIndex < currentLine.content.length) {
      // Type next character
      const typingSpeed = currentLine.type === 'command' ? 80 : 30;
      const typeTimer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(typeTimer);
    }

    if (currentCharIndex >= currentLine.content.length) {
      // Line complete, move to next
      const completeTimer = setTimeout(() => {
        setDisplayedLines(prev => [
          ...prev,
          {
            ...currentLine,
            content: currentLine.content.slice(0, currentCharIndex)
          }
        ]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setIsTyping(false);
      }, 100);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLineIndex, currentCharIndex, isTyping]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentCharIndex]);

  const getCurrentLineContent = () => {
    if (currentLineIndex >= terminalCommands.length) return '';
    const currentLine = terminalCommands[currentLineIndex];
    return currentLine.content.slice(0, currentCharIndex);
  };

  const getLineClassName = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-green-400';
      case 'output':
        return 'text-gray-300';
      case 'prompt':
        return 'text-blue-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 font-mono text-sm max-w-2xl w-full shadow-2xl border border-white/10">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs ml-4">
          bash — elide-demo — 80×24
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {displayedLines.map((line) => (
          <div key={line.id} className="flex">
            <span className={getLineClassName(line.type)}>
              {line.content}
            </span>
          </div>
        ))}
        
        {/* Current typing line */}
        {currentLineIndex < terminalCommands.length && (
          <div className="flex">
            <span className={getLineClassName(terminalCommands[currentLineIndex].type)}>
              {getCurrentLineContent()}
              {(isTyping || currentCharIndex > 0) && showCursor && (
                <span className="bg-gray-300 text-gray-900 ml-0.5">▌</span>
              )}
              {!isTyping && currentCharIndex === 0 && showCursor && terminalCommands[currentLineIndex].type === 'prompt' && (
                <span className="bg-gray-300 text-gray-900">▌</span>
              )}
            </span>
          </div>
        )}
        
        {/* Final cursor for last line */}
        {currentLineIndex >= terminalCommands.length - 1 && showCursor && (
          <div className="flex">
            <span className="text-blue-400">
              $ <span className="bg-gray-300 text-gray-900">▌</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}