import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('repository summary show star ratings, issues , forks and language options', () => {
  const repository = {
    stargazers_count: 123245,
    open_issues: '6 issues need help',
    forks: '4189 Forks',
    language: 'Javascript',
  };
  // 1} render repository with repository
  render(<RepositoriesSummary repository={repository} />);

  //2) find elements with stargazers_count, open_issues, forks, language and Do Assertion
  for (let key in repository) {
    expect(
      screen.getByText(new RegExp(repository[key], 'i'))
    ).toBeInTheDocument();
  }
});
