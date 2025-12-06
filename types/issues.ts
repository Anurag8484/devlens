import { Repository } from "./repo";

export interface issues {
  id: number;
  title: string;
  body: string;
  labels: string[];
  ailabels?: string[];
  owner: string;
  name: string;
  url: string;
  createdAt: string;
  comments: number;
  repo: Repository;
  repoId: number;
  summary?: string;
  cause?: string;
  skills?: string[];
  githubId?: string;
  githubUrl?: string;
  difficulty?: string;
}
