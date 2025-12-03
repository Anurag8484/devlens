

export interface Repository {
  id: number;
  githubUrl: string;
  name: string;
  owner: string;
  type?: string | null;
  userId: number;
}
