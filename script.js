const projects = [
    { id: 1, title: "Prova de Aptidão (PAA)", category: "paa", year: "2023", desc: "Ponto de partida do percurso e objetivo de contar a história pessoal." },
    { id: 2, title: "Luz e Movimento (CAM)", category: "cam", year: "2024", desc: "Estética do moodboard: néon sobre fundo escuro, inspirado em Takashi Ito." },
    { id: 3, title: "Rastos de Luz (Vídeo)", category: "video", year: "2024", desc: "Experiências visuais com desfoque e película inspiradas em Peter Tscherkassky." },
    { id: 4, title: "Retratos Urbanos (Foto)", category: "foto", year: "2025", desc: "Abordagem fotográfica focada em texturas e contraste a preto e branco." },
    { id: 5, title: "Interface Web Futurista", category: "web", year: "2026", desc: "Projeto web interativo com conceitos originais e mixmédia." }
];

let currentIndex = 2;
let filteredProjects = [...projects];

const track = document.getElementById('track');
const projTitle = document.getElementById('projTitle');
const projMeta = document.getElementById('projMeta');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderCarousel() {
    track.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        if (index === currentIndex) {
            card.classList.add('active-center');
            card.innerHTML = `<span>${project.title}</span>`;
            projTitle.textContent = project.title;
            projMeta.textContent = `${project.category.toUpperCase()} · ${project.year}`;
        } else {
            card.innerHTML = `<span>${project.title}</span>`;
        }

        card.addEventListener('click', () => {
            currentIndex = index;
            renderCarousel();
        });

        track.appendChild(card);
    });
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < filteredProjects.length - 1) {
        currentIndex++;
        renderCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderCarousel();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            filteredProjects = [...projects];
        } else {
            filteredProjects = projects.filter(p => p.category === filter);
        }
        
        currentIndex = 0;
        if (filteredProjects.length > 0) {
            renderCarousel();
        } else {
            track.innerHTML = '<p style="color:var(--text-muted)">Nenhum projeto encontrado nesta categoria.</p>';
            projTitle.textContent = "---";
            projMeta.textContent = "---";
        }
    });
});

renderCarousel();