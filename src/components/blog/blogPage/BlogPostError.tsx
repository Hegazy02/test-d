interface BlogPostErrorProps {
  error?: string;
}

export default function BlogPostError({ error }: BlogPostErrorProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || "Blog post not found"}</p>
        </div>
      </main>
    </div>
  );
}
