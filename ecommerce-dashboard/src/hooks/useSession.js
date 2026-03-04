import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSession() {

  const navigate = useNavigate();

  useEffect(() => {

    const loginTime = Number(localStorage.getItem("loginTime"));

    if (!loginTime) return;

    const sessionDuration = 5 * 60 * 1000;
    const currentTime = Date.now();

    if (currentTime - loginTime > sessionDuration) {

      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");

      navigate("/");

    }

  }, [navigate]);

}

export default useSession;