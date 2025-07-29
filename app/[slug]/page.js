"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { ModelCard } from "../components/FeaturedModels";

function isCategorySlug(slug) {
  return slug.startsWith("best-") && slug.endsWith("-onlyfans");
}

function extractCategory(slug) {
  return slug.replace(/^best-/, "").replace(/-onlyfans$/, "").replace(/-/g, " ").trim();
}

function unslugifyLocation(slug) {
  return slug.replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, c => c.toUpperCase());
}

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageType, setPageType] = useState(null); // 'category' or 'location'
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!slug) return;
    if (isCategorySlug(slug)) {
      setPageType("category");
      setCategory(extractCategory(slug));
      setLocation("");
    } else {
      setPageType("location");
      setLocation(unslugifyLocation(slug));
      setCategory("");
    }
  }, [slug]);

  const fetchModels = useCallback(
    async (skip = 0, limit = 40) => {
      if (pageType === "category" && category) {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, skip, limit }),
        });
        const data = await res.json();
        return data.models || [];
      } else if (pageType === "location" && location) {
        const res = await fetch("/api/location-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, skip, limit }),
        });
        const data = await res.json();
        return data.models || [];
      }
      return [];
    },
    [pageType, category, location]
  );

  useEffect(() => {
    if (!pageType || (!category && !location)) return;
    setLoading(true);
    fetchModels(0, 40).then((initialModels) => {
      setModels(initialModels);
      setHasMore(initialModels.length === 40);
      setLoading(false);
    });
  }, [pageType, category, location, fetchModels]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const moreModels = await fetchModels(models.length, 40);
    setModels((prev) => [...prev, ...moreModels]);
    setHasMore(moreModels.length === 40);
    setLoadingMore(false);
  };

  let title = "";
  let subtitle = "";
  if (pageType === "category") {
    title = `Best ${category && category.charAt(0).toUpperCase() + category.slice(1)} OnlyFans`;
    subtitle = `Discover the top OnlyFans models in the ${category} category`;
  } else if (pageType === "location") {
    title = `OnlyFans Models in ${location}`;
    subtitle = `Discover OnlyFans creators near you in ${location}`;
  }

  return (
    <section className="pt-16 pb-12 px-4 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-8">Loading models...</div>
        ) : models.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {models.map((model, idx) => (
                <ModelCard key={model.model_name + idx} model={model} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full font-semibold text-lg shadow hover:from-blue-500 hover:to-cyan-600 transition-all duration-300"
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-lg text-gray-500 py-8">No models found for this {pageType}.</div>
        )}
      </div>
    </section>
  );
} 