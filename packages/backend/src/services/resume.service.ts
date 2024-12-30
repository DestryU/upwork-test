import db from '../config/db';
import { Resume } from '../models/resume.model';

export const getAllResumes = async () => {
  const result = await db.query(`
    SELECT * FROM resumes 
    ORDER BY created_at DESC
  `);
  return result.rows;
};

export const createResume = async (resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => {
  const { fullName, email, githubUrl, skills, funFact } = resumeData;
  
  const result = await db.query(
    `
    INSERT INTO resumes (full_name, email, github_url, skills, fun_fact)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [fullName, email, githubUrl, skills, funFact]
  );
  
  return result.rows[0];
}; 