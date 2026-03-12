import { BackButton } from "@/components/shared/back-button";

export const metadata = {
  title: "Política de Privacidade — Shoppz Moda",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">
          Política de Privacidade
        </h1>
      </div>

      <article className="prose prose-sm max-w-none px-5 pb-10 text-[#111111] lg:px-8">
        <p className="text-sm text-[#7A7A7A]">
          Última atualização: 9 de março de 2026
        </p>

        <h2>1. Introdução</h2>
        <p>
          A Shoppz Moda (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou
          &ldquo;nossa&rdquo;) está comprometida em proteger suas informações
          pessoais e seu direito à privacidade. Esta Política de Privacidade
          explica como coletamos, usamos, divulgamos e protegemos suas
          informações quando você visita nosso site e utiliza nossos serviços.
        </p>

        <h2>2. Informações que Coletamos</h2>
        <h3>Informações Pessoais</h3>
        <p>Podemos coletar os seguintes tipos de informações pessoais:</p>
        <ul>
          <li>
            <strong>Dados da Conta:</strong> Nome, endereço de e-mail, número de
            telefone e senha ao criar uma conta.
          </li>
          <li>
            <strong>Dados de Pagamento:</strong> Números de cartão de
            crédito/débito, endereço de cobrança e outros detalhes de pagamento
            processados com segurança por nossos provedores (Stripe, PayPal).
          </li>
          <li>
            <strong>Dados de Envio:</strong> Endereço de entrega, nome do
            destinatário e número de contato para cumprimento do pedido.
          </li>
          <li>
            <strong>Histórico de Pedidos:</strong> Produtos comprados, datas dos
            pedidos, valores e registros de trocas/devoluções.
          </li>
          <li>
            <strong>Dados de Comunicação:</strong> Mensagens, avaliações e
            feedbacks fornecidos através da nossa plataforma.
          </li>
        </ul>

        <h3>Informações Coletadas Automaticamente</h3>
        <ul>
          <li>
            <strong>Informações do Dispositivo:</strong> Endereço IP, tipo de
            navegador, sistema operacional e identificadores do dispositivo.
          </li>
          <li>
            <strong>Dados de Uso:</strong> Páginas visitadas, tempo gasto nas
            páginas, padrões de cliques e consultas de pesquisa.
          </li>
          <li>
            <strong>Cookies &amp; Rastreamento:</strong> Usamos cookies e
            tecnologias similares para melhorar sua experiência e analisar o
            tráfego do site.
          </li>
        </ul>

        <h2>3. Como Usamos Suas Informações</h2>
        <p>Usamos as informações coletadas para:</p>
        <ul>
          <li>
            Processar e cumprir seus pedidos, incluindo envio e devoluções.
          </li>
          <li>
            Gerenciar sua conta, fornecer suporte ao cliente e responder a
            consultas.
          </li>
          <li>
            Personalizar sua experiência de compra e mostrar recomendações
            relevantes de produtos.
          </li>
          <li>
            Enviar e-mails transacionais (confirmações de pedidos, atualizações
            de envio).
          </li>
          <li>
            Enviar comunicações promocionais (apenas com seu consentimento —
            você pode cancelar a qualquer momento).
          </li>
          <li>
            Melhorar nosso site, produtos e serviços por meio de análises.
          </li>
          <li>
            Detectar e prevenir fraudes, acessos não autorizados e outras
            atividades ilegais.
          </li>
          <li>Cumprir obrigações legais e fazer valer nossos Termos de Uso.</li>
        </ul>

        <h2>4. Como Compartilhamos Suas Informações</h2>
        <p>
          Não vendemos suas informações pessoais. Podemos compartilhar dados
          com:
        </p>
        <ul>
          <li>
            <strong>Prestadores de Serviço:</strong> Processadores de pagamento
            (Stripe), transportadoras, provedores de e-mail e ferramentas de
            análise (Google Analytics) que nos ajudam a operar nosso negócio.
          </li>
          <li>
            <strong>Exigências Legais:</strong> Quando exigido por lei, ordem
            judicial ou regulamentação governamental.
          </li>
          <li>
            <strong>Transferências Empresariais:</strong> Em conexão com fusão,
            aquisição ou venda de ativos, seus dados podem ser transferidos como
            parte da transação.
          </li>
        </ul>

        <h2>5. Segurança dos Dados</h2>
        <p>
          Implementamos medidas de segurança padrão da indústria, incluindo
          criptografia SSL/TLS, processamento seguro de pagamentos via
          provedores compatíveis com PCI-DSS, controles de acesso e avaliações
          regulares de segurança. No entanto, nenhum método de transmissão pela
          Internet é 100% seguro.
        </p>

        <h2>6. Retenção de Dados</h2>
        <p>
          Retemos suas informações pessoais enquanto sua conta estiver ativa ou
          conforme necessário para fornecer serviços. Também retemos dados
          conforme necessário para cumprir obrigações legais, resolver disputas
          e fazer cumprir acordos. Você pode solicitar a exclusão de sua conta e
          dados associados a qualquer momento.
        </p>

        <h2>7. Seus Direitos</h2>
        <p>
          De acordo com a LGPD e demais legislações aplicáveis, você tem direito
          a:
        </p>
        <ul>
          <li>Acessar os dados pessoais que mantemos sobre você.</li>
          <li>Corrigir informações imprecisas ou incompletas.</li>
          <li>Solicitar a exclusão dos seus dados pessoais.</li>
          <li>
            Restringir ou se opor a determinados processamentos dos seus dados.
          </li>
          <li>
            Portabilidade de dados — receber seus dados em formato estruturado e
            legível por máquina.
          </li>
          <li>
            Revogar o consentimento para comunicações de marketing a qualquer
            momento.
          </li>
        </ul>

        <h2>8. Cookies</h2>
        <p>
          Utilizamos cookies essenciais para funcionalidade do site, cookies de
          análise para entender padrões de uso e cookies de marketing (com seu
          consentimento) para publicidade personalizada. Você pode gerenciar as
          preferências de cookies nas configurações do seu navegador.
        </p>

        <h2>9. Links de Terceiros</h2>
        <p>
          Nosso site pode conter links para sites de terceiros. Não somos
          responsáveis pelas práticas de privacidade desses sites e encorajamos
          você a revisar suas políticas de privacidade.
        </p>

        <h2>10. Privacidade de Menores</h2>
        <p>
          Nossos serviços não se destinam a menores de 16 anos. Não coletamos
          intencionalmente informações pessoais de crianças. Se soubermos que
          coletamos dados de um menor, tomaremos medidas para excluí-los
          prontamente.
        </p>

        <h2>11. Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente.
          Notificaremos sobre alterações significativas publicando a nova
          política nesta página e atualizando a data de &ldquo;Última
          atualização&rdquo;.
        </p>

        <h2>12. Fale Conosco</h2>
        <p>
          Se você tiver dúvidas ou preocupações sobre esta Política de
          Privacidade, entre em contato conosco:
        </p>
        <ul>
          <li>E-mail: privacidade@shoppzmoda.com.br</li>
          <li>Telefone: +55 (11) 4000-0199</li>
          <li>Endereço: Av. Paulista, 1000 - São Paulo, SP 01310-100</li>
        </ul>
      </article>
    </div>
  );
}
