import type { Locale } from "@/i18n/routing";

export const categories = ["website", "bot", "script", "other"] as const;
export type Category = (typeof categories)[number];

type Localized<T = string> = Record<Locale, T>;

export type Project = {
  slug: string;
  category: Category;
  year: number;
  featured: boolean;
  stack: string[];
  /** Ссылка на живой проект, если его можно показать. */
  url?: string;
  /** Скриншот из /public. Пока его нет, обложку рисует схема по категории. */
  image?: { src: string; alt: Localized };
  title: Localized;
  summary: Localized;
  task: Localized;
  done: Localized<string[]>;
  result: Localized;
};

// Пока true, на главной и в портфолио висит плашка «это образцы».
export const PROJECTS_ARE_SAMPLES = false;

// Порядок в массиве — порядок на главной и в портфолио.
// Годы — по дате регистрации домена клиента. Стек — по тому, что видно на сайте.
export const projects: Project[] = [
  {
    slug: "girls-club",
    category: "website",
    year: 2026,
    featured: true,
    stack: ["Python", "Django"],
    url: "https://girlsclub.ques.kg/",
    image: {
      src: "/projects/girls-club.jpg",
      alt: {
        ru: "Лендинг вечера «1001 ночь»: золотой заголовок на бордовом фоне, дата, место, цена билета и кнопка «Купить билет»",
        ky: "«1001 түн» кечесинин лендинги: кочкул кызыл фондогу алтын аталыш, датасы, орду, билеттин баасы жана «Билет сатып алуу» баскычы",
        en: "Landing page for the “1001 Nights” evening: gold headline on burgundy, date, venue, ticket price and a “Buy ticket” button",
      },
    },
    title: {
      ru: "Лендинг вечера Girls Club «1001 ночь»",
      ky: "Girls Club «1001 түн» кечесинин лендинги",
      en: "Landing page for the Girls Club “1001 Nights” evening",
    },
    summary: {
      ru: "Одна страница под одно событие: дата, место, программа, цена билета и покупка.",
      ky: "Бир окуя үчүн бир барак: датасы, орду, программасы, билеттин баасы жана сатып алуу.",
      en: "One page for one event: date, venue, programme, ticket price and purchase.",
    },
    task: {
      ru: "Организаторам вечера нужна была страница, на которую можно дать одну ссылку в соцсетях — и человек сразу видит всё о событии и покупает билет.",
      ky: "Кечени уюштуруучуларга соцтармактарда бир шилтеме берсе, адам окуя тууралуу баарын дароо көрүп, билет сатып ала турган барак керек болчу.",
      en: "The organisers needed a page they could share as a single link on social media, where people see everything about the event and buy a ticket.",
    },
    done: {
      ru: [
        "Сверстал лендинг в восточной стилистике вечера",
        "Сделал вступительную анимацию, которая показывается один раз за визит",
        "Вывел цену билета с учётом даты покупки и связь через WhatsApp",
      ],
      ky: [
        "Кечеге ылайык чыгыш стилинде лендинг жасадым",
        "Бир келүүдө бир жолу гана көрсөтүлүүчү кириш анимациясын жасадым",
        "Сатып алуу датасына жараша билеттин баасын жана WhatsApp байланышын коштум",
      ],
      en: [
        "Built the landing page in the evening's oriental style",
        "Made an intro animation that plays once per visit",
        "Showed the ticket price by purchase date and added WhatsApp contact",
      ],
    },
    result: {
      ru: "Всё о вечере и покупка билета — по одной ссылке, которую организаторы ставят во все соцсети.",
      ky: "Кече тууралуу баары жана билет сатып алуу — уюштуруучулар бардык соцтармактарга коё турган бир шилтемеде.",
      en: "Everything about the evening and ticket purchase sits behind one link the organisers post on every social network.",
    },
  },
  {
    slug: "avangard-style",
    category: "website",
    year: 2025,
    featured: true,
    stack: ["Tilda"],
    url: "https://avangardstyle.kg/",
    image: {
      src: "/projects/avangard-style.jpg",
      alt: {
        ru: "Главная «Авангард Стиль»: фото жилых многоэтажек и цифры компании — с 1998 года, более 155 объектов, более 700 000 м²",
        ky: "«Авангард Стиль» башкы барагы: көп кабаттуу турак үйлөрдүн сүрөтү жана компаниянын сандары — 1998-жылдан бери, 155тен ашык объект, 700 000 м²ден ашык",
        en: "Avangard Style home page: photo of residential high-rises and company figures — since 1998, 155+ buildings, 700,000+ m²",
      },
    },
    title: {
      ru: "Сайт строительной компании «Авангард Стиль»",
      ky: "«Авангард Стиль» курулуш компаниясынын сайты",
      en: "Website for the Avangard Style construction company",
    },
    summary: {
      ru: "Сайт застройщика на Tilda: о компании, продажа квартир, бизнес-центр и фитнес-клуб в одном меню.",
      ky: "Tilda'дагы курулуш компаниясынын сайты: компания жөнүндө, батир сатуу, бизнес-борбор жана фитнес-клуб бир менюда.",
      en: "A developer's website on Tilda: the company, flat sales, a business centre and a fitness club in one menu.",
    },
    task: {
      ru: "Компания строит с 1998 года, у неё жильё, коммерческие объекты и свои бизнес-центр и фитнес-клуб. Всё это нужно было показать на одном сайте, который сотрудники могут править сами.",
      ky: "Компания 1998-жылдан бери курат, анын турак жайы, коммерциялык объекттери, өзүнүн бизнес-борбору жана фитнес-клубу бар. Мунун баарын кызматкерлер өздөрү оңдой ала турган бир сайтта көрсөтүү керек болчу.",
      en: "The company has been building since 1998 and runs housing, commercial projects, its own business centre and a fitness club. All of it had to fit on one site that staff can edit themselves.",
    },
    done: {
      ru: [
        "Собрал сайт на Tilda с разделами под каждое направление",
        "Вынес ключевые цифры компании на первый экран",
        "Добавил кнопку «Связаться» и чат на каждой странице",
      ],
      ky: [
        "Ар бир багыт үчүн бөлүмдөрү бар сайтты Tilda'да түздүм",
        "Компаниянын негизги сандарын биринчи экранга чыгардым",
        "Ар бир баракка «Байланышуу» баскычын жана чатты коштум",
      ],
      en: [
        "Built the site on Tilda with a section for each line of business",
        "Put the company's key figures on the first screen",
        "Added a “Contact us” button and chat on every page",
      ],
    },
    result: {
      ru: "Тексты, фото и объекты сотрудники компании обновляют в Tilda сами, без разработчика.",
      ky: "Тексттерди, сүрөттөрдү жана объекттерди компаниянын кызматкерлери Tilda'да иштеп чыгуучусуз өздөрү жаңыртышат.",
      en: "Company staff update texts, photos and listings in Tilda themselves, without a developer.",
    },
  },
  {
    slug: "ktz",
    category: "website",
    year: 2025,
    featured: true,
    stack: ["Python", "Django"],
    url: "https://ktz.kg/",
    image: {
      src: "/projects/ktz.jpg",
      alt: {
        ru: "Главная сайта ОСОО КТЗ: заголовок «Кыргызский трансформаторный завод», меню с разделами «Сервисы», «Магазин», «Проекты», «Вакансии»",
        ky: "ОСОО КТЗ сайтынын башкы барагы: «Кыргыз трансформатор заводу» аталышы жана «Кызматтар», «Дүкөн», «Долбоорлор», «Вакансиялар» бөлүмдөрү",
        en: "KTZ home page: the headline “Kyrgyz Transformer Plant” and a menu with Services, Shop, Projects and Vacancies",
      },
    },
    title: {
      ru: "Сайт Кыргызского трансформаторного завода",
      ky: "Кыргыз трансформатор заводунун сайты",
      en: "Website for the Kyrgyz Transformer Plant",
    },
    summary: {
      ru: "Корпоративный сайт завода: услуги, каталог оборудования с поиском, проекты, новости и вакансии на русском и кыргызском.",
      ky: "Заводдун корпоративдик сайты: кызматтар, издөөсү бар жабдуулар каталогу, долбоорлор, жаңылыктар жана вакансиялар орус жана кыргыз тилинде.",
      en: "Corporate site for the plant: services, an equipment catalogue with search, projects, news and vacancies in Russian and Kyrgyz.",
    },
    task: {
      ru: "Завод производит трансформаторы, делает монтаж, ремонт и проектирование электроснабжения. Всё это нужно было показать заказчикам и соискателям в одном месте.",
      ky: "Завод трансформаторлорду чыгарат, монтаж, оңдоо жана электр менен камсыздоону долбоорлоо иштерин жасайт. Мунун баарын буйрутмачыларга жана иш издөөчүлөргө бир жерден көрсөтүү керек болчу.",
      en: "The plant makes transformers and also does installation, repair and power supply design. All of that had to be shown to customers and job seekers in one place.",
    },
    done: {
      ru: [
        "Собрал разделы услуг, проектов, новостей и вакансий с управлением из админки",
        "Сделал каталог оборудования с поиском по товарам",
        "Добавил форму заявки и двуязычную версию RU / KG",
      ],
      ky: [
        "Админкадан башкарылуучу кызматтар, долбоорлор, жаңылыктар жана вакансиялар бөлүмдөрүн түздүм",
        "Товарлар боюнча издөөсү бар жабдуулар каталогун жасадым",
        "Билдирме формасын жана RU / KG эки тилдүү версиясын коштум",
      ],
      en: [
        "Built services, projects, news and vacancies sections managed from an admin panel",
        "Made an equipment catalogue with product search",
        "Added an enquiry form and a two-language RU / KG version",
      ],
    },
    result: {
      ru: "Новости, проекты и вакансии сотрудники завода публикуют сами через админку, без разработчика.",
      ky: "Жаңылыктарды, долбоорлорду жана вакансияларды заводдун кызматкерлери админка аркылуу иштеп чыгуучусуз өздөрү жарыялашат.",
      en: "Plant staff publish news, projects and vacancies themselves through the admin panel, without a developer.",
    },
  },
  {
    slug: "nurkadam",
    category: "website",
    year: 2026,
    featured: true,
    stack: ["Python", "Django"],
    url: "https://nurkadam.kg/",
    image: {
      src: "/projects/nurkadam.jpg",
      alt: {
        ru: "Главная NurKadam: заголовок «Работа в Болгарии с жильём и билетами» и список открытых вакансий с зарплатами",
        ky: "NurKadam башкы барагы: «Болгарияда турак жай жана билет менен иш» аталышы жана айлыгы көрсөтүлгөн ачык вакансиялар",
        en: "NurKadam home page: the headline “Work in Bulgaria with housing and tickets” and a list of open jobs with salaries",
      },
    },
    title: {
      ru: "Сайт рекрутингового агентства NurKadam",
      ky: "NurKadam рекрутинг агенттигинин сайты",
      en: "Website for the NurKadam recruitment agency",
    },
    summary: {
      ru: "Вакансии в Болгарии для граждан Кыргызстана: зарплата, жильё и условия видны до звонка менеджеру. Четыре языка.",
      ky: "Кыргызстандын жарандары үчүн Болгариядагы вакансиялар: айлык, турак жай жана шарттар менеджерге чалганга чейин көрүнөт. Төрт тил.",
      en: "Jobs in Bulgaria for citizens of Kyrgyzstan: salary, housing and conditions are visible before anyone calls a manager. Four languages.",
    },
    task: {
      ru: "Агентству нужен был сайт, по которому соискатель сам поймёт, какие есть вакансии и на каких условиях, и одним нажатием напишет менеджеру.",
      ky: "Агенттикке издөөчү кандай вакансиялар бар экенин жана шарттарын өзү түшүнүп, бир басуу менен менеджерге жаза турган сайт керек болчу.",
      en: "The agency needed a site where a job seeker can see the open positions and their terms on their own, then message a manager in one tap.",
    },
    done: {
      ru: [
        "Сделал каталог вакансий с зарплатой и условиями на каждой карточке",
        "Перевёл сайт на русский, кыргызский, английский и болгарский",
        "Вывел WhatsApp-кнопку на каждый экран и разметку для поисковиков",
      ],
      ky: [
        "Ар бир карточкасында айлыгы жана шарттары бар вакансиялар каталогун жасадым",
        "Сайтты орус, кыргыз, англис жана болгар тилдерине которудум",
        "Ар бир экранга WhatsApp баскычын жана издөө системалары үчүн белгилөөнү коштум",
      ],
      en: [
        "Built a job catalogue with salary and terms on every card",
        "Made the site available in Russian, Kyrgyz, English and Bulgarian",
        "Put a WhatsApp button on every screen and added markup for search engines",
      ],
    },
    result: {
      ru: "Соискатель видит зарплату, жильё и условия до первого звонка и пишет в WhatsApp уже по конкретной вакансии.",
      ky: "Издөөчү айлыкты, турак жайды жана шарттарды биринчи чалуудан мурун көрүп, WhatsApp'ка белгилүү бир вакансия боюнча жазат.",
      en: "Applicants see the salary, housing and terms before the first call and message on WhatsApp about a specific job.",
    },
  },
  {
    slug: "ques",
    category: "website",
    year: 2025,
    featured: false,
    stack: ["Python", "Django"],
    url: "https://ques.kg/",
    image: {
      src: "/projects/ques.jpg",
      alt: {
        ru: "Каталог ques.kg: сетка товаров с фото — жемчуг, бусы galaxy, шармы — и ценами в сомах",
        ky: "ques.kg каталогу: сүрөттөрү бар товарлар — бермет, galaxy мончоктору, шармдар — жана сом менен баалары",
        en: "The ques.kg catalogue: a grid of products with photos — pearls, galaxy beads, charms — and prices in som",
      },
    },
    title: {
      ru: "Каталог магазина Ques Home",
      ky: "Ques Home дүкөнүнүн каталогу",
      en: "Ques Home shop catalogue",
    },
    summary: {
      ru: "Каталог магазина товаров для дома и рукоделия: почти 1000 позиций с фото и ценами, поиск и заказ через WhatsApp.",
      ky: "Үй жана кол өнөрчүлүк товарлары дүкөнүнүн каталогу: сүрөтү жана баасы бар 1000ге жакын позиция, издөө жана WhatsApp аркылуу буйрутма.",
      en: "Catalogue for a home and craft goods shop: almost 1,000 items with photos and prices, search and ordering via WhatsApp.",
    },
    task: {
      ru: "Ques Home продаёт бусы, шармы, свечи и вещи для дома — почти тысячу позиций. Нужен был каталог, где покупатель сам найдёт нужное и сразу закажет.",
      ky: "Ques Home мончок, шарм, шам жана үй буюмдарын сатат — 1000ге жакын позиция. Сатып алуучу керектүүсүн өзү таап, дароо буйрутма бере турган каталог керек болчу.",
      en: "Ques Home sells beads, charms, candles and homeware — almost a thousand items. The shop needed a catalogue where buyers find what they want on their own and order right away.",
    },
    done: {
      ru: [
        "Сделал каталог с категориями, поиском и постраничным выводом",
        "Собрал карточку товара: фото, название и цена в сомах",
        "Добавил заказ в один тап: кнопка открывает WhatsApp магазина",
      ],
      ky: [
        "Категориялары, издөөсү жана барактары бар каталог жасадым",
        "Товардын карточкасын түздүм: сүрөт, аталыш жана сом менен баа",
        "Бир басуу менен буйрутма коштум: баскыч дүкөндүн WhatsAppын ачат",
      ],
      en: [
        "Built the catalogue with categories, search and pagination",
        "Made the product page: photo, name and price in som",
        "Added one-tap ordering: the button opens the shop's WhatsApp",
      ],
    },
    result: {
      ru: "Покупатель выбирает товар на сайте и пишет в WhatsApp уже с конкретной позицией, а не спрашивает «что есть в наличии».",
      ky: "Сатып алуучу товарды сайттан тандап, WhatsAppка «эмне бар» деп сурабай, так позиция менен жазат.",
      en: "Buyers pick an item on the site and message on WhatsApp about a specific product instead of asking what's in stock.",
    },
  },
  {
    slug: "european-group",
    category: "website",
    year: 2026,
    featured: false,
    stack: ["Python", "Django"],
    url: "https://european-group.kg/",
    title: {
      ru: "Сайт консалтинговой компании European Group",
      ky: "European Group консалтинг компаниясынын сайты",
      en: "Website for the European Group consultancy",
    },
    summary: {
      ru: "Трудоустройство в Европе, учёба за рубежом, визы и туры — каждое направление со своей страницей и формой заявки. Три языка.",
      ky: "Европада жумушка орношуу, чет өлкөдө окуу, визалар жана турлар — ар бир багыттын өз барагы жана билдирме формасы бар. Үч тил.",
      en: "Jobs in Europe, study abroad, visas and tours — each line of business with its own page and enquiry form. Three languages.",
    },
    task: {
      ru: "У компании много направлений, и клиенты путались, к кому обращаться. Нужен был сайт, который разводит людей по услугам и собирает заявки.",
      ky: "Компаниянын багыттары көп, кардарлар кимге кайрыларын билбей адашчу. Адамдарды кызматтар боюнча бөлүп, билдирмелерди чогултуучу сайт керек болчу.",
      en: "The company has many lines of business, and clients were unsure whom to contact. It needed a site that routes people to the right service and collects enquiries.",
    },
    done: {
      ru: [
        "Разбил услуги по направлениям: работа, консалтинг, отдых, образование",
        "Сделал версии на русском, кыргызском и английском",
        "Добавил кнопку срочной консультации и WhatsApp на каждой странице",
      ],
      ky: [
        "Кызматтарды багыттар боюнча бөлдүм: жумуш, консалтинг, эс алуу, билим берүү",
        "Орус, кыргыз жана англис тилдериндеги версияларды жасадым",
        "Ар бир баракка шашылыш консультация баскычын жана WhatsApp коштум",
      ],
      en: [
        "Split the services into lines: jobs, consulting, travel, education",
        "Made Russian, Kyrgyz and English versions",
        "Added an urgent consultation button and WhatsApp on every page",
      ],
    },
    result: {
      ru: "Сайт стал постоянным источником заявок: клиенты часто приходят через форму, уже зная, какая услуга им нужна.",
      ky: "Сайт билдирмелердин туруктуу булагы болуп калды: кардарлар көбүнчө кайсы кызмат керек экенин билип, форма аркылуу келишет.",
      en: "The site became a steady source of leads: clients often come in through the form already knowing which service they need.",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
