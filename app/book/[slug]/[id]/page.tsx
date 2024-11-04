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

  const data = await getBookPage(id);

  if (typeof isbn !== "string") {
    redirect(`/book/${slug}/${id}?isbn=${data.variantBooks[0].isbn}`);
  }

  const series = {
    title: data.partOfSeriesConnection.edges[0].node.name,
    books: data.partOfSeriesConnection.edges[0].node.worksPartOf.map((book) => {
      return {
        title: book.title,
        part: book.partOfSeriesConnection.edges[0].properties.part,
        id: book.id,
      };
    }),
  };

  const universe = {
    name: data.universesContains[0].name,
    works: data.universesContains?.[0].containsWorks.filter(
      (work) => work.id !== id
    ),
  };

  return (
    <Component work={data} isbn={isbn} series={series} universe={universe} />
  );
}
