/**
 * STC Roadmaps Data Architecture
 * Centralized, data-driven catalog of learning paths, stages, projects, and verified external destinations.
 */

export const ROADMAPS = [
  {
    id: 'web-development',
    index: '01',
    title: 'WEB DEVELOPMENT',
    tagline: 'INTERFACES, APIS & PRODUCTION DEPLOYMENT',
    description:
      'Learn how the web works, build interfaces, connect APIs and ship real applications.',
    progression: [
      'HTML',
      'CSS',
      'JavaScript',
      'Git',
      'APIs',
      'Frontend Framework',
      'Backend',
      'Database',
      'Deployment',
    ],
    externalUrl: 'https://roadmap.sh/full-stack',
    externalLabel: 'roadmap.sh / full-stack',
    externalNote: 'Explore the community-curated modern full-stack roadmap on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Master semantic structure, responsive layouts, and the fundamentals of browser computation.',
        items: [
          'Semantic HTML5 & Document Accessibility (WCAG)',
          'Modern CSS: Flexbox, Grid, Custom Properties & Box Model',
          'Vanilla JavaScript: DOM Manipulation, Events & Scope',
          'Terminal commands & Git version control fundamentals',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Understand how dynamic client-server communication actually works.',
        summary:
          'Move past static pages to asynchronous execution, component state, and structured web services.',
        items: [
          'Modern ES6+: Promises, Async/Await & Fetch API',
          'Component architecture (React): State, Props, Hooks & Lifecycle',
          'Package managers (npm), Vite build tools, and module bundling',
          'Responsive design principles & mobile-first interface systems',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, mini-builds and deliberate problem-solving.',
        summary:
          'Sharpen your muscle memory by recreating UI interactions and debugging real runtime scenarios.',
        items: [
          'Recreate real-world interfaces from wireframes with pure CSS',
          'Build an asynchronous API consumer with error handling & loading states',
          'Implement client-side routing, query parameters, and local persistence',
          'Audit and improve accessibility, Lighthouse performance, and layout shifts',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Connect the entire stack: database models, RESTful endpoints, security, and client rendering.',
        items: [
          'Design and deploy backend APIs (Node.js/Express or Python/FastAPI)',
          'Data modeling with PostgreSQL or MongoDB and relational schemas',
          'Authentication flows: JWTs, secure cookies, and session management',
          'End-to-end integration of frontend state with persistent databases',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Turn technical knowledge into demonstrable, tested software.',
        summary:
          'Production-grade projects designed to prove your capability to potential teammates and recruiters.',
        items: [
          'Personal Portfolio: Semantic, responsive, fast, and deployed to production',
          'API-powered Dashboard: Live data feeds with search, filtering, and chart visualizer',
          'Full-stack Application: Multi-user app with auth, database, and CI/CD deployment',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Connect your code to real teams, hackathons, and industry roles.',
        summary:
          'Your portfolio is your passport. Transition from solitary learning into community momentum.',
        items: [
          'INTERNSHIPS — Full-Stack & Frontend Engineering Roles',
          'HACKATHONS — Building MVPs under 36-hour sprint pressure',
          'OPEN SOURCE — Contributing components to major web toolchains',
          'COMMUNITY — Leading workshops & pairing with junior builders',
          'JOBS — Production software delivery at product startups and tech companies',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Personal Portfolio',
        difficulty: 'STARTER',
        skills: ['HTML5', 'Modern CSS', 'Vanilla JavaScript', 'Vercel / GitHub Pages'],
        outcome:
          'A fast, semantic, accessible portfolio showcasing your code, projects, and design sensibility with zero framework bloat.',
      },
      {
        index: '02',
        title: 'API-powered Data Dashboard',
        difficulty: 'INTERMEDIATE',
        skills: ['React', 'REST APIs', 'Data Filtering', 'Chart.js / SVG'],
        outcome:
          'A live analytics interface consuming real-time external APIs with resilient error handling, debounced search, and interactive data visualization.',
      },
      {
        index: '03',
        title: 'Full-Stack Collaborative Platform',
        difficulty: 'CAPSTONE',
        skills: ['React', 'Node.js / Express', 'PostgreSQL', 'JWT Auth', 'Docker'],
        outcome:
          'A multi-user application featuring persistent relational storage, role-based authorization, automated testing, and cloud deployment.',
      },
    ],
  },
  {
    id: 'java-dsa',
    index: '02',
    title: 'JAVA + DSA',
    tagline: 'PROGRAMMING FUNDAMENTALS & ALGORITHMIC PROBLEM SOLVING',
    description:
      'Build strong programming fundamentals and develop the problem-solving skills behind technical interviews.',
    progression: [
      'Java Basics',
      'OOP',
      'Collections',
      'Algorithms',
      'Data Structures',
      'Problem Solving',
      'Projects',
    ],
    externalUrl: 'https://roadmap.sh/datastructures-and-algorithms',
    externalLabel: 'roadmap.sh / dsa',
    externalNote: 'This is an STC-curated path combining deep Java engineering with core algorithmic problem solving.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Understand memory allocation, strong typing, JVM compilation, and procedural control flow.',
        items: [
          'Java syntax, primitive types, memory model (Stack vs Heap)',
          'Control flow, loops, methods, and recursion mechanics',
          'Object-Oriented Programming: Encapsulation, Inheritance, Polymorphism, Abstraction',
          'Exception handling, Java Streams, and standard I/O streams',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Internalize the Java Collections Framework and computational complexity.',
        summary:
          'Analyze algorithms rigorously with Big-O time and space complexity models.',
        items: [
          'Big-O notation: Time, auxiliary space, and best/worst-case limits',
          'Java Collections: ArrayList, LinkedList, HashMap, HashSet, PriorityQueue',
          'Linear structures: Stacks, Queues, Deques, and two-pointer patterns',
          'Sorting & Searching: Binary search, QuickSort, MergeSort, and divide-and-conquer',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Deliberate practice on fundamental patterns before moving to advanced graph theory.',
        items: [
          'Solve 50+ classic problems focusing on sliding window, two pointers & prefix sums',
          'Binary Trees & BSTs: Inorder, preorder, postorder, BFS level-order traversal',
          'Recursion tree visualization and backtracking mechanics (N-Queens, Sudoku)',
          'Dynamic Programming fundamentals: Memoization top-down vs Tabulation bottom-up',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Apply data structures to real software: custom libraries, parser engines, and simulators.',
        items: [
          'Graph algorithms: BFS, DFS, Dijkstra, Bellman-Ford, Kruskal, topological sort',
          'Advanced structures: Tries, Disjoint Set Union (DSU), Segment Trees',
          'Write a custom collections package with rigorous JUnit test suites',
          'Multithreading basics: synchronized blocks, locks, and concurrent collections',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Showcase computational thinking applied to real software problems.',
        summary:
          'Build tangible programs that highlight data structure efficiency and clean OOP architecture.',
        items: [
          'Problem-Solving Tracker: Terminal-based utility tracking problem patterns and metrics',
          'Custom Data Structure Library: Production-ready generic collections with JUnit tests',
          'Pathfinding Visualizer: Interactive tool demonstrating shortest-path graph algorithms',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Crack competitive rounds and tackle complex backend infrastructure.',
        summary:
          'High algorithmic mastery opens doors to top-tier technical interviews and backend systems.',
        items: [
          'INTERNSHIPS — Software Development Engineer (SDE-1) internships',
          'HACKATHONS — Algorithmic optimization and backend heavy lifting',
          'OPEN SOURCE — Contributing to high-performance Java frameworks (Spring, Apache)',
          'COMMUNITY — Organizing campus LeetCode peer study circles and mock interviews',
          'JOBS — Backend engineering and systems programming at product firms',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Algorithmic Problem-Solving Tracker',
        difficulty: 'STARTER',
        skills: ['Java Core', 'CLI', 'File I/O', 'JSON Serialization'],
        outcome:
          'A terminal-driven revision and progress tracker that classifies solved problems by pattern (Sliding Window, DSU, DP) and calculates spaced repetition schedules.',
      },
      {
        index: '02',
        title: 'Generic Data Structure & Algorithmic Library',
        difficulty: 'INTERMEDIATE',
        skills: ['Generics', 'OOP Principles', 'JUnit 5', 'Performance Benchmarks'],
        outcome:
          'A self-implemented Java library with custom Red-Black Trees, Heaps, and Tries, accompanied by automated regression test suites and time-complexity benchmarks.',
      },
      {
        index: '03',
        title: 'Interactive Graph Pathfinding Engine',
        difficulty: 'CAPSTONE',
        skills: ['Java', 'Graph Theory', 'A* Search', 'Dijkstra', 'GUI / Web Visualization'],
        outcome:
          'A visual algorithmic simulator that dynamically compares search algorithms on customizable grid mazes with weighted terrain and real-time step visualization.',
      },
    ],
  },
  {
    id: 'python',
    index: '03',
    title: 'PYTHON',
    tagline: 'PRACTICAL SCRIPTING, AUTOMATION & BACKEND SYSTEMS',
    description:
      'Start with Python fundamentals and move toward practical development and automation.',
    progression: [
      'Syntax',
      'Functions',
      'OOP',
      'Modules',
      'APIs',
      'Automation',
      'Projects',
    ],
    externalUrl: 'https://roadmap.sh/python',
    externalLabel: 'roadmap.sh / python',
    externalNote: 'Explore the complete language reference and backend engineering path on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Master Python’s clean syntax, dynamic data structures, and idiomatic coding style.',
        items: [
          'Python syntax, primitive types, list comprehensions, dicts & sets',
          'Functions, args/kwargs, lambda expressions, and scope rules',
          'Object-oriented Python: Classes, inheritance, magic methods (__repr__, __str__)',
          'Virtual environments (venv/poetry), pip dependency management, and type hinting',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Wrangle data, handle exceptions, and automate file interactions.',
        summary:
          'Use Python’s standard library to read files, manage processes, and consume network APIs.',
        items: [
          'Exception handling, context managers (with statements), and custom exceptions',
          'File system operations: pathlib, os, csv, json, and regex parsing',
          'HTTP interactions with requests and httpx (REST APIs, headers, auth)',
          'Functional tools: generators, iterators, itertools, and decorators',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Automate repetitive tasks, scrape web resources responsibly, and parse unstructured text.',
        items: [
          'Scrape dynamic HTML using BeautifulSoup and Playwright/Selenium',
          'Build automated desktop utilities for file sorting, renaming, and batch backups',
          'Implement a concurrent scraper using asyncio and aiohttp',
          'Write unit tests using pytest with fixtures and mock assertions',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Transition from standalone scripts into structured API microservices and database engines.',
        items: [
          'Build RESTful APIs with FastAPI and Pydantic validation schemas',
          'Database ORM modeling with SQLAlchemy / Tortoise ORM and SQLite/PostgreSQL',
          'Background task processing with Celery / Redis or Python threadpools',
          'Containerize Python services with slim Docker images and environment variables',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Ship reliable tools that solve real human and developer workflow pain points.',
        summary:
          'Showcase automation, clean APIs, and asynchronous programming in tangible projects.',
        items: [
          'Automated Web Scraper & Notifier: Collects updates and pings Discord/Telegram',
          'FastAPI Microservice: Async API with authentication, OpenAPI docs, and SQLite',
          'CLI Workflow Assistant: Command-line tool accelerating everyday developer tasks',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Python bridges backend systems, automation, scripting, and data science.',
        summary:
          'One of the most versatile skillsets in technology across diverse industries.',
        items: [
          'INTERNSHIPS — Backend Engineering & Python Developer roles',
          'HACKATHONS — Rapid prototyping of data backends, bots, and APIs',
          'OPEN SOURCE — Contributing to Python packages, CLI tools, and ecosystem libraries',
          'COMMUNITY — Building community automation bots for Discord and Telegram',
          'JOBS — Automation engineering, backend microservices, and scripting roles',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Intelligent Scraping & Notification Bot',
        difficulty: 'STARTER',
        skills: ['Python', 'Requests', 'BeautifulSoup4', 'Telegram / Discord Webhooks'],
        outcome:
          'An automated cron-triggered scraper that tracks campus schedule updates, parses tables, and dispatches instant webhook notifications when changes are detected.',
      },
      {
        index: '02',
        title: 'Asynchronous RESTful Microservice',
        difficulty: 'INTERMEDIATE',
        skills: ['FastAPI', 'Pydantic', 'SQLite / SQLAlchemy', 'Pytest', 'Swagger'],
        outcome:
          'A production-style async web service with request validation, JWT authentication, relational models, automated pytest coverage, and autogenerated OpenAPI documentation.',
      },
      {
        index: '03',
        title: 'Developer Productivity CLI Suite',
        difficulty: 'CAPSTONE',
        skills: ['Click / Typer', 'Rich Terminal UI', 'Subprocess', 'Packaging / PyPI'],
        outcome:
          'A polished terminal tool packaged for pip that automates git branches, generates boilerplates, inspects environment health, and renders formatted tables in the terminal.',
      },
    ],
  },
  {
    id: 'ai-ml',
    index: '04',
    title: 'AI / MACHINE LEARNING',
    tagline: 'MATHEMATICS, DATA PIPELINES & INTELLIGENT SYSTEMS',
    description:
      'Build the foundations needed to understand, use and create intelligent systems.',
    progression: [
      'Python',
      'Mathematics',
      'Data',
      'ML Fundamentals',
      'Deep Learning',
      'AI Applications',
      'Projects',
    ],
    externalUrl: 'https://roadmap.sh/ai-engineer',
    externalLabel: 'roadmap.sh / ai-engineer',
    externalNote: 'Explore official modern AI engineering and applied machine learning tracks on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Build mathematical intuition: linear algebra, multivariable calculus, and probability.',
        items: [
          'Linear Algebra: Vectors, matrices, eigenvalues, dot products, vector spaces',
          'Calculus & Optimization: Partial derivatives, gradients, chain rule, cost functions',
          'Probability & Statistics: Distributions, Bayes Theorem, variance, hypothesis testing',
          'Scientific Python: NumPy matrix operations, Pandas DataFrames, and vectorization',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Feature engineering, classical machine learning, and evaluation metrics.',
        summary:
          'Master supervised and unsupervised learning algorithms before touching deep neural networks.',
        items: [
          'Data cleaning: Handling missing values, categorical encoding, scaling & outliers',
          'Supervised Learning: Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost',
          'Unsupervised Learning: K-Means clustering, PCA dimensionality reduction',
          'Model evaluation: Train/test splits, cross-validation, precision/recall, ROC-AUC',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Participate in benchmark datasets, debug overfitting, and implement algorithms from scratch.',
        items: [
          'Code gradient descent and linear regression from mathematical scratch in NumPy',
          'Conduct comprehensive exploratory data analysis (EDA) on real-world Kaggle datasets',
          'Tune hyperparameters with GridSearch/Optuna and eliminate data leakage',
          'Build an image classifier using PyTorch convolutional neural networks (CNNs)',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Harness modern foundational models, embeddings, vector databases, and LLM orchestration.',
        items: [
          'Deep Learning with PyTorch: Tensors, loss functions, optimizers, and backpropagation',
          'Transformers & Attention mechanism: Self-attention, embeddings, and tokenization',
          'Retrieval-Augmented Generation (RAG): Vector databases (Chroma, Pinecone) & embeddings',
          'Serving models via FastAPI and tracking experiments with Weights & Biases',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Create tangible intelligent software that solves domain-specific challenges.',
        summary:
          'Deploy working models and AI applications that users can interact with directly.',
        items: [
          'Exploratory Data Analysis Report: Deep analytical study with interactive charts',
          'Predictive ML Pipeline: Trained model deployed as an accessible prediction API',
          'Domain-Specific RAG Application: Grounded LLM interface querying private documents',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'From research labs to applied AI product teams across the globe.',
        summary:
          'Applied AI is rewriting software engineering, creating immense demand for grounded builders.',
        items: [
          'INTERNSHIPS — Machine Learning Engineering & Applied AI internships',
          'HACKATHONS — Shipping functional AI solutions and LLM wrappers with real utility',
          'OPEN SOURCE — Contributing to Hugging Face, LangChain, or open model ecosystems',
          'COMMUNITY — Running paper reading groups and workshops on applied deep learning',
          'JOBS — Data Scientist, ML Engineer, and AI Solutions Architect positions',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Exploratory Data Science & Insight Engine',
        difficulty: 'STARTER',
        skills: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Statistical Testing'],
        outcome:
          'An empirical data investigation uncovering hidden correlations in open education or urban mobility datasets, published with reproducible Jupyter notebooks and interactive plots.',
      },
      {
        index: '02',
        title: 'End-to-End Predictive ML API',
        difficulty: 'INTERMEDIATE',
        skills: ['Scikit-Learn', 'FastAPI', 'Joblib', 'Docker', 'Evaluation Metrics'],
        outcome:
          'A trained classification pipeline predicting outcomes from input parameters, packaged into a containerized microservice with input schema validation and latency tracking.',
      },
      {
        index: '03',
        title: 'Document-Grounded RAG Assistant',
        difficulty: 'CAPSTONE',
        skills: ['PyTorch', 'Hugging Face', 'Vector DB', 'LangChain', 'FastAPI'],
        outcome:
          'A context-aware AI application that ingests multi-page technical documentation, indexes dense vector embeddings, and answers user questions with verified source citations.',
      },
    ],
  },
  {
    id: 'cloud',
    index: '05',
    title: 'CLOUD',
    tagline: 'CONTAINERS, CLOUD PLATFORMS & INFRASTRUCTURE AS CODE',
    description:
      'Understand how modern applications are deployed, scaled and operated.',
    progression: [
      'Networking Basics',
      'Linux',
      'Cloud Fundamentals',
      'Containers',
      'CI/CD',
      'Cloud Services',
      'Infrastructure',
    ],
    externalUrl: 'https://roadmap.sh/devops',
    externalLabel: 'roadmap.sh / devops',
    externalNote: 'Explore the definitive DevOps, cloud, and site reliability engineering roadmap on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Master the operating system of the internet: Linux terminals, networking, and shell scripts.',
        items: [
          'Linux administration: File permissions, process management, systemd, SSH keys',
          'Networking fundamentals: IP addressing, Subnets, DNS, TCP/UDP, HTTP/HTTPS, Ports',
          'Bash scripting: Variables, loops, conditions, and automation scripts',
          'Security basics: Firewalls (UFW), TLS certificates, and secure shell configuration',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Containerization, reproducible runtimes, and reverse proxies.',
        summary:
          'Package software once and run it identically across development and cloud environments.',
        items: [
          'Docker: Dockerfiles, multi-stage builds, layers, image caching & docker-compose',
          'Web servers & reverse proxies: Nginx configuration, routing, and SSL termination',
          'Cloud concepts: Compute (VMs), Object Storage (S3), Virtual Networks (VPCs)',
          'Version control workflows & automated branch protections in GitHub',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Automate deployments with CI/CD pipelines and configure self-healing containers.',
        items: [
          'Build a GitHub Actions workflow that runs automated tests on every pull request',
          'Deploy a multi-container web app with database and redis cache via docker-compose',
          'Provision a free-tier virtual machine (AWS EC2 / Oracle Cloud) and harden SSH access',
          'Configure Let’s Encrypt auto-renewing SSL certs via Certbot and Nginx',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Automate cloud infrastructure declaratively using code rather than web consoles.',
        items: [
          'Infrastructure as Code (IaC) with Terraform: Providers, resources, state files, variables',
          'Kubernetes fundamentals: Pods, Deployments, Services, Ingress, and ConfigMaps',
          'Monitoring & Observability: Prometheus metrics, Grafana dashboards, log aggregation',
          'Serverless patterns: Cloud Functions, API Gateways, and event-driven architecture',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Deliver resilient, automated infrastructure that teams can depend on.',
        summary:
          'Build cloud pipelines that ensure uptime, automate releases, and scale on demand.',
        items: [
          'Containerized Micro-Site: Hardened Nginx container with automated health checks',
          'Automated CI/CD Pipeline: GitHub Actions pipeline building, testing, and deploying',
          'Terraform-Provisioned Environment: Complete cloud VPC and compute created via code',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Every modern product team relies on cloud engineers to keep systems running.',
        summary:
          'DevOps and cloud skills bridge software engineering and operations at scale.',
        items: [
          'INTERNSHIPS — Cloud Engineering, DevOps, and Platform Engineering internships',
          'HACKATHONS — Managing infrastructure, databases, and deployment for team projects',
          'OPEN SOURCE — Contributing to Cloud Native Computing Foundation (CNCF) tools',
          'COMMUNITY — Setting up community servers, bots, and deployment infrastructure',
          'JOBS — Site Reliability Engineer (SRE), Cloud Architect, and DevOps Engineer',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Production-Hardened Containerized Reverse Proxy',
        difficulty: 'STARTER',
        skills: ['Docker', 'Nginx', 'Linux', 'TLS / SSL', 'Bash'],
        outcome:
          'A multi-stage Dockerized setup routing traffic to multiple local backend services with gzip compression, security headers, rate limiting, and automated SSL termination.',
      },
      {
        index: '02',
        title: 'Zero-Downtime Continuous Deployment Pipeline',
        difficulty: 'INTERMEDIATE',
        skills: ['GitHub Actions', 'Docker Hub', 'AWS EC2 / DigitalOcean', 'SSH Actions'],
        outcome:
          'A fully automated CI/CD pipeline executing unit tests, building multi-arch container images, pushing to a registry, and performing atomic zero-downtime container updates on VPS.',
      },
      {
        index: '03',
        title: 'Declarative Cloud VPC via Terraform',
        difficulty: 'CAPSTONE',
        skills: ['Terraform', 'AWS / Cloudflare', 'IaC', 'Networking', 'Monitoring'],
        outcome:
          'A version-controlled Infrastructure as Code repository creating isolated subnets, internet gateways, compute instances, security groups, and automated health checks from scratch.',
      },
    ],
  },
  {
    id: 'cybersecurity',
    index: '06',
    title: 'CYBERSECURITY',
    tagline: 'NETWORK DEFENSE, WEB SECURITY & THREAT ANALYSIS',
    description:
      'Learn how systems are protected, tested and secured.',
    progression: [
      'Networking',
      'Linux',
      'Security Fundamentals',
      'Web Security',
      'Security Tools',
      'Testing',
      'Specialization',
    ],
    externalUrl: 'https://roadmap.sh/cyber-security',
    externalLabel: 'roadmap.sh / cyber-security',
    externalNote: 'Explore the complete security analyst and offensive/defensive security path on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Understand how packets travel, how systems verify identity, and where vulnerabilities originate.',
        items: [
          'OSI model and TCP/IP stack: Packet headers, handshakes, DNS, ARP, ICMP',
          'Linux & Windows command-line auditing, file permissions, user privilege levels',
          'Cryptography basics: Symmetric/Asymmetric encryption, Hashing (SHA-256), Public Key Infrastructure',
          'CIA Triad: Confidentiality, Integrity, and Availability principles',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Analyze network packets, scan services, and understand common attack vectors.',
        summary:
          'Learn to inspect live traffic and identify common misconfigurations in software services.',
        items: [
          'Network packet analysis with Wireshark and tcpdump',
          'Network mapping, port scanning, and banner grabbing with Nmap',
          'OWASP Top 10 web vulnerabilities: SQLi, XSS, CSRF, IDOR, and Broken Authentication',
          'Security headers: CSP, HSTS, X-Frame-Options, and CORS misconfigurations',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Safely test exploits in isolated lab environments and participate in capture-the-flag (CTF) events.',
        items: [
          'Solve beginner-to-intermediate rooms on TryHackMe and OverTheWire Bandit',
          'Intercept and tamper with HTTP requests using Burp Suite Community Edition',
          'Exploit and remediate SQL Injection and Stored XSS in DVWA (Damn Vulnerable Web App)',
          'Audit local system security with automated auditing scripts (LinPEAS, WinPEAS)',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Transition from using existing tools to scripting your own scanners and defense mechanisms.',
        items: [
          'Write custom Python network automation and packet crafting scripts with Scapy',
          'Implement secure authentication: password hashing with bcrypt, MFA, rate-limiting',
          'Log analysis and intrusion detection with SIEM tools (Wazuh, Splunk, Suricata)',
          'Responsible disclosure, security report authoring, and CVSS severity scoring',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Demonstrate actionable security auditing and defensive engineering capability.',
        summary:
          'Build tools that actively safeguard software or reveal security gaps in controlled environments.',
        items: [
          'Network Reconnaissance Script: Multi-threaded port and banner analyzer in Python',
          'Web Application Vulnerability Scanner: Tool scanning common misconfigured headers and routes',
          'CTF Lab Challenge: Author an educational multi-stage security capture-the-flag scenario',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Safeguard critical infrastructure, user data, and financial networks.',
        summary:
          'Cybersecurity professionals are essential across enterprise, defence, and product teams.',
        items: [
          'INTERNSHIPS — Security Analyst, SOC Tier-1, and Penetration Testing internships',
          'HACKATHONS — Securing team architectures and participating in collegiate CTFs',
          'OPEN SOURCE — Auditing open packages and submitting responsible security disclosures',
          'COMMUNITY — Running CTF training sessions and security awareness workshops',
          'JOBS — Security Engineer, Application Security Specialist, and Penetration Tester',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Multi-Threaded Network Reconnaissance Tool',
        difficulty: 'STARTER',
        skills: ['Python', 'Socket Programming', 'Threadpool', 'CLI Arguments'],
        outcome:
          'A fast network scanner that scans subnet ranges, discovers open ports, grabs service banners, and outputs structured JSON audit reports.',
      },
      {
        index: '02',
        title: 'Automated Web Security Header & CORS Auditor',
        difficulty: 'INTERMEDIATE',
        skills: ['Python', 'HTTP Protocol', 'OWASP Guidelines', 'Reporting'],
        outcome:
          'A command-line security tool that analyzes target web applications for missing defense headers (CSP, HSTS, CORS wildcard risks) and generates an actionable remediation guide.',
      },
      {
        index: '03',
        title: 'Vulnerable-by-Design CTF Lab Challenge',
        difficulty: 'CAPSTONE',
        skills: ['Docker', 'Linux', 'Cryptography', 'Web Exploitation', 'Writeups'],
        outcome:
          'A containerized challenge environment containing a realistic multi-stage vulnerability chain (SQLi to privilege escalation) complete with challenge writeup and patch solution.',
      },
    ],
  },
  {
    id: 'ui-ux',
    index: '07',
    title: 'UI / UX',
    tagline: 'DESIGN PRINCIPLES, RESEARCH & INTENTIONAL INTERFACES',
    description:
      'Learn to design interfaces that are clear, useful and intentional.',
    progression: [
      'Design Principles',
      'UX Research',
      'Wireframes',
      'Visual Design',
      'Prototyping',
      'Design Systems',
      'Case Studies',
    ],
    externalUrl: 'https://roadmap.sh/ux-design',
    externalLabel: 'roadmap.sh / ux-design',
    externalNote: 'Explore the user experience and interface design roadmap on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Understand human perception, visual hierarchy, typography, and foundational usability.',
        items: [
          'Design fundamentals: Visual hierarchy, contrast, spacing, alignment, and balance',
          'Typography rules: Font pairing, scale ratios, line height, letter-spacing, readability',
          'Color theory: HSL systems, contrast ratios for accessibility (WCAG AA/AAA compliance)',
          'Figma basics: Frames, shapes, vector tools, shortcuts, and layer management',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'User research, information architecture, and structured layout systems.',
        summary:
          'Ground visual designs in actual user psychology, feedback loops, and intuitive navigation.',
        items: [
          'User research methodologies: User interviews, journey mapping, empathy maps',
          'Information architecture: User flows, site maps, card sorting, navigation models',
          'Wireframing: Rapid low-fidelity sketching, content prioritization, layout exploration',
          'Figma mastery: Auto-layout, components, variants, interactive states, and properties',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Critique existing software, redesign friction points, and prototype dynamic interactions.',
        items: [
          'Perform a heuristic evaluation of a frustrating student tool or campus portal',
          'Redesign a complex onboarding flow with clear microcopy and progressive disclosure',
          'Build high-fidelity responsive prototypes with smart animations and page transitions',
          'Conduct usability testing sessions with real peers and iterate on friction points',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Construct scalable design systems with design tokens, states, and developer handoff specs.',
        items: [
          'Design Token architecture: Color, spacing, radius, typography, and dark-mode pairing',
          'Comprehensive component libraries: Buttons, inputs, modals, cards, navigation',
          'Developer handoff: Inspect mode, variable exports, responsive specs, redlines',
          'Accessibility auditing: Screen reader flow, keyboard focus indicators, touch targets',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Create rigorous, user-tested product case studies that explain the "why".',
        summary:
          'Great design is not just pretty screens; it is clear problem definition and validated outcomes.',
        items: [
          'Student Workflow Redesign: Research-backed overhaul of an existing campus tool',
          'Scalable Design System: Tokenized, accessible UI kit with light and dark palettes',
          'End-to-End Product Case Study: Complete problem discovery to high-fidelity prototype',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Every great software product requires intentional, empathetic designers.',
        summary:
          'Bridge the gap between human needs and technical implementation across teams.',
        items: [
          'INTERNSHIPS — Product Design, UI/UX Design, and Interaction Design internships',
          'HACKATHONS — Driving product vision, wireframing, and user experience for teams',
          'OPEN SOURCE — Designing interfaces and documentation for open-source applications',
          'COMMUNITY — Creating visual assets, branding, and UX improvements for STC',
          'JOBS — Product Designer, UI Engineer, and UX Researcher at digital agencies and startups',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'Campus Tool Heuristic Evaluation & Redesign',
        difficulty: 'STARTER',
        skills: ['Figma', 'Heuristic Evaluation', 'Wireframing', 'User Testing'],
        outcome:
          'A documented UX overhaul of a fragmented campus web application, replacing confusing workflows with intuitive information architecture and clear call-to-actions.',
      },
      {
        index: '02',
        title: 'Accessible & Scalable Design System',
        difficulty: 'INTERMEDIATE',
        skills: ['Figma Tokens', 'Auto-Layout', 'Accessibility (WCAG)', 'Component Variants'],
        outcome:
          'A complete design system comprising 40+ atomic components, semantic color variables, light/dark modes, and documentation for seamless engineering handoff.',
      },
      {
        index: '03',
        title: 'Full Product Discovery Case Study',
        difficulty: 'CAPSTONE',
        skills: ['UX Research', 'User Journeys', 'Interactive Prototyping', 'Usability Metrics'],
        outcome:
          'A rigorous portfolio-ready case study detailing the end-to-end journey from user interviews and persona definition through iterative wireframing and validated Figma prototype.',
      },
    ],
  },
  {
    id: 'open-source',
    index: '08',
    title: 'OPEN SOURCE',
    tagline: 'PUBLIC COLLABORATION, GIT MASTERY & SOFTWARE CRAFTSMANSHIP',
    description:
      'Learn how real projects are built with other people, in public.',
    progression: [
      'Git',
      'GitHub',
      'Read Code',
      'Issues',
      'Contributions',
      'Pull Requests',
      'Collaboration',
      'Maintainer Practices',
    ],
    externalUrl: 'https://roadmap.sh/git-github',
    externalLabel: 'roadmap.sh / git-github',
    externalNote: 'Master git version control and GitHub collaboration practices on roadmap.sh.',
    stages: [
      {
        id: 'foundations',
        index: '01',
        title: 'FOUNDATIONS',
        quote: 'Learn the language. Understand the tools. Build the basics.',
        summary:
          'Master Git from the terminal: commits, branches, merges, remotes, and conflict resolution.',
        items: [
          'Git internals: Working directory, staging area, commit history, and HEAD pointer',
          'Branch management: Creating, switching, rebasing, and merging branches cleanly',
          'Remote repositories: Clones, forks, remotes, push/pull, and tracking branches',
          'Resolving merge conflicts calmly and writing atomic, readable commit messages',
        ],
      },
      {
        id: 'core-skills',
        index: '02',
        title: 'CORE SKILLS',
        quote: 'Navigating unfamiliar codebases, issue trackers, and collaboration etiquette.',
        summary:
          'Learn how to read other people’s code, trace execution paths, and communicate politely.',
        items: [
          'Reading large codebases efficiently with search tools (ripgrep, GitHub search)',
          'Understanding project structures: README, CONTRIBUTING.md, LICENSE, CODE_OF_CONDUCT',
          'Issue exploration: Triaging bugs, reproducing issues, and asking clarifying questions',
          'Setting up local developer environments from repository setup instructions',
        ],
      },
      {
        id: 'practice',
        index: '03',
        title: 'PRACTICE',
        quote: 'Exercises, problems and small experiments.',
        summary:
          'Make your first open contributions: documentation, test cases, and beginner-friendly bugs.',
        items: [
          'Find projects tagged with "good first issue" or "help wanted" on GitHub',
          'Submit documentation improvements, fix broken examples, and verify link integrity',
          'Write a unit test covering an untested edge case in a popular open tool',
          'Create a clean pull request with detailed descriptions, screenshots, and issue links',
        ],
      },
      {
        id: 'build',
        index: '04',
        title: 'BUILD',
        quote: 'Stop collecting tutorials. Start making things.',
        summary:
          'Tackle substantive bug fixes, feature requests, and publish your own open utilities.',
        items: [
          'Implement a requested feature according to project architectural guidelines',
          'Respond constructively to maintainer code reviews and rebase clean commit history',
          'Release your own open-source project with MIT/Apache-2.0 license and CI checks',
          'Configure automated semantic release pipelines and changelog generation',
        ],
      },
      {
        id: 'projects',
        index: '05',
        title: 'PROJECTS',
        quote: 'Contribute meaningfully to software used by thousands of builders worldwide.',
        summary:
          'Proof of collaboration in public is the highest-signal demonstration of engineering capability.',
        items: [
          'First Merged Open Source Contribution: Documented PR merged into a recognized repo',
          'Open-Source Developer CLI: Packaged utility with tests, documentation, and releases',
          'Community Repository Maintainer: Curate an open project with contributor guidelines',
        ],
      },
      {
        id: 'opportunities',
        index: '06',
        title: 'OPPORTUNITIES',
        quote: 'Your GitHub contribution graph is a living resume of collaborative capability.',
        summary:
          'Open-source builders often get hired directly by project maintainers and tech leaders.',
        items: [
          'INTERNSHIPS — Google Summer of Code (GSoC), LFX Mentorship, and MLH Fellowship',
          'HACKATHONS — Open-source track competitions and community sprint challenges',
          'OPEN SOURCE — Core maintainer invitations and sponsorship opportunities',
          'COMMUNITY — Leading STC open-source hackathons and sprint weekends',
          'JOBS — Global remote engineering roles where public contributions are preferred',
        ],
      },
    ],
    projects: [
      {
        index: '01',
        title: 'First Merged Open Source Pull Request',
        difficulty: 'STARTER',
        skills: ['Git', 'GitHub Pull Requests', 'Issue Triaging', 'Markdown'],
        outcome:
          'A successfully reviewed and merged contribution to an active open-source project, demonstrating respectful collaboration, git fluency, and clean code review follow-through.',
      },
      {
        index: '02',
        title: 'Packaged Open-Source Developer Utility',
        difficulty: 'INTERMEDIATE',
        skills: ['Open Source Licensing', 'GitHub Actions CI', 'SemVer', 'Testing'],
        outcome:
          'A published and maintained open-source developer package featuring automated GitHub Actions tests, continuous release notes, issue templates, and comprehensive documentation.',
      },
      {
        index: '03',
        title: 'Multi-Contributor Community Tool',
        difficulty: 'CAPSTONE',
        skills: ['Maintainer Leadership', 'Code Review', 'Project Architecture', 'Community Docs'],
        outcome:
          'An active open-source repository designed for community contribution, featuring clear CONTRIBUTING guides, automated linting, automated PR validation, and welcoming mentor reviews.',
      },
    ],
  },
];

export const NOT_SURE_CHOICES = [
  {
    id: 'web-dev-choice',
    prompt: 'I WANT TO BUILD WEBSITES',
    roadmapId: 'web-development',
    label: 'WEB DEVELOPMENT',
  },
  {
    id: 'java-dsa-choice',
    prompt: 'I WANT TO CRACK CODING INTERVIEWS',
    roadmapId: 'java-dsa',
    label: 'JAVA + DSA',
  },
  {
    id: 'ai-ml-choice',
    prompt: 'I WANT TO BUILD WITH AI',
    roadmapId: 'ai-ml',
    label: 'AI / MACHINE LEARNING',
  },
  {
    id: 'ui-ux-choice',
    prompt: 'I WANT TO DESIGN BETTER PRODUCTS',
    roadmapId: 'ui-ux',
    label: 'UI / UX',
  },
  {
    id: 'cloud-choice',
    prompt: 'I WANT TO WORK WITH REAL SYSTEMS',
    roadmapId: 'cloud',
    label: 'CLOUD',
  },
  {
    id: 'cyber-choice',
    prompt: 'I WANT TO UNDERSTAND SECURITY',
    roadmapId: 'cybersecurity',
    label: 'CYBERSECURITY',
  },
  {
    id: 'open-source-choice',
    prompt: 'I WANT TO CONTRIBUTE TO REAL PROJECTS',
    roadmapId: 'open-source',
    label: 'OPEN SOURCE',
  },
];
