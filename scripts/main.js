console.log("JS funcionando!");

const sidebar = document.getElementById("sidebar");
const hamburguer = document.getElementById("hamburguer");

hamburguer.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  hamburguer.classList.toggle("ativo");
});

const carrosselInner = document.getElementById("carrossel-inner");
const botaoAvancar = document.getElementById("carrossel-avancar");

const totalPaginas = 3;
let paginaAtual = 0;

botaoAvancar.addEventListener("click", () => {
  paginaAtual = (paginaAtual + 1) % totalPaginas;
  const deslocamento = paginaAtual * 460;
  carrosselInner.style.transform = `translateX(-${deslocamento}px)`;
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".sidebar a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

document.querySelectorAll(".character-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("clicked");
  });
});

const modal = document.getElementById("character-modal");
const modalDetails = document.getElementById("modal-details");
const closeBtn = document.querySelector(".close-modal");

const characterInfo = {
  freyr: {
    name: "[Prince of The Vanir Gods] Sun God Freyr",
    passive: "Regente Divino",
    passiveimage: "assets/images/freyr passive.png",
    passivetext:
      "❈ A Singular deste herói ativa apenas na Partida Mata-Mata. Os atributos básicos do herói aumentam em 7% por cada aliado a participar da batalha. As habilidades do herói sobem de rank no início da batalha. (Limite: uma vez.) Todos os debuffs são removidos de todos os aliados quando o herói usa um ataque de alvo único. Aliados que tiverem debuffs removidos são curados em 10% de seus PV.",
    skills: "Full Counter, Hellblaze, Ultimate: Revenge Counter",
    image: "assets/images/Sun God Freyr.png",
  },
  // Adicione os outros personagens depois
};

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const charKey = card.dataset.character;
    const char = characterInfo[charKey];
    modalDetails.parentElement.classList.remove("slide-animation");
    void modalDetails.parentElement.offsetWidth; // força reflow
    modalDetails.parentElement.classList.add("slide-animation");

    if (char) {
      modalDetails.innerHTML = `
    <div class="card-singularidade">
      <h2>${char.name}</h2>
      <img src="${char.image}" alt="${char.name}" class="center-img">
      <p class="texto-centralizado"><strong>Passiva:</strong> ${char.passive}</p>
      <img src="${char.passiveimage}" alt="${char.passive}" class="center-img">
      <p class="observacao">❈ A Singular deste herói ativa apenas na Partida Mata-Mata.</p>
      <p>
        <span class="destaque-amarelo">Os atributos básicos</span> do herói aumentam em <span class="destaque-amarelo">7% por cada</span> aliado a participar da batalha.
      </p>
      <p>
        <span class="destaque-azul">As habilidades</span> do herói <span class="destaque-azul">sobem de rank</span> no início da batalha.
        <br><span class="limite">(Limite: uma vez.)</span>
      </p>
      <p>
        Todos os debuffs são removidos de todos os aliados quando o herói
        <span class="destaque-ciano">usa um ataque de alvo único</span>. Aliados que tiverem debuffs removidos são curados em
        <span class="destaque-verde">10% de seus PV</span>.
      </p>
      <p>
  Máximos por <span class="destaque-amarelo">cada</span> debuff removido.
</p>
<p>
  Aumenta todos os atributos de aliados em <span class="destaque-amarelo">10%</span> quando o herói usa uma habilidade.
  <br><span class="limite">(Limite: 3 vezes)</span>
</p>
<p>
  Se <span class="destaque-azul">todos os aliados estiverem vivos</span>, o 
  <span class="destaque-ciano">dano causado</span> por eles a inimigos é aumentado em 
  <span class="destaque-amarelo">30%</span> e o 
  <span class="destaque-verde">dano recebido</span> é reduzido em 
  <span class="destaque-amarelo">30%</span>.
</p>
      <p><strong>Habilidades:</strong> ${char.skills}</p>
    </div>
  `;
      modal.style.display = "block";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
