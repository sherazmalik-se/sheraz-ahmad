import Footer from './components/Footer';
import Header from './components/Header';
import nestingSvg from './assets/Nesting.svg';
import chieldAltSvg from './assets/Chield_alt.svg';
import starSvg from './assets/Star.svg';
import { useQuery } from '@tanstack/react-query';
import { formatDistance, subDays } from 'date-fns';
import { useState } from 'react';

function App() {
  const [showRepos, setShowRepos] = useState('hide');
  const [user, setUser] = useState('github');

  const {
    data: githubUser,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ['githubUser', user], queryFn: fetchGithubUser });

  function fetchGithubUser() {
    return fetch(`https://api.github.com/users/${user}`)
      .then(res => res.json())
      .catch(err => err.message);
  }

  const {
    data: githubUserRepos,
    isLoading: areReposLoading,
    isSuccess: areReposSuccess,
  } = useQuery({
    queryKey: ['githubUserRepos', user],
    queryFn: fetchGithubUserRepose,
  });

  function fetchGithubUserRepose() {
    return fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
      .catch(err => err.message);
  }

  function reposFilter(repos) {
    if (showRepos === 'all') return repos;
    const slicedArray = repos.slice(0, 4);

    return slicedArray;
  }

  function handleViewRepositories() {
    showRepos === 'hide' && setShowRepos('all');
    showRepos === 'all' && setShowRepos('hide');
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#20293A] text-[#CDD5E0]">
        <Header setUser={setUser} />

        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <main className="max-w-[74rem] w-full px-[clamp(32px,6vw,64px)] self-center z-10">
            <div className="flex flex-wrap gap-[2.125rem] -mt-[3rem] z-10 items-end">
              <div className="avatar w-32 h-32 p-2 pb-0 rounded-2xl bg-[#20293A]">
                <img
                  src={githubUser.avatar_url}
                  alt={`${githubUser.name}'s Profile Picture`}
                  className="w-full h-full rounded-xl"
                />
              </div>

              <div className="grow pb-2 flex flex-wrap gap-5 items-center">
                <div className="bg-[#111729] py-2 rounded-xl">
                  <span className="inline-block px-5 py-1.5 border-r-[1.5px] border-[#364153]">
                    Followers
                  </span>

                  <span className="inline-block px-5 py-1.5">
                    {githubUser.followers}
                  </span>
                </div>

                <div className="bg-[#111729] py-2 rounded-xl">
                  <span className="inline-block px-5 py-1.5 border-r-[1.5px] border-[#364153]">
                    Following
                  </span>

                  <span className="inline-block px-5 py-1.5">
                    {githubUser.following}
                  </span>
                </div>

                <div className="bg-[#111729] py-2 rounded-xl">
                  <span className="inline-block px-5 py-1.5 border-r-[1.5px] border-[#364153]">
                    Location
                  </span>

                  <span className="inline-block px-5 py-1.5">
                    {githubUser.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-24">
              <div className="my-9">
                <h1 className="text-[2rem]">{githubUser.name}</h1>

                <p>{githubUser.bio}</p>
              </div>

              <div className="repository grid md:grid-cols-2 gap-x-8 gap-y-9">
                {areReposLoading && <div>Loading...</div>}
                {areReposSuccess &&
                  reposFilter(githubUserRepos).map(repo => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      className="self-start p-5 rounded-xl flex flex-col gap-3.5 bg-[linear-gradient(95deg,#111729_3%,#1d1b48_99.61%)]"
                      target="_blank"
                    >
                      <p className="text-xl">{repo.name}</p>

                      <p className="text-[#97A3B6] text-sm">
                        {repo.description}
                      </p>

                      <div className="flex items-center gap-4 flex-wrap text-[#97A3B6]">
                        <div className="flex gap-1.5">
                          <div
                            className={`${
                              repo.license ? '' : 'hidden'
                            } flex gap-1.5`}
                          >
                            <img src={chieldAltSvg} alt="licence svg icon" />

                            <p>{repo.license && repo.license.spdx_id}</p>
                          </div>

                          <img src={nestingSvg} alt="forks svg icon" />

                          <p>{repo.forks_count}</p>

                          <img src={starSvg} alt="star svg icon" />

                          <p>{repo.stargazers_count}</p>
                        </div>

                        <p className="text-xs">
                          updated{' '}
                          {formatDistance(
                            subDays(new Date(repo.updated_at), 3),
                            new Date(),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </a>
                  ))}
              </div>

              <div className="flex justify-center mt-12">
                <button
                  className="cursor-pointer"
                  onClick={handleViewRepositories}
                >
                  {showRepos === 'hide' && 'View all repositories'}
                  {showRepos === 'all' && 'Hide repositories'}
                </button>
              </div>
            </div>
          </main>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
