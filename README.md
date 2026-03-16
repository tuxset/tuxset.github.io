# frzvoxel.github.io
Reverse engineering, стеклянный UI в синей гамме, анимированный фон, интеграция с GitHub.

Демо • MIT

Возможности
Стеклянный дизайн (glassmorphism) в синей гамме

Анимированный фон из частиц с реакцией на мышь

Конфетти по клику на ссылки

Выдвижная панель с последними репозиториями GitHub

Адаптивная вёрстка

Счётчик визитов в локальном хранилище

# Технологии
HTML5

CSS3 (Flexbox, анимации, glassmorphism)

JavaScript (Vanilla, Canvas API)

GitHub API

GitHub Pages

# Запуск локально
bash
git clone https://github.com/frzvoxel/frzvoxel.github.io.git
cd frzvoxel.github.io
# Открыть index.html в браузере

Кастомизация
Цвета — основной синий #29438f в CSS.

Частицы — в script.js: количество, цвет, скорость.

GitHub — в loadRepos() заменить frzvoxel на свой ник:

js
fetch('https://api.github.com/users/ВАШ_НИК/repos...')
Планы
Переключение темы (синяя/оранжевая)

Терминальный стиль для about

Интеграция Telegram

3D-эффекты

Лицензия
MIT © 2026 tuxset
