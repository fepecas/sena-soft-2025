export type EnglishLevel = 'A1'|'A2'|'B1'|'B2'|'C1'|'C2';

export interface Enrollment {
  name: string;
  center: { id: string; name: string; region?: string };
  program: { code: string; name: string };
  department_residence?: string;
  recommends_instructor_names?: string[];
  has_github?: boolean;
  github_username?: string | null;
  english_level?: EnglishLevel | null;
  created_at?: Date | string;
}