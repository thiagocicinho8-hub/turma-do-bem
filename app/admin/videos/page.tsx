import { getAdminVideos } from "@/lib/dal";

export const metadata = { title: "Vídeos — Admin" };

export default async function AdminVideosPage() {
  const videos = await getAdminVideos();

  return (
    <div>
      <h2 className="font-display text-xl uppercase text-navy-950">Vídeos gerados</h2>
      <p className="mt-1 text-sm text-navy-500">{videos.length} no sistema.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[600px] text-left text-sm">
          <thead className="text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="border-b px-4 py-2">Nome</th>
              <th className="border-b px-4 py-2">Template</th>
              <th className="border-b px-4 py-2">Tipo</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id} className="odd:bg-navy-50">
                <td className="border-b px-4 py-2 font-medium text-navy-950 truncate max-w-48">{v.outputName || "—"}</td>
                <td className="border-b px-4 py-2 text-navy-700">{v.templateName}</td>
                <td className="border-b px-4 py-2 uppercase text-navy-500">{v.inputType}</td>
                <td className="border-b px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold ${v.status === "pronto" ? "bg-emerald-100 text-emerald-700" : v.status === "falhou" ? "bg-red-100 text-red-700" : "bg-navy-100 text-navy-700"}`}>
                    {v.status}
                  </span>
                </td>
                <td className="border-b px-4 py-2 text-xs text-navy-500">{new Date(v.createdAt).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {videos.length === 0 && <p className="mt-4 text-navy-500">Nenhum vídeo ainda.</p>}
      </div>
    </div>
  );
}