import Link from "next/link";
import { getHomePage } from "../getHomePage";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function Page() {
  const data = await getHomePage();

  if (data.type === "error") {
    return <main>{data.message}</main>;
  }

  if (data.type === "success") {
    return (
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.data?.works.map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}/${book.id}`}
                  >
                    <Card className="flex-shrink-0 w-full">
                      <CardContent className="p-4">
                        <Image
                          src={book.title.toLowerCase().replaceAll(/ /g, "-")}
                          alt={`Cover of ${book.title}`}
                          className="w-full h-64 object-cover mb-2 rounded"
                          width={150}
                          height={150}
                        />
                        <h3 className="font-semibold truncate">{book.title}</h3>
                        {/* <p className="text-sm text-gray-600 truncate">{book.author}</p> */}
                        {/* <p className="text-sm font-bold mt-1">${book.price.toFixed(2)}</p> */}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <Button
                variant="outline"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
