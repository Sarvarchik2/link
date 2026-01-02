export type Language = 'uz' | 'ru' | 'en';

export type TranslationKeys = string;

export const translations = {
    uz: {
        nav: {
            home: 'Bosh Sahifa',
            services: 'Xizmatlar',
            portfolio: 'Portfolio',
            about: 'Biz Haqimizda',
            team: 'Jamoa',
            contact: 'Aloqa'
        },
        hero: {
            line1: 'KELAJAK',
            line2: 'TEXNOLOGIYALARINI',
            line3: 'YARATAMIZ',
            subtitle: 'Murakkab vazifalarni elegant kodga aylantiramiz',
            start_project: 'Loyihani Boshlash'
        },
        services: {
            title: 'XIZMATLAR',
            subtitle: 'Biznesingiz uchun kompleks yechimlar',
            ai_agents: {
                title: 'AI Agentlar va Chat-botlar',
                desc: '24/7 raqamli xodimlaringiz. Muloqotni avtomatlashtiruvchi intellektual agentlar.'
            },
            crm: {
                title: 'CRM Tizimlar',
                desc: 'Jarayonlaringizga moslashtirilgan boshqaruv vositalari.'
            },
            mini_apps: {
                title: 'Telegram Mini Apps',
                desc: 'Butun biznes messendjer ichida. Telegramni raqamli vitrinaga aylantiramiz.'
            },
            mobile: {
                title: 'Mobil Ilovalar',
                desc: 'Nativ va krossplatformali ilovalar (Swift, Kotlin, Flutter).'
            },
            web: {
                title: 'Veb va E-commerce',
                desc: 'Daromad keltiradigan tijorat saytlari va internet-do\'konlar.'
            },
            design: {
                title: 'UI/UX Dizayn',
                desc: 'Natija beradigan estetika va o\'ylangan foydalanuvchi tajribasi.'
            }
        },
        portfolio: {
            title: 'PORTFOLIO',
            subtitle: 'Tanlangan loyihalar',
            scroll: 'Aylantirish',
            projects: {
                p1: {
                    desc: 'AI yordamida kundalik vazifalarni boshqarish uchun intellektual platforma'
                },
                abuexpress: {
                    desc: 'Xalqaro logistika kompaniyasi. Yuklarni kuzatish va yetkazib berishni boshqarish platformasi.'
                },
                profyer: {
                    desc: 'Uy va ofis xizmatlari uchun mutaxassislarni topish platformasi. Har qanday vazifa uchun professional yechim.'
                },
                ozbe: {
                    desc: 'Moda kiyimlari onlayn do\'koni. Noyob uslubga ega zamonaviy brend platformasi.'
                },
                magictour: {
                    desc: 'Sayohat agentligi veb-sayti. Unutilmas sayohatlar va turlar uchun onlayn platforma.'
                },
                makromarket: {
                    desc: 'Yirik supermarketlar tarmog\'i onlayn do\'koni. Mahsulotlar katalogi, aksiyalar va yetkazib berish.'
                },
                lixiang: {
                    desc: 'Lixiang avtomobillari rasmiy dilerining sayti. Avtomobil konfiguratori va modellar qatori.'
                },
                ione: {
                    desc: 'To\'liq sikldagi marketing agentligi. Brendlar uchun loyihalarni ishlab chiqish va amalga oshirish.'
                },
                mysport: {
                    desc: 'O\'zbekiston Sport Federatsiyasi platformasi. Sport inshootlari xaritasi va sportchilar bazasi.'
                },
                cult: {
                    desc: 'Zamonaviy barbershop sayti. Xizmatlar, narxlar va onlayn bron qilish.'
                },
                p2: {
                    desc: 'Yirik korporatsiyalar uchun masshtablashuvchi CRM tizimi'
                },
                p3: {
                    desc: 'Real vaqt rejimida moliyaviy operatsiyalar uchun tahliliy platforma'
                },
                p4: {
                    desc: 'Tibbiy yozuvlarni boshqarish uchun raqamli platforma'
                }
            }
        },
        about: {
            title: 'BIZ HAQIMIZDA',
            subtitle: 'O\'zbekistonlik dasturchilar jamoasi',
            mission: {
                title: 'Bizning Missiyamiz',
                text1: 'Biz Django, Nuxt.js, Flutter va AI integratsiyalari kabi zamonaviy texnologiyalardan foydalangan holda yuqori samarali veb-ilovalar va mobil yechimlar yaratishga ixtisoslashganmiz.',
                text2: 'Bizning jamoamiz murakkab biznes talablarini elegant texnik yechimlarga aylantiradigan tajribali dasturchilardan iborat.'
            },
            approach: {
                title: 'Bizning Yondashuvimiz',
                text1: 'Biz Agile dasturlash tamoyillariga amal qilamiz, bu jarayonning shaffofligini va talablar o\'zgarishiga tezkor moslashishni ta\'minlaydi.',
                text2: 'Har bir loyiha biz uchun ilg\'or texnologiyalarni qo\'llash va mijozlar kutganidan ham a\'lo mahsulot yaratish imkoniyatidir.'
            },
            stats: {
                projects: 'Tamomlangan loyihalar',
                years: 'Yillik tajriba',
                specialists: 'Mutaxassislar'
            }
        },
        team: {
            title: 'TIZIM OPERATORLARI',
            subtitle: 'Yuqori texnologiyali mutaxassislar jamoasi',
            roles: {
                architect: 'BOSH ARXITEKTOR',
                backend: 'BACKEND MUHANDISI',
                frontend: 'FRONTEND MUTAXASSISI',
                ai: 'AI INTEGRATSIYASI',
                mobile: 'MOBIL DASTURCHI',
                devops: 'DEVOPS MUHANDISI'
            }
        },
        contact: {
            title: 'ALOQA',
            subtitle: 'Loyihangizni muhokama qilaylik',
            form: {
                name: 'Ism',
                email: 'Telefon raqam',
                message: 'Xabar',
                namePlaceholder: 'Ismingiz',
                msgPlaceholder: 'Loyihangiz haqida so\'zlab bering...',
                submit: 'Xabar Yuborish',
                success: 'Xabaringiz uchun rahmat! Tez orada siz bilan bog\'lanamiz.'
            }
        },
        footer: {
            desc: 'Zamonaviy veb va mobil ilovalar yaratishga ixtisoslashgan O\'zbekistonlik dasturchilar jamoasi.',
            nav: 'Navigatsiya',
            social: 'Ijtimoiy Tarmoqlar',
            rights: 'Barcha huquqlar himoyalangan.',
            privacy: 'Maxfiylik Siyosati',
            terms: 'Foydalanish Shartlari'
        },
        common: {
            readMore: 'Ko\'proq o\'qish',
            viewAll: 'Barchasini ko\'rish'
        }
    },
    ru: {
        nav: {
            home: 'Главная',
            services: 'Услуги',
            portfolio: 'Портфолио',
            about: 'О нас',
            team: 'Команда',
            contact: 'Контакты'
        },
        hero: {
            line1: 'ИНЖЕНЕРИЯ',
            line2: 'РЕШЕНИЙ',
            line3: 'БУДУЩЕГО',
            subtitle: 'Превращаем сложные задачи в элегантный код',
            start_project: 'Начать Проект'
        },
        services: {
            title: 'УСЛУГИ',
            subtitle: 'Комплексные решения для вашего бизнеса',
            ai_agents: {
                title: 'ИИ-агенты и Чат-боты',
                desc: 'Ваши цифровые сотрудники 24/7. Интеллектуальные агенты для полной автоматизации коммуникации.'
            },
            crm: {
                title: 'Разработка CRM-систем',
                desc: 'Инструменты управления, созданные под ваши процессы. Проектирование систем с нуля.'
            },
            mini_apps: {
                title: 'Mini Apps в Telegram',
                desc: 'Весь бизнес внутри мессенджера. Превращаем Telegram в полноценную цифровую витрину.'
            },
            mobile: {
                title: 'Мобильная разработка',
                desc: 'Нативные и кроссплатформенные приложения. Современные мобильные продукты.'
            },
            web: {
                title: 'Веб-разработка и E-commerce',
                desc: 'Коммерческие сайты, которые приносят прибыль. Масштабируемая архитектура.'
            },
            design: {
                title: 'Дизайн и проектирование',
                desc: 'Эстетика, работающая на результат. Продуманный пользовательский опыт.'
            }
        },
        portfolio: {
            title: 'ПОРТФОЛИО',
            subtitle: 'Избранные проекты',
            scroll: 'Листать',
            projects: {
                p1: {
                    desc: 'Интеллектуальная платформа для управления повседневными задачами с использованием AI'
                },
                abuexpress: {
                    desc: 'Международная логистическая компания. Платформа для отслеживания грузов и управления доставками.'
                },
                profyer: {
                    desc: 'Платформа для поиска специалистов для дома и офиса. Профессиональные решения для любых задач.'
                },
                ozbe: {
                    desc: 'Интернет-магазин модной одежды. Платформа современного бренда с уникальным стилем.'
                },
                magictour: {
                    desc: 'Веб-сайт туристического агентства. Онлайн-платформа для бронирования туров и путешествий.'
                },
                makromarket: {
                    desc: 'Интернет-магазин крупной сети супермаркетов. Каталог товаров, акции и доставка.'
                },
                lixiang: {
                    desc: 'Сайт официального дилера автомобилей Lixiang. Конфигуратор и модельный ряд электромобилей.'
                },
                ione: {
                    desc: 'Маркетинговое агентство полного цикла. Разработка и реализация проектов для брендов.'
                },
                mysport: {
                    desc: 'Платформа Федерации спорта Узбекистана. Карта спортивных сооружений и база спортсменов.'
                },
                cult: {
                    desc: 'Сайт современного барбершопа. Услуги, прайс и онлайн-запись.'
                },
                p2: {
                    desc: 'Масштабируемая CRM система для крупных корпораций'
                },
                p3: {
                    desc: 'Аналитическая платформа для финансовых операций в реальном времени'
                },
                p4: {
                    desc: 'Цифровая платформа для управления медицинскими записями'
                }
            }
        },
        about: {
            title: 'О НАС',
            subtitle: 'Команда разработчиков из Узбекистана',
            mission: {
                title: 'Наша Миссия',
                text1: 'Мы специализируемся на создании высокопроизводительных веб-приложений и мобильных решений, используя современные технологии: Django, Nuxt.js, Flutter и AI-интеграции.',
                text2: 'Наша команда состоит из опытных разработчиков, которые превращают сложные бизнес-требования в элегантные технические решения.'
            },
            approach: {
                title: 'Наш Подход',
                text1: 'Мы следуем принципам Agile-разработки, обеспечивая прозрачность процесса и быструю адаптацию к изменениям требований.',
                text2: 'Каждый проект для нас — это возможность применить передовые технологии и создать продукт, который превосходит ожидания клиентов.'
            },
            stats: {
                projects: 'Проектов завершено',
                years: 'Лет опыта',
                specialists: 'Специалистов'
            }
        },
        team: {
            title: 'СИСТЕМНЫЕ ОПЕРАТОРЫ',
            subtitle: 'Команда высокотехнологичных специалистов',
            roles: {
                architect: 'ВЕДУЩИЙ АРХИТЕКТОР',
                backend: 'BACKEND ИНЖЕНЕР',
                frontend: 'FRONTEND СПЕЦИАЛИСТ',
                ai: 'AI ИНТЕГРАТОР',
                mobile: 'МОБИЛЬНЫЙ РАЗРАБОТЧИК',
                devops: 'DEVOPS ИНЖЕНЕР'
            }
        },
        contact: {
            title: 'КОНТАКТЫ',
            subtitle: 'Давайте обсудим ваш проект',
            form: {
                name: 'Имя',
                email: 'Телефон',
                message: 'Сообщение',
                namePlaceholder: 'Ваше имя',
                msgPlaceholder: 'Расскажите о вашем проекте...',
                submit: 'Отправить сообщение',
                success: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
            }
        },
        footer: {
            desc: 'Команда разработчиков из Узбекистана, специализирующаяся на создании современных веб и мобильных приложений.',
            nav: 'Навигация',
            social: 'Социальные сети',
            rights: 'Все права защищены.',
            privacy: 'Политика конфиденциальности',
            terms: 'Условия использования'
        },
        common: {
            readMore: 'Читать далее',
            viewAll: 'Смотреть все'
        }
    },
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            portfolio: 'Portfolio',
            about: 'About',
            team: 'Team',
            contact: 'Contact'
        },
        hero: {
            line1: 'ENGINEERING',
            line2: 'NEXT-GEN',
            line3: 'SOLUTIONS',
            subtitle: 'Converting complex tasks into elegant code',
            start_project: 'Start Project'
        },
        services: {
            title: 'SERVICES',
            subtitle: 'Comprehensive solutions for your business',
            ai_agents: {
                title: 'AI Agents & Chatbots',
                desc: 'Your digital employees 24/7. Intelligent agents automating communication.'
            },
            crm: {
                title: 'CRM Development',
                desc: 'Management tools tailored to your processes. Custom system design.'
            },
            mini_apps: {
                title: 'Telegram Mini Apps',
                desc: 'Full business functionality inside the messenger. Digital storefronts in Telegram.'
            },
            mobile: {
                title: 'Mobile Development',
                desc: 'Native and cross-platform applications. Modern mobile products.'
            },
            web: {
                title: 'Web & E-commerce',
                desc: 'Profitable commercial websites and scalable architectures.'
            },
            design: {
                title: 'Design & UI/UX',
                desc: 'Aesthetics that work. Thoughtful user experience and modern visual style.'
            }
        },
        portfolio: {
            title: 'PORTFOLIO',
            subtitle: 'Selected Projects',
            scroll: 'Scroll',
            projects: {
                p1: {
                    desc: 'Intelligent platform for daily task management using AI'
                },
                abuexpress: {
                    desc: 'International logistics company. Platform for cargo tracking and delivery management.'
                },
                profyer: {
                    desc: 'Platform for finding professionals for home and office services. Expert solutions for any task.'
                },
                ozbe: {
                    desc: 'Fashion clothing online store. Modern brand platform with unique style.'
                },
                magictour: {
                    desc: 'Travel agency website. Online platform for booking tours and unforgettable trips.'
                },
                makromarket: {
                    desc: 'Online store for a major supermarket chain. Product catalog, promotions, and delivery.'
                },
                lixiang: {
                    desc: 'Official Lixiang car dealer website. Car configurator and electric vehicle model lineup.'
                },
                ione: {
                    desc: 'Full-cycle marketing agency. Development and implementation of projects for brands.'
                },
                mysport: {
                    desc: 'Uzbekistan Sports Federation platform. Map of sports facilities and athletes database.'
                },
                cult: {
                    desc: 'Modern barbershop website. Services, pricing, and online booking.'
                },
                p2: {
                    desc: 'Scalable CRM system for large corporations'
                },
                p3: {
                    desc: 'Real-time analytics platform for financial operations'
                },
                p4: {
                    desc: 'Digital platform for medical record management'
                }
            }
        },
        about: {
            title: 'ABOUT US',
            subtitle: 'Development team from Uzbekistan',
            mission: {
                title: 'Our Mission',
                text1: 'We specialize in building high-performance web applications and mobile solutions using modern technologies: Django, Nuxt.js, Flutter, and AI integrations.',
                text2: 'Our team consists of experienced developers who turn complex business requirements into elegant technical solutions.'
            },
            approach: {
                title: 'Our Approach',
                text1: 'We follow Agile development principles, ensuring process transparency and rapid adaptation to changing requirements.',
                text2: 'Every project for us is an opportunity to apply advanced technologies and create a product that exceeds client expectations.'
            },
            stats: {
                projects: 'Projects Completed',
                years: 'Years Experience',
                specialists: 'Specialists'
            }
        },
        team: {
            title: 'SYSTEM OPERATIVES',
            subtitle: 'High-tech specialists team',
            roles: {
                architect: 'LEAD ARCHITECT',
                backend: 'BACKEND ENGINEER',
                frontend: 'FRONTEND SPECIALIST',
                ai: 'AI INTEGRATION',
                mobile: 'MOBILE DEVELOPER',
                devops: 'DEVOPS ENGINEER'
            }
        },
        contact: {
            title: 'CONTACT',
            subtitle: 'Let\'s discuss your project',
            form: {
                name: 'Name',
                email: 'Phone',
                message: 'Message',
                namePlaceholder: 'Your Name',
                msgPlaceholder: 'Tell us about your project...',
                submit: 'Send Message',
                success: 'Thank you for your message! We will contact you shortly.'
            }
        },
        footer: {
            desc: 'Development team from Uzbekistan specialized in creating modern web and mobile applications.',
            nav: 'Navigation',
            social: 'Social Networks',
            rights: 'All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service'
        },
        common: {
            readMore: 'Read More',
            viewAll: 'View All'
        }
    }
};
