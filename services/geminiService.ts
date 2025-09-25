import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import { RecommendationType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        requiredSkills: {
            type: Type.ARRAY,
            description: "List of all skills required by the job description.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the skill." },
                    type: { type: Type.STRING, description: "Type of skill: 'technical', 'soft', or 'tool'." }
                }
            }
        },
        matchedSkills: {
            type: Type.ARRAY,
            description: "List of user skills that match the job requirements.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the skill." },
                    type: { type: Type.STRING, description: "Type of skill: 'technical', 'soft', or 'tool'." }
                }
            }
        },
        gapSkills: {
            type: Type.ARRAY,
            description: "List of required skills that the user is missing.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the skill." },
                    type: { type: Type.STRING, description: "Type of skill: 'technical', 'soft', or 'tool'." }
                }
            }
        },
        careerReadinessScore: {
            type: Type.INTEGER,
            description: "A score from 0 to 100 representing how well the user's skills match the job. Calculated as (matchedSkills / requiredSkills) * 100."
        },
        summary: {
            type: Type.STRING,
            description: "A brief, encouraging summary of the analysis and the user's career readiness."
        },
        recommendations: {
            type: Type.ARRAY,
            description: "A personalized list of actionable recommendations to bridge the skill gap.",
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "The type of recommendation: 'Course', 'Certification', 'Project', or 'Internship'." },
                    title: { type: Type.STRING, description: "Title of the recommended item." },
                    description: { type: Type.STRING, description: "A short description of why this is recommended." },
                    platform: { type: Type.STRING, description: "The platform to find this item (e.g., Coursera, Udemy, GitHub)." },
                    url: { type: Type.STRING, description: "A direct URL to the recommended item." }
                }
            }
        }
    }
};

export const analyzeSkillGap = async (userSkills: string, jobDescription: string): Promise<AnalysisResult> => {
    try {
        const prompt = `
            Analyze the skill gap between the user's skills and the provided job description.

            USER'S SKILLS:
            ${userSkills}

            JOB DESCRIPTION:
            ${jobDescription}

            Perform the following actions and return the result in the specified JSON format:
            1.  Extract all technical skills, soft skills, and specific tools mentioned in the job description.
            2.  Compare the user's skills with the extracted job requirements.
            3.  Identify which required skills the user possesses (matchedSkills) and which they are missing (gapSkills).
            4.  Calculate a 'careerReadinessScore' from 0-100 based on the formula: (number of matched skills / number of total required skills) * 100.
            5.  Write a brief, encouraging summary of the analysis.
            6.  Generate a list of 3-5 diverse and actionable recommendations (Courses, Certifications, Projects, Internships) to help the user bridge the identified skill gaps. For each recommendation, provide a title, a short description, the platform (e.g., Coursera, Udemy, GitHub, Kaggle), and a placeholder URL.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // Ensure enum values are correctly typed
        result.recommendations = result.recommendations.map((rec: any) => ({
            ...rec,
            type: Object.values(RecommendationType).includes(rec.type as RecommendationType) 
                ? rec.type 
                : RecommendationType.COURSE, // Default fallback
        }));
        
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error analyzing skill gap:", error);
        throw new Error("Failed to analyze skill gap. The Gemini API might be unavailable or the API key may be invalid.");
    }
};

export const parseResumeForSkills = async (resumeText: string): Promise<string> => {
    try {
        const prompt = `
            From the resume text provided below, extract all technical skills, soft skills, programming languages, and tools.
            Return them as a single comma-separated string. For example: "React, TypeScript, Project Management, Figma, SQL".
            Do not include any other text or explanation.

            RESUME TEXT:
            ---
            ${resumeText}
            ---
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error parsing resume:", error);
        throw new Error("Failed to parse resume with AI. Please try again or enter skills manually.");
    }
};