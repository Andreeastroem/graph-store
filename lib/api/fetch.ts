import { DocumentNode } from "graphql/language";
import { print } from "graphql";

export async function fetchFromApi<T>(
  query: DocumentNode,
  variables: Record<string, string | number>
): Promise<{ data: T }> {
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

  const json = await (await initialResponse).json();

  return json;
}
