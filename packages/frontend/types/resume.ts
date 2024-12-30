export interface Resume {
  id: number;
  full_name: string;
  email: string;
  github_url: string;
  skills: string[];
  fun_fact: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResumeData {
  fullName: string;
  email: string;
  githubUrl: string;
  skills: string[];
  funFact: string;
}