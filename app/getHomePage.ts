import { fetchFromApi } from "@/lib/api/fetch";
import gql from "graphql-tag";

export async function getHomePage() {
  const response = await fetchFromApi<data>(query, {});

  return response.data;
}

type data = {
  works: {
    id: string;
    title: string;
    variantBooks: {
      isbn: string;
      isFormatFormats: {
        name: string;
      }[];
      languagesOriginal: {
        name: string;
      }[];
      languagesTranslated: {
        name: string;
      }[];
    }[];
  }[];
};
const query = gql`
  query {
    works {
      id
      title
      variantBooks(options: { limit: 1 }) {
        isbn
        isFormatFormats {
          name
        }
        languagesOriginal {
          name
        }
        languagesTranslated {
          name
        }
      }
    }
  }
`;
