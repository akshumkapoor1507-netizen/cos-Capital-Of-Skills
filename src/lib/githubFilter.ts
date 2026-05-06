export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  size: number;
  commits_count?: number; // Assume we fetch or calculate this
  files_count?: number; // Assume we fetch or calculate this
}

export const filterSignificantRepos = (repos: GitHubRepo[], userCommits: Record<string, number>) => {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const GENERIC_PATTERNS = [
    'hello-world', 'test', 'demo', 'practice', 'tutorial', 
    'learning-', '-tutorial', '-practice'
  ];

  const filtered = repos.filter(repo => {
    const commits = userCommits[repo.name] || 0;
    const isGeneric = GENERIC_PATTERNS.some(pattern => 
      repo.name.toLowerCase().includes(pattern.toLowerCase())
    );
    const lastUpdated = new Date(repo.updated_at);

    // Significance criteria
    const hasEnoughCommits = commits >= 10;
    const hasReadme = true; // GitHub API provides this separately, but let's assume for filter logic
    const isRecent = lastUpdated > threeYearsAgo;
    const isNotFork = !repo.fork;
    const isNotGeneric = !isGeneric;
    const hasEnoughFiles = (repo.files_count || 0) >= 3;
    const isNotThrowaway = commits >= 5; // Simplified version of throwaway check

    return (
      hasEnoughCommits && 
      isRecent && 
      isNotFork && 
      isNotGeneric && 
      hasEnoughFiles && 
      isNotThrowaway
    );
  });

  return {
    included: filtered,
    totalCount: repos.length,
    includedCount: filtered.length
  };
};
