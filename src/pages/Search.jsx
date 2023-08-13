import { useNavigate } from "react-router-dom";
import {
  useSearchUsersApiAscQuery,
  useSearchUsersApiDescQuery,
} from "../api/ApiGithub";
import { useEffect, useState } from "react";

export default function Search() {
  const [stateInput, setStateInput] = useState("");
  const [stateUser, setStateUSer] = useState("");
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState(true);
  const [data, setData] = useState("");
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();

  const {
    data: dataAsc,
    isLoading: loadingAsc,
    error: errorAsc,
    refetch: refetchAsc,
  } = useSearchUsersApiAscQuery(stateUser);
  const {
    data: dataDesc,
    isLoading: loadingDesc,
    error: errorDesc,
    refetch: refetchDesc,
  } = useSearchUsersApiDescQuery(stateUser);

  const handleSearch = () => {
    setStateUSer(stateInput);
    setPage(1);
    repos ? refetchAsc() : refetchDesc();
  };

  const handleUser = (id) => {
    navigate(`/user/${id}`);
  };

  const handleNextPage = () => {
    if (page < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    repos ? setData(dataAsc) : setData(dataDesc);
  }, [dataAsc, dataDesc, repos, maxPage]);

  useEffect(() => {
    if (data) {
      setMaxPage(Math.floor(data.items.length / 10 + 1));
    }
  }, [data, repos]);

  return (
    <div>
      <input
        type="text"
        value={stateInput}
        onChange={(e) => setStateInput(e.target.value)}
        placeholder="введите пользователя"
      />
      <button onClick={handleSearch}>Поиск...</button>
      <div>
        <label>
          <input
            type="radio"
            value="asc"
            checked={repos === true}
            onChange={() => setRepos(true)}
          />
          ascendence
        </label>
        <label>
          <input
            type="radio"
            value="desc"
            checked={repos === false}
            onChange={() => setRepos(false)}
          />
          descendence
        </label>
      </div>
      {(loadingAsc || loadingDesc) && <p>Loading...</p>}
      {(errorAsc || errorDesc) && <p></p>}
      {data && (
        <>
          <ul>
            {data.items.slice((page - 1) * 10, page * 10).map((item, index) => (
              <li key={index} onClick={() => handleUser(item.id)}>
                <a href={`/user/${item.id}`}>{item.login}</a>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={page === maxPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
