import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

// Define the hook with a generic type parameter
export function useContent<T>() {
  const [contents, setContents] = useState<T[]>([]);

  const refresh = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContents(response.data.contents || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return { contents, refresh };
}