document.addEventListener("DOMContentLoaded", () => {
    const area = document.getElementById('interactiveArea');
    const today = new Date();
    
    // ==========================================
    // ГЛАВНЫЙ ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМА
    // ==========================================
    // ПОСТАВЬТЕ true — для тестирования прямо сейчас в октябре (откроются дни до 30-го)
    // ПОСТАВЬТЕ false — перед публикацией для клиентов в декабре!
    const IS_TEST_MODE = true; 

    // Логика автоматического определения даты
    let currentDay, currentMonth;

    if (IS_TEST_MODE) {
        currentDay = 31; // Возьмет текущее число октября (например, 30)
        currentMonth = 30;            // Принудительно включит режим декабря для тестов
    } else {
        currentDay = today.getDate(); 
        currentMonth = today.getMonth(); // Будет брать реальный месяц (клиент зайдет в декабре)
    }

    // 31 личная фитнес-аффирмация и комплимент для читателя
    const factsList = {
        1: "Ты — человек, который сегодня сделал выбор в пользу своего здоровья, пока остальные ищут оправдания. Твое упорство восхищает, начни этот день мощно!",
        2: "В тебе скрыто гораздо больше силы и выносливости, чем тебе кажется. Каждый твой шаг сегодня — это манифест твоей будущей идеальной формы!",
        3: "Твоя дисциплина — это твоя суперсила. Ты умеешь держать слово, данное самому себе, и это качество сделает тебя победителем в новом году!",
        4: "Посмотри на себя: ты становишься сильнее, увереннее и выносливее с каждым открытым шаром. Твоё тело — это твой личный шедевр, продолжай творить!",
        5: "Ты заслуживаешь чувствовать себя великолепно, легко и бодро. Сегодняшняя тренировка — это твой лучший подарок собственному телу и настроению!",
        6: "Твоя энергия способна заряжать окружающих. Когда ты тренируешься, ты инвестируешь в свою уверенность, которая изменит весь твой 2027 год!",
        7: "Ты умеешь преодолевать лень и ментальные блоки. Твой характер крепче любого гранита, и сегодня ты докажешь это на коврике!",
        8: "Твоя уникальность и красота раскрываются in движении. Ты тренируешься не потому, что с твоим телом что-то не так, а потому, что оно заслуживает лучшего!",
        9: "Ты — главный герой своей жизни. Ты самостоятельно создаешь свои привычки, свою фигуру и свое потрясающее будущее. Гордись своим выбором!",
        10: "В твоих глазах горит огонь человека, который точно дойдет до конца. Твоя целеустремленность стирает любые преграды на пути к цели!",
        11: "Ты обладаешь потрясающей способностью меняться и расти. Твоя форма в новом году станет прямым отражением твоих сегодняшних правильных действий!",
        12: "Твое тело способно на удивительные вещи, когда твой разум говорит 'Я могу'. Настройся на победу, сегодня ты превзойдешь свои прошлые результаты!",
        13: "Ты — вдохновение. Твой выбор оставаться активным в канун праздников доказывает, что ты ценишь себя и свой труд. Ты на правильном пути!",
        14: "Твоя выносливость растет с каждым днем, даже если тебе кажется, что изменения незаметны. Доверяй процессу, ты делаешь великое дело!",
        15: "Ты умеешь находить время для главного — для себя. Твое здоровье и тонус стоят на первом месте, и этот адвент раскрывает твой лучший потенциал!",
        16: "Ты сильнее своих мимолетных слабостей. Чувство гордости после сегодняшней тренировки будет в миллион раз приятнее, чем минутная лень!",
        17: "Твои мышцы, твое сердце и твой разум становятся единым сильным механизмом. Ты создаешь тело, в котором тебе будет невероятно комфортно жить!",
        18: "Ты — человек действия. Пока другие откладывают жизнь до понедельника или 1 января, ты меняешь себя прямо сейчас, в эту самую минуту!",
        19: "Твоя осанка, твоя грация и твоя уверенность куются именно здесь, на этих ежедневных тренировках. Ты выглядишь потрясающе, когда идешь к цели!",
        20: "Ты закладываешь фундамент для легких, энергичных и здоровых новогодних праздников. Твое тело будет благодарно тебе за этот активный вклад!",
        21: "Твоя способность концентрироваться на важном восхищает. Отбрось все заботы дня, оставь только себя и свою чистую фитнес-энергию!",
        22: "Ты — архитектор своей фигуры. Каждый присед, каждый шаг и каждое повторение приближают тебя к той версии себя, о которой ты мечтаешь!",
        23: "В тебе живет неиссякаемый источник мотивации. Тебе не нужны внешние стимулы, потому что ты сам(а) искренне хочешь быть лучшей версией себя!",
        24: "Твое упорство доказывает, что ты умеешь уважать свои цели. Ты уже проделал(а) огромный путь внутри этого календаря, ты — настоящий кремень!",
        25: "Ты управляешь своим днем, а не день управляет тобой. Выдели эти заветные минуты на тренировку и почувствуй, как тело наполняется силой!",
        26: "Твоя физическая сила напрямую питает твою внутреннюю уверенность. С каждым выполненным упражнением ты становишься непобедимее!",
        27: "Ты заслуживаешь сиять и притягивать восхищенные взгляды в новогоднюю ночь. Твой главный секрет красоты — это твоя активность и тонус!",
        28: "Твой разум полностью контролирует твоё тело. Ты умеешь собираться в нужный момент и выдавать свой максимум. Покажи это сегодня!",
        29: "Ты — пример идеального баланса и любви к себе. Забота о здоровье — это высшее проявление уважения к своей жизни. Ты всё делаешь правильно!",
        30: "Ты стоишь в одном шаге от завершения этого мощного фитнес-марафона. Твоя преданность делу доказала: для тебя нет ничего невозможного!",
        31: "Ты — абсолютный фитнес-герой этого года. Твоя сила, твоя красота и твоя воля безупречны. Сделай финальный рывок и с гордостью шагни в свой лучший 2027 год!"
    };

    const linksList = {
        1: "https://youtu.be", 2: "https://youtu.be", 3: "https://youtu.be",
        4: "https://youtu.be", 5: "https://youtu.be", 6: "https://youtu.be",
        7: "https://youtu.be", 8: "https://youtu.be", 9: "https://youtu.be",
        10: "https://youtu.be", 11: "https://youtu.be", 12: "https://youtu.be",
        13: "https://youtu.be", 14: "https://youtu.be", 15: "https://youtu.be",
        16: "https://youtu.be", 17: "https://youtu.be", 18: "https://youtu.be",
        19: "https://youtu.be", 20: "https://youtu.be", 21: "https://youtu.be",
        22: "https://youtu.be", 23: "https://youtu.be", 24: "https://youtu.be",
        25: "https://youtu.be", 26: "https://youtu.be", 27: "https://youtu.be",
        28: "https://youtu.be", 29: "https://youtu.be", 
        30: "https://youtu.be", 31: "https://youtu.be"
    };

    const toyColors = ['#e74c3c', '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#e84393', '#fdcb6e'];
    const lightColors = ['#ff4757', '#eccc68', '#70a1ff', '#2ed573', '#ffa502'];
    
    const coords = [
        {x:50.4, y:22.4}, {x:45.0, y:25.8}, {x:55.8, y:29.3}, {x:40.6, y:31.8}, 
        {x:49.3, y:34.4}, {x:60.2, y:37.0}, {x:34.1, y:39.6}, {x:45.0, y:42.2}, 
        {x:54.7, y:43.1}, {x:65.6, y:45.6}, {x:29.7, y:49.1}, {x:40.6, y:50.8}, 
        {x:51.5, y:52.5}, {x:62.3, y:54.3}, {x:72.1, y:56.8}, {x:25.4, y:60.3}, 
        {x:36.3, y:62.0}, {x:47.1, y:62.9}, {x:58.0, y:64.6}, {x:68.9, y:66.3}, 
        {x:78.6, y:69.8}, {x:21.0, y:72.4}, {x:31.9, y:74.1}, {x:42.8, y:75.0}, 
        {x:53.6, y:75.8}, {x:64.5, y:76.7}, {x:75.4, y:77.5}, {x:84.1, y:80.1},
        {x:38.4, y:84.4}, {x:49.3, y:85.3}, {x:60.2, y:84.4}
    ];

    const overlay = document.getElementById('modalOverlay');
    const mClose = document.getElementById('modalClose');
    const mTitle = document.getElementById('modalTitle');
    const mText = document.getElementById('modalText');
    const mBtn = document.getElementById('modalBtn');
    const mIcon = document.getElementById('modalIcon');

    function showModal(icon, title, text, link = null, btnText = "Смотреть тренировку") {
        mIcon.innerText = icon;
        mTitle.innerText = title;
        mText.innerText = text;
        if (link) {
            mBtn.style.display = "inline-block";
            mBtn.href = link;
            mBtn.innerText = btnText;
        } else {
            mBtn.style.display = "none";
        }
        overlay.classList.add('active');
    }

    mClose.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.classList.remove('active'); });

    let openedDays = JSON.parse(localStorage.getItem('adventOpenedDays 2026')) || [];
    let openedGift = localStorage.getItem('adventOpenedGift 2026') || null;
    // Рисуем шары и огоньки
    for (let i = 1; i <= 31; i++) {
        const c = coords[i-1];
        if (!c) continue;

        const toy = document.createElement('div');
        toy.className = 'toy';
        toy.innerText = i;
        toy.style.left = `${c.x}%`;
        toy.style.top = `${c.y}%`;

        const randomColor = toyColors[i % toyColors.length];
        toy.style.background = `radial-gradient(circle at 30% 30%, ${randomColor}, #000000 120%)`;
        const currentToyLink = linksList[i];
        const dayFact = factsList[i] || "Ты создаешь себя каждую секунду. Проведи этот день активно!";

        const openBall = (dayNumber) => {
            if (!openedDays.includes(dayNumber)) {
                openedDays.push(dayNumber);
                localStorage.setItem('adventOpenedDays 2026', JSON.stringify(openedDays));
            }
            toy.classList.remove('today');
            toy.classList.add('opened');
            
            showModal("✨", `Твоя фитнес-сила: День ${dayNumber}`, dayFact, currentToyLink);
            checkGiftsAvailability();
        };

        // ==========================================
        // УМНАЯ ЛОГИКА ДЛЯ ДЕКАБРЯ И ТЕСТОВ
        // ==========================================
        let isLocked, isToday;

        if (IS_TEST_MODE) {
            // В режиме теста (в октябре) проверяем только число дня
            isLocked = i > currentDay;
            isToday = i === currentDay;
        } else {
            // В релизе: если сейчас еще НЕ декабрь (меньше 11), блокируем ВСЕ дни без исключения
            const realMonth = today.getMonth(); 
            if (realMonth < 11) {
                isLocked = true;
                isToday = false;
            } else {
                // Если декабрь наступил — открываем по дням
                isLocked = i > currentDay;
                isToday = i === currentDay;
            }
        }

        // Присвоение классов и обработчиков клика
        if (openedDays.includes(i)) {
            toy.classList.add('opened');
            toy.addEventListener('click', () => showModal("✨", `Твоя фитнес-сила: День ${i}`, dayFact, currentToyLink));
        } else if (isToday) {
            toy.classList.add('today');
            toy.addEventListener('click', () => openBall(i));
        } else if (!isLocked) {
            toy.addEventListener('click', () => openBall(i));
        } else {
            toy.classList.add('locked');
            toy.addEventListener('click', () => showModal("🔒", "День заблокирован", `Этот шар станет доступен только ${i} декабря!`));
        }

        area.appendChild(toy);

        // Создаем HTML-огонек
        const light = document.createElement('div');
        light.className = 'light';
        light.style.left = `${c.x + 3}%`;
        light.style.top = `${c.y - 1.5}%`;
        
        const lColor = lightColors[i % lightColors.length];
        light.style.color = lColor;
        light.style.backgroundColor = lColor;
        light.style.animationDelay = `${(i % 4) * 0.25}s`;
        area.appendChild(light);
    }

    // ЛОГИКА НОВОГОДНИХ ПОДАРКОВ
    const gifts = document.querySelectorAll('.gift');
    const giftWishes = {
        1: "Поздравляю! С Новым Годом! 🎉 Дарим вам скидку 10% на следующий абонемент! Пусть этот год принесет новые спортивные победы!",
        2: "С наступающим Новым Годом! 🎄 Ловите подарок: Бесплатное персональное занятие с тренером! Будьте сильнее в новом году!",
        3: "Ура! С Новым Годом! 🎁 Вы открыли секретный бонус: скидка 15% на любой групповой марафон! Проведите праздники с пользой!"
    };

    function checkGiftsAvailability() {
        const updatedOpenedDays = JSON.parse(localStorage.getItem('adventOpenedDays 2026')) || [];
        const totalOpened = updatedOpenedDays.length;
        const isAllWorkoutsDone = totalOpened >= 31;

        gifts.forEach(gift => {
            const id = gift.getAttribute('data-id');
            if (!isAllWorkoutsDone || (openedGift && openedGift !== id)) {
                gift.classList.add('disabled');
            } else {
                gift.classList.remove('disabled');
            }
        });
    }

    checkGiftsAvailability();

    gifts.forEach(gift => {
        const id = gift.getAttribute('data-id');

        gift.addEventListener('click', () => {
            const updatedOpenedDays = JSON.parse(localStorage.getItem('adventOpenedDays 2026')) || [];
            const totalOpened = updatedOpenedDays.length;

            if (totalOpened < 31) {
                showModal(
                    "🔒", 
                    "Подарки заперты!", 
                    `Вы завершили только ${totalOpened} из 31 тренировок. Чтобы открыть подарок под ёлочкой, вам необходимо выполнить абсолютно все задания адвента! Выбрать можно будет только ОДИН подарок, налегайте на спорт! 🔥`
                );
                return;
            }

            if (openedGift) {
                if (openedGift === id) {
                    showModal("🎉", "Ваш подарок", giftWishes[id]);
                } else {
                    showModal("🔒", "Упс!", "Вы уже выбрали и забрали свой подарок. Остальные коробки открывать нельзя!");
                }
                return;
            }

            openedGift = id;
            localStorage.setItem('adventOpenedGift 2026', id);
            
            checkGiftsAvailability();
            showModal("🎉", "С Новым Годом!", giftWishes[id]);
        });
    });
});
