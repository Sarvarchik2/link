import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export function SEO({
    title,
    description,
    keywords,
    image = '/og-image.png',
    url = 'https://link-digital.uz'
}: SEOProps) {
    const { language } = useLanguage();

    const siteTitle = 'LINK-DIGITAL | IT Company in Uzbekistan';

    // Dynamic descriptions based on language
    const descriptions = {
        en: 'Leading IT company in Uzbekistan. We build websites, mobile apps, CRM systems, and AI solutions. Premium web design and software development in Tashkent.',
        ru: 'Ведущая IT-компания в Узбекистане. Разработка сайтов, мобильных приложений, CRM-систем и AI решений. Премиальный веб-дизайн и создание ПО в Ташкенте.',
        uz: 'O\'zbekistondagi yetakchi IT kompaniya. Saytlar, mobil ilovalar, CRM tizimlar va AI yechimlar yaratamiz. Toshkentda premium veb-dizayn va dasturlash xizmatlari.'
    };

    const currentDescription = description || descriptions[language as keyof typeof descriptions] || descriptions.en;

    const defaultKeywords = [
        // English
        'IT company Uzbekistan', 'Web development Tashkent', 'Mobile app development', 'CRM systems', 'AI integration', 'Software agency',
        // Russian
        'IT компания Узбекистан', 'Разработка сайтов Ташкент', 'Создание мобильных приложений', 'CRM системы', 'Веб студия',
        // Uzbek
        'IT kompaniya O\'zbekiston', 'Sayt yaratish', 'Mobil ilovalar', 'CRM tizimlari', 'Dasturlash xizmatlari', 'Telegram botlar'
    ].join(', ');

    const fullTitle = title ? `${title} | LINK-DIGITAL` : siteTitle;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://link-digital.uz/#organization",
                "name": "Link Digital",
                "url": "https://link-digital.uz",
                "logo": "https://link-digital.uz/logo.png",
                "sameAs": [
                    "https://t.me/sarubola",
                    "https://instagram.com/sarubola",
                    "https://www.linkedin.com/in/sarvar-faxrutdinov-2b2143396"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+998-90-123-58-53",
                    "contactType": "sales",
                    "areaServed": "UZ",
                    "availableLanguage": ["en", "ru", "uz"]
                }
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://link-digital.uz/#localbusiness",
                "parentOrganization": { "@id": "https://link-digital.uz/#organization" },
                "name": "Link Digital HQ",
                "image": "https://link-digital.uz/og-image.png",
                "telephone": "+998-90-123-58-53",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Shakhrisabz Street 3",
                    "addressLocality": "Tashkent",
                    "addressCountry": "UZ"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 41.297857,
                    "longitude": 69.270115
                },
                "url": "https://link-digital.uz",
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://link-digital.uz/#website",
                "url": "https://link-digital.uz",
                "name": "Link Digital",
                "description": "Premium IT Solutions & Software Development in Uzbekistan",
                "publisher": { "@id": "https://link-digital.uz/#organization" },
                "inLanguage": language
            }
        ]
    };

    return (
        <Helmet>
            <html lang={language} />
            <title>{fullTitle}</title>
            <meta name="description" content={currentDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="business.business" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={currentDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content={language} />
            <meta property="business:contact_data:street_address" content="Shakhrisabz Street 3" />
            <meta property="business:contact_data:locality" content="Tashkent" />
            <meta property="business:contact_data:country_name" content="Uzbekistan" />
            <meta property="business:contact_data:phone_number" content="+998 90 123 58 53" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={currentDescription} />
            <meta property="twitter:image" content={image} />

            <link rel="canonical" href={url} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
