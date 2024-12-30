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

export const searchResumes = async (query: string) => {
  const searchQuery = query.toLowerCase();
  
  const result = await db.query(
    `SELECT * FROM resumes 
     WHERE LOWER(full_name) LIKE $1 
     OR LOWER(email) LIKE $1 
     OR LOWER(github_url) LIKE $1 
     OR LOWER(fun_fact) LIKE $1 
     OR EXISTS (
       SELECT 1 FROM unnest(skills) skill 
       WHERE LOWER(skill) LIKE $1
     )`,
    [`%${searchQuery}%`]
  );

  return result.rows;
}; 