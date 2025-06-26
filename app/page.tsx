import { getHomePage } from "./getHomePage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/ui/image";
import Link from "next/link";

export default async function Home() {
  const response = await getHomePage();
  if (response.type === "error") {
    return <main>{response.message}</main>;
  }
  const data = response.data;
  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
          <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {data.works.map((book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}/${book.id}`}
                >
                  <Card className="flex-shrink-0 w-48">
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

        {/* <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {categories.map((category) => (
                  <Card key={category.id} className="flex-shrink-0 w-48">
                    <CardContent className="p-4">
                      <img src={category.image} alt={category.name} className="w-full h-32 object-cover mb-2 rounded" />
                      <h3 className="font-semibold text-center">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2" aria-label="Scroll left">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="outline" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2" aria-label="Scroll right">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Authors</h2>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {authors.map((author) => (
                  <Card key={author.id} className="flex-shrink-0 w-32">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Avatar className="w-20 h-20 mb-2">
                        <AvatarImage src={author.image} alt={author.name} />
                        <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-center text-sm">{author.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2" aria-label="Scroll left">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="outline" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2" aria-label="Scroll right">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </section> */}
      </div>
    </main>
  );
}
