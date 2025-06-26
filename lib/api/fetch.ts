import { DocumentNode } from "graphql/language";
import { print } from "graphql";

type SuccessfulResponse<T> = {
  data: T;
  type: "success";
};
type ErrorResponse = {
  message: string;
  type: "error";
};

type Response<T> = SuccessfulResponse<T> | ErrorResponse;

export async function fetchFromApi<T>(
  query: DocumentNode,
  variables: Record<string, string | number>
): Promise<Response<T>> {
  const initialResponse = fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: print(query),
      variables: variables,
    }),
  });

  if ((await initialResponse).status !== 200) {
    return {
      type: "error",
      message: "Error fetching data. Contact admin.",
    };
  }

  const json = await (await initialResponse).json();

  console.log("response", json);

  return json;
}
