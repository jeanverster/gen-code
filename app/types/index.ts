export type GenerationStyle = 'Gen Z' | 'Millennial' | 'Boomer';

export type ProgrammingLanguage =
  | 'JavaScript'
  | 'Python'
  | 'Java'
  | 'TypeScript'
  | 'C++'
  | 'Ruby'
  | 'Go';

export interface TransformRequest {
  code: string;
  style: GenerationStyle;
  language: ProgrammingLanguage;
}

export interface TransformResponse {
  transformedCode: string;
}