
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let mouseX = 0, mouseY = 0;
        let particles = [];
		
		let facts = ["А вы знали что бегемот это бегемот?", "Серега плахой ewww", "dima krytoooi!!", "Пайтон это C, C это библеотека над ассемблером, Ассемблер это инструкция машшиного кода. делайте выводы.", "пайтон фу", "я не играю в роблокс бро.", "пж сабнись на мой ютуб @iium1n", "Не сдавайся Бро!", "паровозик чух чух"]
		
		var count = 0
			
        function initCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.3})`  
                });
            }
        }
		
		function funfactfunction() {
		    let fact = Math.floor(Math.random() * facts.length);
			
			document.getElementById('funfact-link').textContent = "fun fact:" + facts[fact];
			console.log(fact)
		}

        function drawBackground() {
            ctx.clearRect(0, 0, width, height);
            
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#1a1510');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const dx = mouseX - width / 2;
            const dy = mouseY - height / 2;
            const offsetX = dx * 0.02;
            const offsetY = dy * 0.02;

            ctx.save();
            ctx.translate(offsetX, offsetY);

            for (let i = 0; i < 200; i++) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
                ctx.fillRect(
                    Math.random() * width,
                    Math.random() * height,
                    2,
                    2
                );
            }

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > width) p.speedX *= -1;
                if (p.y < 0 || p.y > height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            ctx.restore();

            requestAnimationFrame(drawBackground);
        }

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('resize', () => {
            initCanvas();
        });

        initCanvas();
        drawBackground();

        const confettiCanvas = document.getElementById('confetti-canvas');
        const confettiCtx = confettiCanvas.getContext('2d');
        let confettiParticles = [];
        let animationId = null;

        function resizeConfettiCanvas() {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeConfettiCanvas);
        resizeConfettiCanvas();

        function createConfetti(count) {
            for (let i = 0; i < count; i++) {
                confettiParticles.push({
                    x: Math.random() * confettiCanvas.width,
                    y: -20 - Math.random() * 100,
                    size: Math.random() * 8 + 4,
                    speedY: Math.random() * 5 + 3,
                    speedX: (Math.random() - 0.5) * 3,
                    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                    rotation: Math.random() * 360
                });
            }
        }

        function drawConfetti() {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            confettiParticles.forEach((p, index) => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += 2;

                if (p.y > confettiCanvas.height + 50) {
                    confettiParticles.splice(index, 1);
                }

                confettiCtx.save();
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate(p.rotation * Math.PI / 180);
                confettiCtx.fillStyle = p.color;
                confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                confettiCtx.restore();
            });

            if (confettiParticles.length > 0) {
                animationId = requestAnimationFrame(drawConfetti);
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }

        function startConfetti(count = 40) {
            createConfetti(count);
            if (!animationId) {
                drawConfetti();
            }
        }
		
		
		
		function alertmessage() {
            count += 1
		    console.log(count)
			if (count == 1) {
			   alert('И ради чего? Не кликай больше.')
			} else if (count == 2) {
			   alert('чего ты ждешь?')
			} else if (count == 3) {
			   alert('я вижу ты упертый. нажмешь все то 100 раз получишь сюрприз))')
			} else if (count <= 100) {
			   alert('Счётик:' + count)
			} else if (count >= 100) {
			   setInterval(() => {
			      startConfetti(50);
			   }, 200);
			}
		}

        const panel = document.getElementById('githubPanel');
        const toggleBtn = document.getElementById('toggleBtn');

        function togglePanel() {
            const isOpen = panel.classList.toggle('open');
        }

        function closePanel() {
            panel.classList.remove('open');
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && panel.classList.contains('open')) {
                closePanel();
            }
        });

        async function loadRepos() {
            const repoList = document.getElementById('repoList');
            
            try {
                const response = await fetch('https://api.github.com/users/frzvoxel/repos?sort=updated&per_page=10');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const repos = await response.json();
                
                if (repos.length === 0) {
                    repoList.innerHTML = '<div class="repo-error">репозиториев пока нет</div>';
                    return;
                }

                repoList.innerHTML = repos.map((repo, index) => `
                    <div class="repo-item" style="animation-delay: ${index * 0.06}s" onclick="window.open('${repo.html_url}', '_blank'); startConfetti(15)">
                        <a>${repo.name}</a>
                        <div class="repo-desc">${repo.description || 'нет описания'}</div>
                    </div>
                `).join('');
            } catch (error) {
                repoList.innerHTML = '<div class="repo-error">ошибка загрузки</div>';
            }
        }

        function updateVisitCounter() {
            const counterElement = document.getElementById('visitCount');
            let visits = localStorage.getItem('nowotxSiteVisits');

            if (visits === null) {
                visits = 1;
            } else {
                visits = parseInt(visits) + 1;
            }

            localStorage.setItem('nowotxSiteVisits', visits);
            
            counterElement.style.opacity = '0';
            setTimeout(() => {
                counterElement.textContent = visits;
                counterElement.style.transition = 'opacity 0.3s';
                counterElement.style.opacity = '1';
            }, 150);
        }

        window.onload = () => {
		    funfactfunction();
            loadRepos();
            updateVisitCounter();
        };
