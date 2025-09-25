
export interface RoadmapItem {
    name: string;
    type: string;
}

export interface RoadmapSection {
    title: string;
    items: RoadmapItem[];
}

export interface Roadmap {
    title: string;
    description: string;
    sections: RoadmapSection[];
}

export const roadmaps: { [key: string]: Roadmap } = {
    ai: {
        title: "AI & Data Scientist Roadmap",
        description: "A comprehensive roadmap for becoming an AI & Data Scientist.",
        sections: [
            {
                title: 'Mathematics',
                items: [
                    { name: 'Linear Algebra, Calculus, Mathematical Analysis', type: 'Topic' },
                    { name: 'Mathematics for Machine Learning', type: 'Courses' },
                    { name: 'Differential Calculus', type: 'Topic' },
                    { name: 'Coursera: Algebra and Differential Calculus', type: 'Course' }
                ]
            },
            {
                title: 'Statistics',
                items: [
                    { name: 'Statistics, CLT', type: 'Topic' },
                    { name: 'Coursera: Introduction to Statistics', type: 'Course' },
                    { name: 'Hypothesis Testing', type: 'Topic' },
                    { name: 'Coursera: Hypothesis Testing', type: 'Course' },
                    { name: 'Probability and Sampling', type: 'Topic' },
                    { name: 'Coursera: Probability and Statistics', type: 'Course' }
                ]
            },
            {
                title: 'Coding',
                items: [
                    { name: 'Learn Python Programming Language', type: 'Topic' },
                    { name: 'Data Structures and Algorithms (Python)', type: 'Topic' },
                    { name: 'Learn SQL', type: 'Topic' }
                ]
            },
            {
                title: 'Exploratory Data Analysis',
                items: [
                    { name: 'Data understanding, Data Analysis and Visualization', type: 'Topic' },
                    { name: 'Exploratory Data Analysis with Python and Pandas', type: 'Course' },
                ]
            },
            {
                title: 'Machine Learning',
                items: [
                    { name: 'Classic ML (Sup., Unsup.), Advanced ML (Ensembles, NNs)', type: 'Topic' },
                    { name: 'Open Machine Learning Course - Open Data Science', type: 'Course' },
                    { name: 'Machine Learning Specialization', type: 'Course' }
                ]
            },
            {
                title: 'Deep Learning',
                items: [
                    { name: 'Fully Connected, CNN, RNN, LSTM, Transformers, TL', type: 'Topic' },
                    { name: 'Deep Learning Specialization', type: 'Courses' },
                    { name: 'Deep Learning Book', type: 'eBook' }
                ]
            }
        ]
    },
    frontend: {
        title: "Frontend Developer Roadmap",
        description: "A guide to becoming a Frontend Developer.",
        sections: [
            {
                title: 'Internet',
                items: [
                    { name: 'How does the internet work?', type: 'Knowledge' },
                    { name: 'What is HTTP?', type: 'Knowledge' },
                    { name: 'What is DNS?', type: 'Knowledge' }
                ]
            },
            {
                title: 'HTML',
                items: [
                    { name: 'Learn the basics', type: 'Topic' },
                    { name: 'Writing Semantic HTML', type: 'Skill' },
                    { name: 'Forms and Validations', type: 'Skill' }
                ]
            },
            {
                title: 'CSS',
                items: [
                    { name: 'Learn the basics', type: 'Topic' },
                    { name: 'Making Layouts (Flexbox, Grid)', type: 'Skill' },
                    { name: 'Responsive Design', type: 'Skill' }
                ]
            },
            {
                title: 'JavaScript',
                items: [
                    { name: 'Learn the Basics', type: 'Topic' },
                    { name: 'Learn DOM Manipulation', type: 'Skill' },
                    { name: 'Fetch API / AJAX', type: 'Skill' }
                ]
            },
            {
                title: 'Pick a Framework',
                items: [
                    { name: 'React', type: 'Framework' },
                    { name: 'Vue.js', type: 'Framework' },
                    { name: 'Angular', type: 'Framework' }
                ]
            }
        ]
    },
    backend: {
        title: "Backend Developer Roadmap",
        description: "A guide to becoming a Backend Developer.",
        sections: [
            {
                title: 'Internet',
                items: [
                    { name: 'How does the internet work?', type: 'Knowledge' },
                    { name: 'What is HTTP?', type: 'Knowledge' }
                ]
            },
            {
                title: 'Pick a Language',
                items: [
                    { name: 'JavaScript (Node.js)', type: 'Language' },
                    { name: 'Python', type: 'Language' },
                    { name: 'Go', type: 'Language' },
                    { name: 'Java', type: 'Language' }
                ]
            },
            {
                title: 'Databases',
                items: [
                    { name: 'Relational Databases (PostgreSQL, MySQL)', type: 'Topic' },
                    { name: 'NoSQL Databases (MongoDB, Redis)', type: 'Topic' }
                ]
            },
            {
                title: 'Learn about APIs',
                items: [
                    { name: 'REST', type: 'API Style' },
                    { name: 'JSON APIs', type: 'Topic' },
                    { name: 'Authentication (JWT, OAuth)', type: 'Topic' }
                ]
            },
            {
                title: 'Deployment',
                items: [
                    { name: 'Containerization (Docker)', type: 'Tool' },
                    { name: 'CI/CD', type: 'Concept' },
                    { name: 'Cloud Providers (AWS, Azure, GCP)', type: 'Platform' }
                ]
            }
        ]
    }
};
