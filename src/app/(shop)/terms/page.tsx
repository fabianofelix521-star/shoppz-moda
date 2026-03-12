import { BackButton } from "@/components/shared/back-button";

export const metadata = {
  title: "Termos de Uso — Shoppz Moda",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Termos de Uso</h1>
      </div>

      <article className="prose prose-sm max-w-none px-5 pb-10 text-[#111111] lg:px-8">
        <p className="text-sm text-[#7A7A7A]">
          Última atualização: 9 de março de 2026
        </p>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar ou utilizar o site e os serviços da Shoppz Moda, você
          concorda em ficar vinculado a estes Termos de Uso e à nossa Política
          de Privacidade. Se você não concordar com estes termos, por favor não
          utilize nossos serviços.
        </p>

        <h2>2. Cadastro de Conta</h2>
        <p>
          Para realizar compras, você deve criar uma conta. Você é responsável
          por manter a confidencialidade das credenciais da sua conta e por
          todas as atividades que ocorram nela. Você deve fornecer informações
          precisas e completas e atualizar prontamente quaisquer alterações.
        </p>

        <h2>3. Produtos e Preços</h2>
        <ul>
          <li>
            Todas as descrições, imagens e especificações dos produtos são
            fornecidas para fins informativos e podem variar ligeiramente do
            produto real.
          </li>
          <li>
            Os preços são exibidos em BRL (Real) e podem ser alterados sem aviso
            prévio. O preço no momento do pedido será respeitado.
          </li>
          <li>
            Reservamo-nos o direito de limitar quantidades, recusar pedidos ou
            cancelar transações caso suspeitemos de fraude ou erros de
            precificação.
          </li>
          <li>
            Descontos promocionais e cupons estão sujeitos a termos específicos
            e datas de validade.
          </li>
        </ul>

        <h2>4. Pedidos e Pagamento</h2>
        <ul>
          <li>
            Um pedido é confirmado somente quando você receber um e-mail de
            confirmação nosso.
          </li>
          <li>Aceitamos Visa, Mastercard, PIX e boleto bancário.</li>
          <li>
            Todos os pagamentos são processados com segurança por provedores
            compatíveis com PCI-DSS.
          </li>
          <li>
            Você nos autoriza a cobrar o método de pagamento fornecido pelo
            valor total do pedido, incluindo impostos e frete aplicáveis.
          </li>
        </ul>

        <h2>5. Envio e Entrega</h2>
        <ul>
          <li>Envio padrão: 5 a 10 dias úteis.</li>
          <li>Envio expresso: 2 a 3 dias úteis.</li>
          <li>
            Os prazos de entrega são estimativas e podem variar conforme a
            localização e condições da transportadora.
          </li>
          <li>
            O risco de perda passa para você após a entrega à transportadora.
          </li>
          <li>
            Não somos responsáveis por atrasos causados pela alfândega, clima ou
            problemas da transportadora.
          </li>
        </ul>

        <h2>6. Trocas e Devoluções</h2>
        <ul>
          <li>
            Você pode devolver a maioria dos itens dentro de 30 dias após a
            entrega para reembolso total.
          </li>
          <li>
            Os itens devem estar sem uso, sem lavagem, na embalagem original com
            todas as etiquetas.
          </li>
          <li>
            Itens em promoção, roupas íntimas, moda praia e itens personalizados
            são venda final.
          </li>
          <li>
            Os custos de envio de devolução são de responsabilidade do cliente,
            a menos que o item seja defeituoso.
          </li>
          <li>
            Reembolsos são processados em 5 a 10 dias úteis após recebermos o
            item devolvido.
          </li>
        </ul>

        <h2>7. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo do nosso site — incluindo textos, gráficos, logos,
          imagens, designs de produtos e software — é propriedade da Shoppz Moda
          ou de seus licenciadores e é protegido por leis de direitos autorais,
          marcas registradas e outras leis de propriedade intelectual. Você não
          pode reproduzir, distribuir ou criar obras derivadas sem nosso
          consentimento prévio por escrito.
        </p>

        <h2>8. Conduta do Usuário</h2>
        <p>Você concorda em não:</p>
        <ul>
          <li>Usar nossos serviços para qualquer finalidade ilegal.</li>
          <li>Enviar informações falsas, enganosas ou fraudulentas.</li>
          <li>Tentar acessar áreas não autorizadas dos nossos sistemas.</li>
          <li>
            Usar ferramentas automatizadas (bots, scrapers) para acessar nossos
            serviços.
          </li>
          <li>Interferir no funcionamento adequado do site.</li>
          <li>
            Publicar conteúdo ofensivo, difamatório ou que infrinja direitos em
            avaliações ou comunicações.
          </li>
        </ul>

        <h2>9. Limitação de Responsabilidade</h2>
        <p>
          Na extensão máxima permitida por lei, a Shoppz Moda não será
          responsável por quaisquer danos indiretos, incidentais, especiais,
          consequenciais ou punitivos decorrentes do uso dos nossos serviços.
          Nossa responsabilidade total não excederá o valor pago pelo produto ou
          serviço específico que deu origem à reclamação.
        </p>

        <h2>10. Isenção de Garantias</h2>
        <p>
          Nossos serviços são fornecidos &ldquo;como estão&rdquo; e
          &ldquo;conforme disponíveis&rdquo; sem garantias de qualquer tipo,
          expressas ou implícitas. Não garantimos que o site será ininterrupto,
          livre de erros ou livre de vírus.
        </p>

        <h2>11. Indenização</h2>
        <p>
          Você concorda em indenizar e isentar a Shoppz Moda, seus diretores,
          funcionários e agentes de quaisquer reclamações, danos ou despesas
          decorrentes do uso dos nossos serviços ou violação destes termos.
        </p>

        <h2>12. Legislação Aplicável</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do
          Brasil. Quaisquer disputas serão resolvidas no foro da Comarca de São
          Paulo, Estado de São Paulo.
        </p>

        <h2>13. Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. O uso continuado dos nossos serviços após as alterações
          constitui aceitação dos termos atualizados.
        </p>

        <h2>14. Fale Conosco</h2>
        <p>
          Se você tiver dúvidas sobre estes Termos de Uso, entre em contato
          conosco:
        </p>
        <ul>
          <li>E-mail: legal@shoppzmoda.com.br</li>
          <li>Telefone: +55 (11) 4000-0199</li>
          <li>Endereço: Av. Paulista, 1000 - São Paulo, SP 01310-100</li>
        </ul>
      </article>
    </div>
  );
}
