import { SITE } from "@/lib/config";

export const metadata = { title: "Termo de responsabilidade" };

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">Termo de responsabilidade</h1>
      <p className="mt-1 text-sm text-navy-500">Última atualização: setembro de 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-navy-700">
        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">1. Finalidade</h2>
          <p>
            O <strong>{SITE.name}</strong> é uma ferramenta digital criada para facilitar a criação e o
            compartilhamento de conteúdos de apoio ao vereador {SITE.title}. Ao se cadastrar, o
            participante declara que compreende os termos abaixo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">2. Voluntariedade</h2>
          <p>
            A participação é totalmente voluntária e espontânea. Criar, gerar e postar vídeos ou
            imagens por meio da plataforma não gera qualquer tipo de benefício material,
            financeiro ou vantagem de qualquer espécie. Não é concurso nem premiação.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">3. Uso do conteúdo gerado</h2>
          <p>
            O conteúdo gerado pela plataforma é de responsabilidade do participante que o
            compartilha. Ao publicar o material, o participante assume integralmente a
            responsabilidade por ele, incluindo, mas não se limitando a, eventual direito de
            imagem, legislação eleitoral e normas das plataformas de redes sociais.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">4. Dados pessoais</h2>
          <p>
            A plataforma armazena apenas o nome e o e-mail do participante, exclusivamente para
            fins de controle interno de uso. Esses dados não são compartilhados com terceiros e
            podem ser solicitados o tratamento a qualquer momento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">5. Alterações</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento. O uso continuado da
            plataforma após as alterações implica aceitação das novas condições.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-base uppercase text-navy-900">6. Contato</h2>
          <p>
            Em caso de dúvidas, entre em contato pelo e-mail{" "}
            <span className="font-semibold">{SITE.contactEmail}</span>.
          </p>
        </section>
      </div>
    </div>
  );
}