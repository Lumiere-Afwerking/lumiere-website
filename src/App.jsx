import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, MapPin, Phone, Instagram, Menu, X, ArrowRight,
  Droplet, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Sparkles, ShieldCheck, Leaf, Layers, Hammer, Wind, Loader2,
  Star, Quote, Coffee, FileText, PenTool
} from 'lucide-react';
import { Studio } from 'sanity';
import config from '../sanity.config.js';

/* =========================================
   SEO CONTENT DATA
   ========================================= */
const SEO_PAGES = {
  tadelakt: {
    name: "Authentiek Tadelakt",
    subtitle: "Specialisme",
    h1: "Authentiek Marokkaans Tadelakt in Rotterdam",
    heroText: "Breng de betoverende, fluweelzachte magie van de badhuizen uit Marrakech naar uw eigen wellness ruimte. Een eeuwenoud ambacht, met de hand gepolijst voor een 100% waterdicht en ademend resultaat.",
    heroImage: "[https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200)",
    quote: "De warmte van de aarde, gevangen in uw interieur.",
    featuresTitle: "Waarom kiezen voor Tadelakt?",
    features: [
      { icon: ShieldCheck, title: "100% Waterdicht", desc: "Door de behandeling met olijfzeep en polijststenen ontstaat een natuurlijke barrière. Perfect voor inloopdouches." },
      { icon: Sparkles, title: "Zijdezachte Glans", desc: "Reflecteert het licht warm en subtiel. Voelt letterlijk aan als glad marmer of zacht leer." },
      { icon: Leaf, title: "100% Ecologisch", desc: "Volledig opgebouwd uit natuurlijke kalk en pigmenten. Laat muren ademen en voorkomt schimmel." }
    ],
    storyTitle: "Een Ambacht uit Marokko",
    storyText: "Tadelakt is geen product uit een emmer, het is een kunstvorm. Wij brengen dit originele Marokkaanse ambacht naar de luxe badkamers van Nederland. Laag voor laag wordt de kalk aangebracht en met een gladde riviersteen ingewreven met traditionele zwarte olijfzeep."
  },
  microcement: {
    name: "Microcement / Beton Ciré",
    subtitle: "Moderne Elegantie",
    h1: "Naadloos Microcement & Beton Ciré",
    heroText: "De ultieme standaard voor een strak, minimalistisch en naadloos interieur. Extreem slijtvast en verkrijgbaar in warme, aardse tinten. De perfecte basis voor een rustige leefomgeving of industriële badkamer.",
    heroImage: "[https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200)",
    quote: "Minimalisme zonder in te leveren op warmte.",
    featuresTitle: "De Kracht van Microcement",
    features: [
      { icon: Layers, title: "Naadloos Design", desc: "Geen voegen betekent een optisch grotere ruimte en ultiem schoonmaakgemak in badkamers en keukens." },
      { icon: ShieldCheck, title: "Extreem Slijtvast", desc: "Dankzij de ijzersterke samenstelling is het krasbestendig en perfect geschikt voor intensief gebruikte vloeren." },
      { icon: Droplet, title: "Vloeistofdicht", desc: "Afgewerkt met een hoogwaardige coating, waardoor het volledig bestand is tegen water en vuil." }
    ],
    storyTitle: "De Basis van Rust",
    storyText: "Waar traditionele tegels onrust creëren door voeglijnen, brengt microcement eenheid. Wij passen deze techniek toe in state-of-the-art badkamers, strakke keukens en als monolithische vloerafwerking. Het resultaat is een sereen canvas voor uw meubilair."
  },
  bespoke: {
    name: "Bespoke Elementen",
    subtitle: "Maatwerk Design",
    h1: "Op Maat Gemaakte Bespoke Elementen",
    heroText: "Wij stukadoren niet alleen wanden, we creëren architecturale meubelstukken. Van naadloze, monolithische wastafels tot ingebouwde doucheroosters en cinewalls. Elk object wordt één met de ruimte.",
    heroImage: "[https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200)",
    quote: "Waar architectuur en ambacht samensmelten.",
    featuresTitle: "Waarom Bespoke Maatwerk?",
    features: [
      { icon: Hammer, title: "Uniek Object", desc: "Geen standaard meubel uit de showroom, maar een uniek object dat perfect is afgestemd op de afmetingen van uw ruimte." },
      { icon: Layers, title: "Monolithisch", desc: "Wastafel, kasten en wanden vloeien naadloos in elkaar over in exact hetzelfde materiaal en dezelfde tint." },
      { icon: Sparkles, title: "Luxe Uitstraling", desc: "Ingebouwde nissen met subtiele verlichting of een zwevend wastafelblad creëren direct een high-end spa gevoel." }
    ],
    storyTitle: "Vormgegeven door Handwerk",
    storyText: "Het bouwen en afwerken van bespoke elementen is precisiewerk. De ondergrond wordt volledig op maat gebouwd en versterkt, waarna wij het met uiterste zorg afwerken met bijvoorbeeld Microcement of Tadelakt. Een tijdloos statement in uw interieur."
  },
  marmorino: {
    name: "Marmorino & Venetian",
    subtitle: "Klassieke Weelde",
    h1: "Exclusief Marmorino & Venetian Plaster",
    heroText: "Breng de grandeur van Italiaanse palazzi naar de 21e eeuw. Deze techniek creëert een spiegelgladde, marmerachtige wand met een adembenemende diepte en subtiele glans die speelt met het licht.",
    heroImage: "[https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200)",
    quote: "De reflectie van ware Italiaanse luxe.",
    featuresTitle: "Karakteristieken van Marmorino",
    features: [
      { icon: Sparkles, title: "Marmer Effect", desc: "De toevoeging van echt marmerpoeder zorgt voor authentieke aderen, diepte en een spiegelende finish." },
      { icon: Wind, title: "Ademend & Antibacterieel", desc: "Omdat het op kalkbasis is, is het van nature schimmelwerend en bevordert het een gezond binnenklimaat." },
      { icon: Leaf, title: "Tijdloze Elegantie", desc: "Een afwerking die nooit uit de mode raakt en direct de waarde en uitstraling van uw vastgoed verhoogt." }
    ],
    storyTitle: "Meesterschap in Lagen",
    storyText: "Venetian Plaster en Marmorino worden in flinterdunne lagen aangebracht. Met een speciale Venetiaanse spaan wordt de muur letterlijk gepolijst ('gespaand') tot deze begint te glanzen. Dit intensieve handwerk resulteert in een wand die eerder aanvoelt als kunst dan als stucwerk."
  },
  leemstuc: {
    name: "Natuurlijke Leemstuc",
    subtitle: "Wabi-Sabi Interieur",
    h1: "Natuurlijke Leemstuc voor Ultieme Rust",
    heroText: "Omarm de schoonheid van natuurlijke materialen. Leemstuc is 100% ecologisch, ademend en brengt een warme, aardse textuur in uw leefruimte. Ideaal voor de moderne wabi-sabi esthetiek.",
    heroImage: "[https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200)",
    quote: "Verbind uw interieur met de natuur.",
    featuresTitle: "De Voordelen van Leem",
    features: [
      { icon: Wind, title: "Klimaatregulerend", desc: "Leem neemt vocht op en staat het af wanneer de lucht droog is. Perfect voor een constant en gezond binnenklimaat." },
      { icon: Layers, title: "Akoestische Demping", desc: "De massa en zachte textuur van leem breken geluidsgolven, wat zorgt voor een ongekend rustige akoestiek in huis." },
      { icon: Leaf, title: "Volledig Circulair", desc: "Gemaakt van zand, klei en natuurlijke vezels. Het is het meest milieuvriendelijke afwerkingsmateriaal ter wereld." }
    ],
    storyTitle: "De Aarde op de Wand",
    storyText: "In een tijd waarin we omringd zijn door schermen en strakke lijnen, biedt leemstuc een tactiele ontsnapping. De zichtbare korrel, subtiele strovezels en de onregelmatige, handmatige afwerking brengen karakter en warmte die met verf onmogelijk te bereiken is."
  },
  travertino: {
    name: "Travertino Finish",
    subtitle: "Robuust & Karakteristiek",
    h1: "Italiaanse Travertino Afwerking",
    heroText: "De robuuste, poreuze uitstraling van ruw Italiaans natuursteen, maar dan naadloos aangebracht op uw wand. Een krachtig statement voor accentmuren, haardombouwen of luxe entrees.",
    heroImage: "[https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200)",
    quote: "De rauwe, ongetemde schoonheid van steen.",
    featuresTitle: "Waarom Travertino?",
    features: [
      { icon: Layers, title: "Poreuze Structuur", desc: "De kenmerkende putjes en lijnen van echt travertin steen worden handmatig nagebootst voor een authentieke look." },
      { icon: Hammer, title: "Extreem Hard", desc: "Door het uithardingsproces van de kalk wordt deze wandafwerking na verloop van tijd letterlijk zo hard als steen." },
      { icon: ShieldCheck, title: "Onderhoudsvriendelijk", desc: "Ondanks de open structuur is het materiaal eenvoudig schoon te houden en uiterst duurzaam in gebruik." }
    ],
    storyTitle: "Steenhouwerskunst in Stucwerk",
    storyText: "De Travertino techniek vereist een ruwe, zelfverzekerde hand. We brengen het materiaal stevig aan en trekken het vervolgens 'open' om de karakteristieke natuurlijke aderen van het gesteente te creëren. Een meesterwerk dat diepte en geschiedenis toevoegt aan elke moderne ruimte."
  }
};

/* =========================================
   COMPONENTS
   ========================================= */

const Navigation = ({ navigate, currentRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setIsMenuOpen(false);
    if (currentRoute !== 'home') {
      navigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRoute = (route) => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
    navigate(route);
  };

  const badkamerDiensten = ['tadelakt', 'microcement', 'bespoke'];
  const muurDiensten = ['marmorino', 'leemstuc', 'travertino'];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled || currentRoute !== 'home' ? 'bg-[#EAE6DF]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleScrollTo('home')}>
            <h1 className="text-2xl font-serif tracking-widest text-[#3A3530] uppercase">Lumière</h1>
            <p className="text-[0.6rem] tracking-[0.3em] text-[#B07D54] uppercase mt-1">Earthy Finishes</p>
          </div>
          <nav className="hidden md:flex space-x-12 items-center">
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">
                Badkamer <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-[#EAE6DF] border border-[#3A3530]/10 shadow-xl flex flex-col rounded-b-md overflow-hidden transform origin-top scale-95 group-hover:scale-100 transition-transform duration-300">
                  {badkamerDiensten.map(key => (
                    <button key={key} onClick={() => handleRoute(key)} className="text-left px-6 py-4 text-sm font-light hover:bg-[#B07D54]/10 hover:text-[#B07D54] transition-colors border-b border-[#3A3530]/5 last:border-0">
                      {SEO_PAGES[key].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">
                Muur <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-[#EAE6DF] border border-[#3A3530]/10 shadow-xl flex flex-col rounded-b-md overflow-hidden transform origin-top scale-95 group-hover:scale-100 transition-transform duration-300">
                  {muurDiensten.map(key => (
                    <button key={key} onClick={() => handleRoute(key)} className="text-left px-6 py-4 text-sm font-light hover:bg-[#B07D54]/10 hover:text-[#B07D54] transition-colors border-b border-[#3A3530]/5 last:border-0">
                      {SEO_PAGES[key].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => handleRoute('portfolio')} className="text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">Portfolio</button>
            <button onClick={() => handleScrollTo('offerte')} className="text-sm font-light tracking-widest uppercase border border-[#3A3530] px-6 py-2 hover:bg-[#3A3530] hover:text-[#EAE6DF] transition-all duration-500">Consultation</button>
          </nav>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#3A3530] hover:text-[#B07D54] transition-colors">
              {isMenuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 bg-[#EAE6DF] z-40 transition-transform duration-700 ease-in-out flex flex-col pt-24 pb-12 overflow-y-auto px-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col text-center w-full max-w-sm mx-auto my-auto space-y-6">
           <h2 className="text-xs tracking-[0.3em] text-[#B07D54] uppercase mb-2">Navigatie</h2>
           <div className="flex flex-col items-center w-full">
             <button onClick={() => setOpenMobileDropdown(openMobileDropdown === 'badkamer' ? null : 'badkamer')} className="font-serif text-3xl text-[#3A3530] flex items-center justify-center gap-3 w-full">
                Badkamer {openMobileDropdown === 'badkamer' ? <ChevronUp size={20} className="text-[#B07D54]" /> : <ChevronDown size={20} className="text-[#B07D54]" />}
             </button>
             <div className={`flex flex-col overflow-hidden transition-all duration-500 w-full ${openMobileDropdown === 'badkamer' ? 'max-h-[600px] mt-4 space-y-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {badkamerDiensten.map(key => (
                  <button key={key} onClick={() => handleRoute(key)} className="text-base font-light text-[#3A3530]/80 hover:text-[#B07D54] transition-colors">
                    {SEO_PAGES[key].name}
                  </button>
                ))}
             </div>
           </div>
           <div className="flex flex-col items-center w-full">
             <button onClick={() => setOpenMobileDropdown(openMobileDropdown === 'muur' ? null : 'muur')} className="font-serif text-3xl text-[#3A3530] flex items-center justify-center gap-3 w-full">
                Muur {openMobileDropdown === 'muur' ? <ChevronUp size={20} className="text-[#B07D54]" /> : <ChevronDown size={20} className="text-[#B07D54]" />}
             </button>
             <div className={`flex flex-col overflow-hidden transition-all duration-500 w-full ${openMobileDropdown === 'muur' ? 'max-h-[600px] mt-4 space-y-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {muurDiensten.map(key => (
                  <button key={key} onClick={() => handleRoute(key)} className="text-base font-light text-[#3A3530]/80 hover:text-[#B07D54] transition-colors">
                    {SEO_PAGES[key].name}
                  </button>
                ))}
             </div>
           </div>
           <button onClick={() => handleRoute('portfolio')} className="font-serif text-3xl text-[#3A3530] pt-2">Portfolio</button>
           <button onClick={() => handleScrollTo('offerte')} className="font-serif text-3xl italic text-[#B07D54] mt-2">Consultation</button>
        </nav>
      </div>
    </>
  );
};

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "Kan microcement of Tadelakt over bestaande tegels worden aangebracht?", a: "In 95% van de gevallen wel! Dit scheelt enorm veel sloopwerk, stof en tijd. We bereiden uw huidige tegels voor met een speciale primer." },
    { q: "Is het materiaal echt 100% waterdicht voor in de douche?", a: "Absoluut. Zowel ons authentieke Tadelakt als het Microcement worden volledig vloeistofdicht afgewerkt." },
    { q: "Hoe onderhoud en reinig ik mijn naadloze wanden of vloer?", a: "Het onderhoud is verrassend eenvoudig omdat er geen voegen zijn. Gebruik milde, natuurlijke middelen." },
    { q: "Hoe lang duurt een gemiddelde badkamertransformatie?", a: "Gemiddeld 5 tot 8 werkdagen, afhankelijk van de complexiteit van het project." }
  ];

  return (
    <section className="py-24 bg-[#EAE6DF] border-t border-[#3A3530]/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">Veelgestelde Vragen</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3A3530]">Praktische <span className="italic text-[#B07D54]">Informatie</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#F2F0EB] border border-[#3A3530]/10 rounded-xl overflow-hidden transition-all duration-300">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[#3A3530]/5 transition-colors">
                <span className="font-serif text-lg md:text-xl text-[#3A3530]">{faq.q}</span>
                <span className="text-[#B07D54] ml-4">{openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-500 ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-light text-sm md:text-base text-[#3A3530]/70 leading-relaxed border-t border-[#3A3530]/5 pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SharedContactFooter = ({ defaultService }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: defaultService, area: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch("[https://api.web3forms.com/submit](https://api.web3forms.com/submit)", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "a482796b-7d51-4dd0-bc63-33abea7da9cb", ...formState })
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', phone: '', service: defaultService, area: '', message: '' });
      } else {
        setSubmitError("Er is iets misgegaan bij het verzenden.");
      }
    } catch (error) {
      setSubmitError("Netwerkfout. Controleer uw verbinding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="offerte" className="py-24 bg-[#3A3530] text-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="lg:w-5/12">
          <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">Uw Project</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#EAE6DF]">Laten we <span className="italic text-[#B07D54]">creëren</span>.</h2>
          <p className="font-light text-[#EAE6DF]/70 mb-12 text-sm leading-relaxed">Een badkamer of leefruimte transformeren is een persoonlijk proces. Wij adviseren u graag.</p>
          <div className="space-y-6 font-light text-sm">
            <div className="flex items-center space-x-4 border-b border-[#EAE6DF]/10 pb-4"><MapPin className="text-[#B07D54]" size={20} /><span>Rotterdam e.o.</span></div>
            <div className="flex items-center space-x-4 border-b border-[#EAE6DF]/10 pb-4"><Phone className="text-[#B07D54]" size={20} /><span>+31 (0)6 12 34 56 78</span></div>
          </div>
        </div>
        <div className="lg:w-7/12 bg-[#EAE6DF] p-8 md:p-12 text-[#3A3530] rounded-xl shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-16">
              <CheckCircle className="text-[#B07D54] mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-serif mb-2">Aanvraag Ontvangen</h3>
              <p>We nemen binnen 24 uur contact op.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="text" name="name" required value={formState.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/30 py-2 text-[#3A3530]" placeholder="Uw naam" />
              <input type="email" name="email" required value={formState.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/30 py-2 text-[#3A3530]" placeholder="Uw e-mail" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <select name="service" value={formState.service} onChange={handleInputChange} required className="w-full bg-transparent border-b border-[#3A3530]/30 py-2 text-[#3A3530] font-light text-sm focus:border-[#B07D54] transition-colors appearance-none cursor-pointer">
                  <option value="Authentiek Tadelakt">Authentiek Tadelakt</option>
                  <option value="Microcement / Beton Ciré">Microcement / Beton Ciré</option>
                  <option value="Marmorino & Venetian">Marmorino / Venetian</option>
                  <option value="Natuurlijke Leemstuc">Natuurlijke Leemstuc</option>
                  <option value="Bespoke Elementen">Bespoke Elementen (Wastafels)</option>
                  <option value="Travertino Finish">Travertino Finish</option>
                  <option value="Adviesgesprek">Adviesgesprek (Design & Materialen)</option>
                </select>
                <input type="number" name="area" value={formState.area} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/30 py-2 text-[#3A3530] placeholder-[#3A3530]/50 font-light text-sm focus:border-[#B07D54] transition-colors" placeholder="Aantal m² (geschat)" />
              </div>
              <textarea name="message" rows="3" value={formState.message} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/30 py-2 text-[#3A3530] placeholder-[#3A3530]/50 font-light text-sm focus:border-[#B07D54] transition-colors resize-none mt-2" placeholder="Vertel ons kort over de ruimte en uw wensen..."></textarea>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#3A3530] text-[#EAE6DF] py-4 uppercase tracking-widest hover:bg-[#B07D54] transition-colors disabled:opacity-50">
                {isSubmitting ? 'Verzenden...' : 'Verstuur aanvraag'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ navigate }) => {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left z-10">
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-[#3A3530]">Aardse Luxe.<br/><span className="italic text-[#B07D54]">Naadloze</span> Perfectie.</h2>
            <p className="text-lg font-light text-[#3A3530]/80 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">Breng rust in uw interieur met authentiek Tadelakt en Microcement.</p>
            <button onClick={() => document.getElementById('offerte').scrollIntoView({ behavior: 'smooth' })} className="border-b border-[#3A3530] pb-1 uppercase tracking-widest text-sm hover:text-[#B07D54] hover:border-[#B07D54] transition-all">Bespreek uw project</button>
          </div>
          <div className="w-full md:w-1/2 mt-16 md:mt-0 relative aspect-[4/5] overflow-hidden rounded-t-full shadow-2xl bg-[#D5CFC4]">
             <img src="[https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200)" alt="Luxe wandafwerking" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#3A3530] text-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"><img src="[https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=1000](https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=1000)" alt="Ambachtsman" className="w-full h-full object-cover opacity-80" /></div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Passie & <span className="italic text-[#B07D54]">Erfgoed</span></h2>
            <p className="font-light opacity-80 leading-relaxed mb-8">Geworteld in Marokkaanse tradities, brengen we authentiek meesterschap naar Rotterdam en omstreken.</p>
            <div className="flex items-center gap-4"><div className="w-12 h-12 border border-[#B07D54] rounded-full flex items-center justify-center text-[#B07D54]"><Hammer size={20} /></div><span className="uppercase tracking-widest text-sm">Uw Ambachtsman</span></div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-[#F2F0EB] border-t border-[#3A3530]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#3A3530] mb-4">Wat Onze <span className="italic text-[#B07D54]">Klanten</span> Zeggen</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}
              </div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">
                "Werkelijk prachtig vakmanschap. Onze badkamer in Kralingen voelt nu als een luxe, serene spa."
              </p>
              <div className="mt-auto">
                <p className="font-serif text-lg text-[#3A3530]">Familie de Vries</p>
              </div>
            </div>
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}
              </div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">
                "Zeer professioneel. Het naadloze microcement op de vloer heeft onze hele benedenverdieping getransformeerd."
              </p>
              <div className="mt-auto">
                <p className="font-serif text-lg text-[#3A3530]">Thomas V.</p>
              </div>
            </div>
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}
              </div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">
                "Duidelijke afspraken, geen verrassingen achteraf en het resultaat van de bespoke wastafel overtreft alles."
              </p>
              <div className="mt-auto">
                <p className="font-serif text-lg text-[#3A3530]">Sarah & Jeroen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <SharedContactFooter defaultService="Microcement" />
    </>
  );
};

const PortfolioPage = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const scrollPortfolio = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : window.innerWidth * 0.45;
      const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const portfolioItems = [
    { id: 1, title: "Wabi-Sabi Badkamer", material: "Authentiek Tadelakt", location: "Rotterdam", img: "[https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200)" },
    { id: 2, title: "Naadloos Wastafelmeubel", material: "Microcement", location: "Hillegersberg", img: "[https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200)" },
    { id: 3, title: "Luxe Penthouse Vloer", material: "Beton Ciré", location: "Kop van Zuid", img: "[https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200](https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200)" }
  ];

  return (
    <div className="bg-[#F2F0EB] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-[#3A3530] mb-4">Ons <span className="italic text-[#B07D54]">Portfolio</span></h1>
      </div>
      <div className="relative max-w-[100vw] overflow-hidden">
        <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 lg:px-12 pb-12 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[40vw] snap-center group relative flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-[#EAE6DF]/90 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-xs tracking-widest uppercase text-[#B07D54] font-medium flex items-center"><MapPin size={12} className="mr-1" /> {item.location}</span>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-[#3A3530] mb-3">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <SharedContactFooter defaultService="Adviesgesprek" />
    </div>
  );
};

const GenericLandingPage = ({ pageData }) => (
  <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-serif mb-8">{pageData.h1}</h1>
    <p className="max-w-2xl mx-auto text-lg opacity-80 mb-12">{pageData.heroText}</p>
    <img src={pageData.heroImage} alt={pageData.name} className="w-full max-h-[600px] object-cover rounded-2xl mb-16 shadow-2xl" />
    <SharedContactFooter defaultService={pageData.name} />
  </div>
);

/* =========================================
   MAIN APP
   ========================================= */

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  // Checken of we naar het dashboard willen
  useEffect(() => { 
    if (window.location.pathname === '/studio') {
      setCurrentRoute('studio');
    } else {
      window.scrollTo(0, 0); 
    }
  }, [currentRoute]);

  // Als we naar /studio gaan, laad dan het Sanity Dashboard in
  if (currentRoute === 'studio') {
    return (
      <div className="h-screen w-full">
        <Studio config={config} />
      </div>
    );
  }

  // De normale website
  return (
    <div className="min-h-screen bg-[#EAE6DF] font-sans text-[#3A3530] selection:bg-[#B07D54] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('[https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap](https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap)');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #B07D54 !important; outline: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <Navigation navigate={setCurrentRoute} currentRoute={currentRoute} />
      {currentRoute === 'home' && <HomePage navigate={setCurrentRoute} />}
      {currentRoute === 'portfolio' && <PortfolioPage navigate={setCurrentRoute} />}
      {SEO_PAGES[currentRoute] && <GenericLandingPage pageData={SEO_PAGES[currentRoute]} />}
    </div>
  );
}
