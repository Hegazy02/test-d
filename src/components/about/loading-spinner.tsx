"use client";

export default function LoadingSpinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      role="status"
      aria-label="Loading page content"
    >
      <div className="text-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-white rounded-full animate-spin mx-auto mb-4"></div>

          {/* Loading text */}
          <p className="text-white text-lg font-medium animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
