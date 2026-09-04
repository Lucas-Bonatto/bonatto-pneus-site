export const WHATSAPP_URL = `https://wa.me/5554999783838?text=${encodeURIComponent(
  "Olá! Vim pelo site da Bonatto Pneus e gostaria de solicitar um orçamento.",
)}`;

export const NAVIGATION = [
  { label: "Início", href: "#inicio", section: "inicio" },
  { label: "Serviços", href: "#servicos", section: "servicos" },
  { label: "Valores", href: "#balanceamento", section: "balanceamento" },
  { label: "A empresa", href: "#empresa", section: "empresa" },
  { label: "Contato", href: "#contato", section: "contato" },
];

const brand = (name, slug = null, extension = "svg") => ({
  name,
  logo: slug ? `/images/brands/${slug}.${extension}` : null,
});

export const SERVICES = [
  {
    id: "pneus",
    number: "01",
    eyebrow: "Segurança começa no contato",
    title: "Aderência para ir além.",
    description:
      "Linha completa para carros de passeio, SUVs e utilitários, com orientação para escolher a medida e o perfil certos para a sua rotina.",
    details: ["Passeio", "SUV", "Utilitário", "Calibragem"],
    image: "/images/sections/tires.webp",
    alt: "Profissional inspecionando a banda de rodagem de um pneu novo",
    align: "right",
    slides: [
      {
        id: "pneus-marcas",
        type: "brands",
        eyebrow: "Marcas que trabalhamos",
        title: "A marca certa para o seu caminho.",
        description:
          "Cidade, estrada ou aventura: reunimos opções consagradas e importadas para você dirigir com confiança e escolher de acordo com o seu carro e o seu orçamento.",
        note:
          "Consulte disponibilidade por medida e outras marcas importadas que também trabalhamos.",
        brands: [
          brand("Dunlop", "dunlop"),
          brand("Pirelli", "pirelli"),
          brand("Goodyear", "goodyear"),
          brand("Continental", "continental"),
          brand("Michelin", "michelin"),
          brand("Bridgestone", "bridgestone"),
          brand("Firestone", "firestone"),
          brand("Hankook", "hankook"),
          brand("Kumho", "kumho"),
          brand("Aplus", "aplus"),
          brand("Wanli", "wanli"),
          brand("Agate"),
          brand("Xbri", "xbri", "png"),
          brand("BFGoodrich", "bfgoodrich"),
          brand("GT Radial", "gt-radial"),
          brand("Giti", "giti"),
          brand("Roadcruza"),
          brand("Delinte", "delinte", "png"),
          brand("Novamaxx"),
        ],
      },
      {
        id: "pneus-modelos",
        type: "gallery",
        eyebrow: "Alguns modelos",
        title: "O pneu certo transforma a direção.",
        description:
          "Mais aderência, estabilidade e confiança a cada quilômetro. Encontre o modelo que combina com o seu carro e com a forma como você dirige.",
        note: "Imagens ilustrativas. Consulte modelos, medidas e disponibilidade.",
        items: [
          {
            name: "P Zero",
            brand: "Pirelli",
            image: "/images/products/tire-pirelli-pzero.png",
            alt: "Pneu Pirelli P Zero em perspectiva",
          },
          {
            name: "EfficientGrip Performance",
            brand: "Goodyear",
            image: "/images/products/tire-goodyear-efficientgrip.png",
            alt: "Pneu Goodyear EfficientGrip Performance em perspectiva",
          },
          {
            name: "Primacy 4",
            brand: "Michelin",
            image: "/images/products/tire-michelin-primacy4.webp",
            alt: "Pneu Michelin Primacy 4 em perspectiva",
          },
          {
            name: "AllSeasonContact",
            brand: "Continental",
            image: "/images/products/tire-continental-allseasoncontact.png",
            alt: "Pneu Continental AllSeasonContact visto de frente",
          },
        ],
      },
    ],
  },
  {
    id: "rodas",
    number: "02",
    eyebrow: "Estilo com precisão",
    title: "Rodas que transformam presença.",
    description:
      "Modelos para diferentes projetos e estilos, combinando acabamento, encaixe correto e equilíbrio para dirigir com personalidade.",
    details: ["Liga leve", "Esportivas", "Balanceamento", "Montagem"],
    image: "/images/sections/wheels.webp",
    alt: "Roda esportiva escura com iluminação azul e âmbar",
    align: "left",
    slides: [
      {
        id: "rodas-marcas",
        type: "brands",
        eyebrow: "Marcas e aplicações",
        title: "Estilo que respeita cada detalhe.",
        description:
          "A roda certa valoriza o carro sem abrir mão da aplicação correta. Comparamos aro, tala, furação, offset e acabamento para unir presença e segurança.",
        note: "Consulte modelos, acabamentos e disponibilidade para o seu veículo.",
        brands: [
          brand("Zunky"),
          brand("Volcano", "volcano", "png"),
          brand("KR", "kr", "png"),
          brand("Olimpo"),
          brand("Rodas originais"),
        ],
      },
      {
        id: "rodas-modelos",
        type: "gallery",
        eyebrow: "Alguns modelos",
        title: "Mude as rodas. Mude a presença.",
        description:
          "Do visual clássico ao esportivo, cada desenho cria uma nova identidade para o carro. Escolha o estilo e nós confirmamos a compatibilidade.",
        note: "Modelos Zunky usados como referência visual. Estoque sujeito a consulta.",
        items: [
          {
            name: "ZK-50",
            brand: "Zunky",
            image: "/images/products/wheel-zunky-zk50.png",
            alt: "Roda Zunky ZK-50 prateada",
          },
          {
            name: "ZK-260",
            brand: "Zunky",
            image: "/images/products/wheel-zunky-zk260.png",
            alt: "Roda Zunky ZK-260 diamantada",
          },
          {
            name: "ZK-940",
            brand: "Zunky",
            image: "/images/products/wheel-zunky-zk940.png",
            alt: "Roda Zunky ZK-940 preta e diamantada",
          },
        ],
      },
    ],
  },
  {
    id: "suspensao",
    number: "03",
    eyebrow: "Controle em cada resposta",
    title: "Controle total.\nResposta imediata.",
    description:
      "Diagnóstico e manutenção dos sistemas que mantêm o veículo estável, confortável e pronto para responder quando você mais precisa.",
    details: ["Amortecedores", "Molas", "Pastilhas", "Discos"],
    image: "/images/sections/suspension-brakes.webp",
    alt: "Conjunto automotivo de suspensão e freio em destaque",
    align: "right",
    slides: [
      {
        id: "suspensao-marcas",
        type: "brands",
        eyebrow: "Suspensão e freios",
        title: "Confiança para frear, contornar e seguir.",
        description:
          "Suspensão e freios em dia trazem firmeza, conforto e resposta ao volante. Trabalhamos com marcas reconhecidas para cuidar do que mantém o carro sob controle.",
        note: "A disponibilidade e a marca indicada dependem do diagnóstico e da aplicação.",
        brands: [
          brand("Monroe", "monroe"),
          brand("Nakata", "nakata", "png"),
          brand("Eibach", "eibach"),
          brand("Red Coil", "red-coil", "png"),
          brand("Fras-le", "fras-le", "png"),
          brand("Cofap", "cofap", "png"),
          brand("Brembo", "brembo"),
          brand("Fremax", "fremax", "png"),
        ],
      },
    ],
  },
  {
    id: "oleo",
    number: "04",
    eyebrow: "Proteção que circula",
    title: "O cuidado que mantém tudo em movimento.",
    description:
      "Troca de óleo e filtros com atenção à especificação do seu veículo, ajudando o motor a trabalhar limpo, protegido e eficiente.",
    details: ["Óleo do motor", "Filtro de óleo", "Filtro de ar", "Revisão de níveis"],
    image: "/images/sections/oil-change.webp",
    alt: "Óleo novo sendo colocado em um motor automotivo",
    align: "left",
    slides: [
      {
        id: "oleo-marcas",
        type: "brands",
        eyebrow: "Óleo e lubrificação",
        title: "Proteção certa para o coração do carro.",
        description:
          "Óleo não é tudo igual. A escolha correta ajuda a reduzir o desgaste, preservar o desempenho e prolongar a vida do motor — sempre conforme a especificação do fabricante.",
        note: "Consulte a linha indicada para o seu veículo e a disponibilidade em loja.",
        brands: [
          brand("Mobil", "mobil"),
          brand("Shell", "shell"),
          brand("Castrol", "castrol"),
          brand("Motul", "motul"),
          brand("Lubrax", "lubrax"),
          brand("Petronas", "petronas"),
          brand("TotalEnergies", "totalenergies"),
          brand("Valvoline", "valvoline"),
        ],
      },
    ],
  },
  {
    id: "eletrica",
    number: "05",
    eyebrow: "Tecnologia para o seu carro",
    title: "Tecnologia que liga, protege e conecta.",
    description:
      "Instalação, revisão e integração de acessórios elétricos com organização e acabamento profissional.",
    details: ["Alarmes", "Interfaces", "Lâmpadas", "Baterias", "Antifurto", "Rádio", "Alto-falantes"],
    image: "/images/sections/electrical.webp",
    alt: "Componentes de elétrica automotiva organizados sobre bancada escura",
    align: "right",
  },
  {
    id: "peliculas",
    number: "06",
    eyebrow: "Conforto e proteção",
    title: "Películas que cuidam de quem está dentro.",
    description:
      "Aplicação precisa para mais conforto térmico, privacidade e proteção, com acabamento limpo que valoriza o veículo.",
    details: ["Conforto térmico", "Proteção UV", "Privacidade", "Acabamento preciso"],
    image: "/images/sections/window-film.webp",
    alt: "Profissional aplicando película em vidro automotivo",
    align: "left",
  },
];

export const SERVICE_LABELS = [
  "Pneus",
  "Rodas",
  "Suspensão",
  "Freios",
  "Troca de óleo",
  "Elétrica",
  "Películas",
  "Balanceamento",
  "Geometria",
];

export const SERVICE_PRICES = [
  {
    vehicle: "Veículos leves",
    balance: "R$ 60,00",
    alignment: "R$ 60,00",
  },
  {
    vehicle: "SUVs e camionetes",
    balance: "R$ 100,00",
    alignment: "R$ 100,00",
  },
  {
    vehicle: "Vans e utilitários",
    balance: "R$ 100,00",
    alignment: "R$ 100,00",
  },
];
