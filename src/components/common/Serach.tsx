"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { searchProducts } from "@/actions/search";
import Link from "next/link";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchTerm.length > 0) {
        const results = await searchProducts(searchTerm);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <div>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search"
          className="border-none bg-[#58C5C7] placeholder:text-white rounded-3xl px-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        <div className="absolute bg-black rounded-full p-1 right-1 top-1">
          <IoSearchOutline color="white" size={25} />
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="block p-2 hover:bg-gray-100"
                onClick={() => {
                  setShowResults(false);
                  setSearchTerm("");
                }}
              >
                <div className="flex items-center gap-2">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      ${product.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
