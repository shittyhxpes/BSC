export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="h-4 w-16 bg-neutral-900 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-neutral-900 animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-neutral-900 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-neutral-900 animate-pulse rounded" />
              <div className="h-8 w-1/4 bg-neutral-900 animate-pulse rounded" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-full bg-neutral-900 animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-neutral-900 animate-pulse rounded" />
                <div className="h-4 w-4/6 bg-neutral-900 animate-pulse rounded" />
              </div>
              <div className="h-12 w-full bg-neutral-900 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
