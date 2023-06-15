import { useEffect, useState } from "react";
import MainPage from "./Pages/main";
import ErrorPage from "./Pages/error";
import MyPage from "./Pages/mypage";

function App() {
  const [page, setPage] = useState("");

  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
    setPage(window.location.pathname);
  }, []);

  const onClickBtn = (url) => {
    const page = url;
    window.history.pushState(page, null, url);
    setPage(page);
  };

  const preBtn = () => {
    window.history.pushState(null, "", window.location.href);
    const result = window.confirm("페이지 이동 시 입력하신 내용이 저장되지 않을 수 있습니다.");
    if (result) {
      alert("내용이 초기화 되었습니다");
    }
    if (result === false) {
      return;
    }
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preBtn);
    return () => {
      window.removeEventListener("popstate", preBtn);
    };
  }, []);

  return (
    <>
      <button onClick={() => onClickBtn("/main")}>main</button>
      <button onClick={() => onClickBtn("/error")}>error</button>
      <button onClick={() => onClickBtn("/myPage")}>myPage</button>
      {page === "/main" && <MainPage />}
      {page === "/error" && <ErrorPage />}
      {page === "/myPage" && <MyPage />}
    </>
  );
}

export default App;
