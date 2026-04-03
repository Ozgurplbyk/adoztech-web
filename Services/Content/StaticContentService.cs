using Adoztech.Web.Services.Routing;

namespace Adoztech.Web.Services.Content;

public sealed class StaticContentService : IContentService
{
    public HomePageContent GetHomePage(string culture)
    {
        var projects = GetFeaturedProjects(culture);

        return culture == "en"
            ? new HomePageContent(
                "Strategic digital delivery for growth-oriented brands",
                "Adoztech builds digital experiences that look refined, perform fast, and earn trust.",
                "We align strategy, interface design, software delivery, and measurable growth so your digital presence feels cohesive from first touch to conversion.",
                "Start a project",
                "Explore services",
                new[]
                {
                    new MetricContent("5+", "Core service verticals"),
                    new MetricContent("2", "Working languages"),
                    new MetricContent("24/7", "Operational mindset")
                },
                GetServiceCards("en"),
                new[]
                {
                    new ReasonContent("Measured execution", "We scope clearly, document decisions, and move with realistic delivery discipline."),
                    new ReasonContent("Design with confidence", "Interfaces are intentionally calm, modern, and conversion-ready without looking generic."),
                    new ReasonContent("Technology that scales", "Architecture decisions stay practical for today while leaving room for tomorrow.")
                },
                GetProcessSteps("en"),
                projects,
                new CallToActionContent(
                    "Ready to turn an idea into a dependable digital product?",
                    "We can shape the roadmap, reduce ambiguity, and help you launch with clarity.",
                    "Request a quote",
                    "Contact us"),
                new ContactSummaryContent(
                    "A direct, structured conversation works best.",
                    "Share your objective, timing, and current context. We will respond with a focused recommendation instead of a generic sales answer.",
                    "Contact Adoztech",
                    "View process"))
            : new HomePageContent(
                "Buyume odakli markalar icin stratejik dijital teslimat",
                "Adoztech, guven veren ve rafine hissettiren dijital deneyimleri strateji, tasarim ve yazilimla hayata gecirir.",
                "Ilk temas anindan teklif ve iletisime kadar butun dijital temas noktalarini tutarli, hizli ve olgun bir yapida kurguluyoruz.",
                "Proje baslat",
                "Hizmetleri incele",
                new[]
                {
                    new MetricContent("5+", "Ana hizmet dikeyi"),
                    new MetricContent("2", "Aktif dil altyapisi"),
                    new MetricContent("24/7", "Operasyon bilinci")
                },
                GetServiceCards("tr"),
                new[]
                {
                    new ReasonContent("Olculu ilerleme", "Her isi net kapsama, dogru onceliklendirme ve kontrol edilebilir teslim mantigi ile yonetiyoruz."),
                    new ReasonContent("Guven veren tasarim", "Arayuzleri siradanlastirmadan sakin, premium ve donusume hazir sekilde tasarliyoruz."),
                    new ReasonContent("Gelisime acik teknoloji", "Bugun icin pratik, yarin icin genisleyebilir teknik kararlar aliyoruz.")
                },
                GetProcessSteps("tr"),
                projects,
                new CallToActionContent(
                    "Fikrinizi olgun, guvenilir bir dijital urune donusturelim.",
                    "Yol haritasini birlikte netlestirelim, belirsizligi azaltalim ve saglam bir cikis plani olusturalim.",
                    "Teklif al",
                    "Iletisime gec"),
                new ContactSummaryContent(
                    "En saglikli baslangic, net bir iletisimle olur.",
                    "Hedefinizi, zaman planinizi ve mevcut durumunuzu paylasin. Genel gecis cümleleri yerine size ozel yonlendirme sunalim.",
                    "Adoztech ile iletisime gecin",
                    "Sureci inceleyin"));
    }

    public StandardPageContent GetAboutPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "About Adoztech",
                "A focused partner for software, design, and digital growth.",
                "We combine clarity in communication with thoughtful execution so every engagement feels professional from day one.",
                new[]
                {
                    new SectionContent("Our point of view", new[]
                    {
                        "A corporate website should not feel cold, and a modern interface should not feel chaotic. We build at that balanced intersection.",
                        "Every project starts by understanding the business objective, the audience expectation, and the operational constraints."
                    }),
                    new SectionContent("How we work", new[]
                    {
                        "We favor maintainable systems, explicit decision-making, and predictable collaboration.",
                        "That means clear scopes, realistic delivery plans, and interfaces that support trust as much as beauty."
                    }),
                    new SectionContent("What matters to us", new[]
                    {
                        "Long-term readability, performance-minded engineering, and communication that helps teams move forward with confidence."
                    })
                })
            : new StandardPageContent(
                "Adoztech Hakkinda",
                "Yazilim, tasarim ve dijital buyume ekseninde net sonuclar ureten odakli bir is ortagi.",
                "Ilk gunden itibaren profesyonel hissettiren bir is birligi kurmak icin iletisim netligini dusunceli uygulama ile birlestiriyoruz.",
                new[]
                {
                    new SectionContent("Bakis acimiz", new[]
                    {
                        "Kurumsal bir web sitesi soguk, modern bir arayuz ise daginik olmak zorunda degil. Biz bu dengenin dogru noktasinda calisiyoruz.",
                        "Her projeye once is hedefini, hedef kitlenin beklentisini ve operasyonel sinirlari anlayarak basliyoruz."
                    }),
                    new SectionContent("Calisma bicimimiz", new[]
                    {
                        "Bakimi kolay sistemleri, acik karar mekaniklerini ve ongorulebilir is birligini onceliklendiriyoruz.",
                        "Bu da daha net kapsama, daha gercekci teslim plani ve guven uretebilen arayuzler anlamina geliyor."
                    }),
                    new SectionContent("Onceligimiz", new[]
                    {
                        "Uzun vadeli okunabilirlik, performans odakli muhendislik ve ekiplere momentum kazandiran iletisim."
                    })
                });

    public StandardPageContent GetServicesPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "Capabilities",
                "Services that connect product quality with commercial clarity.",
                "We work across software, mobile, web presence, social media strategy, and applied AI solutions.",
                GetServiceCards("en")
                    .Select(card => new SectionContent(card.Title, new[] { card.Description }))
                    .ToList())
            : new StandardPageContent(
                "Hizmetler",
                "Urun kalitesini ticari netlikle birlestiren hizmet yapisi.",
                "Yazilim, mobil, web varligi, sosyal medya danismanligi ve uygulamali yapay zeka alanlarinda uc uca hizmet sunuyoruz.",
                GetServiceCards("tr")
                    .Select(card => new SectionContent(card.Title, new[] { card.Description }))
                    .ToList());

    public StandardPageContent GetProcessPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "Process",
                "A delivery rhythm designed to reduce ambiguity and protect quality.",
                "We keep the process transparent so expectations, decisions, and responsibilities stay visible.",
                GetProcessSteps("en")
                    .Select(step => new SectionContent($"{step.Step}. {step.Title}", new[] { step.Description }))
                    .ToList())
            : new StandardPageContent(
                "Surec",
                "Belirsizligi azaltan ve kaliteyi koruyan teslim ritmi.",
                "Beklentileri, karar noktalarini ve sorumluluklari gorunur kilmak icin sureci seffaf sekilde yurutuyoruz.",
                GetProcessSteps("tr")
                    .Select(step => new SectionContent($"{step.Step}. {step.Title}", new[] { step.Description }))
                    .ToList());

    public PortfolioPageContent GetPortfolioPage(string culture) =>
        culture == "en"
            ? new PortfolioPageContent(
                "Selected work",
                "Project structures ready to evolve into a richer portfolio.",
                "The current portfolio uses curated static entries so the site can launch with a confident presentation while remaining ready for future data-driven growth.",
                GetFeaturedProjects("en"))
            : new PortfolioPageContent(
                "Secili projeler",
                "Zamanla daha zengin bir portfoye donusebilecek proje yapisi.",
                "Mevcut portfoy alani, yayin icin guclu bir ilk sunum saglarken sonradan veri tabanli buyumeye de hazir olan ozenli statik kayitlarla calisir.",
                GetFeaturedProjects("tr"));

    public PortfolioProjectContent? GetProjectBySlug(string culture, string slug) =>
        GetFeaturedProjects(culture).FirstOrDefault(project =>
            string.Equals(project.Slug, slug, StringComparison.OrdinalIgnoreCase));

    public string? GetAlternateProjectSlug(string sourceCulture, string slug, string targetCulture) =>
        GetFeaturedProjects(sourceCulture)
            .FirstOrDefault(project => string.Equals(project.Slug, slug, StringComparison.OrdinalIgnoreCase))
            ?.AlternateSlug;

    public ContactPageContent GetContactPage(string culture) =>
        culture == "en"
            ? new ContactPageContent(
                "Contact",
                "Start with a clear conversation.",
                "Tell us what you are trying to achieve, where things stand today, and how quickly you need to move.",
                new[]
                {
                    new ContactDetailContent("Email", "info@adoztech.com", "mailto:info@adoztech.com"),
                    new ContactDetailContent("Phone", "+90 555 000 00 00", "tel:+905550000000"),
                    new ContactDetailContent("Location", "Istanbul, Turkiye", "#")
                },
                "General contact form",
                "Use this form for discovery calls, partnership inquiries, or operational questions.")
            : new ContactPageContent(
                "Iletisim",
                "Net bir gorusmeyle baslayalim.",
                "Neyi hedeflediginizi, bugunku durumunuzu ve ne kadar hizli ilerlemek istediginizi paylasin.",
                new[]
                {
                    new ContactDetailContent("E-posta", "info@adoztech.com", "mailto:info@adoztech.com"),
                    new ContactDetailContent("Telefon", "+90 555 000 00 00", "tel:+905550000000"),
                    new ContactDetailContent("Konum", "Istanbul, Turkiye", "#")
                },
                "Genel iletisim formu",
                "Kesif gorusmesi, is birligi talebi veya operasyonel sorulariniz icin bu formu kullanabilirsiniz.");

    public QuotePageContent GetQuotePage(string culture) =>
        culture == "en"
            ? new QuotePageContent(
                "Request a quote",
                "Share the project context and we will return with a grounded next step.",
                "This form is designed for more structured opportunities where scope, service fit, and timeline matter.",
                "Project briefing form",
                "The clearer the context, the more helpful our first response will be.",
                GetQuoteServiceOptions("en"),
                GetBudgetOptions("en"),
                GetTimelineOptions("en"),
                new[]
                {
                    "We review business objective, delivery timing, and technical fit together.",
                    "Where necessary, we recommend a phased scope instead of an inflated first release.",
                    "Every response is written to help decision-making, not to pressure a sale."
                })
            : new QuotePageContent(
                "Teklif al",
                "Proje baglamini paylasin, size gercekci bir sonraki adimla donelim.",
                "Bu form; kapsami, hizmet uyumunu ve zaman planini netlestirmek isteyen daha yapili talepler icin tasarlanmistir.",
                "Proje baslat formu",
                "Baglami ne kadar net paylasirsaniz ilk geri donusumuz o kadar faydali olur.",
                GetQuoteServiceOptions("tr"),
                GetBudgetOptions("tr"),
                GetTimelineOptions("tr"),
                new[]
                {
                    "Is hedefini, teslim takvimini ve teknik uygunlugu birlikte degerlendiriyoruz.",
                    "Gerekirse sisirilmis bir ilk surum yerine asamali kapsam oneriyoruz.",
                    "Her geri donus, satis baskisi icin degil karar almanizi kolaylastirmak icin hazirlanir."
                });

    public StandardPageContent GetPrivacyPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "Privacy Policy",
                "How Adoztech handles website and contact data.",
                "This overview explains the basic principles for information submitted through the website.",
                new[]
                {
                    new SectionContent("Collected information", new[]
                    {
                        "We collect only the information you provide through contact and project inquiry forms."
                    }),
                    new SectionContent("Purpose of use", new[]
                    {
                        "Data is used to respond to your request, assess service fit, and maintain operational records when required."
                    }),
                    new SectionContent("Retention", new[]
                    {
                        "Submitted records may be retained for operational continuity, security review, and service follow-up."
                    })
                })
            : new StandardPageContent(
                "Gizlilik Politikasi",
                "Adoztech'in web sitesi ve iletisim verilerini ele alma prensipleri.",
                "Bu metin, web sitesi uzerinden iletilen bilgilerin hangi temel ilkelerle kullanildigini ozetler.",
                new[]
                {
                    new SectionContent("Toplanan bilgiler", new[]
                    {
                        "Sadece iletisim ve proje formu araciligiyla sizin paylastiginiz verileri topluyoruz."
                    }),
                    new SectionContent("Kullanim amaci", new[]
                    {
                        "Veriler; talebinize donus yapmak, hizmet uygunlugunu degerlendirmek ve gerekli durumlarda operasyonel kayit tutmak icin kullanilir."
                    }),
                    new SectionContent("Saklama", new[]
                    {
                        "Form kayitlari operasyonel sureklilik, guvenlik incelemesi ve hizmet takibi amaciyla makul surelerle saklanabilir."
                    })
                });

    public StandardPageContent GetKvkkPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "Privacy Notice",
                "Clarification text regarding personal data processing.",
                "This page summarizes the legal basis and processing purpose for data shared with Adoztech.",
                new[]
                {
                    new SectionContent("Data controller", new[]
                    {
                        "Adoztech processes personal data in line with the service communication initiated by the visitor."
                    }),
                    new SectionContent("Processing purposes", new[]
                    {
                        "Personal data may be processed for communication, proposal preparation, service planning, and legal obligations."
                    }),
                    new SectionContent("Your rights", new[]
                    {
                        "You may contact us regarding access, correction, update, or deletion requests where applicable."
                    })
                })
            : new StandardPageContent(
                "KVKK / Aydinlatma Metni",
                "Kisisel verilerin islenmesine iliskin aydinlatma ozeti.",
                "Bu sayfa, Adoztech ile paylasilan verilerin hukuki dayanak ve isleme amacini temel seviyede ozetler.",
                new[]
                {
                    new SectionContent("Veri sorumlusu", new[]
                    {
                        "Adoztech, ziyaretci tarafindan baslatilan hizmet iletisimi kapsaminda kisisel verileri isler."
                    }),
                    new SectionContent("Isleme amaclari", new[]
                    {
                        "Kisisel veriler; iletisim kurma, teklif hazirlama, hizmet planlama ve yasal yukumlulukler kapsaminda islenebilir."
                    }),
                    new SectionContent("Haklariniz", new[]
                    {
                        "Uygulanabilir durumlarda erisim, duzeltme, guncelleme veya silme talepleriniz icin bizimle iletisime gecebilirsiniz."
                    })
                });

    public StandardPageContent GetNotFoundPage(string culture) =>
        culture == "en"
            ? new StandardPageContent(
                "Page not found",
                "The address you requested could not be matched.",
                "The page may have moved, been renamed, or never existed in this language route.",
                new[]
                {
                    new SectionContent("What you can do", new[]
                    {
                        "Return to the homepage, explore services, or contact Adoztech directly."
                    })
                })
            : new StandardPageContent(
                "Sayfa bulunamadi",
                "Talep ettiginiz adres eslesmedi.",
                "Sayfa tasinmis, yeniden adlandirilmis veya bu dil rotasinda hic tanimlanmamis olabilir.",
                new[]
                {
                    new SectionContent("Ne yapabilirsiniz", new[]
                    {
                        "Ana sayfaya donebilir, hizmetleri inceleyebilir veya dogrudan Adoztech ile iletisime gecebilirsiniz."
                    })
                });

    public IReadOnlyList<(string Path, DateTimeOffset LastModified)> GetSitemapEntries(string culture)
    {
        var now = DateTimeOffset.UtcNow;
        var entries = new List<(string Path, DateTimeOffset LastModified)>
        {
            (PagePath(culture, "home"), now),
            (PagePath(culture, "about"), now),
            (PagePath(culture, "services"), now),
            (PagePath(culture, "projects"), now),
            (PagePath(culture, "process"), now),
            (PagePath(culture, "quote"), now),
            (PagePath(culture, "contact"), now),
            (PagePath(culture, "privacy"), now),
            (PagePath(culture, "kvkk"), now)
        };

        entries.AddRange(GetFeaturedProjects(culture)
            .Select(project => (PagePath(culture, "projectDetail", project.Slug), now)));

        return entries;
    }

    private static IReadOnlyList<ServiceCardContent> GetServiceCards(string culture) =>
        culture == "en"
            ? new[]
            {
                new ServiceCardContent("software", "Software Development", "Custom web platforms and business-focused solutions designed for performance, maintainability, and operational clarity."),
                new ServiceCardContent("mobile", "Mobile App Development", "Cross-platform and platform-aware mobile experiences that feel polished, fast, and ready for growth."),
                new ServiceCardContent("web", "Corporate Web Design", "Brand-conscious, conversion-aware corporate websites with premium structure and clear messaging."),
                new ServiceCardContent("social", "Social Media Management and Consulting", "Structured content direction and communication systems that strengthen brand consistency."),
                new ServiceCardContent("ai", "AI Solutions", "Applied AI use cases that reduce friction, speed up workflows, and support better service decisions.")
            }
            : new[]
            {
                new ServiceCardContent("software", "Yazilim Gelistirme", "Performans, bakim kolayligi ve operasyonel netlik odakli ozel web platformlari ve is cozumleri geliştiriyoruz."),
                new ServiceCardContent("mobile", "Mobil Uygulama Gelistirme", "Hizli, rafine ve buyumeye hazir mobil deneyimleri platform ihtiyacina gore kurguluyoruz."),
                new ServiceCardContent("web", "Kurumsal Web Tasarim", "Marka algisini guclendiren, donusum bilinci yuksek ve premium hisli kurumsal web siteleri tasarliyoruz."),
                new ServiceCardContent("social", "Sosyal Medya Yonetimi ve Danismanligi", "Marka tutarliligini guclendiren, yapili icerik yonu ve iletisim sistemi kuruyoruz."),
                new ServiceCardContent("ai", "Yapay Zeka Cozumleri", "Surecleri hizlandiran, operasyonel surtunmeyi azaltan ve karar kalitesini destekleyen uygulamali yapay zeka cozumleri sunuyoruz.")
            };

    private static IReadOnlyList<ProcessStepContent> GetProcessSteps(string culture) =>
        culture == "en"
            ? new[]
            {
                new ProcessStepContent("01", "Discovery", "We define the objective, current friction points, timeline expectations, and success indicators."),
                new ProcessStepContent("02", "Scope and system", "We frame the recommended scope, delivery phases, and technical direction before implementation begins."),
                new ProcessStepContent("03", "Design and build", "We move through interface decisions and engineering delivery with regular checkpoints."),
                new ProcessStepContent("04", "Launch and iterate", "After release, we support stabilization, refinement, and the next stage of growth.")
            }
            : new[]
            {
                new ProcessStepContent("01", "Kesif", "Hedefi, bugunku surtunme noktalarini, zaman beklentisini ve basari gostergelerini birlikte netlestiriyoruz."),
                new ProcessStepContent("02", "Kapsam ve sistem", "Uygulamaya gecmeden once onerilen kapsam, teslim asamalari ve teknik yonu net sekilde ciziyoruz."),
                new ProcessStepContent("03", "Tasarim ve gelistirme", "Arayuz kararlarini ve muhendislik teslimatini duzenli kontrol noktalariyla ilerletiyoruz."),
                new ProcessStepContent("04", "Yayin ve gelisim", "Yayin sonrasi dengeleme, iyilestirme ve bir sonraki buyume adimi icin destek veriyoruz.")
            };

    private static IReadOnlyList<OptionItemContent> GetQuoteServiceOptions(string culture) =>
        culture == "en"
            ? new[]
            {
                new OptionItemContent("software", "Software Development"),
                new OptionItemContent("mobile", "Mobile App Development"),
                new OptionItemContent("web", "Corporate Web Design"),
                new OptionItemContent("social", "Social Media Management and Consulting"),
                new OptionItemContent("ai", "AI Solutions")
            }
            : new[]
            {
                new OptionItemContent("software", "Yazilim Gelistirme"),
                new OptionItemContent("mobile", "Mobil Uygulama Gelistirme"),
                new OptionItemContent("web", "Kurumsal Web Tasarim"),
                new OptionItemContent("social", "Sosyal Medya Yonetimi ve Danismanligi"),
                new OptionItemContent("ai", "Yapay Zeka Cozumleri")
            };

    private static IReadOnlyList<OptionItemContent> GetBudgetOptions(string culture) =>
        culture == "en"
            ? new[]
            {
                new OptionItemContent("under-5k", "Under 5.000 USD"),
                new OptionItemContent("5k-15k", "5.000 - 15.000 USD"),
                new OptionItemContent("15k-30k", "15.000 - 30.000 USD"),
                new OptionItemContent("30k-plus", "30.000 USD and above")
            }
            : new[]
            {
                new OptionItemContent("under-5k", "5.000 USD alti"),
                new OptionItemContent("5k-15k", "5.000 - 15.000 USD"),
                new OptionItemContent("15k-30k", "15.000 - 30.000 USD"),
                new OptionItemContent("30k-plus", "30.000 USD ve uzeri")
            };

    private static IReadOnlyList<OptionItemContent> GetTimelineOptions(string culture) =>
        culture == "en"
            ? new[]
            {
                new OptionItemContent("asap", "As soon as possible"),
                new OptionItemContent("1-month", "Within 1 month"),
                new OptionItemContent("1-3-months", "Within 1 to 3 months"),
                new OptionItemContent("flexible", "Timeline is flexible")
            }
            : new[]
            {
                new OptionItemContent("asap", "Mumkun olan en kisa surede"),
                new OptionItemContent("1-month", "1 ay icinde"),
                new OptionItemContent("1-3-months", "1 ila 3 ay icinde"),
                new OptionItemContent("flexible", "Teslim suresi esnek")
            };

    private static IReadOnlyList<PortfolioProjectContent> GetFeaturedProjects(string culture) =>
        culture == "en"
            ? new[]
            {
                new PortfolioProjectContent("Corporate Platform", "Finova Operations Hub", "finova-operations-hub", "finova-operasyon-merkezi", "A multi-layer operations portal that brought reporting, request handling, and internal approvals into one refined interface.", ".NET 9, Razor Views, SQLite, Tailwind CSS", "Faster internal coordination and stronger decision visibility.", "/img/project-finova.svg", "Dashboard preview for Finova Operations Hub"),
                new PortfolioProjectContent("Healthcare Product", "Clarity Clinic Experience", "clarity-clinic-experience", "clarity-klinik-deneyimi", "A bilingual patient-facing web presence built to increase trust, appointment intent, and service clarity across devices.", "ASP.NET Core MVC, Alpine.js, SEO-first content architecture", "Improved trust signals and more qualified contact requests.", "/img/project-clarity.svg", "Clinic website presentation concept"),
                new PortfolioProjectContent("AI Workflow", "Atlas Support Assistant", "atlas-support-assistant", "atlas-destek-asistani", "An applied AI workflow layer that reduced repetitive support effort and structured inbound requests before handoff.", "AI workflow design, prompt systems, operations mapping", "Reduced first-response friction and clearer request categorization.", "/img/project-atlas.svg", "Workflow visualization for Atlas Support Assistant")
            }
            : new[]
            {
                new PortfolioProjectContent("Kurumsal Platform", "Finova Operasyon Merkezi", "finova-operasyon-merkezi", "finova-operations-hub", "Raporlama, talep yonetimi ve ic onay akislarini tek bir rafine arayuzde birlestiren katmanli operasyon portali.", ".NET 9, Razor Views, SQLite, Tailwind CSS", "Ic koordinasyonu hizlandiran ve karar gorunurlugunu artiran yapi.", "/img/project-finova.svg", "Finova Operasyon Merkezi panel gorunumu"),
                new PortfolioProjectContent("Saglik Urunu", "Clarity Klinik Deneyimi", "clarity-klinik-deneyimi", "clarity-clinic-experience", "Cihazlar arasi guveni, randevu niyetini ve hizmet anlasilirligini guclendiren iki dilli hasta odakli web deneyimi.", "ASP.NET Core MVC, Alpine.js, SEO odakli icerik mimarisi", "Guven sinyallerini ve nitelikli iletisim taleplerini guclendiren sonuc.", "/img/project-clarity.svg", "Klinik web sitesi sunum konsepti"),
                new PortfolioProjectContent("Yapay Zeka Is Akisi", "Atlas Destek Asistani", "atlas-destek-asistani", "atlas-support-assistant", "Tekrarlayan destek eforunu azaltan ve gelen talepleri teslim oncesi yapilandiran uygulamali yapay zeka is akisi katmani.", "Yapay zeka is akisi tasarimi, prompt sistemleri, operasyon haritalama", "Ilk yanit surtunmesini azaltan ve talep kategorizasyonunu netlestiren yapi.", "/img/project-atlas.svg", "Atlas Destek Asistani is akisi gorseli")
            };

    private static string PagePath(string culture, string routeKey, string? slug = null)
    {
        var segment = routeKey switch
        {
            "home" => string.Empty,
            "about" => culture == "en" ? "about" : "hakkimizda",
            "services" => culture == "en" ? "services" : "hizmetler",
            "projects" => culture == "en" ? "projects" : "projeler",
            "process" => culture == "en" ? "process" : "surec",
            "quote" => culture == "en" ? "request-quote" : "teklif-al",
            "contact" => culture == "en" ? "contact" : "iletisim",
            "privacy" => culture == "en" ? "privacy-policy" : "gizlilik-politikasi",
            "kvkk" => culture == "en" ? "privacy-notice" : "kvkk",
            "notfound" => "404",
            "projectDetail" => $"{(culture == "en" ? "projects" : "projeler")}/{slug}",
            _ => string.Empty
        };

        return string.IsNullOrWhiteSpace(segment) ? $"/{culture}" : $"/{culture}/{segment}";
    }
}
