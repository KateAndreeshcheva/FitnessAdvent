document.addEventListener("DOMContentLoaded", () => {
    const area = document.getElementById('interactiveArea');
    const today = new Date();
    
    // ==========================================
    // НАСТРОЙКИ ДАТЫ (Для релиза — ДЕКАБРЬ)
    // ==========================================
    const currentDay = today.getDate(); 
    const currentMonth = today.getMonth(); // 11 = Декабрь в JS

    // ДЛЯ ТЕСТИРОВАНИЯ В ОКТЯБРЕ: расскомментируйте 2 строки ниже, чтобы проверить логику прямо сейчас
    // const currentDay = 30; 
    // const currentMonth = 9; // 9 = Октябрь

    // 31 подтвержденная новогодняя традиция со всего мира
    const factsList = {
        1: "В Испании и латиноамериканских странах существует официальная традиция Лас Досе Увас: под каждый из 12 ударов курантов нужно съесть ровно по одной виноградинке на удачу.",
        2: "В Англии первая серийная новогодняя открытка была создана в 1843 году сэром Генри Коулом. На ней была изображена празднующая семья, и этот обычай быстро прижился на почте.",
        3: "На Кубе перед наступлением Нового года принято наполнять все кувшины, ведра и тазы водой, а в полночь выливать её из окон, символизируя очищение дома от старых проблем.",
        4: "В Шотландии праздник называется Хогмани. Главная традиция — 'first-footing' (первый гость): если первым после полуночи в дом войдет темноволосый мужчина с углем или хлебом, год будет сытным.",
        5: "В Японии буддийские храмы в полночь бьют в колокола ровно 108 раз. Согласно вероучению, этот ритуал очищает человека от 108 пагубных страстей и забот уходящего года.",
        6: "В Италии в южных регионах (особенно в Неаполе) до сих пор сохраняется традиция выбрасывать старую глиняную посуду или мелкую мебель прямо из окон, избавляясь от негативного прошлого.",
        7: "В Дании исторически принято собирать старую или треснувшую посуду в течение года, чтобы в новогоднюю ночь в знак дружбы и преданности разбить её о порог дома своих близких.",
        8: "В Швеции в новогоднюю ночь традиционно выбирают Королеву света Люсию. Девушек наряжают в белые платья и венки с зажженными свечами, и они разносят угощения детям и пожилым людям.",
        9: "В Германии, согласно старинному обычаю, с первыми ударами курантов люди мысленно 'впрыгивают' в Новый год, буквально соскакивая со стульев или диванов на пол с последним ударом.",
        10: "В Греции глава семьи в полночь разбивает плод граната о стену дома во дворе. Если зерна разлетаются по всему участку — это официально сулит хозяевам богатство и процветание.",
        11: "В Китае (по лунному календарю) перед праздником двери домов красят в красный цвет, а на окна наклеивают бумажные узоры 'цзяньчжи', защищающие жилище от невзгод.",
        12: "В Австрии и Германии очень популярно новогоднее гадание на свинце (Bleigießen). Кусочек свинца плавят в ложке над свечой, выливают в холодную воду и по форме застывшей фигуры предсказывают будущее.",
        13: "В Болгарии существует традиция 'сурвакане': дети украшают палочки кизила (сурвачки) шерстяными нитками и сухофруктами, а затем слегка бьют ими взрослых по спине, желая здоровья.",
        14: "В Панаме в новогоднюю ночь сжигают чучела известных политиков, спортсменов или актеров, сделанные из соломы. Этот обряд называется 'muñecos' и означает уничтожение старых бед.",
        15: "В Эквадоре люди, мечтающие о путешествиях, берут большой пустой чемодан и в полночь бегут с ним вокруг своего квартала, веря, что это принесет реальные поездки.",
        16: "В Нидерландах традиционным новогодним угощением являются оoliebollen — обжаренные во фритюре сладкие шарики из теста с изюмом и смородиной, посыпанные сахарной пудрой.",
        17: "В ЮАР, особенно в районе Хиллбро в Йоханнесбурге, местные жители традиционно сбрасывают старую бытовую технику, микроволновки и стулья из окон многоэтажек.",
        18: "В Румынии и Молдове популярен старинный обрядовый танец 'Медведь'. Мужчины наряжаются в настоящие тяжелые медвежьи шкуры и ходят по домам с песнями под барабанный бой.",
        19: "В Швейцарии и Австрии люди празднуют День святого Сильвестра. По улицам городов проходят карнавальные шествия мужчин в огромных масках и костюмах из мха и веток.",
        20: "В Финляндии официальной новогодней традицией считается отливание фигурок из олова. По тени, которую застывшее в воде олово отбрасывает на стену, трактуют события будущего года.",
        21: "В Мексике и латиноамериканских странах цвет нижнего белья в новогоднюю ночь строго регламентирован: красный выбирают для поиска любви, а желтый — для привлечения денег.",
        22: "В Чехии за праздничным новогодним столом принято разрезать яблоко поперек. Если внутри образуется правильная звездочка из семечек — всех членов семьи ждет крепкое здоровье.",
        23: "В Ирландии принято печь специальный большой хлеб со специями и изюмом, а затем в канун праздника слегка ударять им о двери и стены дома, чтобы прогнать неудачу.",
        24: "Во Франции вместо привычной елки популярна традиция выпекать или покупать торт в форме рождественского полена (Bûche de Noël), который символизирует тепло домашнего очага.",
        25: "В Перу во время новогодних ярмарок люди покупают миниатюрные фигурки домиков, машин или денег, веря, что настоящие прототипы этих вещей обязательно появятся у них в новом году.",
        26: "В Эстонии исторически считалось, что в новогодний день нужно поесть 7, 9 или 12 раз, чтобы обеспечить себе физическую силу, изобилие и сытый год до следующих праздников.",
        27: "В Колумбии по улицам городов марширует огромная кукла на ходулях, изображающая 'Старый год' (Año Viejo). Она рассказывает прохожим забавные истории о событиях уходящего года.",
        28: "В Таиланде традиционный Новый год (Сонгкран) празднуется в апреле, и его главной традицией является массовое обливание друг друга водой на улицах в знак очищения от грехов.",
        29: "В Норвегии и Швеции дети и взрослые оставляют во дворе миску с овсяной кашей и кусочком масла для рождественского гнома (Ниссе), чтобы тот не вредил домашнему скоту.",
        30: "В США на площади Таймс-Скривер в Нью-Йорке с 1907 года каждую новогоднюю ночь ровно в 23:59 по местному времени опускается огромный хрустальный шар, отсчитывая последние секунды.",
        31: "Во всем мире главной и неизменной задокументированной традицией остается сбор всей семьи за праздничным столом и загадывание заветных желаний под бой местных часов!"
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
    // Генерация шаров и огоньков гирлянды
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
        const dayFact = factsList[i] || "Праздник к нам приходит! Проведите этот день активно.";

        const openBall = (dayNumber) => {
            if (!openedDays.includes(dayNumber)) {
                openedDays.push(dayNumber);
                localStorage.setItem('adventOpenedDays 2026', JSON.stringify(openedDays));
            }
            toy.classList.remove('today');
            toy.classList.add('opened');
            
            showModal("🎄", `День ${dayNumber}`, `Новогодний факт: ${dayFact}`, currentToyLink);
            
            // Проверяем и обновляем доступность подарков сразу в момент открытия шара!
            checkGiftsAvailability();
        };

        const isTargetMonth = currentMonth === (today.getMonth() === 9 ? 9 : 11);
        const isLocked = !isTargetMonth || i > currentDay;
        const isToday = isTargetMonth && i === currentDay;

        if (openedDays.includes(i)) {
            toy.classList.add('opened');
            toy.addEventListener('click', () => showModal("🎄", `День ${i}`, `Новогодний факт: ${dayFact}`, currentToyLink));
        } else if (isToday) {
            toy.classList.add('today');
            toy.addEventListener('click', () => openBall(i));
        } else if (!isLocked) {
            toy.addEventListener('click', () => openBall(i));
        } else {
            toy.classList.add('locked');
            const monthText = currentMonth === 9 ? "октября" : "декабря";
            toy.addEventListener('click', () => showModal("🔒", "День заблокирован", `Этот шар станет доступен только ${i} ${monthText}!`));
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
        
        // Подарки доступны ТОЛЬКО если открыты все 31 тренировка
        const isAllWorkoutsDone = totalOpened >= 31;

        gifts.forEach(gift => {
            const id = gift.getAttribute('data-id');
            
            // Если тренировки не пройдены ИЛИ если пользователь уже выбрал другой подарок ранее
            if (!isAllWorkoutsDone || (openedGift && openedGift !== id)) {
                gift.classList.add('disabled');
            } else {
                gift.classList.remove('disabled');
            }
        });
    }

    // Первичная проверка при загрузке страницы
    checkGiftsAvailability();

    gifts.forEach(gift => {
        const id = gift.getAttribute('data-id');

        gift.addEventListener('click', () => {
            const updatedOpenedDays = JSON.parse(localStorage.getItem('adventOpenedDays 2026')) || [];
            const totalOpened = updatedOpenedDays.length;

            // 1. Проверка: пройдены ли все тренировки
            if (totalOpened < 31) {
                showModal(
                    "🔒", 
                    "Подарки заперты!", 
                    `Вы завершили только ${totalOpened} из 31 тренировок. Чтобы открыть подарок под ёлочкой, вам необходимо выполнить абсолютно все задания адвента! Выбрать можно будет только ОДИН подарок, так что налегайте на спорт! 🔥`
                );
                return;
            }

            // 2. Проверка: открывал ли уже коробку ранее
            if (openedGift) {
                if (openedGift === id) {
                    showModal("🎉", "Ваш подарок", giftWishes[id]);
                } else {
                    showModal("🔒", "Упс!", "Вы уже выбрали и забрали свой подарок. Остальные коробки открывать нельзя!");
                }
                return;
            }

            // Успешный выбор подарка
            openedGift = id;
            localStorage.setItem('adventOpenedGift 2026', id);
            
            checkGiftsAvailability();
            showModal("🎉", "С Новым Годом!", giftWishes[id]);
        });
    });
});

