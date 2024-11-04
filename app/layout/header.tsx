import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center">
            <Image
              src="logo"
              alt="BookStore Logo"
              className="h-10 w-10 mr-2"
              width={40}
              height={40}
              crop={{
                type: "fill",
                aspectRatio: "1:1",
              }}
            />
            <span className="text-2xl font-bold">GraphStore</span>
          </Link>
          <div className="flex items-center w-1/2">
            <Input
              type="search"
              placeholder="Search books..."
              className="w-full"
            />
            <Button variant="secondary" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {/* <li>
              <Link href="/categories" className="hover:underline">
                Categories
              </Link>
            </li> */}
            <li>
              <Link href="/book" className="hover:underline">
                Books
              </Link>
            </li>
            {/* <li>
              <Link href="/authors" className="hover:underline">
                Authors
              </Link>
            </li>
            <li>
              <Link href="/new-releases" className="hover:underline">
                New Releases
              </Link>
            </li>
            <li>
              <Link href="/bestsellers" className="hover:underline">
                Bestsellers
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
