import { getBookPage } from "@/lib/api/getBookPage";
import Component from "../../component";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { id, slug } = await params;
  const { isbn } = await searchParams;

  const response = await getBookPage(id);

  if (response.type === "error") {
    return <div>{response.message}</div>;
  }

  const work = response.data.works[0];

  if (typeof isbn !== "string") {
    redirect(`/book/${slug}/${id}?isbn=${work.variantBooks[0].isbn}`);
  }

  const series = {
    title: work.partOfSeriesConnection.edges[0].node.name,
    books: work.partOfSeriesConnection.edges[0].node.worksPartOf.map((book) => {
      return {
        title: book.title,
        part: book.partOfSeriesConnection.edges[0].properties.part,
        id: book.id,
      };
    }),
  };

  const universe = {
    name: work.universesContains[0].name,
    works: work.universesContains?.[0].containsWorks.filter((w) => w.id !== id),
  };

  const categoryRecommendations = extractBooksFromCategory(
    work.classificationsPrimary?.[0],
    work.classificationsNotPrimary
  );

  return (
    <Component
      work={work}
      isbn={isbn}
      series={series}
      universe={universe}
      categoryRecommendations={categoryRecommendations}
    />
  );
}

type primaryClassification = {
  name: string;
  primaryWorks: {
    id: string;
    title: string;
  }[];
};
type nonPrimaryClassification = {
  name: string;
  notPrimaryWorks: {
    id: string;
    title: string;
  }[];
};

function extractBooksFromCategory(
  primary: primaryClassification,
  nonPrimary: nonPrimaryClassification[]
) {
  const unionOfBooks = new Map<string, { id: string; title: string }>();

  primary.primaryWorks.forEach((book) => {
    unionOfBooks.set(book.id, book);
  });

  nonPrimary.forEach((category) => {
    category.notPrimaryWorks.forEach((book) => {
      if (!unionOfBooks.has(book.id)) {
        unionOfBooks.set(book.id, book);
      }
    });
  });

  return Array.from(unionOfBooks.values());
}
