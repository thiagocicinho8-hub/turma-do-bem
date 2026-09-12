import { getAdminPosts } from "@/lib/dal";
import { PostEditor } from "@/components/admin/post-editor";

export const metadata = { title: "Posts — Admin" };

const PLATFORM_LABEL: Record<string, string> = { instagram: "IG", tiktok: "TikTok", youtube: "YT" };

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Posts da Tropa</h2>
      <p className="mt-1 text-sm text-navy-500">Atualize métricas e status de cada publicação.</p>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-navy-950">
                @{p.userName || "tropa"} <span className="ml-1 rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-bold text-navy-600">{PLATFORM_LABEL[p.platform] ?? p.platform}</span>
              </p>
              <span className="text-xs text-navy-400">{new Date(p.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-navy-600">{p.caption || "—"}</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block truncate text-xs font-semibold text-navy-900 underline max-w-full">
              {p.url}
            </a>
            <div className="mt-3">
              <PostEditor post={p} />
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-navy-500">Nenhum post ainda.</p>}
      </div>
    </div>
  );
}