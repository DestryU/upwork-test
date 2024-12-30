"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/TextArea";
import { Badge } from "@/components/ui/Badge";
import { ErrorText } from "@/components/ui/ErrorText";
import { useResumeCreate } from "@/hooks/useResume";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const skillsList = [
  "JavaScript",
  "TypeScript", 
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "Vue.js",
  "Angular",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  // Add more skills as needed
];

const formSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "string.empty": "Full name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required", 
      "string.email": "Please enter a valid email",
    }),
  githubUrl: Joi.string()
    .uri()
    .required()
    .pattern(/github\.com/)
    .messages({
      "string.empty": "GitHub URL is required",
      "string.uri": "Please enter a valid URL",
      "string.pattern.base": "Please enter a valid GitHub URL",
    }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "Please select at least one skill",
  }),
  funFact: Joi.string().required().messages({
    "string.empty": "Fun fact is required",
  }),
});

type FormData = {
  fullName: string;
  email: string;
  githubUrl: string;
  skills: string[];
  funFact: string;
};

export default function MiniResumeForm() {
  const router = useRouter();
  const [searchSkills, setSearchSkills] = useState("");
  const [isSkillsListOpen, setIsSkillsListOpen] = useState(false);
  const { createResume, isLoading, error: submitError } = useResumeCreate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      githubUrl: "",
      skills: [],
      funFact: "",
    },
  });

  const selectedSkills = watch("skills");

  const filteredSkills = skillsList.filter((skill) =>
    skill.toLowerCase().includes(searchSkills.toLowerCase())
  );

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createResume(data);
      toast.success('Resume submitted successfully!');
      
      // Reset form and navigate
      reset();
      router.push('/resumes');
    } catch (error) {
      console.error('Error submitting resume:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit resume');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Full Name
        </label>
        <Input
          id="fullName"
          placeholder="John Doe"
          {...register("fullName")}
        />
        {errors.fullName && (
          <ErrorText>{errors.fullName.message}</ErrorText>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input
          id="email"
          placeholder="john@example.com"
          {...register("email")}
        />
        {errors.email && (
          <ErrorText>{errors.email.message}</ErrorText>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="githubUrl" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          GitHub URL
        </label>
        <Input
          id="githubUrl"
          placeholder="https://github.com/username"
          {...register("githubUrl")}
        />
        {errors.githubUrl && (
          <ErrorText>{errors.githubUrl.message}</ErrorText>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Skills
        </label>
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search skills..."
              value={searchSkills}
              onChange={(e) => setSearchSkills(e.target.value)}
              onFocus={() => setIsSkillsListOpen(true)}
              className="w-full"
            />
            {isSkillsListOpen && filteredSkills.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md border border-input bg-white shadow-md">
                {filteredSkills.map((skill) => (
                  <li
                    key={skill}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => {
                      if (!selectedSkills.includes(skill)) {
                        setValue("skills", [...selectedSkills, skill]);
                        if (selectedSkills.length === 0) {
                          clearErrors("skills");
                        }
                      }
                      setSearchSkills("");
                      setIsSkillsListOpen(false);
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill}>
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2"
                  onClick={() => {
                    const newSkills = selectedSkills.filter((s) => s !== skill);
                    setValue("skills", newSkills);
                  }}
                >
                  x
                </Button>
              </Badge>
            ))}
          </div>
        </div>
        {errors.skills && selectedSkills.length === 0 && (
          <ErrorText>{errors.skills.message}</ErrorText>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="funFact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Fun Fact
        </label>
        <Textarea
          id="funFact"
          placeholder="Share something interesting about yourself..."
          {...register("funFact")}
        />
        {errors.funFact && (
          <ErrorText>{errors.funFact.message}</ErrorText>
        )}
      </div>

      {submitError && (
        <ErrorText className="mt-4">
          {submitError.message || 'Failed to submit resume. Please try again.'}
        </ErrorText>
      )}

      <Button 
        type="submit" 
        variant="default" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit'}
      </Button>
    </form>
  );
}
