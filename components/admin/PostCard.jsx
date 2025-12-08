"use client";

export default function PostCard({ post, onOpen }) {
  return (
    <article
      onClick={() => onOpen(post)}
      className="cursor-pointer rounded-lg p-4 bg-gradient-to-b from-[#111217] to-[#0d0e12] border border-white/6 shadow-sm hover:shadow-md transition"
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-slate-100 font-semibold text-sm">{post.title || "Untitled"}</h3>
        <span className="text-xs text-sky-200/90 bg-sky-900/10 px-2 py-0.5 rounded-full">{post.category || "Uncategorized"}</span>
      </header>

      <p className="mt-2 text-slate-300 text-[13px] line-clamp-3">{post.query}</p>

      <footer className="mt-3 flex items-center justify-between text-[12px] text-slate-400">
        <span>{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : ""}</span>
        <span>{post.answersCount ? `${post.answersCount} answers` : ""}</span>
      </footer>
    </article>
  );
}
