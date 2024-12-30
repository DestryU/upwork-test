import { Resume } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface ResumeCardProps {
  resume: Resume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {resume.full_name}
          </h3>
          <a
            href={resume.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            GitHub Profile
          </a>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-gray-900 dark:text-gray-100">{resume.email}</p>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fun Fact</p>
          <p className="text-gray-900 dark:text-gray-100">{resume.fun_fact}</p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Created on {formatDate(resume.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
} 