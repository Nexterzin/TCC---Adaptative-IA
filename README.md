<style>
  /* Fonte Poppins importada do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f9f9fb;
    color: #222;
    line-height: 1.6;
    padding: 2rem;
    max-width: 900px;
    margin: auto;
  }

  h1, h2 {
    color: #2c3e50;
    font-weight: 600;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.2rem;
    border-bottom: 3px solid #3498db;
    padding-bottom: 0.3rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #2980b9;
    padding-bottom: 0.25rem;
  }

  p {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    color: #333;
  }

  ul li {
    margin-bottom: 0.7rem;
  }

  /* Cards para funcionalidade e estrutura */
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    padding: 1rem 1.5rem;
    margin-bottom: 1.8rem;
    transition: box-shadow 0.3s ease;
  }
  .card:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  }

  /* Destaque para títulos dentro dos cards */
  .card h3 {
    margin-top: 0;
    color: #34495e;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  /* Links em azul suave */
  a {
    color: #2980b9;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  /* Container geral para facilitar responsividade */
  .container {
    padding: 0 1rem;
  }
</style>

<div class="container">
  <h1>Predição de Diabetes com Machine Learning</h1>

  <p>Bem-vindo ao repositório do meu <strong>Trabalho de Conclusão de Curso (TCC)</strong>, um sistema web inovador projetado para prever o tipo de diabetes com base em dados médicos, utilizando técnicas de Machine Learning. Este projeto combina uma interface de usuário moderna e responsiva com uma arquitetura técnica robusta, demonstrando o potencial da tecnologia na área da saúde.</p>

  <h2>Visão Geral</h2>
  <p>Esta aplicação foi desenvolvida com <strong>Next.js</strong>, aproveitando a renderização do lado do servidor para oferecer desempenho otimizado e uma experiência fluida. A estilização utiliza CSS moderno com suporte a temas claro e escuro, enquanto componentes reutilizáveis e animações personalizadas elevam a interação do usuário. O sistema inclui autenticação segura, upload de laudos médicos e uma simulação de predição de diabetes, servindo como prova de conceito para soluções baseadas em Machine Learning.</p>

  <h2>Funcionalidades Principais</h2>
  <div class="card">
    <ul>
      <li><strong>Autenticação de Usuários:</strong> Sistema de login simples e eficaz, com navegação para registro e recuperação de senha.</li>
      <li><strong>Upload e Análise de Laudos:</strong> Interface intuitiva para envio de dados médicos, com feedback visual por meio de um loader animado.</li>
      <li><strong>Simulação de Predição:</strong> Resultados mock que ilustram diferentes tipos de diabetes, acompanhados de descrições detalhadas.</li>
      <li><strong>Design Responsivo:</strong> Estilos adaptáveis garantem usabilidade em dispositivos de diversos tamanhos.</li>
      <li><strong>Feedback Visual:</strong> Animações elegantes e notificações com React Toastify para uma experiência interativa.</li>
    </ul>
  </div>

  <h2>Estrutura do Projeto</h2>
  <div class="card">
    <ul>
      <li><strong>globals.css:</strong> Define estilos globais, variáveis CSS para temas e animações sofisticadas para o loader.</li>
      <li><strong>layout.js:</strong> Configura a fonte Poppins e os metadados, servindo como base para o layout da aplicação.</li>
      <li><strong>page.jsx (LoginPage):</strong> Implementa a autenticação com componentes Material-UI, oferecendo uma interface consistente e amigável.</li>
      <li><strong>page.module.css:</strong> Estilos modulares para a página principal, otimizados para diferentes esquemas de cores e dispositivos.</li>
      <li><strong>DefaultButton.jsx:</strong> Componente de botão reutilizável, personalizável via props para flexibilidade no design.</li>
      <li><strong>Home.jsx:</strong> Página central para upload de laudos e exibição de resultados simulados, com animações integradas.</li>
      <li><strong>page.jsx (LoginRouter e HomeRouter):</strong> Gerencia o roteamento para as páginas de login e home.</li>
    </ul>
  </div>

  <h2>Tecnologias Utilizadas</h2>
  <div class="card">
    <ul>
      <li><strong>Next.js:</strong> Framework React para renderização eficiente e roteamento dinâmico.</li>
      <li><strong>React:</strong> Biblioteca principal para construção de interfaces reativas.</li>
      <li><strong>Material-UI (MUI):</strong> Componentes estilizados que asseguram consistência visual.</li>
      <li><strong>CSS Modules:</strong> Escopo local de estilos para manutenção simplificada.</li>
      <li><strong>React Toastify:</strong> Notificações elegantes que enriquecem a interação com o usuário.</li>
    </ul>
  </div>

  <h2>Objetivo e Futuro</h2>
  <p>Este projeto é uma demonstração do potencial de integração entre tecnologia e saúde, servindo como base para soluções reais de predição de diabetes. Futuras expansões podem incluir a implementação de modelos de Machine Learning treinados e a integração com APIs de dados médicos, ampliando sua aplicabilidade prática.</p>

  <h2>Como Contribuir</h2>
  <p>Sinta-se à vontade para explorar o código, abrir issues ou sugerir melhorias. Este é um projeto acadêmico com grande potencial de evolução, e sua colaboração é bem-vinda!</p>
</div>
