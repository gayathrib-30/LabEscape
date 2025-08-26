// Game State Management
class LabEscapeGame {
    constructor() {
        this.currentUser = null;
        this.gameRoom = null;
        this.currentRound = 1;
        this.totalRounds = 4;
        this.teamScore = 0;
        this.startTime = null;
        this.globalTimer = 25 * 60; // 25 minutes in seconds
        this.roundTimer = 20; // 20 seconds for timed rounds
        this.gameActive = false;
        this.globalTimerInterval = null;
        this.roundTimerInterval = null;
        this.roundResults = [];
        this.completedRounds = new Set(); // Track completed rounds
        this.selectedRound = null; // Currently selected round
        
        // Game data
        this.acronyms = {
            "HTML": "HyperText Markup Language",
            "CSS": "Cascading Style Sheets",
            "JS": "JavaScript",
            "API": "Application Programming Interface",
            "HTTP": "HyperText Transfer Protocol",
            "URL": "Uniform Resource Locator",
            "DOM": "Document Object Model",
            "JSON": "JavaScript Object Notation",
            "AJAX": "Asynchronous JavaScript and XML",
            "SQL": "Structured Query Language",
            "PHP": "PHP: Hypertext Preprocessor",
            "XML": "eXtensible Markup Language",
            "IDE": "Integrated Development Environment",
            "GUI": "Graphical User Interface",
            "CLI": "Command Line Interface",
            "SSH": "Secure Shell",
            "FTP": "File Transfer Protocol",
            "TCP": "Transmission Control Protocol",
            "UDP": "User Datagram Protocol",
            "IP": "Internet Protocol",
            "DNS": "Domain Name System",
            "VPN": "Virtual Private Network",
            "SSL": "Secure Sockets Layer",
            "TLS": "Transport Layer Security",
            "CPU": "Central Processing Unit",
            "GPU": "Graphics Processing Unit",
            "RAM": "Random Access Memory",
            "SSD": "Solid State Drive",
            "HDD": "Hard Disk Drive",
            "OS": "Operating System",
            "UI": "User Interface",
            "UX": "User Experience",
            "CMS": "Content Management System",
            "SEO": "Search Engine Optimization",
            "AWS": "Amazon Web Services",
            "CDN": "Content Delivery Network",
            "REST": "Representational State Transfer",
            "CRUD": "Create, Read, Update, Delete",
            "MVC": "Model-View-Controller",
            "OOP": "Object-Oriented Programming",
            "AI": "Artificial Intelligence",
            "ML": "Machine Learning",
            "IoT": "Internet of Things",
            "AR": "Augmented Reality",
            "VR": "Virtual Reality"
        };
        
        this.linkThinkQuestions = [
            {
                question: "What programming language logo is this?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImpzR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmN2RmMWUiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmMGRiNGYiLz4gICAgPC9saW5lYXJHcmFkaWVudD4gIDwvZGVmcz4gIDxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSJ1cmwoI2pzR3JhZGllbnQpIiByeD0iMTUiLz4gIDx0ZXh0IHg9Ijc1IiB5PSI5NSIgZm9udC1zaXplPSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjMzIzMzMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5KUzwvdGV4dD4gIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMyMzMzMCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iMTAiLz4gPC9zdmc+",
                answer: "javascript",
                clue: "The most popular client-side scripting language for web development."
            },
            {
                question: "What web technology framework does this represent?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InJlYWN0R3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MWRhZmIiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyMGI2ZjMiLz4gICAgPC9saW5lYXJHcmFkaWVudD4gIDwvZGVmcz4gIDxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSJ1cmwoI3JlYWN0R3JhZGllbnQpIiByeD0iMTUiLz4gIDxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjEwIiBmaWxsPSIjZmZmZmZmIi8+ICA8ZWxsaXBzZSBjeD0iNzUiIGN5PSI3NSIgcng9IjQ1IiByeT0iMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+ICA8ZWxsaXBzZSBjeD0iNzUiIGN5PSI3NSIgcng9IjQ1IiByeT0iMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiB0cmFuc2Zvcm09InJvdGF0ZSg2MCA3NSA3NSkiLz4gIDxlbGxpcHNlIGN4PSI3NSIgY3k9Ijc1IiByeD0iNDUiIHJ5PSIxOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHRyYW5zZm9ybT0icm90YXRlKC02MCA3NSA3NSkiLz4gPC9zdmc+",
                answer: "react",
                clue: "A JavaScript library for building user interfaces, created by Facebook."
            },
            {
                question: "Which popular version control system is shown?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImdpdEdyYWRpZW50IiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZjczMDAiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkZjU4MDAiLz4gICAgPC9yYWRpYWxHcmFkaWVudD4gIDwvZGVmcz4gIDxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSJ1cmwoI2dpdEdyYWRpZW50KSIgcng9IjE1Ii8+ICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIxMiIgZmlsbD0iI2ZmZmZmZiIvPiAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iNDAiIHI9IjEyIiBmaWxsPSIjZmZmZmZmIi8+ICA8Y2lyY2xlIGN4PSI3NSIgY3k9IjExMCIgcj0iMTIiIGZpbGw9IiNmZmZmZmYiLz4gIDxsaW5lIHgxPSI0MCIgeTE9IjQwIiB4Mj0iMTEwIiB5Mj0iNDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+ICA8bGluZSB4MT0iNzUiIHkxPSI0MCIgeDI9Ijc1IiB5Mj0iMTEwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIvPiAgPHRleHQgeD0iNzUiIHk9IjEzNSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Hcm9rPC90ZXh0PiA8L3N2Zz4=",
                answer: "git",
                clue: "Distributed version control system used to track changes in source code."
            },
            {
                question: "What NoSQL database technology is represented?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1vbmdvR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0ZGIzM2QiLz4gICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzZjk2MzQiLz4gICAgPC9saW5lYXJHcmFkaWVudD4gIDwvZGVmcz4gIDxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSJ1cmwoI21vbmdvR3JhZGllbnQpIiByeD0iMTUiLz4gIDxlbGxpcHNlIGN4PSI3NSIgY3k9IjMwIiByeD0iNDAiIHJ5PSIxNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+ICA8cmVjdCB4PSIzNSIgeT0iMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+ICA8ZWxsaXBzZSBjeD0iNzUiIGN5PSIxMDAiIHJ4PSI0MCIgcnk9IjE1IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiLz4gIDx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzJkNGEyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tk9TUUw8L3RleHQ+IDwvc3ZnPg==",
                answer: "mongodb",
                clue: "Document-oriented database that stores data in flexible, JSON-like documents."
            },
            {
                question: "What cloud platform service is shown?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImF3c0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4gICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmY5OTAwIi8+ICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY2NjAwIi8+ICAgIDwvbGluZWFyR3JhZGllbnQ+ICA8L2RlZnM+ICA8cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNhd3NHcmFkaWVudCkiIHJ4PSIxNSIvPiAgPHBhdGggZD0iTTMwIDkwIFE0MCA2MCA3NSA3MCBRMTEwIDYwIDEyMCA5MCBRMTE1IDExMCA3NSAxMDAgUTM1IDExMCAzMCA5MFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPiAgPGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iOCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC43Ii8+ICA8Y2lyY2xlIGN4PSI3NSIgY3k9IjQwIiByPSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjciLz4gIDxjaXJjbGUgY3g9IjEwNSIgY3k9IjQ4IiByPSI3IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjciLz4gIDx0ZXh0IHg9Ijc1IiB5PSIxMzAiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFXUzwvdGV4dD4gPC9zdmc+",
                answer: "aws",
                clue: "Amazon's comprehensive cloud computing platform offering various services."
            },
            {
                question: "What programming language framework is this?",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im5vZGVHcmFkaWVudCIgeDI9IjEwMCUiIHkyPSIxMDAlIj4gICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjhiNjJmIi8+ICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNTI5OTI0Ii8+ICAgIDwvbGluZWFyR3JhZGllbnQ+ICA8L2RlZnM+ICA8cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNub2RlR3JhZGllbnQpIiByeD0iMTUiLz4gIDxjaXJjbGUgY3g9IjM1IiBjeT0iNzUiIHI9IjE1IiBmaWxsPSIjZmZmZmZmIi8+ICA8Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSIxNSIgZmlsbD0iI2ZmZmZmZiIvPiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iNzUiIHI9IjE1IiBmaWxsPSIjZmZmZmZmIi8+ICA8bGluZSB4MT0iNTAiIHkxPSI3NSIgeDI9IjYwIiB5Mj0iNzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+ICA8bGluZSB4MT0iOTAiIHkxPSI3NSIgeDI9IjEwMCIgeTI9Ijc1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIvPiAgPHRleHQgeD0iNzUiIHk9IjEyNSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm9kZS5qczwvdGV4dD4gPC9zdmc+",
                answer: "nodejs",
                clue: "Server-side JavaScript runtime built on Chrome's V8 engine."
            }
        ];
        
        this.hackCrackChallenges = [
            {
                prompt: "The system password is a 6-letter word that describes something that grows in a garden and is often red.",
                answer: "tomato",
                clue: "It's a fruit that's botanically correct, but culinarily treated as a vegetable."
            },
            {
                prompt: "Find the secret code: It's a 5-letter word that means 'to rest' but sounds like 'piece'.",
                answer: "peace",
                clue: "The opposite of war, and what we all hope to find."
            },
            {
                prompt: "The access key is an animal that's known for being slow but steady in a famous fable.",
                answer: "turtle",
                clue: "It won the race against the hare in Aesop's fable."
            },
            {
                prompt: "Crack this: A 4-letter word that means 'large' and rhymes with 'huge'.",
                answer: "huge",
                clue: "Sometimes the answer is right in front of you!"
            },
            {
                prompt: "The password is a celestial body that provides light during the day.",
                answer: "sun",
                clue: "The center of our solar system, a star that gives us warmth and energy."
            }
        ];
        
        this.compileChallenges = [
            {
                question: "Write a JavaScript function that reverses a string:",
                inputExample: "Input: reverseString('hello')",
                outputExample: "Output: 'olleh'",
                expectedCode: ["function", "reverse", "split", "join"],
                sampleAnswer: "function reverseString(str) {\n    return str.split('').reverse().join('');\n}",
                clue: "Convert string to array, reverse it, then join back to string"
            },
            {
                question: "Write a JavaScript function that counts vowels in a string:",
                inputExample: "Input: countVowels('hello world')",
                outputExample: "Output: 3",
                expectedCode: ["function", "vowels", "match", "aeiou"],
                sampleAnswer: "function countVowels(str) {\n    const matches = str.toLowerCase().match(/[aeiou]/g);\n    return matches ? matches.length : 0;\n}",
                clue: "Use regex /[aeiou]/g to match all vowels and count them"
            },
            {
                question: "Write a JavaScript function that calculates factorial:",
                inputExample: "Input: factorial(5)",
                outputExample: "Output: 120",
                expectedCode: ["function", "factorial", "return", "n * factorial"],
                sampleAnswer: "function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}",
                clue: "Use recursion: factorial(n) = n * factorial(n-1), base case n <= 1"
            },
            {
                question: "Write a JavaScript function that finds the maximum number in an array:",
                inputExample: "Input: findMax([1, 5, 3, 9, 2])",
                outputExample: "Output: 9",
                expectedCode: ["function", "max", "Math.max", "..." ],
                sampleAnswer: "function findMax(arr) {\n    return Math.max(...arr);\n}",
                clue: "Use Math.max with spread operator (...) to pass array elements"
            },
            {
                question: "Write a JavaScript function that checks if a string is palindrome:",
                inputExample: "Input: isPalindrome('racecar')",
                outputExample: "Output: true",
                expectedCode: ["function", "palindrome", "reverse", "toLowerCase"],
                sampleAnswer: "function isPalindrome(str) {\n    const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');\n    return cleaned === cleaned.split('').reverse().join('');\n}",
                clue: "Compare the string with its reverse after cleaning and converting to lowercase"
            }
        ];
        
        this.currentQuestion = null;
        this.currentAcronym = null;
        this.initializeEventListeners();
        this.loadUserData();
    }
    
    // Initialize Event Listeners
    initializeEventListeners() {
        // Authentication form handlers
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('show-signup').addEventListener('click', (e) => this.showSignupForm(e));
        document.getElementById('show-login').addEventListener('click', (e) => this.showLoginForm(e));
        
        // Room system handlers
        document.getElementById('create-room-btn').addEventListener('click', () => this.createRoom());
        document.getElementById('join-room-btn').addEventListener('click', () => this.joinRoom());
        document.getElementById('copy-code-btn').addEventListener('click', () => this.copyRoomCode());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        
        // Game handlers
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        document.getElementById('submit-answer').addEventListener('click', () => this.submitAnswer());
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
        document.getElementById('next-round-btn').addEventListener('click', () => this.showRoundSelection());
        
        // Leaderboard handlers
        document.getElementById('export-pdf-btn').addEventListener('click', () => this.exportPDF());
        document.getElementById('play-again-btn').addEventListener('click', () => this.playAgain());
        document.getElementById('view-history-btn').addEventListener('click', () => this.showGameHistory());
        
        // Modal handlers
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) this.closeModal();
        });
    }
    
    // Load user data from localStorage
    loadUserData() {
        const userData = localStorage.getItem('labEscapeUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.showScreen('room-screen');
            this.updateUserDisplay();
        } else {
            this.showScreen('auth-screen');
        }
    }
    
    // Screen management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    // Authentication handlers
    async handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        // Simulate authentication - check against stored users
        const storedUsers = JSON.parse(localStorage.getItem('labEscapeUsers') || '{}');
        if (storedUsers[username] && storedUsers[username].password === password) {
            this.currentUser = {
                username: username,
                email: storedUsers[username].email,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('labEscapeUser', JSON.stringify(this.currentUser));
            this.showScreen('room-screen');
            this.updateUserDisplay();
        } else {
            this.showError('Invalid username or password');
        }
    }
    
    async handleSignup(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        if (!username || !email || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        // Store user data
        const storedUsers = JSON.parse(localStorage.getItem('labEscapeUsers') || '{}');
        if (storedUsers[username]) {
            this.showError('Username already exists');
            return;
        }
        
        storedUsers[username] = { email, password };
        localStorage.setItem('labEscapeUsers', JSON.stringify(storedUsers));
        
        // Auto-login after signup
        this.currentUser = {
            username: username,
            email: email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('labEscapeUser', JSON.stringify(this.currentUser));
        this.showScreen('room-screen');
        this.updateUserDisplay();
    }
    
    showSignupForm(e) {
        e.preventDefault();
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('signup-form').classList.add('active');
    }
    
    showLoginForm(e) {
        e.preventDefault();
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    }
    
    updateUserDisplay() {
        document.getElementById('current-user').textContent = this.currentUser.username;
    }
    
    logout() {
        localStorage.removeItem('labEscapeUser');
        this.currentUser = null;
        this.gameRoom = null;
        this.resetGame();
        this.showScreen('auth-screen');
    }
    
    // Room management
    createRoom() {
        const roomCode = this.generateRoomCode();
        this.gameRoom = {
            code: roomCode,
            host: this.currentUser.username,
            players: [this.currentUser.username],
            status: 'waiting',
            createdAt: new Date().toISOString()
        };
        
        // Store room data
        const rooms = JSON.parse(sessionStorage.getItem('labEscapeRooms') || '{}');
        rooms[roomCode] = this.gameRoom;
        sessionStorage.setItem('labEscapeRooms', JSON.stringify(rooms));
        
        document.getElementById('generated-code').textContent = roomCode;
        this.showScreen('room-created-screen');
        
        // Check for second player joining (simulate)
        this.checkForSecondPlayer();
    }
    
    joinRoom() {
        const roomCode = document.getElementById('room-code-input').value.toUpperCase();
        if (!roomCode || roomCode.length !== 6) {
            this.showError('Please enter a valid 6-character room code');
            return;
        }
        
        const rooms = JSON.parse(sessionStorage.getItem('labEscapeRooms') || '{}');
        if (!rooms[roomCode]) {
            this.showError('Room not found. Please check the code and try again.');
            return;
        }
        
        const room = rooms[roomCode];
        if (room.players.length >= 2) {
            this.showError('Room is full');
            return;
        }
        
        // Join the room
        room.players.push(this.currentUser.username);
        room.status = 'ready';
        rooms[roomCode] = room;
        sessionStorage.setItem('labEscapeRooms', JSON.stringify(rooms));
        
        this.gameRoom = room;
        this.showGameLobby();
    }
    
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    copyRoomCode() {
        const code = document.getElementById('generated-code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.getElementById('copy-code-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    }
    
    checkForSecondPlayer() {
        // Simulate second player joining after 5-10 seconds
        setTimeout(() => {
            if (this.gameRoom && this.gameRoom.players.length === 1) {
                // Simulate second player joining
                const simulatedPlayer = `Player_${Math.floor(Math.random() * 1000)}`;
                this.gameRoom.players.push(simulatedPlayer);
                this.gameRoom.status = 'ready';
                
                // Update storage
                const rooms = JSON.parse(sessionStorage.getItem('labEscapeRooms') || '{}');
                rooms[this.gameRoom.code] = this.gameRoom;
                sessionStorage.setItem('labEscapeRooms', JSON.stringify(rooms));
                
                this.showGameLobby();
            }
        }, Math.random() * 5000 + 5000); // 5-10 seconds
    }
    
    showGameLobby() {
        document.getElementById('player1-name').textContent = this.gameRoom.players[0];
        document.getElementById('player2-name').textContent = this.gameRoom.players[1] || 'Waiting...';
        this.showScreen('lobby-screen');
        this.startGlobalTimer();
    }
    
    // Game logic
    startGame() {
        this.gameActive = true;
        this.teamScore = 0;
        this.roundResults = [];
        this.completedRounds.clear();
        this.startTime = new Date();
        
        this.showRoundSelection();
    }
    
    showRoundSelection() {
        this.showScreen('game-screen');
        this.updateGameDisplay();
        
        const challengeContent = document.getElementById('challenge-content');
        const roundTitle = document.getElementById('round-title');
        const roundDescription = document.getElementById('round-description');
        const roundTimerDisplay = document.getElementById('round-timer-display');
        const answerSection = document.querySelector('.answer-section');
        const nextRoundBtn = document.getElementById('next-round-btn');
        
        roundTitle.textContent = "Select Your Challenge";
        roundDescription.textContent = "Choose any round to complete (all 4 must be finished)";
        roundTimerDisplay.style.display = 'none';
        answerSection.style.display = 'none';
        nextRoundBtn.style.display = 'none';
        
        const roundOptions = [
            { id: 1, name: "Link & Think", icon: "fas fa-search", desc: "Analyze clues and identify tech terms" },
            { id: 2, name: "Hack & Crack", icon: "fas fa-lock", desc: "Solve creative password puzzles" },
            { id: 3, name: "Acronym Arena", icon: "fas fa-font", desc: "Quick-fire acronym definitions (20s timer)" },
            { id: 4, name: "Compile & Conquer", icon: "fas fa-code", desc: "Code mini-challenges and algorithms" }
        ];
        
        challengeContent.innerHTML = `
            <div class="round-selection">
                <h3 style="color: #00ffff; margin-bottom: 2rem;">Choose Your Next Challenge</h3>
                <div class="rounds-grid">
                    ${roundOptions.map(round => `
                        <div class="round-option ${this.completedRounds.has(round.id) ? 'completed' : 'available'}" 
                             onclick="window.labEscapeGame.selectRound(${round.id})">
                            <div class="round-icon"><i class="${round.icon}"></i></div>
                            <h4>${round.name}</h4>
                            <p>${round.desc}</p>
                            ${this.completedRounds.has(round.id) ? 
                                '<div class="completion-badge"><i class="fas fa-check-circle"></i> Completed</div>' : 
                                '<div class="start-badge">Click to Start</div>'
                            }
                        </div>
                    `).join('')}
                </div>
                <div class="progress-info">
                    <p>Completed: ${this.completedRounds.size} / ${this.totalRounds} rounds</p>
                    ${this.completedRounds.size === this.totalRounds ? 
                        '<button onclick="window.labEscapeGame.endGame(true)" class="finish-game-btn">Complete Lab Escape!</button>' : ''
                    }
                </div>
            </div>
        `;
    }
    
    selectRound(roundNumber) {
        if (this.completedRounds.has(roundNumber)) {
            this.showError('Round already completed! Choose a different round.');
            return;
        }
        
        this.currentRound = roundNumber;
        this.selectedRound = roundNumber;
        this.updateGameDisplay();
        this.loadSelectedRound();
    }
    
    loadSelectedRound() {
        const challengeContent = document.getElementById('challenge-content');
        const roundTitle = document.getElementById('round-title');
        const roundDescription = document.getElementById('round-description');
        const answerInput = document.getElementById('answer-input');
        const roundTimerDisplay = document.getElementById('round-timer-display');
        const answerSection = document.querySelector('.answer-section');
        const nextRoundBtn = document.getElementById('next-round-btn');
        
        answerInput.value = '';
        document.getElementById('feedback-message').textContent = '';
        document.getElementById('feedback-message').className = 'feedback-message';
        answerSection.style.display = 'flex';
        nextRoundBtn.style.display = 'none';
        
        switch (this.currentRound) {
            case 1:
                this.loadLinkThinkRound(challengeContent, roundTitle, roundDescription, roundTimerDisplay);
                break;
            case 2:
                this.loadHackCrackRound(challengeContent, roundTitle, roundDescription, roundTimerDisplay);
                break;
            case 3:
                this.loadAcronymArenaRound(challengeContent, roundTitle, roundDescription, roundTimerDisplay);
                break;
            case 4:
                this.loadCompileConquerRound(challengeContent, roundTitle, roundDescription, roundTimerDisplay);
                break;
        }
    }
    
    startGlobalTimer() {
        this.globalTimer = 25 * 60; // 25 minutes
        this.updateTimerDisplay();
        
        this.globalTimerInterval = setInterval(() => {
            this.globalTimer--;
            this.updateTimerDisplay();
            
            if (this.globalTimer <= 0) {
                this.endGame(false); // Time's up - failure
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.globalTimer / 60);
        const seconds = this.globalTimer % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElements = [
            document.getElementById('global-timer'),
            document.getElementById('game-global-timer')
        ];
        
        timerElements.forEach(element => {
            if (element) element.textContent = timeString;
        });
    }
    
    updateGameDisplay() {
        document.getElementById('current-round').textContent = this.completedRounds.size;
        document.getElementById('team-score').textContent = this.teamScore;
        
        // Update progress bar based on completed rounds
        const progressFill = document.querySelector('.progress-fill');
        const progress = (this.completedRounds.size / this.totalRounds) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    // Removed loadCurrentRound method - replaced with loadSelectedRound
    
    loadLinkThinkRound(content, title, description, timerDisplay) {
        title.textContent = "Link & Think";
        description.textContent = "Analyze the image and clues to identify the tech terms";
        timerDisplay.style.display = 'none';
        
        this.currentQuestion = this.linkThinkQuestions[Math.floor(Math.random() * this.linkThinkQuestions.length)];
        
        content.innerHTML = `
            <div class="challenge-text">${this.currentQuestion.question}</div>
            <div class="tech-image-container">
                <img src="${this.currentQuestion.image}" alt="Tech clue" class="tech-clue-image" />
            </div>
            <div class="challenge-clue">${this.currentQuestion.clue}</div>
        `;
    }
    
    loadHackCrackRound(content, title, description, timerDisplay) {
        title.textContent = "Hack & Crack";
        description.textContent = "Solve the creative password puzzle";
        timerDisplay.style.display = 'none';
        
        this.currentQuestion = this.hackCrackChallenges[Math.floor(Math.random() * this.hackCrackChallenges.length)];
        
        content.innerHTML = `
            <div class="challenge-text">${this.currentQuestion.prompt}</div>
            <div class="challenge-clue">${this.currentQuestion.clue}</div>
        `;
    }
    
    loadAcronymArenaRound(content, title, description, timerDisplay) {
        title.textContent = "Acronym Arena";
        description.textContent = "Quick! What does this acronym stand for?";
        timerDisplay.style.display = 'flex';
        
        const acronymKeys = Object.keys(this.acronyms);
        const randomAcronym = acronymKeys[Math.floor(Math.random() * acronymKeys.length)];
        this.currentAcronym = {
            acronym: randomAcronym,
            answer: this.acronyms[randomAcronym]
        };
        
        content.innerHTML = `
            <div class="acronym-display">${randomAcronym}</div>
            <div class="challenge-text">What does this acronym stand for?</div>
        `;
        
        this.startRoundTimer();
    }
    
    loadCompileConquerRound(content, title, description, timerDisplay) {
        title.textContent = "Compile & Conquer";
        description.textContent = "Write complete JavaScript code with proper syntax";
        timerDisplay.style.display = 'none';
        
        this.currentQuestion = this.compileChallenges[Math.floor(Math.random() * this.compileChallenges.length)];
        
        content.innerHTML = `
            <div class="challenge-text">${this.currentQuestion.question}</div>
            <div class="code-examples">
                <div class="example-box input-example">
                    <strong><i class="fas fa-arrow-right"></i> ${this.currentQuestion.inputExample}</strong>
                </div>
                <div class="example-box output-example">
                    <strong><i class="fas fa-arrow-left"></i> ${this.currentQuestion.outputExample}</strong>
                </div>
            </div>
            <div class="challenge-clue">${this.currentQuestion.clue}</div>
            <div class="code-info">
                <p><i class="fas fa-code"></i> Write your complete JavaScript function with proper syntax</p>
            </div>
        `;
        
        // Update the answer input to be a textarea for code
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.style.height = '120px';
            answerInput.style.fontFamily = 'monospace';
            answerInput.style.fontSize = '14px';
            answerInput.placeholder = 'function yourFunction() {\n    // Write your code here\n    return result;\n}';
        }
    }
    
    startRoundTimer() {
        this.roundTimer = 20;
        document.getElementById('round-timer').textContent = this.roundTimer;
        
        this.roundTimerInterval = setInterval(() => {
            this.roundTimer--;
            document.getElementById('round-timer').textContent = this.roundTimer;
            
            if (this.roundTimer <= 0) {
                clearInterval(this.roundTimerInterval);
                this.handleTimeUp();
            }
        }, 1000);
    }
    
    handleTimeUp() {
        this.showFeedback('Time\'s up! Choose your next challenge.', 'error');
        this.roundResults.push({
            round: this.currentRound,
            success: false,
            timeUp: true
        });
        
        this.selectedRound = null;
        
        setTimeout(() => {
            if (this.completedRounds.size === this.totalRounds) {
                this.endGame(false);
            } else {
                this.showRoundSelection();
            }
        }, 2000);
    }
    
    submitAnswer() {
        const answer = document.getElementById('answer-input').value.trim().toLowerCase();
        if (!answer) {
            this.showError('Please enter an answer');
            return;
        }
        
        let isCorrect = false;
        let correctAnswer = '';
        
        switch (this.currentRound) {
            case 1: // Link & Think
                correctAnswer = this.currentQuestion.answer.toLowerCase();
                isCorrect = answer === correctAnswer || answer.includes(correctAnswer.split(' ')[0]);
                break;
            case 2: // Hack & Crack
                correctAnswer = this.currentQuestion.answer.toLowerCase();
                isCorrect = answer === correctAnswer;
                break;
            case 3: // Acronym Arena
                correctAnswer = this.currentAcronym.answer.toLowerCase();
                isCorrect = answer === correctAnswer || this.fuzzyMatch(answer, correctAnswer);
                if (this.roundTimerInterval) {
                    clearInterval(this.roundTimerInterval);
                }
                break;
            case 4: // Compile & Conquer
                isCorrect = this.validateCode(answer, this.currentQuestion.expectedCode);
                break;
        }
        
        if (isCorrect) {
            this.teamScore += 25;
            this.completedRounds.add(this.currentRound);
            this.showFeedback('Correct! Great work!', 'success');
            this.roundResults.push({
                round: this.currentRound,
                success: true,
                score: 25
            });
        } else {
            this.showFeedback(`Incorrect. The answer was: ${this.getRoundAnswer()}`, 'error');
            this.roundResults.push({
                round: this.currentRound,
                success: false,
                correctAnswer: this.getRoundAnswer()
            });
        }
        
        this.updateGameDisplay();
        this.selectedRound = null;
        
        // Reset answer input styles after Compile & Conquer
        const answerInput = document.getElementById('answer-input');
        if (this.currentRound === 4 && answerInput) {
            answerInput.style.height = 'auto';
            answerInput.style.fontFamily = 'inherit';
            answerInput.placeholder = 'Enter your answer...';
        }
        
        // Show appropriate next action button
        if (this.completedRounds.size === this.totalRounds) {
            document.getElementById('next-round-btn').innerHTML = '<span>Complete Lab Escape!</span><i class="fas fa-trophy"></i>';
            document.getElementById('next-round-btn').onclick = () => this.endGame(true);
        } else {
            document.getElementById('next-round-btn').innerHTML = '<span>Choose Next Challenge</span><i class="fas fa-arrow-right"></i>';
            document.getElementById('next-round-btn').onclick = () => this.showRoundSelection();
        }
        document.getElementById('next-round-btn').style.display = 'block';
    }
    
    getRoundAnswer() {
        switch (this.currentRound) {
            case 1:
            case 2:
                return this.currentQuestion.answer;
            case 3:
                return this.currentAcronym.answer;
            case 4:
                return this.currentQuestion.sampleAnswer;
            default:
                return '';
        }
    }
    
    fuzzyMatch(input, target) {
        // Allow for minor spelling mistakes in acronym definitions
        const words1 = input.split(' ').filter(w => w.length > 2);
        const words2 = target.split(' ').filter(w => w.length > 2);
        
        let matches = 0;
        words1.forEach(word1 => {
            words2.forEach(word2 => {
                if (word1.startsWith(word2.substring(0, 3)) || word2.startsWith(word1.substring(0, 3))) {
                    matches++;
                }
            });
        });
        
        return matches >= Math.min(words1.length, words2.length) * 0.7;
    }
    
    validateCode(userCode, expectedPatterns) {
        // Check if the user's code contains the expected patterns
        const normalizedCode = userCode.toLowerCase().replace(/\s+/g, ' ');
        let matchCount = 0;
        
        expectedPatterns.forEach(pattern => {
            if (normalizedCode.includes(pattern.toLowerCase())) {
                matchCount++;
            }
        });
        
        // Require at least 75% of expected patterns to be present
        return matchCount >= Math.ceil(expectedPatterns.length * 0.75);
    }
    
    // Remove nextRound method as we now use round selection
    
    endGame(success) {
        if (this.globalTimerInterval) {
            clearInterval(this.globalTimerInterval);
        }
        if (this.roundTimerInterval) {
            clearInterval(this.roundTimerInterval);
        }
        
        this.gameActive = false;
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        
        // Save game result
        this.saveGameResult(success, timeTaken);
        
        // Show results
        this.showLeaderboard(success, timeTaken);
    }
    
    saveGameResult(success, timeTaken) {
        const gameHistory = JSON.parse(localStorage.getItem('labEscapeHistory') || '[]');
        const gameResult = {
            date: new Date().toISOString(),
            players: this.gameRoom.players,
            score: this.teamScore,
            timeTaken: timeTaken,
            success: success,
            rounds: this.roundResults
        };
        
        gameHistory.unshift(gameResult);
        // Keep only last 20 games
        if (gameHistory.length > 20) {
            gameHistory.splice(20);
        }
        
        localStorage.setItem('labEscapeHistory', JSON.stringify(gameHistory));
    }
    
    showLeaderboard(success, timeTaken) {
        this.showScreen('leaderboard-screen');
        
        // Update result animation
        const resultIcon = document.querySelector('.result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');
        
        if (success) {
            resultIcon.className = 'fas fa-trophy result-icon success';
            resultTitle.textContent = 'Mission Complete!';
            resultSubtitle.textContent = 'Lab Escape Successful';
        } else {
            resultIcon.className = 'fas fa-exclamation-triangle result-icon failure';
            resultTitle.textContent = 'Mission Failed';
            resultSubtitle.textContent = 'Time Ran Out';
        }
        
        // Update final stats
        document.getElementById('final-score').textContent = this.teamScore;
        
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        document.getElementById('final-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const successRate = (this.roundResults.filter(r => r.success).length / this.totalRounds * 100).toFixed(0);
        document.getElementById('success-rate').textContent = `${successRate}%`;
        
        // Update rounds summary
        this.updateRoundsSummary();
    }
    
    updateRoundsSummary() {
        const summaryContainer = document.getElementById('rounds-summary');
        const roundNames = ['Link & Think', 'Hack & Crack', 'Acronym Arena', 'Compile & Conquer'];
        
        summaryContainer.innerHTML = '';
        
        this.roundResults.forEach((result) => {
            const roundDiv = document.createElement('div');
            roundDiv.className = 'round-item';
            
            const resultClass = result.success ? 'success' : 'failure';
            const resultIcon = result.success ? 'fa-check-circle' : 'fa-times-circle';
            const resultText = result.success ? `+${result.score} points` : 
                              result.timeUp ? 'Time expired' : 
                              `Incorrect (${result.correctAnswer})`;
            
            roundDiv.innerHTML = `
                <div class="round-name">${roundNames[result.round - 1]}</div>
                <div class="round-result ${resultClass}">
                    <i class="fas ${resultIcon}"></i>
                    <span>${resultText}</span>
                </div>
            `;
            
            summaryContainer.appendChild(roundDiv);
        });
    }
    
    // Utility functions
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback-message');
        feedback.textContent = message;
        feedback.className = `feedback-message ${type}`;
    }
    
    showError(message) {
        // Create or update error display
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid #ff0000;
                color: #ff6666;
                padding: 1rem;
                border-radius: 10px;
                z-index: 1000;
                max-width: 300px;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
    
    resetGame() {
        this.currentRound = 1;
        this.teamScore = 0;
        this.gameActive = false;
        this.roundResults = [];
        this.completedRounds.clear();
        this.selectedRound = null;
        
        if (this.globalTimerInterval) {
            clearInterval(this.globalTimerInterval);
            this.globalTimerInterval = null;
        }
        if (this.roundTimerInterval) {
            clearInterval(this.roundTimerInterval);
            this.roundTimerInterval = null;
        }
    }
    
    // PDF Export functionality
    exportPDF() {
        const gameData = {
            players: this.gameRoom.players,
            score: this.teamScore,
            rounds: this.roundResults,
            date: new Date().toLocaleDateString()
        };
        
        // Create a simple text-based report (since we can't use external PDF libraries)
        const reportContent = this.generateTextReport(gameData);
        
        // Create downloadable text file
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lab-escape-report-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    generateTextReport(data) {
        const roundNames = ['Link & Think', 'Hack & Crack', 'Acronym Arena', 'Compile & Conquer'];
        let report = `
LAB ESCAPE - GAME REPORT
========================

Date: ${data.date}
Team Members: ${data.players.join(', ')}
Final Score: ${data.score} points

ROUND SUMMARY:
--------------
`;
        
        data.rounds.forEach((round, index) => {
            const status = round.success ? 'COMPLETED' : 'FAILED';
            const points = round.success ? `+${round.score} points` : '0 points';
            report += `${index + 1}. ${roundNames[index]}: ${status} (${points})\n`;
        });
        
        const successRate = (data.rounds.filter(r => r.success).length / data.rounds.length * 100).toFixed(0);
        report += `\nOverall Success Rate: ${successRate}%\n`;
        report += `\nGenerated by Lab Escape Game System\n`;
        
        return report;
    }
    
    playAgain() {
        this.resetGame();
        this.showScreen('room-screen');
    }
    
    showGameHistory() {
        const modal = document.getElementById('history-modal');
        const historyList = document.getElementById('history-list');
        const gameHistory = JSON.parse(localStorage.getItem('labEscapeHistory') || '[]');
        
        historyList.innerHTML = '';
        
        if (gameHistory.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: #cccccc;">No game history yet.</p>';
        } else {
            gameHistory.forEach(game => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                const date = new Date(game.date).toLocaleDateString();
                const status = game.success ? 'SUCCESS' : 'FAILED';
                const statusColor = game.success ? '#00ff00' : '#ff6666';
                
                historyItem.innerHTML = `
                    <div>
                        <div class="history-date">${date}</div>
                        <div style="color: ${statusColor}; font-weight: 600;">${status}</div>
                    </div>
                    <div class="history-score">${game.score} pts</div>
                `;
                
                historyList.appendChild(historyItem);
            });
        }
        
        modal.classList.add('active');
    }
    
    closeModal() {
        document.getElementById('history-modal').classList.remove('active');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.labEscapeGame = new LabEscapeGame();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Prevent right-click context menu for a more immersive experience
document.addEventListener('contextmenu', e => e.preventDefault());

// Handle browser back button
window.addEventListener('popstate', (e) => {
    // Prevent accidental navigation away from the game
    if (window.labEscapeGame && window.labEscapeGame.gameActive) {
        e.preventDefault();
        if (confirm('Are you sure you want to leave the game? Your progress will be lost.')) {
            window.labEscapeGame.resetGame();
            window.labEscapeGame.showScreen('room-screen');
        }
    }
});
