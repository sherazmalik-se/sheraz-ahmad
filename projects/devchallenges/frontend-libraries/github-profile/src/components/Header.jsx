import { useState } from 'react';
import searchSvg from './../assets/Search.svg';
import { useQuery } from '@tanstack/react-query';

function Header(props) {
  const [username, setUsername] = useState('');

  function handleInputChange({ target }) {
    setUsername(target.value);
  }

  const { data: searchedGithubUser, isSuccess } = useQuery({
    queryKey: ['searchedGithubUser', username],
    queryFn: fetchSearchedGithubUser,
  });

  function fetchSearchedGithubUser() {
    return fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .catch(err => err.message);
  }

  return (
    <header className="w-full h-60 bg-[url(./../assets/hero-image-github-profile-sm.jpg)] sm:bg-[url(./../assets/hero-image-github-profile.jpg)] bg-no-repeat bg-center bg-cover flex flex-col justify-star items-center">
      <div className="relative rounded-xl bg-[#20293A] mt-7 mx-7 w-[480px]">
        <input
          type="text"
          className="rounded-xl w-full h-[56px] pl-12 text-[#CDD5E0] placeholder:text-[#CDD5E0] text-lg"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
        />

        <img
          src={searchSvg}
          alt="search icon"
          className="absolute top-1/2 -translate-y-1/2 left-4"
        />
      </div>
      {isSuccess && searchedGithubUser.login && (
        <button
          className="rounded-xl bg-[#20293A] mt-2 mx-7 w-[480px] cursor-pointer p-2 flex gap-4"
          onClick={() => {
            props.setUser(searchedGithubUser.login);
            setUsername('');
          }}
        >
          <img
            src={searchedGithubUser.avatar_url}
            alt={`${searchedGithubUser.name}'s avatar`}
            className="rounded-xl w-20 h-20"
          />
          <div className="grow h-full flex gap-1 flex-col items-start justify-center">
            <p>{searchedGithubUser.name}</p>
          </div>
        </button>
      )}
      {isSuccess && !searchedGithubUser.login && username && (
        <button className="rounded-xl bg-[#20293A] mt-3 mx-7 w-[480px] cursor-pointer p-3">
          No User Found
        </button>
      )}
    </header>
  );
}

export default Header;
