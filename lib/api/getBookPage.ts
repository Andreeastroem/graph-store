import gql from "graphql-tag";
import { fetchFromApi } from "./fetch";

export async function getBookPage(id: string) {
  const query = getBookPageQuery();

  const response = await fetchFromApi<BookPageType>(query, { id });

  const bookPage = response.data.works[0];

  return bookPage;
}

export type Work = {
  id: string;
  title: string;
  universesContains: {
    name: string;
    containsWorks: {
      id: string;
      title: string;
    }[];
  }[];
  classificationsPrimary: {
    name: string;
    primaryWorks: {
      id: string;
      title: string;
    }[];
  }[];
  classificationsNotPrimary: {
    name: string;
    notPrimaryWorks: {
      id: string;
      title: string;
    }[];
  }[];
  partOfSeriesConnection: {
    edges: {
      properties: {
        part: number;
      };
      node: {
        name: string;
        worksPartOf: {
          id: string;
          title: string;
          partOfSeriesConnection: {
            edges: {
              properties: {
                part: number;
              };
            }[];
          };
        }[];
      };
    }[];
  };
  variantBooks: {
    isbn: string;
    pages: number;
    title: string;
    isFormatFormats: {
      name: string;
    }[];
    pricesCostsConnection: {
      edges: {
        properties: {
          amount: number;
          currency: string;
        };
        node: {
          name: string;
        };
      }[];
    };
    illustratedByPeople: {
      name: string;
      isni: string;
    }[];
    writtenByPeople: {
      name: string;
      isni: string;
    }[];
    narratedByPeople: {
      name: string;
      isni: string;
    }[];
    languagesOriginal: {
      name: string;
    }[];
    languagesTranslated: {
      name: string;
    }[];
  }[];
};

export type BookPageType = {
  works: Work[];
};

function getBookPageQuery() {
  return gql`
    query getBookPage($id: String!) {
      works(where: { id: $id }) {
        id
        title
        universesContains {
          name
          containsWorks {
            id
            title
          }
        }
        classificationsPrimary {
          name
          primaryWorks {
            id
            title
          }
        }
        classificationsNotPrimary {
          name
          notPrimaryWorks {
            id
            title
          }
        }
        partOfSeriesConnection {
          edges {
            properties {
              part
            }
            node {
              name
              worksPartOf(where: { NOT: { id: $id } }) {
                id
                title
                partOfSeriesConnection {
                  edges {
                    properties {
                      part
                    }
                  }
                }
              }
            }
          }
        }
        variantBooks {
          isbn
          pages
          title
          isFormatFormats {
            name
          }
          pricesCostsConnection {
            edges {
              properties {
                amount
                currency
              }
              node {
                name
              }
            }
          }
          illustratedByPeople {
            name
            isni
          }
          writtenByPeople {
            name
            isni
          }
          narratedByPeople {
            name
            isni
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
}
