// Portfolio Data - Edit this file to update all content on your website
export const portfolioData = {
  // Personal Information
  personalInfo: {
    name: "Vaibhav Kumar",
    title: "Computer Science Engineer",
    tagline: "Passionate about Machine Learning, AI, and Software Engineering, with a drive to keep learning and growing.",
    email: "vkk5156@psu.edu",
    phone: "+1 (555) 123-4567",
    location: "State College, PA",
    profileImage: "", // You can replace this with an actual image URL
    profileImageUrl: "/images/profile.jpg", // Add your profile image here
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/vaibhavkumr",
      github: "https://github.com/vbhk997",
      portfolio: "#"
    },
    // Video background settings
    heroVideo: "/videos/bg4.mp4", // Path to your video file
    heroImage: "/images/hero-still.png", // Fallback poster image (shown before video loads)
    animationStartPercent: 10 // Start animations when video is 10% complete
  },

  // About Section
  about: {
    description1: "I’m a computer science student at Penn State with a strong foundation in software development, AI/ML, and quantitative analysis. Alongside my degree, I’m pursuing minors in Engineering Entrepreneurship and Cybersecurity, and I’ve made the Dean’s List every semester with a GPA of 3.83. My academic path has been driven by curiosity and a hands-on approach, whether it’s building machine learning pipelines, designing embedded systems, or creating full-stack applications, I enjoy bridging theory with real-world problem solving.",
    description2: "Professionally, I’ve worked as a Machine Learning & Data Analytics Intern at Indian Oil Corporation, where I applied clustering and churn prediction models on large customer datasets to support retention strategies and safeguard recurring sales. As a Software Developer Intern at A.I.L.S, I built scalable form-builder and workflow automation systems, integrating APIs, microservices, and secure authentication in production-ready environments. These roles gave me experience across both applied data science and robust software engineering.",
    description3: "Beyond academics and internships, I co-founded the Hyperloop Development Club at Penn State, where I lead technical strategy for a 40+ member interdisciplinary team, and serve as Secretary for the Association for Computing Machinery, helping organize technical workshops and events for thousands of students. My projects span from financial analytics systems and legal AI assistants to an AI-powered smart notes app for STEM learners. Whether developing ML strategies with measurable impact or building tools that improve everyday productivity, I thrive at the intersection of technology, data, and innovation.",
    stats: [
      { number: "5+", label: "Years Experience" },
      { number: "50+", label: "Projects Completed" },
      { number: "10+", label: "Patents Filed" }
    ]
  },

  // Projects
  projects: [
    {
      id: 1,
      title: "Handwriting and Tremor Analysis for Stress Detection using Machine Learning / Embedded Systems",
      description: "Developing an on-device ML pipeline that combines handwriting features and tremor signals from styluses to detect early signs of stress, with a companion app generating real-time stress trend reports.",
      icon: "🚗",
      technologies: ["App Development", "Machine Learning", "Embedded Systems"],
      modalTechnologies: ["Machine Learning (XGBoost, TFLite)", "Signal Processing (tremor data analysis, drift detection)", "Hidden Markov Models (smoothing and temporal modeling)", "On-Device ML Deployment (lightweight inference, optimization)", "Mobile App Development (real-time data processing, UI integration)", "Embedded Systems (stylus + IMU sensor data fusion)", "Data Engineering (feature extraction from handwriting and motion data)", "Model Evaluation (AUROC, calibration)"],
      imageUrl: "/images/projects/p1.jpg", // Add your project image here
      cadFile: "", // Add CAD file path here
      gallery: "", // Add gallery images here
      // Detailed information for modal
      detailedDescription: [
        "This project is centered on developing an on-device machine learning system that uses XGBoost and TensorFlow Lite to combine handwriting features captured from a stylus, including pressure, tilt, and stroke patterns, with tremor signals from an IMU sensor. By bringing these two data sources together, the system can identify early signs of stress and anxiety with higher reliability. To improve accuracy over time, the pipeline integrates baseline calibration, drift detection, and Hidden Markov smoothing to handle signal variability and user-specific differences.",
        "In addition to the ML model, I am building a companion mobile application that processes data in 10 second intervals and produces stress trend reports that are easy to interpret. The aim is to achieve an AUROC of at least 0.80, ensuring strong predictive performance. Ultimately, the project is designed to provide a lightweight, real-time, and clinically useful tool that can support continuous stress monitoring and help individuals or healthcare providers take early preventive actions.",
      ],
      challenges: [
        "Tremor signals (4–12 Hz) are very small and easily drowned out by normal handwriting motion, desk vibrations, or electrical noise.",
        "Running ML models efficiently on-device with limited compute and memory is difficult.",
        "Writing styles differ greatly between users, making it hard to define a single “stress threshold.”",
        "Stress levels fluctuate over time, so short-term signals may give misleading results."
      ],
      solutions: [
        "Apply digital filtering (band-pass FFT + Butterworth filters) and only enabled tremor logging during stationary pen posture to isolate genuine fine-motor tremors.",
        "Optimize ML models with TensorFlow Lite for lightweight, low-latency inference on mobile devices.",
        "Built per-user baselines over several days and apply transfer/online learning for personalized calibration.",
        "Incorporate Hidden Markov Models to smooth predictions over time and capture temporal patterns of stress more reliably."
      ],
      results: "",
      duration: "Ongoing",
      teamSize: "Aug 2025 - Current",
      role: "Lead Thermal Engineer"
    },
    {
      id: 2,
      title: "Churn and Customer Lifetime Value Predictor",
      description: "Built a churn prediction and customer lifetime value model using RFM and XGBoost, achieving 98% accuracy on 20,000+ records. Delivered a web platform with secure client access to churn risk scores, insights, and retention strategies.",
      icon: "🏭",
      technologies: ["Machine Learning", "RFM Analysis", "Full Stack Development"],
      modalTechnologies: ["RFM Analysis", "XGBoost", "Machine Learning", "Feature Engineering", "Customer Segmentation", "Model Evaluation (Accuracy, Precision, Recall)", "Docker", "Full-Stack Web Development", "Data Visualization"],
      imageUrl: "/images/projects/p2.png", // Add your project image here
      cadFile: "", // Add CAD file path here
      gallery: [
        "/images/projects/churnpred/p1.png",
        "/images/projects/churnpred/p2.png",
        "/images/projects/churnpred/p3.png",
        "/images/projects/churnpred/p4.png",
        "/images/projects/churnpred/p5.png",
      ], // Add gallery images here
      detailedDescription: [
        "This project involved developing a machine learning pipeline for churn prediction and customer lifetime value estimation, aimed at helping small-to-mid cap businesses retain customers and increase profitability. Using RFM (Recency, Frequency, Monetary) analysis as the foundation, I engineered customer behavior features and applied XGBoost to classify high-risk customers with 98% accuracy on a dataset of over 20,000 records.",
        "Beyond modeling, I containerized the backend with Docker and deployed a full-stack web application where clients could securely log in and access dashboards showing churn risk scores, personalized retention insights, and customer lifetime value metrics. The system was designed to be scalable, interpretable, and actionable, making it easy for business teams to integrate ML-driven insights into their customer engagement strategies."
    ],
      challenges: [
        "Translating raw RFM features into meaningful business insights was not straightforward.",
        "Class imbalance between churned and retained customers made predictions biased.",
      ],
      solutions: [
        "Engineered derived features and created interpretable dashboards that mapped model outputs to actionable insights.",
        "Applied resampling and class weighting in XGBoost to balance prediction outcomes.",
      ],
      results: [
        "Achieved 98% accuracy in predicting churn on 20,000+ customer records.",
        "Delivered a scalable web platform for real-time churn risk tracking and decision support.",
      ],
      duration: "3 months",
      teamSize: "Mar 2025 - May 2025",
      role: "Project Lead & Automation Engineer"
    },
    {
      id: 3,
      title: "ML-Based Equity Momentum Ranking System with Backtesting and Risk Analytics",
      description: "Developed and backtested a LightGBM-based momentum trading strategy using 12+ technical indicators on NSE-100 data, achieving a Sharpe ratio of 2.06. Evaluated performance with drawdown analysis to ensure risk-adjusted returns.",
      icon: "🌱",
      technologies: ["LightGBM", "Quant Finance", "ML", "Backtesting", "Time Series Analysis"],
      modalTechnologies: ["LightGBM", "Quantitative Finance", "Feature Engineering (Technical Indicators)", "Backtesting", "Sharpe Ratio", "Drawdown Analysis", "Risk Analytics", "Python (pandas, NumPy, matplotlib)", "Time Series Modeling", "Model Evaluation"],
      imageUrl: "/images/projects/p3.png", // Add your project image here
      cadFile: "", // Add CAD file path here
      gallery: "", // Add gallery images here
      detailedDescription: [
        "This project focused on building a machine learning-driven equity momentum ranking system for the NSE-100 index. I engineered features from over 12 technical indicators and trained a LightGBM model to rank stocks by momentum potential across five years of historical data. The strategy was extensively backtested to validate profitability and robustness under varying market conditions.",
        "Performance evaluation included calculating the Sharpe ratio (2.06) to measure risk-adjusted returns, as well as conducting maximum drawdown analysis to assess downside risk exposure. The pipeline was designed to combine predictive accuracy with risk management insights, providing a reliable framework for data-driven investment decisions.",
      ],
      challenges: [
        "Avoiding overfitting to historical market data.",
        "Handling multicollinearity among technical indicators.",
      ],
      solutions: [
        "Used cross-validation, out-of-sample testing, and feature regularization in LightGBM.",
        "Performed correlation checks and feature selection to retain only the most predictive indicators.",
      ],
      results: [
        "Achieved a Sharpe ratio of 2.06, indicating strong risk-adjusted returns.",
        "Validated the strategy across five years of NSE-100 historical data with stable performance.",
        "Demonstrated resilience to market volatility through drawdown-controlled backtesting."
      ],
      duration: "3 months",
      teamSize: "May 2025 - Jul 2025",
      role: "Senior Aerodynamics Engineer"
    },
    {
        id: 4,
        title: "Falcon-based Legal Q&A Assistant Development",
        description: "Fine-tuned a Falcon-1B LLM with LoRA on 10K+ Indian legal Q&A pairs to build a lightweight legal assistant. Integrated Retrieval-Augmented Generation (RAG) for accurate, real-time query responses under 2GB RAM.",
        icon: "🔧",
        technologies: ["LoRA Fine Tuning", "RAG", "Python"],
        modalTechnologies: ["Falcon-1B", "LoRA Fine-Tuning", "Retrieval-Augmented Generation (RAG)", "Large Language Models", "Model Optimization", "Python (HuggingFace, Transformers)"],
        imageUrl: "/images/projects/p4.png", // Add your project image here
        cadFile: "", // Add CAD file path here
        gallery: "", // Add gallery images here
        detailedDescription: [
            "This project centered on creating a compact yet powerful legal Q&A assistant tailored for Indian legal queries. I fine-tuned the Falcon-1B language model using LoRA on a dataset of over 10,000 Q&A pairs, optimizing the model to deliver high-quality answers while maintaining a small memory footprint suitable for resource-constrained environments.",
            "The assistant was further enhanced with Retrieval-Augmented Generation (RAG), which enabled it to pull relevant context from external sources before generating responses, significantly improving accuracy and recall. Designed to run under 2GB of RAM, the system demonstrates the ability to deploy advanced LLMs in low-latency, real-time applications, making legal information more accessible and efficient."
        ],
        challenges: [
          "Limited compute and memory constraints for deploying large models.",
          "Ensuring legal accuracy and context relevance in responses.",
        ],
        solutions: [
          "Applied LoRA fine-tuning and model compression techniques to fit within a 2GB RAM environment.",
          "Working to integrate Retrieval-Augmented Generation (RAG) to ground answers in curated legal sources.",
        ],
        results: [
          "Successfully deployed a Falcon-1B legal assistant running under 2GB RAM.",
          "Enabled real-time query answering for legal use cases in a lightweight, accessible format.",
        ],
        duration: "2 months",
        teamSize: "May 2025 - Jun 2025",
        role: "Robotics Engineer"
      },
      {
        id: 5,
        title: "Alexa-Integrated Smart Vehicle Navigation System",
        description: "Collaborated with L&T Technological Services to integrate Alexa Skills into automotive systems, enhancing navigation accuracy across 10,000+ cities. Built real-time distance calculation features using Python, AWS Lambda, and Google APIs.",
        icon: "🔧",
        technologies: ["AWS Lambda", "Python", "Google APIs"],
        modalTechnologies: ["AWS Lambda", "Alexa Skill Integration", "Python", "Google Distance Matrix API", "Google Maps API", "Cloud Computing", "Smart Vehicle Systems", "Voice-Enabled Interfaces", "Real-Time Data Processing"],
        imageUrl: "/images/projects/p5.webp", // Add your project image here
        cadFile: "", // Add CAD file path here
        gallery: "", // Add gallery images here
        detailedDescription: [
            "During my collaboration with L&T Technological Services in Mysuru, India, I worked on a smart vehicle project focused on integrating Alexa Skills with automotive navigation systems. The goal was to enhance accuracy and provide smoother, voice-driven navigation experiences for drivers across 10,000+ cities.",
            "My contributions included developing real-time distance calculation modules in Python, leveraging Google Distance Matrix and Maps APIs to deliver precise routing. I also worked with AWS Lambda to enable seamless Alexa skill integration and presented the final solution to potential clients. This project not only improved vehicle safety and awareness but also highlighted how AI, cloud, and voice interfaces can come together to advance connected vehicle technologies.",
        ],
        challenges: [
          "Ensuring navigation accuracy across thousands of diverse city maps.",
          "Integrating Alexa Skills seamlessly with automotive systems.",
        ],
        solutions: [
          "Integrated Google Distance Matrix and Maps APIs to dynamically calculate precise routes.",
          "Built custom Alexa intents and streamlined skill invocation for smooth voice-based navigation.",
        ],
        results: [
          "Enhanced navigation accuracy for vehicles in 10,000+ cities.",
          "Built a functional prototype integrating Alexa voice commands with automotive navigation.",
        ],
        duration: "2 months",
        teamSize: "Jun 2024 - Jul 2024",
        role: "Robotics Engineer"
      },
      {
        id: 6,
        title: "InChat – Social Media & Messaging App",
        description: "Developed a fully functional Android social media and messaging application with real-time chat, Firebase authentication, and user profile management. Focused on creating a responsive and user-friendly mobile experience.",
        icon: "🔧",
        technologies: ["Java", "Android App Development", "Firebase Database", "Android Studio"],
        modalTechnologies: ["Java", "Android Studio", "UI/UX Design", "Google Firebase", "Firebase Authentication", "Firebase Cloud Messaging", "Mobile App Development", "Real-Time Data Synchronization", "Push Notifications", "User Profile Management"],
        imageUrl: "/images/projects/p6.png", // Add your project image here
        cadFile: "", // Add CAD file path here
        gallery: [
          "/images/projects/inchat/p1.jpeg",
          "/images/projects/inchat/p2.jpeg",
          "/images/projects/inchat/p3.jpeg",
          "/images/projects/inchat/p4.jpeg",
          "/images/projects/inchat/p5.jpeg",
          "/images/projects/inchat/p7.jpeg",
        ], // Add gallery images here
        detailedDescription: [
            "Developed a social media and messaging platform using Java, Android Studio, and Google Firebase, tailored specifically for Android devices. The app allows users to create accounts, manage profiles, and connect through real-time messaging. I implemented Firebase Authentication to handle secure sign-up, login, and account management, while Firebase Cloud Messaging powered instant push notifications and synchronized conversations across devices.",
            "Users can personalize their profiles with pictures, bios, and connections, while integrated privacy settings give them control over visibility and content sharing. Building InChat gave me a strong foundation in mobile app development, covering UI/UX design, backend integration, and real-time communication systems, while also deepening my understanding of responsive interface design and cloud-based services.",
        ],
        challenges: [
          "Ensuring real-time synchronization of chats across multiple devices.",
          "Providing privacy controls for users.",
        ],
        solutions: [
          "Implemented Firebase Cloud Messaging and real-time database syncing to deliver instant updates.",
          "Added profile visibility and content-sharing settings to give users control over their data.",
        ],
        results: [
          "Achieved smooth performance and instant message delivery with Firebase integration.",
          "Strengthened expertise in Android mobile app development and cloud backend services.",
        ],
        duration: "1 year 2 months",
        teamSize: "May 2021 - Jul 2022",
        role: "Robotics Engineer"
      },
      {
        id: 7,
        title: "Capstone Project - F1 Race predictor and championship simulator",
        description: "Building an F1 race prediction and championship simulation platform that combines PostgreSQL, raw SQL, and machine learning. The system integrates Monte Carlo simulations with a web app where users can manage data, run predictions, and analyze team and driver performance.",
        icon: "🔧",
        technologies: ["Machine Learning", "PostgreSQL", "Database Design", "Monte Carlo Simulation", "Web Development"],
        modalTechnologies: ["PostgreSQL", "Database Design (BCNF)", "SQL DDL/DML", "Transactions and Rollback", "Data Validation and Error Handling", "XGBoost", "LightGBM", "Monte Carlo Simulation", "Web Development", "Data Visualization", "Sports Analytics", "CSV/JSON/Excel Export"],
        imageUrl: "/images/projects/f1.png", // Add your project image here
        cadFile: "", // Add CAD file path here
        gallery: "", // Add gallery images here
        detailedDescription: [
            "The F1 Race Predictor & Championship Simulator is a full-stack project I am currently developing, combining relational database engineering, machine learning, and web application design. At the core is a PostgreSQL database with 8–10 fully normalized BCNF tables that represent drivers, teams, cars, circuits, races, results, pit stops, penalties, simulations, and probabilities. I design the schema to support robust workflows, including inserting and updating race data, managing penalties, tracking pit stops, and handling rollbacks for invalid transactions. Strong error-handling rules prevent invalid entries, such as negative lap times or duplicate results.",
            "On top of this structured database, I am training predictive models (XGBoost/LightGBM) on historical F1 data to estimate race outcomes like finishing positions, points scored, and podium chances. These predictions then feed into a Monte Carlo simulator that runs thousands of season simulations, generating probabilistic insights such as each driver’s chance of winning the championship. I am also building a user-facing web app that allows interaction with the system, featuring driver and team management, analytical reports with tables and charts, a simulation dashboard, and flexible export formats (CSV, JSON, Excel). This project demonstrates my ability to design normalized relational databases, write raw SQL queries, integrate ML pipelines, and build simulation-based analytics, all applied to a creative and data-rich domain.",
        ],
        challenges: [
          "Producing realistic race predictions and championship outcomes.",
          "Designing a normalized schema that accurately models complex F1 entities and relationships.",
        ],
        solutions: [
          "I am training ML models (XGBoost/LightGBM) on historical data and running Monte Carlo simulations for robust probability estimates.",
          "I am creating an ER diagram and implementing 8–10 BCNF tables to represent drivers, teams, results, penalties, and simulations.",
        ],
        results: "",
        duration: "Ongoing",
        teamSize: "Sep 2025 - Present",
        role: "Robotics Engineer"
      },
      {
        id: 8,
        title: "This Portfolio Website",
        description: "Yep, I Developed a this portfolio website to showcase my projects, experience, and achievements. The site was fully responsive and integrated HTML, CSS, and JavaScript for smooth, interactive features. Used React state and props for dynamic rendering, HTML for structure, CSS for styling and responsive layouts, and JavaScript for interactivity.",
        icon: "🔧",
        technologies: ["React.js", "Javascript", "HTML", "CSS", "UI/UX Design", "React State & Props"],
        modalTechnologies: ["ReactJS", "JavaScript", "HTML", "CSS", "Responsive Web Design", "UI/UX Design", "React State & Props", "Animations & Transitions", "Frontend Development", "Prompt Engineering"],
        imageUrl: "/images/projects/p8.png", // Add your project image here
        cadFile: "", // Add CAD file path here
        gallery: "", // Add gallery images here
        detailedDescription: [
            "This project was a digital portfolio website built with React to highlight my professional experience, academic work, and technical projects. I employed React state and props to dynamically render content and manage user interactions, ensuring a smooth and personalized browsing experience. The frontend leveraged HTML for structure, CSS for styling and visual design, and JavaScript for interactivity and dynamic behavior.",
            "Animations, transitions, and responsive layouts were carefully integrated to provide seamless navigation across both desktop and mobile devices. Beyond serving as a personal portfolio, this project demonstrated my front-end development skills, my ability to design intuitive and user-friendly interfaces, and my understanding of modern web development practices.",
        ],
        challenges: "",
        solutions: "",
        results: "",
        duration: "1 month",
        teamSize: "Aug 2025 - Sep 2025",
        role: "Robotics Engineer"
      },
  ],

  // Skills
  skills: [
    {
      category: "Programming Languages / Frameworks",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 90 },
        { name: "SQL", level: 80 },
        { name: "C", level: 50 },
        { name: "C++", level: 70 },
        { name: "Javascript", level: 70 },
        { name: "React JS / Native", level: 75 },
        { name: "Git", level: 90 },
        { name: "HTML/CSS", level: 70 },
      ]
    },
    {
      category: "Machine Learning / AI",
      skills: [
        { name: "Pandas", level: 90 },
        { name: "Numpy", level: 80 },
        { name: "Matplotlib", level: 80 },
        { name: "Scikit-learn", level: 80 },
        { name: "Supervied Learning", level: 90 },
        { name: "Unsupervised Learning", level: 90 },
        { name: "Reinforcement Learning", level: 70 },
        { name: "Deep Learning", level: 80 },
        { name: "RAG", level: 65 },
        { name: "PyTorch", level: 70 },
      ]
    },
    {
      category: "Tools and Platforms",
      skills: [
        { name: "Jupyter Notebook", level: 95 },
        { name: "VS Code", level: 95 },
        { name: "Android Studio", level: 80 },
        { name: "GitHub", level: 90 },
        { name: "MS Excel", level: 80 },
        { name: "Firebase", level: 80 },
        { name: "Linux / Unix", level: 80 },
        { name: "Cursor", level: 90 },
        { name: "Co-pilot", level: 90 },
        { name: "Apache Spark", level: 60 },
        { name: "Figma", level: 75 },
      ]
    },
    {
      category: "Concepts / Relevant Courses",
      skills: [
        { name: "DBMS", level: 95 },
        { name: "Big Data", level: 80 },
        { name: "LLM Fine Tuning", level: 65 },
        { name: "App / Web Development", level: 90 },
        { name: "MLOps", level: 60 },
        { name: "Prompt Engineering", level: 85 },
        { name: "Embedded Systems", level: 60 },
      ]
    }
  ],

  // Experience
  experience: [
    {
      id: 1,
      company: "The Pennsylvania State University",
      companyLogo: "/images/experience/psu2.jpeg", // Company logo placeholder
      location: "State College, PA, United States",
      employmentType: "Part-time",
      totalDuration: "2 yrs 2 mos",
      positions: [
        {
          id: 1,
          title: "Math Proctor",
          period: "Sep 2023 - Present",
          duration: "2 yrs 1 mo",
          description: [
            "Ensured a secure testing environment for large-scale math exams, maintaining integrity of the assessment process.",
            "Collaborated with instructors and teaching assistants to coordinate exam logistics, including distribution of materials.",
            "Maintained records of attendance and incident reports, contributing to the overall quality control of the examination.",
          ],
          skills: ""
        },
        {
          id: 2,
          title: "Retail Dining Assistant",
          period: "Oct 2023 - May 2025",
          duration: "1 yr 8 mos",
          description: [
            "Managed high-volume order flow during peak dining hours, maintaining order accuracy and timeliness.",
            "Assisted in monitoring and managing inventory levels to minimize waste and ensure product availability.",
            "Reported low stock items to management and participated in restocking efforts.",
          ],
          skills: ""
        },
        {
          id: 3,
          title: "Teaching Assistant",
          period: "Aug 2023 - Dec 2023",
          duration: "5 mos",
          description: [
            "Provided invaluable support as a Physics Teaching Assistant in a dynamic classroom environment with 300+ students.",
            "Collaborated with the instructor to align teaching methods and ensure a seamless learning experience.",
            "Maintained knowledge of current pedagogical techniques to enhance the teaching and learning process.",
          ],
          skills: ""
        },
      ]
    },
    {
      id: 3,
      company: "The Hyperloop Development Club at Penn State",
      companyLogo: "/images/experience/looppsu.png",
      location: "State College, PA, United States",
      employmentType: "Club Work",
      totalDuration: "1 yr 2 mos",
      positions: [
        {
          id: 4,
          title: "Vice President / Co-Founder",
          period: "Aug 2024 - Present",
          duration: "1 yr 2 mos",
          description: [
            "Co-founded the Hyperloop Development Club at Penn State, focusing on designing and prototyping next-generation hyperloop transportation systems.",
            "Led a 25+ member interdisciplinary team across eight engineering disciplines, fostering innovation and collaboration.",
            "Developing a hyperloop pod equipped with a 12-slot dual-sided linear induction motor (DSLIM) powered by a 3kWh battery, with plans to build the battery management system (BMS) and inverter in-house.",
            "Aiming to participate in global hyperloop competitions such as the European Hyperloop Week, while securing $20,000 in sponsorship funding by 2026.",
          ],
          skills: ""
        }
      ]
    },
    {
        id: 4,
        company: "Indian Oil Corporation",
        companyLogo: "/images/experience/iocl.jpeg",
        location: "Mumbai, Maharashtra, India",
        employmentType: "Internship",
        totalDuration: "2 mos",
        positions: [
          {
            id: 5,
            title: "Machine Learning & Data Analytics Intern",
            period: "Jun 2025 - Aug 2025",
            duration: "2 mos",
            description: [
              "Segmented 10,000+ clients into 6 strategic groups using RFM analysis and K-Means clustering, enabling data-driven targeting for marketing campaigns.",
              "Designed and deployed dynamic Qlik Sense dashboards that automated reporting workflows and reduced analysis time by 60%.",
              "Leveraged Python (Pandas, Scikit-learn) and SQL for preprocessing, modeling, and dashboard integration in a real-time business environment.",
            ],
            skills: ""
          }
        ]
      },
      {
        id: 5,
        company: "The Association for Computing Machinery, Penn State",
        companyLogo: "/images/experience/acm.jpg",
        location: "State College, PA, United States",
        employmentType: "Club Work",
        totalDuration: "1 yr 1 mo",
        positions: [
          {
            id: 6,
            title: "Secretary",
            period: "Dec 2023 - Dec 2024",
            duration: "1 yr 1 mo",
            description: [
              "Managed operations for a 2000+ member student chapter, organizing talks, competitions, and technical workshops.",
              "Maintained and organized mailing lists to facilitate streamlined communication within the club.",
              "Actively promoted club events through email communications, contributing to increased participation and engagement among members",
            ],
            skills: ""
          }
        ]
      },
      {
        id: 6,
        company: "AILS (Attitude & Intelligence Learning Systems)",
        companyLogo: "/images/experience/mymedha.png", // Company logo placeholder
        location: "India, Remote",
        employmentType: "Internship",
        totalDuration: "3 mos",
        positions: [
          {
            id: 8,
            title: "Software Developer Intern",
            period: "Aug 2025 - Present",
            duration: "Ongoing",
            description: [
              "Developed a form builder with visual workflow automation system featuring 15+ node types for data processing using react, python.",
              "Implemented AI-powered report generation, RESTful APIs, secure authentication, with 3,900+ lines of backend code.",
              "Developed microservices architecture with webhook integrations, customer-specific report delivery, and containerized deployment.",
            ],
            skills: ""
          },
          {
            id: 8,
            title: "Software Developer Intern",
            period: "Jul 2024 - Aug 2024",
            duration: "2 mos",
            description: [
              "Collaborated toward a business model aimed at empowering young adults potentially impacting 20,000+ individuals.",
              "Performed in a team utilizing web development frameworks including, React, NextJS, Typescript, Javascript, PostGreSQL, Tailwind CSS, to build a scalable website, maintaining over 7,000+ lines of code.",
              "Conducted internal testing and debugging, identifying and resolving 20+ issues to better prepare for a robust launch.",
            ],
            skills: ""
          },
        ]
      },
      {
        id: 8,
        company: "Larsen & Toubro",
        companyLogo: "/images/experience/lt.jpeg", // Company logo placeholder
        location: "India, Remote",
        employmentType: "Collaboration Work",
        totalDuration: "2 mos",
        positions: [
          {
            id: 9,
            title: "Collaborator",
            period: "Jun 2024 - Jul 2024",
            duration: "2 mos",
            description: [
              "Developed and deployed an Alexa skill for calculating city-to-city distances using the Google Distance Matrix API, enhancing user experience for over 1,000 potential users.",
              "Integrated API functionalities and implemented robust error handling, leading to a 30% reduction in response time and increased reliability of the skill.",
              "Leveraged AWS Lambda for cloud deployment, optimizing the skill's accessibility across multiple Alexa-enabled devices.",
              "Collaborated with cross-functional teams to align the project with real-world applications in vehicle navigation systems, reinforcing mechanical engineering concepts in a digital environment."
            ],
            skills: [
                'Product Testing',
                'Information Technology Infrastructure',
                'Internet of Things (IoT)',
                'Python (Programming Language)',
                'Mechanical Systems',
                'Alexa Skills Kit (ASK)',
                'AWS Lambda'
              ]
          }
        ]
      },
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "The Pennsylvania State University, University Park",
      period: "2022 - 2026",
      description: "Minor: Engineering Entrepreneurship"
    },
    {
      id: 2,
      degree: "Hiranandani Foundation School, Thane",
      institution: "Thane, Maharashtra, India",
      period: "2018 - 2022",
      description: "High School"
    },
  ],

  // Certifications
  certifications: [
    "Wharton Online Business Foundations Specialization Certificate",
    "Google Data Analytics Certificate (Pursuing)",
    "AWS Certified Cloud Practitioner (Pursuing)",
    "The Complete Android T + Java Developer Course",
  ],

  // Navigation Menu
  navigation: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "resume", label: "Experience" },
    { id: "contact", label: "Contact" }
  ],

  // Extracurricular Activities
  extracurricular: [
    {
      id: 1,
      title: "Track and Field Athlete",
      role: "State Level Medalist",
      period: "2018 - Present",
      description: "Competitive sprinter specializing in 100m and 200m events. Track and field has taught me the value of consistent training, mental toughness, and the habit of being resilient.",
      achievements: [
        "Fastest Athlete in the School (2020)",
        "State Level Bronze Medalist (2020)",
        "School Record Holder - 4x100m Relay Team, 50m Sprint"
      ],
      gallery: [
        "/images/extracurricular/tf/tf1.jpg"
      ]
    },
    {
      id: 2,
      title: "Cricket (Fast Bowler)",
      role: "District Level Player",
      period: "2016 - Present",
      description: "Cricket has been my passion since childhood, and I've been playing since I was 10 years old. As a fast bowler, I love the adrenaline rush of charging in and the satisfaction of outsmarting batsmen with pace and swing.",
      achievements: [
        "Club Championship Semi-Finalist - Inter School Tournament (2018, 2019)",
        "District Level Qualifier - Selected for District Team (2019)",
        "School League Winner (2020)",
      ],
      gallery: [
        "/images/extracurricular/ckt/ckt2.mp4",
        "/images/extracurricular/ckt/ckt1.mp4",
      ]
    },
    {
      id: 3,
      title: "Rubik's Cube Speedsolving",
      role: "Competitive Solver",
      period: "2017 - Present",
      description: "I fell in love with the Rubik's Cube when I first solved it at age 12, and I've been hooked ever since. Speedsolving combines pattern recognition, muscle memory, and mental agility. I have also taught myself to solve it blindfolded.",
      achievements: [
        "Competed in multiple WCA (World Cube Association) competitions",
        "Unofficial Personal Best: 9.76 seconds (3x3x3)",
        "Mastered multiple cube sizes: 2x2, 3x3, 4x4, Pyraminx, Megaminx, Clock, and Skewb",
      ],
      gallery: [
        "/images/extracurricular/cube/cube.jpeg",
        "/images/extracurricular/cube/cube.mp4",
      ]
    },
    {
      id: 4,
      title: "Photography",
      role: "Hobby",
      period: "",
      description: "Photography is my way of capturing the world's hidden beauty and telling stories through a single frame. I love how a camera can freeze a moment in time and reveal details that the naked eye might miss. For me, everything around me is a blank canvas, and photography is the painting.",
      achievements: "",
      gallery: [
        "/images/extracurricular/photography/p1.JPG",
        "/images/extracurricular/photography/p2.jpg",
        "/images/extracurricular/photography/p3.JPG",
        "/images/extracurricular/photography/p4.jpg",
        "/images/extracurricular/photography/p5.jpg",
        "/images/extracurricular/photography/p7.jpeg",
        "/images/extracurricular/photography/p8.jpeg",
        "/images/extracurricular/photography/p9.jpg",
      ]
    },
    {
      id: 5,
      title: "Piano",
      role: "Hobby",
      period: "",
      description: "Playing the piano is one of my favorite hobbies. I love music, and love to play it. Whether I'm playing classical pieces or pop music, the piano has become my sanctuary where I can express myself freely and find peace in the rhythm.",
      achievements: "",
      gallery: [
        "/images/extracurricular/piano/p1.jpg",
      ]
    },
    {
      id: 6,
      title: "Karting",
      role: "Hobby",
      period: "",
      description: "I am a massive F1 fan, and I love the adrenaline that comes with the sport. That's what has drawn me to karting, and when I start, I immerse myself trying to find the best lines, and optimal braking points. There's nothing like the feeling of driving a kart and getting a good lap time.",
      achievements: "",
      gallery: [
        "/images/extracurricular/karting/k1.jpeg",
        "/images/extracurricular/karting/k2.jpeg",
      ]
    }
  ]
};
