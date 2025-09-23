'use client';

export function AdminSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-amber-200 rounded w-1/3"></div>
        <div className="h-4 bg-amber-100 rounded w-1/2"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-4 bg-amber-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-amber-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 bg-amber-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-amber-100 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 bg-amber-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-4 bg-amber-200 rounded w-4"></div>
                <div className="h-4 bg-amber-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="h-6 bg-amber-200 rounded w-1/4"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-amber-200 rounded w-1/6"></div>
                <div className="h-4 bg-amber-200 rounded w-1/4"></div>
                <div className="h-4 bg-amber-200 rounded w-1/6"></div>
                <div className="h-4 bg-amber-200 rounded w-1/8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminTableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md animate-pulse">
      <div className="p-6 border-b">
        <div className="h-6 bg-amber-200 rounded w-1/4"></div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-amber-200 rounded w-1/6"></div>
              <div className="h-4 bg-amber-200 rounded w-1/4"></div>
              <div className="h-4 bg-amber-200 rounded w-1/6"></div>
              <div className="h-4 bg-amber-200 rounded w-1/8"></div>
              <div className="h-4 bg-amber-200 rounded w-1/8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

