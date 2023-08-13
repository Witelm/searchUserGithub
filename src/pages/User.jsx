import { useGetByIdQuery } from "../api/ApiGithub";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { id } = useParams();
  const { data } = useGetByIdQuery(id);

  return (
    <>
      {data && (
        <div>
          <h1>Пользователь: {data.login}</h1>
          <img src={data.avatar_url} alt="" />
          <a href={data.html_url}>{data.html_url}</a>
          <h2>Количество репозиториев: {data.public_repos}</h2>
        </div>
      )}
    </>
  );
}
