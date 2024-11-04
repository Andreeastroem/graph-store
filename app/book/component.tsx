"use client";

import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Work } from "@/lib/api/getBookPage";
import Link from "next/link";
import Image from "@/components/ui/image";

type Props = {
  work: Work;
  isbn: string;
  series: {
    title: string;
    books: { title: string; part: number; id: string }[];
  };
  universe: {
    name: string;
    works: { title: string; id: string }[];
  };
};

export default function Component({ work, isbn, series, universe }: Props) {
  const book = {
    title: work.title,
    author: work.variantBooks[0].writtenByPeople[0].name,
    coverImage: work.title.toLowerCase().replace(/ /g, "-"),
    rating: 4.5,
    price:
      work.variantBooks.find((book) => book.isbn === isbn)
        ?.pricesCostsConnection.edges[0].properties.amount ?? -1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  const recommendations = {
    category: [
      {
        title: "The Time Traveler's Wife",
        author: "Audrey Niffenegger",
        coverImage: "/placeholder.svg?height=200&width=150",
      },
      {
        title: "Life After Life",
        author: "Kate Atkinson",
        coverImage: "/placeholder.svg?height=200&width=150",
      },
    ],
  };

  const similarAuthors = [
    { name: "Ruth Hogan", image: "/placeholder.svg?height=100&width=100" },
    { name: "Gabrielle Zevin", image: "/placeholder.svg?height=100&width=100" },
    { name: "Fredrik Backman", image: "/placeholder.svg?height=100&width=100" },
    { name: "Gail Honeyman", image: "/placeholder.svg?height=100&width=100" },
  ];

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="relative w-full h-0 pb-[133%] transition-transform duration-300 ease-in-out hover:scale-110">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                width={500}
                height={500}
                className="absolute top-0 left-0 w-full h-full object-cover"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl mb-4">by {book.author}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{book.rating}</span>
            </div>
            <p className="text-2xl font-bold mb-4">${book.price.toFixed(2)}</p>
            <p className="mb-6">{book.description}</p>
            <Button className="w-full md:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">You might also like</h2>
          <Tabs defaultValue="series" className="w-full">
            <TabsList>
              <TabsTrigger value="series">Same Series</TabsTrigger>
              <TabsTrigger value="universe">Same Universe</TabsTrigger>
              <TabsTrigger value="category">Same Category</TabsTrigger>
            </TabsList>
            <TabsContent value="series">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {series.books.map((serieBook, index) => {
                  return (
                    <Link
                      href={`/book/${serieBook.title
                        .toLowerCase()
                        .replaceAll(" ", "-")}/${serieBook.id}`}
                      key={index}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="relative">
                            <Image
                              src={serieBook.title
                                .toLowerCase()
                                .replaceAll(/ /g, "-")}
                              width={150}
                              height={150}
                              alt={`Cover of ${serieBook.title}`}
                              className="w-full h-auto rounded-md mb-2"
                              crop={{ type: "auto", aspectRatio: "4:6" }}
                            />
                            <div className="absolute top-0 right-0 px-4 py-2 bg-slate-200">
                              Part {serieBook.part}
                            </div>
                          </div>
                          <h3 className="font-semibold">{serieBook.title}</h3>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="universe">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {universe.works.map((universeBook, index) => {
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <Image
                          src={universeBook.title
                            .toLowerCase()
                            .replaceAll(/ /g, "-")}
                          width={150}
                          height={150}
                          alt={`Cover of ${universeBook.title}`}
                          className="w-full h-auto rounded-md mb-2"
                          crop={{ type: "auto", aspectRatio: "4:6" }}
                        />
                        <h3 className="font-semibold">{universeBook.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            {Object.entries(recommendations).map(([key, books]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {books.map((book, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <Image
                          src={"cld-sample-4"}
                          width={150}
                          height={150}
                          alt={`Cover of ${book.title}`}
                          className="w-full h-auto rounded-md mb-2"
                          crop={{
                            type: "auto",
                            aspectRatio: "4:6",
                          }}
                        />
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarAuthors.map((author, index) => (
              <div key={index} className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage
                    src={author.image}
                    alt={author.name}
                    className={avatarColors[index % avatarColors.length]}
                  />
                  <AvatarFallback>
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-center font-semibold">{author.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
];
