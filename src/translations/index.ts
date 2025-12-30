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
            saas: {
                title: 'SaaS Rivojlantirish',
                desc: 'Masshtablashuvchi veb-ilovalar uchun Django REST Framework va Vue.js yechimlari'
            },
            ai: {
                title: 'AI Integratsiyasi',
                desc: 'Mashinaviy o\'rganish va neyron tarmoqlarni mahsulotlaringizga integratsiya qilish'
            },
            mobile: {
                title: 'Mobil Ilovalar',
                desc: 'Flutter yordamida krossplatformali nativ ilovalar'
            },
            backend: {
                title: 'Backend Tizimlar',
                desc: 'Python/Django asosida yuqori yuklamali API va mikroserrvis arxitekturasi'
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
                email: 'Email',
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
            saas: {
                title: 'SaaS Разработка',
                desc: 'Облачные решения с использованием Django REST Framework и Vue.js для масштабируемых веб-приложений'
            },
            ai: {
                title: 'AI Интеграция',
                desc: 'Интеграция машинного обучения и нейронных сетей в ваши продукты'
            },
            mobile: {
                title: 'Мобильные Приложения',
                desc: 'Нативные приложения на Flutter с кроссплатформенной разработкой'
            },
            backend: {
                title: 'Backend Системы',
                desc: 'Высоконагруженные API и микросервисная архитектура на Python/Django'
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
                email: 'Email',
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
            saas: {
                title: 'SaaS Development',
                desc: 'Cloud solutions using Django REST Framework and Vue.js for scalable web applications'
            },
            ai: {
                title: 'AI Integration',
                desc: 'Integration of machine learning and neural networks into your products'
            },
            mobile: {
                title: 'Mobile Apps',
                desc: 'Native applications on Flutter with cross-platform development'
            },
            backend: {
                title: 'Backend Systems',
                desc: 'High-load APIs and microservice architecture on Python/Django'
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
                email: 'Email',
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
