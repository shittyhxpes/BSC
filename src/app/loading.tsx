export default function Loading() {
  return (
    <div className="min-h-screen pt-[100px]">
      {/* Filters Skeleton */}
      <section className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-16 bg-neutral-900 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-neutral-900 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-neutral-900 animate-pulse rounded" />
                <div className="h-4 w-1/4 bg-neutral-900 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
