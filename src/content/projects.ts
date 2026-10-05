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
// Поставьте false, когда замените кейсы ниже на реальные.
export const PROJECTS_ARE_SAMPLES = true;

export const projects: Project[] = [
  {
    slug: "coffee-menu",
    category: "website",
    year: 2026,
    featured: true,
    stack: ["Next.js", "TypeScript", "Google Sheets API"],
    title: {
      ru: "Сайт кофейни с онлайн-меню",
      ky: "Онлайн менюсу бар кофейня сайты",
      en: "Coffee shop site with a live menu",
    },
    summary: {
      ru: "Меню подтягивается из Google Таблицы: бариста меняет цену в ячейке — через минуту она на сайте.",
      ky: "Меню Google Таблицадан алынат: бариста уячадагы бааны өзгөртсө, бир мүнөттөн кийин ал сайтта чыгат.",
      en: "The menu comes from a Google Sheet: the barista edits a cell and the new price is on the site a minute later.",
    },
    task: {
      ru: "Кофейня меняла меню каждую неделю и каждый раз просила разработчика поправить сайт.",
      ky: "Кофейня менюну жума сайын алмаштырып, ар бир жолу сайтты оңдоону иштеп чыгуучудан суранчу.",
      en: "The coffee shop changed its menu every week and had to ask a developer to update the site each time.",
    },
    done: {
      ru: [
        "Сверстал сайт на три страницы: меню, адреса, контакты",
        "Подключил Google Таблицу как источник меню",
        "Добавил кнопку заказа в WhatsApp с готовым текстом сообщения",
      ],
      ky: [
        "Үч барактуу сайт жасадым: меню, даректер, байланыш",
        "Менюнун булагы катары Google Таблицаны туташтырдым",
        "Даяр тексти бар WhatsApp аркылуу буйрутма баскычын коштум",
      ],
      en: [
        "Built a three-page site: menu, locations, contacts",
        "Connected a Google Sheet as the menu source",
        "Added a WhatsApp order button with a pre-filled message",
      ],
    },
    result: {
      ru: "Меню правит сам персонал, разработчик для этого больше не нужен.",
      ky: "Менюну кызматкерлер өздөрү оңдошот, бул үчүн иштеп чыгуучунун кереги жок.",
      en: "Staff edit the menu themselves; no developer is needed for it any more.",
    },
  },
  {
    slug: "barber-booking-bot",
    category: "bot",
    year: 2026,
    featured: true,
    stack: ["Python", "aiogram", "PostgreSQL"],
    title: {
      ru: "Telegram-бот записи в барбершоп",
      ky: "Барбершопко жаздыруучу Telegram-бот",
      en: "Telegram booking bot for a barbershop",
    },
    summary: {
      ru: "Клиент выбирает мастера и время прямо в чате, бот напоминает о визите за час.",
      ky: "Кардар устаны жана убакытты чаттын өзүндө тандайт, бот келерине бир саат калганда эскертет.",
      en: "The customer picks a barber and a time slot in the chat; the bot sends a reminder an hour before.",
    },
    task: {
      ru: "Администратор записывал клиентов по телефону и в личных сообщениях, часть записей терялась.",
      ky: "Администратор кардарларды телефон жана жеке билдирүүлөр аркылуу жаздырчу, айрым жазуулар жоголуп кетчү.",
      en: "The receptionist booked customers by phone and in direct messages, and some bookings got lost.",
    },
    done: {
      ru: [
        "Собрал сценарий записи: мастер, услуга, свободное время",
        "Сделал напоминания клиенту и уведомления мастеру",
        "Добавил команды администратора: расписание на день, отмена, перенос",
      ],
      ky: [
        "Жаздыруу сценарийин түздүм: уста, кызмат, бош убакыт",
        "Кардарга эскертүү жана устага билдирүү жасадым",
        "Администратордун буйруктарын коштум: күндүк график, жокко чыгаруу, которуу",
      ],
      en: [
        "Built the booking flow: barber, service, free slot",
        "Added reminders for customers and alerts for barbers",
        "Added admin commands: day schedule, cancel, reschedule",
      ],
    },
    result: {
      ru: "Запись идёт без участия администратора, расписание видно в одном чате.",
      ky: "Жаздыруу администратордун катышуусусуз жүрөт, график бир чатта көрүнүп турат.",
      en: "Bookings run without the receptionist, and the schedule lives in one chat.",
    },
  },
  {
    slug: "price-sync",
    category: "script",
    year: 2025,
    featured: true,
    stack: ["Python", "pandas", "cron"],
    title: {
      ru: "Синхронизация цен с прайсом поставщика",
      ky: "Бааларды жеткирүүчүнүн прайсы менен шайкештирүү",
      en: "Price sync with a supplier price list",
    },
    summary: {
      ru: "Скрипт раз в сутки сверяет прайс поставщика с каталогом магазина и обновляет изменившиеся цены.",
      ky: "Скрипт суткасына бир жолу жеткирүүчүнүн прайсын дүкөндүн каталогу менен салыштырып, өзгөргөн бааларды жаңыртат.",
      en: "Once a day the script compares the supplier's price list with the shop catalogue and updates the prices that changed.",
    },
    task: {
      ru: "Менеджер магазина вручную переносил цены из Excel-файла поставщика — около часа каждый день.",
      ky: "Дүкөндүн менеджери бааларды жеткирүүчүнүн Excel-файлынан кол менен көчүрчү — күн сайын бир саатка жакын.",
      en: "The shop manager copied prices from the supplier's Excel file by hand — about an hour every day.",
    },
    done: {
      ru: [
        "Написал разбор Excel-прайса и сопоставление по артикулам",
        "Настроил запуск по расписанию на сервере",
        "Добавил отчёт в Telegram: что изменилось и что не нашлось",
      ],
      ky: [
        "Excel-прайсты талдоону жана артикул боюнча салыштырууну жаздым",
        "Серверде график боюнча иштетүүнү орноттум",
        "Telegramга отчёт коштум: эмне өзгөрдү жана эмне табылган жок",
      ],
      en: [
        "Wrote the Excel parser and matching by SKU",
        "Set up a scheduled run on the server",
        "Added a Telegram report: what changed and what was not found",
      ],
    },
    result: {
      ru: "Цены обновляются ночью без участия менеджера.",
      ky: "Баалар түнкүсүн менеджердин катышуусусуз жаңыртылат.",
      en: "Prices update overnight without the manager.",
    },
  },
  {
    slug: "course-landing",
    category: "website",
    year: 2025,
    featured: false,
    stack: ["Next.js", "Tailwind CSS", "Resend"],
    title: {
      ru: "Лендинг онлайн-курса с оплатой",
      ky: "Төлөмү бар онлайн-курстун лендинги",
      en: "Online course landing page with payments",
    },
    summary: {
      ru: "Одна страница: программа, преподаватель, тарифы и оплата картой без перехода на сторонний сайт.",
      ky: "Бир барак: программа, окутуучу, тарифтер жана башка сайтка өтпөстөн карта менен төлөө.",
      en: "One page: syllabus, teacher, pricing and card payment without leaving the site.",
    },
    task: {
      ru: "Автор курса принимал оплату переводами и вёл список учеников в заметках.",
      ky: "Курстун автору төлөмдү которуу аркылуу кабыл алып, окуучулардын тизмесин заметкаларда жүргүзчү.",
      en: "The course author took payments by bank transfer and kept the student list in a notes app.",
    },
    done: {
      ru: [
        "Собрал лендинг с программой и тарифами",
        "Подключил приём оплаты картой",
        "Настроил письмо с доступом сразу после оплаты",
      ],
      ky: [
        "Программасы жана тарифтери бар лендинг жасадым",
        "Карта менен төлөм кабыл алууну туташтырдым",
        "Төлөмдөн кийин дароо кирүү укугу бар кат жөнөтүүнү орноттум",
      ],
      en: [
        "Built the landing page with the syllabus and pricing",
        "Connected card payments",
        "Set up an access email sent right after payment",
      ],
    },
    result: {
      ru: "Ученик получает доступ сам, без переписки с автором.",
      ky: "Окуучу кирүү укугун автор менен кат алышпастан өзү алат.",
      en: "Students get access on their own, with no back-and-forth with the author.",
    },
  },
  {
    slug: "delivery-orders-bot",
    category: "bot",
    year: 2025,
    featured: false,
    stack: ["Node.js", "WhatsApp Business API"],
    title: {
      ru: "WhatsApp-бот приёма заказов для доставки еды",
      ky: "Тамак жеткирүү үчүн буйрутма кабыл алуучу WhatsApp-бот",
      en: "WhatsApp order bot for a food delivery",
    },
    summary: {
      ru: "Бот показывает меню, собирает заказ и адрес и передаёт их на кухню.",
      ky: "Бот менюну көрсөтөт, буйрутманы жана даректи чогултуп, ашканага өткөрүп берет.",
      en: "The bot shows the menu, collects the order and the address, and passes them to the kitchen.",
    },
    task: {
      ru: "Заказы приходили сообщениями в свободной форме, оператор переспрашивал адрес и состав.",
      ky: "Буйрутмалар эркин формадагы билдирүүлөр менен келчү, оператор даректи жана курамын кайра сурачу.",
      en: "Orders arrived as free-form messages, and the operator had to ask again for the address and the items.",
    },
    done: {
      ru: [
        "Сделал меню с кнопками и корзину в чате",
        "Добавил проверку адреса и времени доставки",
        "Настроил передачу заказа в рабочий чат кухни",
      ],
      ky: [
        "Баскычтуу меню жана чаттагы себет жасадым",
        "Даректи жана жеткирүү убактысын текшерүүнү коштум",
        "Буйрутманы ашкананын жумушчу чатына өткөрүүнү орноттум",
      ],
      en: [
        "Built a button menu and an in-chat cart",
        "Added address and delivery-time checks",
        "Set up order hand-off to the kitchen's work chat",
      ],
    },
    result: {
      ru: "Заказ приходит на кухню в одном формате, оператор подключается только к спорным случаям.",
      ky: "Буйрутма ашканага бир форматта келет, оператор талаштуу учурларда гана кошулат.",
      en: "Orders reach the kitchen in one format; the operator steps in only for edge cases.",
    },
  },
  {
    slug: "leads-admin",
    category: "other",
    year: 2024,
    featured: false,
    stack: ["React", "Node.js", "PostgreSQL"],
    title: {
      ru: "Админ-панель для учёта заявок",
      ky: "Билдирмелерди эсепке алуучу админ-панель",
      en: "Admin panel for tracking enquiries",
    },
    summary: {
      ru: "Заявки с сайта, из бота и из мессенджеров в одной таблице со статусами и ответственными.",
      ky: "Сайттан, боттон жана мессенджерлерден келген билдирмелер статустары жана жооптуулары менен бир таблицада.",
      en: "Enquiries from the site, the bot and messengers in one table with statuses and owners.",
    },
    task: {
      ru: "Заявки жили в трёх местах: почта, Telegram и тетрадь на ресепшене.",
      ky: "Билдирмелер үч жерде сакталчу: почта, Telegram жана ресепшндеги дептер.",
      en: "Enquiries lived in three places: email, Telegram and a notebook at the front desk.",
    },
    done: {
      ru: [
        "Собрал единую таблицу заявок с фильтрами и поиском",
        "Подключил сайт и бота как источники",
        "Добавил статусы, ответственных и выгрузку в Excel",
      ],
      ky: [
        "Чыпкалары жана издөөсү бар бирдиктүү билдирмелер таблицасын жасадым",
        "Сайтты жана ботту булак катары туташтырдым",
        "Статустарды, жооптууларды жана Excelге чыгарууну коштум",
      ],
      en: [
        "Built a single enquiries table with filters and search",
        "Connected the site and the bot as sources",
        "Added statuses, owners and export to Excel",
      ],
    },
    result: {
      ru: "Все заявки видны в одном окне, ни одна не остаётся без статуса.",
      ky: "Бардык билдирмелер бир терезеде көрүнөт, бири да статуссуз калбайт.",
      en: "Every enquiry is visible in one window and none is left without a status.",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
