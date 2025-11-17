import React, { useState, useEffect, useRef } from 'react';

const WORD_LISTS = {
  english: [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
    'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
    'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
    'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
    'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make',
    'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into',
    'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
    'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after',
    'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new',
    'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'world', 'still'
  ],
  russian: [
    'и', 'в', 'не', 'на', 'я', 'быть', 'он', 'с', 'что', 'а',
    'это', 'весь', 'она', 'так', 'его', 'но', 'да', 'ты', 'к', 'у',
    'же', 'вы', 'за', 'бы', 'по', 'только', 'её', 'мне', 'было', 'вот',
    'от', 'меня', 'ещё', 'нет', 'о', 'из', 'ему', 'теперь', 'когда', 'даже',
    'ну', 'вдруг', 'ли', 'если', 'уже', 'или', 'ни', 'быть', 'был', 'него',
    'до', 'вас', 'нибудь', 'опять', 'уж', 'вам', 'ведь', 'там', 'потом', 'себя',
    'ничего', 'её', 'может', 'они', 'тут', 'где', 'есть', 'надо', 'ней', 'для',
    'мы', 'тебя', 'их', 'чем', 'была', 'сам', 'чтоб', 'без', 'будто', 'чего',
    'раз', 'тоже', 'себе', 'под', 'будет', 'ж', 'тогда', 'кто', 'этот', 'того',
    'потому', 'этого', 'какой', 'совсем', 'ним', 'здесь', 'этом', 'один', 'почти', 'мой'
  ],
  uzbek: [
    'va', 'bu', 'bir', 'uchun', 'bilan', 'hamma', 'kerak', 'yaxshi', 'katta', 'yangi',
    'eski', 'qilish', 'olish', 'berish', 'kelish', 'borish', 'ko\'rish', 'bilish', 'turish', 'yurish',
    'uy', 'ish', 'kun', 'vaqt', 'odam', 'bola', 'qiz', 'ota', 'ona', 'aka',
    'opa', 'yil', 'oy', 'hafta', 'soat', 'daqiqa', 'non', 'suv', 'choy', 'osh',
    'kitob', 'maktab', 'sinf', 'dars', 'talaba', 'ustoz', 'do\'st', 'oila', 'shahar', 'qishloq',
    'yo\'l', 'ko\'cha', 'xona', 'stol', 'stul', 'qalam', 'daftar', 'sumka', 'telefon', 'kompyuter',
    'kiyim', 'oyoq', 'bosh', 'ko\'z', 'quloq', 'og\'iz', 'til', 'qo\'l', 'barmoq', 'yurak',
    'salom', 'xayr', 'rahmat', 'iltimos', 'kechirasiz', 'yomon', 'kichik', 'ko\'p', 'oz', 'hech',
    'kam', 'issiq', 'sovuq', 'tez', 'sekin', 'baland', 'past', 'qisqa', 'narsa', 'joy',
    'uzun', 'keng', 'tor', 'och', 'to\'q', 'shirin', 'achchiq', 'nordon', 'pishgan', 'qattiq',
    'rang', 'oq', 'qora', 'qizil', 'ko\'k', 'sariq', 'yashil', 'kulrang', 'pushti', 'jigarrang',
    'olma', 'nok', 'uzum', 'anor', 'shaftoli', 'olcha', 'gilos', 'qovun', 'tarvuz', 'sabzi'
  ]
};

const TRANSLATIONS = {
  english: {
    title: 'TypeUp',
    subtitle: 'Improve your typing skills',
    startTyping: 'start typing...',
    time: 'time',
    words: 'words',
    speed: 'Speed',
    accuracy: 'Accuracy',
    correct: 'correct',
    characters: 'Characters',
    result: 'Result',
    testCompleted: 'Test completed',
    tryAgain: 'Try Again',
    wpm: 'wpm',
    excellent: 'Excellent!',
    good: 'Good!',
    keepGoing: 'Keep going!',
    excellentMsg: 'You type at a professional level!',
    goodMsg: 'Good result! Keep practicing.',
    keepGoingMsg: 'Keep practicing, you\'ll improve!',
    restart: 'restart',
    customTime: 'Custom time (seconds)'
  },
  russian: {
    title: 'TypeUp',
    subtitle: 'Улучшите навыки печати',
    startTyping: 'начните печатать...',
    time: 'время',
    words: 'слов',
    speed: 'Скорость',
    accuracy: 'Точность',
    correct: 'верно',
    characters: 'Символы',
    result: 'Результат',
    testCompleted: 'Тест завершён',
    tryAgain: 'Попробовать снова',
    wpm: 'сл/мин',
    excellent: 'Отлично!',
    good: 'Хорошо!',
    keepGoing: 'Продолжайте!',
    excellentMsg: 'Вы печатаете на профессиональном уровне!',
    goodMsg: 'Хороший результат! Продолжайте практиковаться.',
    keepGoingMsg: 'Продолжайте практиковаться, вы улучшитесь!',
    restart: 'заново',
    customTime: 'Своё время (секунды)'
  },
  uzbek: {
    title: 'TypeUp',
    subtitle: 'Klaviatura ko\'nikmalaringizni oshiring',
    startTyping: 'yozishni boshlang...',
    time: 'vaqt',
    words: 'so\'z',
    speed: 'Tezlik',
    accuracy: 'Aniqlik',
    correct: 'to\'g\'ri',
    characters: 'Belgilar',
    result: 'Natija',
    testCompleted: 'Test yakunlandi',
    tryAgain: 'Qaytadan urinish',
    wpm: 'so\'z/daq',
    excellent: 'Ajoyib!',
    good: 'Yaxshi!',
    keepGoing: 'Davom!',
    excellentMsg: 'Siz professional darajada yozasiz!',
    goodMsg: 'Yaxshi natija! Yana mashq qiling.',
    keepGoingMsg: 'Mashq qilishda davom eting!',
    restart: 'qayta',
    customTime: 'O\'z vaqtingiz (soniya)'
  }
};

const TIME_MODES = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 },
  { label: '120s', value: 120 }
];

const LANGUAGES = [
  { code: 'english', label: 'English', flag: '🇬🇧' },
  { code: 'russian', label: 'Русский', flag: '🇷🇺' },
  { code: 'uzbek', label: 'O\'zbek', flag: '🇺🇿' }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('uzbek');
  const [selectedTime, setSelectedTime] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [words, setWords] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [typedWords, setTypedWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    generateWords();
  }, [language]);

  useEffect(() => {
    let interval;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = selectedTime - elapsed;
        
        if (remaining <= 0) {
          setTimeLeft(0);
          finishTest();
        } else {
          setTimeLeft(remaining);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished, selectedTime]);

  const generateWords = () => {
    const wordList = WORD_LISTS[language];
    const newWords = [];
    for (let i = 0; i < 200; i++) {
      newWords.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCurrentInput('');
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setTypedWords([]);
    setStartTime(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(selectedTime);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = words[currentWordIndex];
      const isCorrect = typedWord === currentWord;

      setTypedWords(prev => [...prev, { word: typedWord, correct: isCorrect, expected: currentWord }]);

      if (isCorrect) {
        setCorrectChars(prev => prev + currentWord.length);
        setCorrectWords(prev => prev + 1);
      } else {
        setIncorrectChars(prev => prev + Math.max(typedWord.length, currentWord.length));
      }

      setCurrentWordIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      setCurrentInput('');
    } else {
      setCurrentInput(value);
      setCurrentCharIndex(value.length);
    }
  };

  const finishTest = () => {
    const actualTimeElapsed = (Date.now() - startTime) / 1000;
    const minutesElapsed = actualTimeElapsed / 60;
    
    const calculatedWpm = Math.round(correctWords / minutesElapsed);
    
    const totalChars = correctChars + incorrectChars;
    const calculatedAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setIsFinished(true);
  };

  const getCharClass = (wordIndex, charIndex) => {
    const baseClass = theme === 'dark' ? 'text-zinc-600' : 'text-gray-400';
    
    if (wordIndex < currentWordIndex) {
      const typedWord = typedWords[wordIndex];
      if (typedWord) {
        const expectedWord = typedWord.expected;
        const actualWord = typedWord.word;
        
        if (charIndex < actualWord.length) {
          if (actualWord[charIndex] === expectedWord[charIndex]) {
            return theme === 'dark' ? 'text-zinc-300' : 'text-gray-700';
          } else {
            return theme === 'dark' ? 'text-red-400 bg-red-500/20 rounded-sm' : 'text-red-600 bg-red-100 rounded-sm';
          }
        }
      }
      return baseClass;
    }
    
    if (wordIndex === currentWordIndex) {
      if (charIndex < currentCharIndex) {
        const currentWord = words[currentWordIndex];
        if (currentInput[charIndex] === currentWord[charIndex]) {
          return theme === 'dark' ? 'text-zinc-100' : 'text-gray-900';
        } else {
          return theme === 'dark' 
            ? 'text-red-400 bg-red-500/20 rounded-sm' 
            : 'text-red-600 bg-red-100 rounded-sm';
        }
      }
      if (charIndex === currentCharIndex && currentInput.length > 0) {
        return theme === 'dark'
          ? 'border-l-2 border-zinc-100'
          : 'border-l-2 border-gray-900';
      }
    }
    
    return baseClass;
  };

  const handleRestart = () => {
    generateWords();
    setShowSettings(false);
    inputRef.current?.focus();
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setShowCustomInput(false);
    generateWords();
  };

  const handleCustomTimeSubmit = () => {
    const time = parseInt(customTime);
    if (time && time >= 5 && time <= 300) {
      setSelectedTime(time);
      setTimeLeft(time);
      setShowCustomInput(false);
      setCustomTime('');
      generateWords();
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowSettings(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const bgGradient = theme === 'dark' 
    ? 'bg-zinc-950' 
    : 'bg-gray-50';
  
  const textPrimary = theme === 'dark' ? 'text-zinc-100' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-zinc-500' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-zinc-800' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100';

  return (
    <div className={`min-h-screen ${bgGradient} ${textPrimary} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              TypeUp
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Time selector */}
            <div className="relative">
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                disabled={startTime !== null}
                className={`px-4 py-2 rounded-lg ${inputBg} border ${borderColor} hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2 ${textSecondary} hover:${textPrimary} ${startTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>⏱️</span>
                <span className="text-xs font-medium">{selectedTime}s</span>
                <svg className={`w-4 h-4 transition-transform ${showCustomInput ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCustomInput && (
                <div className={`absolute top-full right-0 mt-2 ${cardBg} rounded-lg border ${borderColor} shadow-xl overflow-hidden z-10 min-w-[180px]`}>
                  {TIME_MODES.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => handleTimeSelect(mode.value)}
                      className={`w-full px-4 py-3 flex items-center justify-between hover:${inputBg} transition-colors ${
                        selectedTime === mode.value ? inputBg : ''
                      }`}
                    >
                      <span className={`text-sm font-medium ${selectedTime === mode.value ? textPrimary : textSecondary}`}>
                        {mode.label}
                      </span>
                      {selectedTime === mode.value && (
                        <svg className={`w-4 h-4 ${textPrimary}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                  <div className={`border-t ${borderColor} p-3`}>
                    <label className={`block ${textSecondary} text-xs mb-2 font-medium`}>
                      {t.customTime}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCustomTimeSubmit()}
                        placeholder="5-300"
                        className={`flex-1 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'} ${textPrimary} border ${borderColor} text-xs outline-none focus:border-zinc-500 transition-colors`}
                        min="5"
                        max="300"
                      />
                      <button
                        onClick={handleCustomTimeSubmit}
                        className={`px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-900 hover:bg-gray-800'} text-white text-xs font-medium transition-all`}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`px-4 py-2 rounded-lg ${inputBg} border ${borderColor} hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2 ${textSecondary} hover:${textPrimary}`}
              >
                <span>{LANGUAGES.find(l => l.code === language)?.flag}</span>
                <span className="text-xs font-medium">{LANGUAGES.find(l => l.code === language)?.label}</span>
                <svg className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSettings && (
                <div className={`absolute top-full right-0 mt-2 ${cardBg} rounded-lg border ${borderColor} shadow-xl overflow-hidden z-10 min-w-[200px]`}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:${inputBg} transition-colors ${
                        language === lang.code ? inputBg : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className={`text-sm font-medium ${language === lang.code ? textPrimary : textSecondary}`}>
                        {lang.label}
                      </span>
                      {language === lang.code && (
                        <svg className={`w-4 h-4 ml-auto ${textPrimary}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg ${inputBg} flex items-center justify-center border ${borderColor} hover:bg-opacity-80 transition-all duration-200`}
            >
              <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            
            <button
              onClick={handleRestart}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textSecondary} border ${borderColor} hover:${textPrimary} transition-all duration-200 text-xs font-medium`}
            >
              {t.restart}
            </button>
          </div>
        </nav>

        {!isFinished ? (
          <div className="space-y-6">

            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="text-center">
                <div className={`${textSecondary} text-xs uppercase tracking-widest mb-1 font-medium`}>
                  {t.time}
                </div>
                <div className={`text-4xl font-bold ${textPrimary} tabular-nums ${timeLeft <= 5 && timeLeft > 0 ? 'text-red-500' : ''}`}>
                  {timeLeft}<span className={`${textSecondary} text-2xl`}>s</span>
                </div>
              </div>
              
              <div className={`w-px h-12 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
              
              <div className="text-center">
                <div className={`${textSecondary} text-xs uppercase tracking-widest mb-1 font-medium`}>
                  {t.words}
                </div>
                <div className={`text-4xl font-bold ${textPrimary} tabular-nums`}>
                  {correctWords}
                </div>
              </div>
            </div>
            
            <div className={`${cardBg} rounded-2xl p-10 border ${borderColor}`}>
              <div className="text-2xl leading-relaxed tracking-tight font-mono">
                {words.slice(0, currentWordIndex + 30).map((word, wordIndex) => {
                  const isCurrentWord = wordIndex === currentWordIndex;
                  const isPastWord = wordIndex < currentWordIndex;
                  const isFutureWord = wordIndex > currentWordIndex;
                  
                  return (
                    <span 
                      key={wordIndex} 
                      className={`inline-block mr-3 mb-2 transition-opacity duration-200 ${
                        isFutureWord ? 'opacity-30' : 'opacity-100'
                      }`}
                    >
                      {word.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className={`${getCharClass(wordIndex, charIndex)} transition-all duration-100 px-0.5`}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              className={`w-full ${inputBg} ${textPrimary} text-xl px-7 py-5 rounded-2xl border-2 ${borderColor} outline-none focus:border-zinc-500 transition-all duration-200 placeholder:${textSecondary} font-mono`}
              placeholder={t.startTyping}
              autoFocus
              disabled={isFinished}
            />
          </div>
        ) : (
          <div className="space-y-5">
            <div className={`${cardBg} rounded-3xl border ${borderColor} overflow-hidden`}>
              <div className="p-10">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${inputBg} ${textSecondary} text-sm border ${borderColor}`}>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {t.testCompleted}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-5 mb-8">
                  <div className={`${inputBg} rounded-2xl p-6 border ${borderColor} text-center`}>
                    <div className={`${textSecondary} text-xs uppercase tracking-widest mb-3 font-medium`}>
                      {t.speed}
                    </div>
                    <div className={`text-5xl font-bold mb-2 tabular-nums ${textPrimary}`}>
                      {wpm}
                    </div>
                    <div className={`${textSecondary} text-xs`}>
                      {t.wpm}
                    </div>
                  </div>
                  
                  <div className={`${inputBg} rounded-2xl p-6 border ${borderColor} text-center`}>
                    <div className={`${textSecondary} text-xs uppercase tracking-widest mb-3 font-medium`}>
                      {t.accuracy}
                    </div>
                    <div className={`text-5xl font-bold mb-2 tabular-nums ${textPrimary}`}>
                      {accuracy}%
                    </div>
                    <div className={`${textSecondary} text-xs`}>
                      {language === 'russian' ? 'точность' : language === 'english' ? 'precision' : 'aniqlik'}
                    </div>
                  </div>

                  <div className={`${inputBg} rounded-2xl p-6 border ${borderColor} text-center`}>
                    <div className={`${textSecondary} text-xs uppercase tracking-widest mb-3 font-medium`}>
                      {t.words}
                    </div>
                    <div className={`text-5xl font-bold ${textPrimary} mb-2 tabular-nums`}>
                      {correctWords}
                    </div>
                    <div className={`${textSecondary} text-xs`}>
                      {t.correct}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div className={`${inputBg} rounded-xl p-5 border ${borderColor} flex items-center justify-between`}>
                    <div>
                      <div className={`${textSecondary} text-xs uppercase tracking-wider mb-1 font-medium`}>
                        {t.characters}
                      </div>
                      <div className={`${textPrimary} text-2xl font-bold tabular-nums`}>
                        {correctChars + incorrectChars}
                      </div>
                    </div>
                    <div className={`text-3xl ${textSecondary}`}>
                      ⌨️
                    </div>
                  </div>

                  <div className={`${inputBg} rounded-xl p-5 border ${borderColor} flex items-center justify-between`}>
                    <div>
                      <div className={`${textSecondary} text-xs uppercase tracking-wider mb-1 font-medium`}>
                        {t.time}
                      </div>
                      <div className={`${textPrimary} text-2xl font-bold tabular-nums`}>
                        {selectedTime}s
                      </div>
                    </div>
                    <div className={`text-3xl ${textSecondary}`}>
                      ⏱️
                    </div>
                  </div>
                </div>

                <div className={`${inputBg} rounded-xl p-4 mb-8 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${textSecondary} text-sm font-medium`}>{t.result}</span>
                    <span className={`${textPrimary} text-sm font-bold`}>{accuracy}%</span>
                  </div>
                  <div className={`w-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-700'}`}
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  className={`w-full px-8 py-4 ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-900 hover:bg-gray-800'} text-white font-semibold rounded-xl transition-all duration-200 text-base`}
                >
                  {t.tryAgain}
                </button>
              </div>
            </div>

            <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
              <div className="flex items-center justify-center gap-8 text-center">
                <div>
                  <div className={`${textPrimary} text-3xl font-bold mb-1`}>
                    {wpm >= 60 ? '🔥' : wpm >= 40 ? '👍' : '💪'}
                  </div>
                  <div className={`${textSecondary} text-sm font-medium`}>
                    {wpm >= 60 ? t.excellent : wpm >= 40 ? t.good : t.keepGoing}
                  </div>
                </div>
                <div className={`w-px h-10 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
                <div className={`${textSecondary} text-sm max-w-sm text-left`}>
                  {wpm >= 60 ? t.excellentMsg : wpm >= 40 ? t.goodMsg : t.keepGoingMsg}
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className={`mt-16 text-center ${textSecondary} text-sm space-y-2`}>
          <p className={`font-bold ${textPrimary}`}>TypeUp.uz</p>
          <p className="text-xs opacity-60">{t.subtitle}</p>
        </footer>
      </div>
    </div>
  );
}