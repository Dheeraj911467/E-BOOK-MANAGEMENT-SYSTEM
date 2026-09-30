import { Book } from '../types';

export const SAMPLE_BOOKS: Book[] = [
  {
    id: 'book-cs-01',
    isbn: '978-0132350884',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewsCount: 142,
    coverImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=700&q=80',
    badge: 'Popular',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.',
    longDescription: 'A classic handbook for software engineers and architects. This digital edition features complete refactoring exercises, code transformation diagrams, and best practice rules for writing readable, maintainable, and robust enterprise codebases.',
    pages: 464,
    language: 'English',
    publicationYear: 2008,
    publisher: 'Prentice Hall Academic',
    format: 'ePub + PDF',
    tableOfContents: [
      '1. Clean Code Principles',
      '2. Meaningful Names & Identifiers',
      '3. Functions & Separation of Concerns',
      '4. Formatting & Comments',
      '5. Objects and Data Structures',
      '6. Error Handling Architecture',
      '7. Unit Tests and Test-Driven Design',
      '8. Concurrency & Parallel Execution'
    ],
    sampleExcerpt: `Chapter 1: Clean Code
There are two parts to learning craftsmanship: knowledge and work. You must gain the knowledge of principles, patterns, practices, and heuristics that a craftsman knows, and you must also grind that knowledge into your fingers, eyes, and gut through rigorous and deliberate practice.

Writing clean code is like painting a picture. Most of us know whether a picture is painted well or badly. But being able to recognize good art doesn't mean we know how to paint. So too being able to recognize clean code doesn't mean that we know how to write it!`
  },
  {
    id: 'book-cs-02',
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms (CLRS 4th Ed.)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    category: 'Computer Science',
    price: 58.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80',
    badge: 'Staff Pick',
    description: 'The standard worldwide university reference text on computer algorithms, covering algorithmic design, asymptotic notation, dynamic programming, and computational geometry.',
    longDescription: 'Widely used in university computer science programs worldwide, CLRS provides an in-depth yet accessible introduction to algorithm design and asymptotic complexity. Features pseudocode, mathematical proofs, and rigorous problem sets.',
    pages: 1312,
    language: 'English',
    publicationYear: 2022,
    publisher: 'MIT Press',
    format: 'PDF Replica',
    tableOfContents: [
      'I. Foundations: Growth of Functions & Recurrences',
      'II. Sorting and Order Statistics',
      'III. Advanced Data Structures: Red-Black Trees, B-Trees',
      'IV. Advanced Design & Analysis Techniques (Dynamic Programming, Greedy Algorithms)',
      'V. Graph Algorithms: Shortest Paths, Maximum Flow',
      'VI. Selected Topics: Matrix Operations, NP-Completeness'
    ],
    sampleExcerpt: `1.1 Algorithms as a Technology
An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output. An algorithm is thus a sequence of computational steps that transform the input into the output.

We can also view an algorithm as a tool for solving a well-specified computational problem. The statement of the problem specifies in general terms the desired input/output relationship.`
  },
  {
    id: 'book-cs-03',
    isbn: '978-0132350891',
    title: 'Principles of Distributed Systems (4th Ed.)',
    author: 'Prof. Andrew S. Tanenbaum & Maarten van Steen',
    category: 'Computer Science',
    price: 42.50,
    originalPrice: 68.00,
    rating: 4.9,
    reviewsCount: 142,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
    badge: 'Staff Pick',
    description: 'A comprehensive, rigorous exploration of distributed computing paradigms. Featuring state-of-the-art case studies in cloud computing, Byzantine fault tolerance, decentralized consensus, and high-throughput microservices.',
    longDescription: 'Distills core principles behind cloud systems, distributed databases, replication protocols, peer-to-peer networks, and blockchain consensus. An indispensable academic foundation for distributed software architects.',
    pages: 620,
    language: 'English',
    publicationYear: 2023,
    publisher: 'Pearson Academic Press',
    format: 'Interactive Web Reader',
    tableOfContents: [
      '1. Introduction to Distributed System Models',
      '2. Communication Architectures: RPC, MOM, Multicast',
      '3. Processes, Virtualization, and Cloud Containers',
      '4. Naming & Distributed Lookup Protocols (Chord, DNS)',
      '5. Synchronization: Logical Clocks, Vector Timestamps & Paxos',
      '6. Consistency & Replication Models (Raft, CAP Theorem)',
      '7. Fault Tolerance & Byzantine Failure Mitigation'
    ],
    sampleExcerpt: `Chapter 1: Architectures for Scalability
A distributed system is a collection of autonomous computing elements that appears to its users as a single coherent system. Two aspects stand out: (1) independent autonomous components, and (2) software that presents a unified facade.

Modern systems span continents, connecting heterogeneous cloud infrastructure while maintaining linearizability and predictable latency bounds.`
  },
  {
    id: 'book-cs-04',
    isbn: '978-0134092669',
    title: 'Computer Systems: A Programmer\'s Perspective (CS:APP)',
    author: 'Randal E. Bryant & David R. O\'Hallaron',
    category: 'Computer Science',
    price: 59.99,
    originalPrice: 89.00,
    rating: 4.9,
    reviewsCount: 342,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
    badge: 'Bestseller',
    description: 'Explains the underlying abstractions of hardware, operating systems, memory hierarchies, and compilers that every systems programmer must know.',
    longDescription: 'Bridges hardware and software, explaining how CPU architectures, cache hierarchies, virtual memory subsystems, and assembly pipelines directly impact application performance, safety, and scale.',
    pages: 1150,
    language: 'English',
    publicationYear: 2021,
    publisher: 'Carnegie Mellon & Pearson',
    format: 'Interactive Web Reader',
    tableOfContents: [
      '1. A Tour of Computer Systems',
      '2. Representing and Manipulating Information',
      '3. Machine-Level Representation of Programs',
      '4. Processor Architecture & Pipelining',
      '5. Optimizing Program Performance',
      '6. The Memory Hierarchy & Cache Architectures',
      '7. Linking, Dynamic Libraries, and Relocation',
      '8. Exceptional Control Flow & Virtual Memory'
    ],
    sampleExcerpt: `Chapter 1: A Tour of Computer Systems
A computer system consists of hardware and systems software that work together to run application programs. Although specific implementations of systems change over time, the underlying concepts remain the same.

All information in a system—including disk files, programs stored in memory, user data stored in memory, and data transferred across a network—is represented as a bunch of bits.`
  },
  {
    id: 'book-fic-01',
    isbn: '978-0061120084',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    price: 12.50,
    originalPrice: 18.00,
    rating: 4.9,
    reviewsCount: 230,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    badge: 'Classics',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, exploring compassion and justice in the American South.',
    longDescription: 'Winner of the Pulitzer Prize, Harper Lee\'s masterpiece explores racial prejudice, morality, innocence, and moral courage through the eyes of young Scout Finch and her lawyer father, Atticus.',
    pages: 336,
    language: 'English',
    publicationYear: 1960,
    publisher: 'J. B. Lippincott & Co.',
    format: 'ePub',
    tableOfContents: [
      'Part I: Maycomb County & Summer Inventions',
      'Part II: The Radley Enigma & Winter Fire',
      'Part III: The Trial of Tom Robinson',
      'Part IV: The Aftermath & Halloween Shadows',
      'Part V: Historical Context & Critical Commentary'
    ],
    sampleExcerpt: `Chapter 1
When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem’s fears of never being able to play football were assuaged, he was seldom self-conscious about his injury.

Maycomb was an old town, but it was a tired old town when I first knew it. In rainy weather the streets turned to red slop; grass grew on the sidewalks, the courthouse sagged in the square.`
  },
  {
    id: 'book-fic-02',
    isbn: '978-0141439518',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Fiction',
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.8,
    reviewsCount: 198,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    badge: 'Classics',
    description: 'A witty romantic classic of manners, social status, and personal misunderstandings centered on the vivacious Elizabeth Bennet and proud Mr. Darcy.',
    longDescription: 'Austen\'s brilliant comedy of manners continues to enchant generations of readers with its sparkling dialogue, incisive social commentary, and memorable characters navigating 19th-century English society.',
    pages: 432,
    language: 'English',
    publicationYear: 1813,
    publisher: 'Oxford World Classics',
    format: 'ePub + PDF',
    tableOfContents: [
      'Volume I: The Arrival of Mr. Bingley at Netherfield',
      'Volume II: Visits to Hunsford & Rosings',
      'Volume III: Pemberley, Crisis, and Reconciliation'
    ],
    sampleExcerpt: `Chapter 1
It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.`
  },
  {
    id: 'book-sci-01',
    isbn: '978-0553380163',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    price: 15.99,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    badge: 'Popular',
    description: 'From the Big Bang to black holes, Stephen Hawking delves into the fundamental cosmological questions about the origin and fate of the universe.',
    longDescription: 'Hawking takes non-specialist readers on a mesmerizing journey through spacetime, quantum mechanics, gravitational singularities, and the search for a unified Theory of Everything.',
    pages: 256,
    language: 'English',
    publicationYear: 1988,
    publisher: 'Bantam Academic Books',
    format: 'ePub + PDF',
    tableOfContents: [
      '1. Our Picture of the Universe',
      '2. Space and Time',
      '3. The Expanding Universe',
      '4. The Uncertainty Principle',
      '5. Elementary Particles and the Forces of Nature',
      '6. Black Holes and Hawking Radiation',
      '7. The Origin and Fate of the Universe',
      '8. The Unification of Physics'
    ],
    sampleExcerpt: `Chapter 1: Our Picture of the Universe
A well-known scientist once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy.

At the end of the lecture, a little old lady at the back of the room got up and said: "What you have told us is rubbish. The world is really a flat plate supported on the back of a giant tortoise." The scientist gave a superior smile before replying, "What is the tortoise standing on?" "You're very clever, young man, very clever," said the old lady. "But it's turtles all the way down!"`
  },
  {
    id: 'book-sci-02',
    isbn: '978-0199539314',
    title: 'Quantum Dynamics: Waveforms & Particles',
    author: 'Dr. Eliza Reed & Prof. Arthur M. Thorne',
    category: 'Science',
    price: 52.00,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 210,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=80',
    badge: 'Academic',
    description: 'An advanced university monograph exploring particle-wave duality, Hilbert space formalisms, quantum entanglement, and decoherence in macroscopic states.',
    longDescription: 'Targeted at senior undergraduates and graduate researchers, this text bridges introductory quantum theory and modern quantum computation paradigms.',
    pages: 580,
    language: 'English',
    publicationYear: 2024,
    publisher: 'Cambridge Scientific Press',
    format: 'ePub + PDF',
    tableOfContents: [
      '1. Mathematical Foundations in Hilbert Spaces',
      '2. The Schrödinger & Heisenberg Pictures',
      '3. Angular Momentum & Spin States',
      '4. Perturbation Theory & Variational Methods',
      '5. Quantum Entanglement & Bell Inequalities',
      '6. Density Matrices & Environmental Decoherence'
    ],
    sampleExcerpt: `Preface
The transition from classical mechanics to quantum phenomenology requires casting away deterministic trajectories in favor of probability amplitude densities evolving over complex vector spaces. This volume provides pedagogical rigor while keeping experimental confirmations in view.`
  },
  {
    id: 'book-biz-01',
    isbn: '978-1422157978',
    title: 'Competitive Strategy: Techniques for Analyzing Industries',
    author: 'Michael E. Porter',
    category: 'Business',
    price: 38.50,
    originalPrice: 55.00,
    rating: 4.7,
    reviewsCount: 165,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    badge: 'Business',
    description: 'The cornerstone treatise on strategic management introducing the Five Forces model, generic strategies, and industry evolution dynamics.',
    longDescription: 'Porter\'s landmark work transformed business school pedagogy and corporate strategic planning, providing actionable analytical frameworks for assessing industry structures and building sustained competitive advantage.',
    pages: 432,
    language: 'English',
    publicationYear: 1980,
    publisher: 'Free Press / Harvard Business',
    format: 'ePub + PDF',
    tableOfContents: [
      '1. The Structural Analysis of Industries',
      '2. Generic Competitive Strategies',
      '3. A Framework for Competitor Analysis',
      '4. Market Signals and Strategic Commitment',
      '5. Competitive Moves in Oligopoly',
      '6. Structural Evolution across Industry Life Cycles'
    ],
    sampleExcerpt: `Chapter 1: The Five Competitive Forces
The essence of formulating competitive strategy is relating a company to its environment. Although the relevant environment is very broad, encompassing social as well as economic forces, the key aspect of the firm’s environment is the industry or industries in which it competes.`
  },
  {
    id: 'book-biz-02',
    isbn: '978-0062457714',
    title: 'The Lean Startup: Innovation Under Extreme Uncertainty',
    author: 'Eric Ries',
    category: 'Business',
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.6,
    reviewsCount: 280,
    coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80',
    badge: 'Popular',
    description: 'How modern entrepreneurs use continuous innovation and validated learning to create radically successful businesses with minimal waste.',
    longDescription: 'Offers entrepreneurs and corporate product leaders a systematic, scientific approach to creating and managing startups, relying on validated learning, rapid experimentation, and the Build-Measure-Learn feedback loop.',
    pages: 336,
    language: 'English',
    publicationYear: 2011,
    publisher: 'Crown Business',
    format: 'ePub',
    tableOfContents: [
      'Part I: Vision - Start, Define, Learn, Experiment',
      'Part II: Steer - Leap, Test, Measure, Pivot (or Persevere)',
      'Part III: Accelerate - Batch, Grow, Adapt, Innovate'
    ],
    sampleExcerpt: `Introduction
Startup success is not a consequence of good genes or being in the right place at the right time. Startup success can be engineered by following the right process, which means it can be learned, which means it can be taught.

A startup is a human institution designed to create a new product or service under conditions of extreme uncertainty.`
  },
  {
    id: 'book-self-01',
    isbn: '978-0735211292',
    title: 'Atomic Habits: Tiny Changes, Remarkable Results',
    author: 'James Clear',
    category: 'Self-Development',
    price: 18.00,
    originalPrice: 27.00,
    rating: 4.9,
    reviewsCount: 420,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    badge: 'Bestseller',
    description: 'A proven framework for improving every day. Discover how small daily changes compound into life-altering personal and professional outcomes.',
    longDescription: 'Drawing on biology, psychology, and neuroscience, James Clear distills complex ideas into simple behaviors that can be easily applied to daily life, professional habits, and long-term skill acquisition.',
    pages: 320,
    language: 'English',
    publicationYear: 2018,
    publisher: 'Avery / Penguin Random House',
    format: 'ePub + PDF',
    tableOfContents: [
      '1. The Surprising Power of Atomic Habits',
      '2. How Your Habits Shape Your Identity',
      '3. The 1st Law: Make It Obvious',
      '4. The 2nd Law: Make It Attractive',
      '5. The 3rd Law: Make It Easy',
      '6. The 4th Law: Make It Satisfying',
      '7. Advanced Tactics: From Good to Truly Great'
    ],
    sampleExcerpt: `Chapter 1: The Surprising Power of Atomic Habits
It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis.

Too often, we convince ourselves that massive success requires massive action. Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. If you can get 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.`
  },
  {
    id: 'book-hist-01',
    isbn: '978-0062316097',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    price: 21.50,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 380,
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=700&q=80',
    badge: 'Popular',
    description: 'Explores how an insignificant ape became the ruler of planet Earth through the Cognitive, Agricultural, and Scientific Revolutions.',
    longDescription: 'Spanning from the evolution of archaic human species in the Stone Age up to the 21st century, Harari challenges everything we thought we knew about human history, culture, religion, and capitalism.',
    pages: 464,
    language: 'English',
    publicationYear: 2014,
    publisher: 'HarperCollins Academic',
    format: 'ePub + PDF',
    tableOfContents: [
      'Part I: The Cognitive Revolution (An Animal of No Significance)',
      'Part II: The Agricultural Revolution (History\'s Biggest Fraud)',
      'Part III: The Unification of Humankind (The Arrow of History, Money, Empires)',
      'Part IV: The Scientific Revolution (The Discovery of Ignorance, Capital, Industry)'
    ],
    sampleExcerpt: `Part One: The Cognitive Revolution
About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics.

About 70,000 years ago, organisms belonging to the species Homo sapiens started to form even more elaborate structures called cultures. The subsequent development of these human cultures is called history.`
  },
  {
    id: 'book-math-01',
    isbn: '978-3319110790',
    title: 'Linear Algebra Done Right (3rd Ed.)',
    author: 'Sheldon Axler',
    category: 'Mathematics',
    price: 34.95,
    originalPrice: 49.95,
    rating: 4.7,
    reviewsCount: 185,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=80',
    badge: 'Academic',
    description: 'A revolutionary approach to linear algebra that focuses on understanding the structure of linear operators on vector spaces rather than determinants.',
    longDescription: 'Axler takes a clean, proof-oriented, coordinate-free perspective that treats linear operators naturally, motivating eigenvalues and eigenspaces without artificial determinants.',
    pages: 340,
    language: 'English',
    publicationYear: 2015,
    publisher: 'Springer Undergraduate Mathematics',
    format: 'PDF Replica',
    tableOfContents: [
      '1. Vector Spaces: Definition & Subspaces',
      '2. Finite-Dimensional Vector Spaces: Span & Basis',
      '3. Linear Maps: Range, Null Space, & Invertibility',
      '4. Polynomials',
      '5. Eigenvalues, Eigenvectors, and Invariant Subspaces',
      '6. Inner Product Spaces and Gram-Schmidt Orthogonalization',
      '7. Operators on Inner Product Spaces (Spectral Theorem)'
    ],
    sampleExcerpt: `Chapter 1: Vector Spaces
Linear algebra is the study of linear maps on finite-dimensional vector spaces. Eventually we will study linear maps, but first we must define what a vector space is.

In this chapter we introduce vector spaces, clarify concepts of linear combination and linear independence, and establish the geometric foundations that govern higher dimensional geometry.`
  },
  {
    id: 'book-hist-02',
    isbn: '978-0198829911',
    title: 'Maritime Trade in the Classical World',
    author: 'Prof. J. K. H. Davenport',
    category: 'History',
    price: 29.99,
    originalPrice: 45.00,
    rating: 4.3,
    reviewsCount: 62,
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=80',
    badge: 'Archive',
    description: 'Excavated shipwrecks, amphora distribution routes, and imperial maritime commerce across the Mediterranean from 500 BCE to 400 CE.',
    longDescription: 'Drawing upon marine archaeology and ancient harbor epigraphy, this volume reconstructs grain, wine, marble, and silk transportation networks that fueled the Hellenistic and Roman economies.',
    pages: 388,
    language: 'English',
    publicationYear: 2021,
    publisher: 'Oxford University Press',
    format: 'PDF Replica',
    tableOfContents: [
      '1. Mediterranean Currents, Winds, and Classical Ship Design',
      '2. Amphora Typologies and Ceramic Residue Epigraphy',
      '3. The Annona System: Supplying Rome and Alexandria',
      '4. Private Merchant Guilds and Maritime Loan Contracts',
      '5. Piracy, Imperial Patrol Fleets, and Port Tariffs'
    ],
    sampleExcerpt: `Introduction: The Mare Nostrum Economy
The sea was never simply a geographical divide; it was the highway that sustained classical urban civilization. Without regular convoys transporting Egyptian grain, Spanish olive oil, and Aegean wine, the imperial cities of antiquity could not have endured.`
  }
];

export const CATEGORIES = [
  'All Disciplines',
  'Computer Science',
  'Fiction',
  'Science',
  'Business',
  'Self-Development',
  'History',
  'Mathematics'
] as const;
