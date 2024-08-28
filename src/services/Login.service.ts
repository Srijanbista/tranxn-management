import { errorToast } from "../utils/Toaster";

export async function Login(values: any) {
  try {
    const response = await fetch(
      "https://jp-dev.cityremit.global/web-api/config/v1/auths/login",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log("error", error);
    errorToast("Failed to login");
  }
}
