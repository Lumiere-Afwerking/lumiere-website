import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, MapPin, Phone, Instagram, Menu, X, ArrowRight,
  Droplet, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Sparkles, ShieldCheck, Leaf, Layers, Hammer, Wind, Loader2,
  Star, Quote, Coffee, FileText, PenTool, UploadCloud, MessageCircle
} from 'lucide-react';

/* =========================================
   SEO CONTENT DATA
   ========================================= */
const SEO_PAGES = {
  tadelakt: {
    name: "Authentiek Tadelakt",
    subtitle: "Specialisme",
    h1: "Authentiek Marokkaans Tadelakt in Rotterdam",
    heroText: "Breng de betoverende, fluweelzachte magie van de badhuizen uit Marrakech naar uw eigen wellness ruimte. Een eeuwenoud ambacht, met de hand gepolijst voor een 100% waterdicht en ademend resultaat.",
    heroImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200",
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
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
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
    heroImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
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
    heroImage: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200",
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
    heroImage: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200",
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
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
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
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleRoute('home')}>
            <h1 className="text-2xl font-serif tracking-widest text-[#3A3530] uppercase">Lumière</h1>
            <p className="text-[0.6rem] tracking-[0.3em] text-[#B07D54] uppercase mt-1">Earthy Finishes</p>
          </div>
          <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center">
            <button onClick={() => handleRoute('over-ons')} className="text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">Over Ons</button>
            <button onClick={() => handleRoute('werkwijze')} className="text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">Werkwijze</button>
            
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">
                Diensten <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-[#EAE6DF] border border-[#3A3530]/10 shadow-xl flex rounded-b-md overflow-hidden transform origin-top scale-95 group-hover:scale-100 transition-transform duration-300 p-4">
                  <div className="flex-1">
                    <span className="block text-[0.65rem] font-bold text-[#B07D54] uppercase tracking-widest mb-3 px-4">Badkamer</span>
                    {badkamerDiensten.map(key => (
                      <button key={key} onClick={() => handleRoute(key)} className="w-full text-left px-4 py-2 text-sm font-light hover:bg-[#B07D54]/10 hover:text-[#B07D54] transition-colors rounded">
                        {SEO_PAGES[key].name}
                      </button>
                    ))}
                  </div>
                  <div className="w-px bg-[#3A3530]/10 mx-2"></div>
                  <div className="flex-1">
                    <span className="block text-[0.65rem] font-bold text-[#B07D54] uppercase tracking-widest mb-3 px-4">Muur</span>
                    {muurDiensten.map(key => (
                      <button key={key} onClick={() => handleRoute(key)} className="w-full text-left px-4 py-2 text-sm font-light hover:bg-[#B07D54]/10 hover:text-[#B07D54] transition-colors rounded">
                        {SEO_PAGES[key].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => handleRoute('portfolio')} className="text-sm font-light tracking-widest uppercase hover:text-[#B07D54] transition-colors">Portfolio</button>
            <button onClick={() => handleRoute('offerte')} className="text-sm font-medium tracking-widest uppercase border border-[#3A3530] px-6 py-2 hover:bg-[#3A3530] hover:text-[#EAE6DF] transition-all duration-500 bg-[#3A3530] text-[#EAE6DF] md:bg-transparent md:text-[#3A3530]">Offerte</button>
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
           
           <button onClick={() => handleRoute('over-ons')} className="font-serif text-3xl text-[#3A3530]">Over Ons</button>
           <button onClick={() => handleRoute('werkwijze')} className="font-serif text-3xl text-[#3A3530]">Werkwijze</button>
           
           <div className="flex flex-col items-center w-full mt-2">
             <button onClick={() => setOpenMobileDropdown(openMobileDropdown === 'diensten' ? null : 'diensten')} className="font-serif text-3xl text-[#3A3530] flex items-center justify-center gap-3 w-full">
                Diensten {openMobileDropdown === 'diensten' ? <ChevronUp size={20} className="text-[#B07D54]" /> : <ChevronDown size={20} className="text-[#B07D54]" />}
             </button>
             <div className={`flex flex-col overflow-hidden transition-all duration-500 w-full ${openMobileDropdown === 'diensten' ? 'max-h-[800px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <span className="text-[0.65rem] font-bold text-[#B07D54] uppercase tracking-widest mb-3">Badkamer</span>
                {badkamerDiensten.map(key => (
                  <button key={key} onClick={() => handleRoute(key)} className="text-base font-light text-[#3A3530]/80 hover:text-[#B07D54] transition-colors py-2">
                    {SEO_PAGES[key].name}
                  </button>
                ))}
                <span className="text-[0.65rem] font-bold text-[#B07D54] uppercase tracking-widest mb-3 mt-6">Muur</span>
                {muurDiensten.map(key => (
                  <button key={key} onClick={() => handleRoute(key)} className="text-base font-light text-[#3A3530]/80 hover:text-[#B07D54] transition-colors py-2">
                    {SEO_PAGES[key].name}
                  </button>
                ))}
             </div>
           </div>

           <button onClick={() => handleRoute('portfolio')} className="font-serif text-3xl text-[#3A3530] pt-2">Portfolio</button>
           <button onClick={() => handleRoute('offerte')} className="font-serif text-3xl italic text-[#B07D54] mt-4 pt-4 border-t border-[#3A3530]/10 w-full">Offerte Aanvragen</button>
        </nav>
      </div>
    </>
  );
};

/* =========================================
   EXCLUSIVE OFFERTE PAGE (MET FOTO UPLOAD)
   ========================================= */
const OffertePage = () => {
  const [formState, setFormState] = useState({ 
    name: '', email: '', phone: '', city: '', 
    projectType: '', service: '', area: '', timeline: '', surface: '', message: '' 
  });
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(`${e.target.files.length} foto('s) geselecteerd`);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    const formData = new FormData(e.target);
    formData.append("access_key", "a482796b-7d51-4dd0-bc63-33abea7da9cb"); 
    formData.append("subject", `Nieuwe Offerte Aanvraag: ${formState.projectType || 'Project'} in ${formState.city || 'Onbekend'}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData 
      });
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', phone: '', city: '', projectType: '', service: '', area: '', timeline: '', surface: '', message: '' });
        setFileName('');
      } else {
        setSubmitError("Er is iets misgegaan bij het verzenden. Probeer het later nog eens of stuur een WhatsApp bericht.");
      }
    } catch (error) {
      setSubmitError("Netwerkfout. Controleer uw verbinding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#EAE6DF] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-max">
          <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">Project Aanvraag</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#3A3530] mb-6">Start uw <span className="italic text-[#B07D54]">transformatie</span>.</h1>
          <p className="font-light text-[#3A3530]/80 mb-12 text-base leading-relaxed pr-8">
            Om de hoogste kwaliteit en aandacht per project te garanderen, nemen we slechts een select aantal projecten per maand aan in de regio Rotterdam en omstreken. 
            <br/><br/>
            Vul het formulier zo compleet mogelijk in. Zo kunnen wij uw aanvraag direct goed beoordelen en u voorzien van een realistische indicatie.
          </p>
          <div className="space-y-8 border-t border-[#3A3530]/10 pt-8 pr-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F2F0EB] flex items-center justify-center flex-shrink-0 text-[#B07D54]">1</div>
              <div>
                <h4 className="font-serif text-lg text-[#3A3530] mb-1">Uitgebreide Inventarisatie</h4>
                <p className="text-sm font-light text-[#3A3530]/70 leading-relaxed">Na uw aanvraag bekijken we uw wensen, foto's en de technische haalbaarheid.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F2F0EB] flex items-center justify-center flex-shrink-0 text-[#B07D54]">2</div>
              <div>
                <h4 className="font-serif text-lg text-[#3A3530] mb-1">Persoonlijk Contact</h4>
                <p className="text-sm font-light text-[#3A3530]/70 leading-relaxed">Binnen 24 uur nemen wij contact op om details te bespreken en eventueel een bezichtiging in te plannen.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F2F0EB] flex items-center justify-center flex-shrink-0 text-[#B07D54]">3</div>
              <div>
                <h4 className="font-serif text-lg text-[#3A3530] mb-1">Maatwerk Offerte</h4>
                <p className="text-sm font-light text-[#3A3530]/70 leading-relaxed">U ontvangt een transparante begroting zonder verrassingen.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12">
          <div className="bg-[#F2F0EB] p-8 md:p-12 rounded-2xl shadow-xl border border-[#3A3530]/5 relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-20">
                <CheckCircle className="text-[#B07D54] mx-auto mb-6" size={64} strokeWidth={1} />
                <h3 className="text-3xl font-serif mb-4 text-[#3A3530]">Aanvraag Succesvol Ontvangen</h3>
                <p className="text-[#3A3530]/70 font-light max-w-md mx-auto">
                  Hartelijk dank voor uw vertrouwen in Lumière. Wij bestuderen uw project en foto's met zorg en nemen binnen 24 uur contact met u op.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {submitError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm font-light">{submitError}</div>}
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#B07D54] font-bold mb-6 flex items-center"><span className="w-8 h-px bg-[#B07D54] mr-3"></span>1. Uw Gegevens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input type="text" name="name" required value={formState.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">Volledige Naam *</label>
                    </div>
                    <div className="relative group">
                      <input type="text" name="city" required value={formState.city} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">Woonplaats *</label>
                    </div>
                    <div className="relative group">
                      <input type="email" name="email" required value={formState.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">E-mailadres *</label>
                    </div>
                    <div className="relative group">
                      <input type="tel" name="phone" required value={formState.phone} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">Telefoonnummer *</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#B07D54] font-bold mb-6 flex items-center"><span className="w-8 h-px bg-[#B07D54] mr-3"></span>2. Project Specificaties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <select name="projectType" required value={formState.projectType} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors appearance-none text-sm">
                        <option value="" disabled hidden>Kies ruimte...</option>
                        <option value="Badkamer">Badkamer / Wellness</option>
                        <option value="Woonkamer / Hal">Woonkamer / Hal</option>
                        <option value="Keuken">Keuken</option>
                        <option value="Bespoke Meubel">Bespoke Wastafel / Meubel</option>
                        <option value="Meerdere Ruimtes">Meerdere ruimtes</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-0 top-4 text-[#3A3530]/50 pointer-events-none" />
                      <label className="absolute left-0 -top-4 text-[#B07D54] text-xs">Welke Ruimte? *</label>
                    </div>
                    <div className="relative">
                      <select name="service" required value={formState.service} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors appearance-none text-sm">
                        <option value="" disabled hidden>Kies materiaal...</option>
                        <option value="Authentiek Tadelakt">Authentiek Tadelakt</option>
                        <option value="Microcement / Beton Ciré">Microcement / Beton Ciré</option>
                        <option value="Marmorino / Venetian">Marmorino / Venetian Plaster</option>
                        <option value="Leemstuc">Natuurlijke Leemstuc</option>
                        <option value="Travertino">Travertino Finish</option>
                        <option value="Weet ik nog niet">Weet ik nog niet (Advies nodig)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-0 top-4 text-[#3A3530]/50 pointer-events-none" />
                      <label className="absolute left-0 -top-4 text-[#B07D54] text-xs">Gewenste Afwerking *</label>
                    </div>
                    <div className="relative group">
                      <input type="number" name="area" required value={formState.area} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">Geschatte aantal m² *</label>
                    </div>
                    <div className="relative">
                      <select name="surface" required value={formState.surface} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors appearance-none text-sm">
                        <option value="" disabled hidden>Huidige staat...</option>
                        <option value="Bestaande Tegels">Over bestaande tegels</option>
                        <option value="Kaal Beton / Ytong">Kaal beton / Ytong</option>
                        <option value="Gestuct (Klaar voor afwerking)">Reeds glad gestuct</option>
                        <option value="Nieuwbouw Casco">Nieuwbouw casco</option>
                        <option value="Anders">Anders</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-0 top-4 text-[#3A3530]/50 pointer-events-none" />
                      <label className="absolute left-0 -top-4 text-[#B07D54] text-xs">Ondergrond *</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#B07D54] font-bold mb-6 flex items-center"><span className="w-8 h-px bg-[#B07D54] mr-3"></span>3. Planning & Bijlagen</h3>
                  <div className="space-y-8">
                    <div className="relative">
                      <select name="timeline" required value={formState.timeline} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors appearance-none text-sm">
                        <option value="" disabled hidden>Wanneer wilt u starten?</option>
                        <option value="Binnen 1 maand (Spoed)">Binnen 1 maand</option>
                        <option value="Tussen 1 en 3 maanden">Tussen 1 en 3 maanden</option>
                        <option value="Langer dan 3 maanden">Langer dan 3 maanden</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-0 top-4 text-[#3A3530]/50 pointer-events-none" />
                      <label className="absolute left-0 -top-4 text-[#B07D54] text-xs">Gewenste Realisatie *</label>
                    </div>
                    <div className="relative group">
                      <textarea name="message" rows="4" required value={formState.message} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#3A3530]/20 py-3 text-[#3A3530] focus:border-[#B07D54] outline-none transition-colors resize-none peer" placeholder=" "></textarea>
                      <label className="absolute left-0 top-3 text-[#3A3530]/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B07D54] transition-all duration-300 pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">Omschrijf uw wensen en huidige situatie *</label>
                    </div>
                    
                    <div className="relative group mt-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#3A3530]/20 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-[#3A3530]/5 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                          <UploadCloud className="w-8 h-8 text-[#B07D54] mb-3" />
                          <p className="mb-1 text-sm text-[#3A3530]/80"><span className="font-medium text-[#3A3530]">Klik hier</span> om foto's toe te voegen</p>
                          <p className="text-xs text-[#3A3530]/50">Huidige situatie of moodboard (Optioneel)</p>
                        </div>
                        <input type="file" name="attachment" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                      </label>
                      {fileName && <p className="text-sm mt-3 text-[#B07D54] font-medium text-center">{fileName}</p>}
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#3A3530] text-[#EAE6DF] py-5 text-sm tracking-[0.2em] uppercase hover:bg-[#B07D54] transition-colors duration-500 font-medium flex justify-center items-center disabled:opacity-70 mt-8 shadow-xl">
                  {isSubmitting ? <Loader2 className="animate-spin mr-3" size={20} /> : null}
                  {isSubmitting ? 'Bezig met verwerken...' : 'Verstuur Offerte Aanvraag'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   PAGES: OVER ONS & WERKWIJZE
   ========================================= */

const OverOnsPage = ({ navigate }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#EAE6DF] min-h-screen">
      <section className="relative pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-6 block">Onze Identiteit</span>
        <h1 className="text-5xl md:text-7xl font-serif text-[#3A3530] mb-8 leading-tight">
          Geworteld in <span className="italic text-[#B07D54]">Traditie</span>.<br />Gevormd in Rotterdam.
        </h1>
        <p className="font-light text-[#3A3530]/80 max-w-2xl text-lg md:text-xl leading-relaxed">
          Wij zijn Lumière. Een exclusief afwerkingsbedrijf dat eeuwenoud ambacht verbindt met moderne, high-end architectuur in Zuid-Holland.
        </p>
      </section>

      <section className="py-24 bg-[#F2F0EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl relative">
            <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=1200" alt="Vakmanschap en passie" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#3A3530]/10"></div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-[#3A3530]">De visie van een gepassioneerd vakman</h2>
            <p className="font-light text-[#3A3530]/80 mb-6 text-base leading-loose">
              "Mijn verhaal begint niet met een verfkwast of een stukadoorsspaan. Het begint met een fascinatie voor de rauwe, natuurlijke schoonheid van de architectuur in Marokko. Als kind raakte ik betoverd door de paleizen en hamams in Marrakech; ruimtes die letterlijk ademen, afgewerkt met materialen uit de aarde."
            </p>
            <p className="font-light text-[#3A3530]/80 mb-6 text-base leading-loose">
              "Gedreven door de ambitie om deze exclusieve sfeer naar het hoogste segment in Nederland te brengen, heb ik mij toegelegd op het absolute meesterschap van wandafwerking. Vanuit mijn thuisbasis Rotterdam, de stad van hard werken en geen woorden maar daden, bedienen we nu opdrachtgevers die op zoek zijn naar perfectie."
            </p>
            <p className="font-light text-[#3A3530]/80 mb-10 text-base leading-loose">
              Voor mij is wandafwerking geen fabriekswerk. Het is het aanbrengen van een handtekening. Het vereist geduld, precisie en een diep respect voor de natuurlijke kalk, klei en pigmenten waarmee we werken.
            </p>
            <div className="flex items-center gap-6">
               <div className="text-left">
                  <h4 className="font-serif text-2xl text-[#3A3530]">Oprichter Lumière</h4>
                  <p className="text-xs uppercase tracking-widest text-[#B07D54] mt-1">27 jaar | Rotterdam</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#3A3530] text-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-16">Onze Drie Pijlers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#B07D54] flex items-center justify-center mb-6 text-[#B07D54]">
                <Hammer size={24} />
              </div>
              <h3 className="text-2xl font-serif mb-4">100% Handwerk</h3>
              <p className="font-light opacity-70 leading-relaxed text-sm">Geen machines, geen massaproductie. Elke vierkante meter wordt met de hand gespaand, aangedrukt en gepolijst. Dat is de enige manier om ware diepte te creëren.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#B07D54] flex items-center justify-center mb-6 text-[#B07D54]">
                <Leaf size={24} />
              </div>
              <h3 className="text-2xl font-serif mb-4">Puur Natuur</h3>
              <p className="font-light opacity-70 leading-relaxed text-sm">Wij geloven in ademende materialen. Onze Tadelakt en Leemstuc bevatten uitsluitend natuurlijke kalk, olijfzeep en minerale pigmenten van de hoogste kwaliteit.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#B07D54] flex items-center justify-center mb-6 text-[#B07D54]">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-serif mb-4">Exclusiviteit</h3>
              <p className="font-light opacity-70 leading-relaxed text-sm">We nemen de tijd voor perfectie. Door een maximaal aantal projecten per maand aan te nemen, garanderen we dat uw interieur de volledige aandacht krijgt die het verdient.</p>
            </div>
          </div>
        </div>
      </section>
      
      <CtaFooter navigate={navigate} />
    </div>
  );
};

const WerkwijzePage = ({ navigate }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const stappen = [
    {
      icoon: Coffee,
      titel: "1. De Consultatie & Inspiratie",
      tekst: "We starten met een uitgebreid gesprek, bij voorkeur op de projectlocatie. We luisteren naar uw visie, voelen de ruimte aan en adviseren u over de materialen die het beste aansluiten bij uw wensen. We bespreken de technische vereisten en tonen u diverse stalen om de perfecte textuur en tint (van aards warm tot strak beton) te selecteren.",
      img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=800"
    },
    {
      icoon: FileText,
      titel: "2. Maatwerk Offerte & Planning",
      tekst: "Kwaliteit houdt in dat er geen verrassingen achteraf zijn. U ontvangt van ons een gedetailleerd en transparant voorstel. Na akkoord plannen we het project zorgvuldig in. We houden rekening met droogtijden en stemmen de werkzaamheden af met eventuele andere aannemers in uw woning.",
      img: "https://images.unsplash.com/photo-1503694978374-8a2fb5a485fa?auto=format&fit=crop&q=80&w=800"
    },
    {
      icoon: Layers,
      titel: "3. Voorbereiding van de Ruimte",
      tekst: "De sleutel tot een perfect naadloos resultaat is de fundering. Wij zorgen voor het afdekken van uw vloeren en meubels. Vervolgens prepareren we de ondergrond met gespecialiseerde hechtprimers en, indien nodig, wapeningsgaas. Dit voorkomt scheurvorming en garandeert een levenslange hechting van het materiaal.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
    },
    {
      icoon: PenTool,
      titel: "4. Het Ambachtelijke Proces",
      tekst: "Nu begint het echte werk. In meerdere, flinterdunne lagen brengen we het materiaal (zoals Tadelakt of Microcement) aan. Tussen elke laag zitten stricte droogtijden. Bij Tadelakt polijsten we de halfdroge kalk handmatig met een gladde riviersteen en authentieke zwarte olijfzeep, een arbeidsintensief proces dat zorgt voor de 100% waterdichte, zijdezachte finish.",
      img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
    },
    {
      icoon: CheckCircle,
      titel: "5. Oplevering & Nazorg",
      tekst: "Als het materiaal volledig is uitgehard en beschermd met hoogwaardige coatings of wax, is de ruimte getransformeerd. We lopen samen met u alles nauwkeurig na. Omdat natuurlijke materialen 'leven', voorzien we u van een specifiek onderhoudsadvies, zodat uw badkamer of vloer jarenlang zijn luxueuze uitstraling behoudt.",
      img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-[#EAE6DF] min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-20 text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">Het Traject</span>
        <h1 className="text-4xl md:text-6xl font-serif text-[#3A3530] mb-6">De Route naar <span className="italic text-[#B07D54]">Perfectie</span></h1>
        <p className="font-light text-[#3A3530]/70 leading-relaxed text-lg">
          We transformeren ruimtes niet in één dag. Premium stucwerk vereist tijd, expertise en een onberispelijk, stapsgewijs proces.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative mb-24">
        <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-[#B07D54]/20 -translate-x-1/2"></div>
        <div className="space-y-24">
          {stappen.map((stap, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 !== 0 ? 'lg:items-start text-left' : 'lg:items-end text-left lg:text-right'}`}>
                <div className="w-full max-w-lg">
                  <div className={`flex items-center gap-4 mb-6 ${index % 2 !== 0 ? 'justify-start' : 'justify-start lg:justify-end'}`}>
                    <stap.icoon className="text-[#B07D54]" size={32} strokeWidth={1.5} />
                    <span className="text-sm tracking-widest text-[#B07D54] uppercase font-bold">Stap 0{index + 1}</span>
                  </div>
                  <h3 className="text-3xl font-serif text-[#3A3530] mb-4">{stap.titel}</h3>
                  <p className="font-light text-[#3A3530]/70 text-base leading-relaxed">{stap.tekst}</p>
                </div>
              </div>
              <div className="hidden lg:flex w-14 h-14 absolute left-1/2 -translate-x-1/2 bg-[#EAE6DF] rounded-full border-4 border-[#B07D54] items-center justify-center text-[#3A3530] font-serif text-xl z-10">
                {index + 1}
              </div>
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl max-w-lg mx-auto">
                  <img src={stap.img} alt={stap.titel} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaFooter navigate={navigate} />
    </div>
  );
};

/* =========================================
   FAQ COMPONENT 
   ========================================= */
function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Kan microcement of Tadelakt over bestaande tegels worden aangebracht?", a: "In 95% van de gevallen wel! Dit scheelt enorm veel sloopwerk, stof en tijd. We bereiden uw huidige tegels voor met een speciale, hechtende primerlaag waardoor de nieuwe afwerking perfect strak wordt." },
    { q: "Is het materiaal echt 100% waterdicht voor in de douche?", a: "Absoluut. Zowel ons authentieke Tadelakt als het Microcement worden volledig vloeistofdicht afgewerkt. Tadelakt krijgt zijn waterdichtheid door het intensief polijsten met traditionele olijfzeep, microcement beschermen we met een hoogwaardige 2-componenten coating." },
    { q: "Hoe onderhoud en reinig ik mijn naadloze wanden of vloer?", a: "Het onderhoud is verrassend eenvoudig omdat er geen voegen zijn waar kalk of vuil in kan trekken. Gebruik milde, natuurlijke schoonmaakmiddelen (zoals groene zeep). Vermijd ten alle tijden agressieve chemische middelen zoals chloor, anti-kalk of schuursponsjes." },
    { q: "Hoe lang duurt een gemiddelde badkamertransformatie?", a: "Omdat we werken met systemen die laag voor laag moeten drogen, neemt een complete badkamer gemiddeld 5 tot 8 werkdagen in beslag. Wij plannen dit uiterst efficiënt in, zodat u zo kort mogelijk in de verbouwing zit." }
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
                <span className="text-[#B07D54] ml-4 flex-shrink-0">{openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-light text-sm md:text-base text-[#3A3530]/70 leading-relaxed border-t border-[#3A3530]/5 pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   CTA FOOTER
   ========================================= */
const CtaFooter = ({ navigate }) => (
  <section className="py-24 bg-[#3A3530] text-[#EAE6DF] text-center px-6 border-b border-[#EAE6DF]/10">
    <div className="max-w-3xl mx-auto">
      <Droplet className="text-[#B07D54] mx-auto mb-6" size={40} strokeWidth={1} />
      <h2 className="text-4xl md:text-5xl font-serif mb-6">Klaar om uw interieur te <span className="italic text-[#B07D54]">transformeren</span>?</h2>
      <p className="font-light text-[#EAE6DF]/70 mb-10 leading-relaxed text-lg">
        Boek uw project in. Vul ons offerteformulier in voor een indicatie op maat en een persoonlijk adviesgesprek in Rotterdam of omstreken.
      </p>
      <button onClick={() => { window.scrollTo(0,0); navigate('offerte'); }} className="bg-[#B07D54] text-[#EAE6DF] px-10 py-4 uppercase tracking-widest text-sm hover:bg-[#EAE6DF] hover:text-[#3A3530] transition-colors duration-500 font-medium">
        Offerte Aanvragen
      </button>
    </div>
  </section>
);

/* =========================================
   MAIN HOMEPAGE
   ========================================= */
function HomePage({ navigate }) {
  const [servicePage, setServicePage] = useState(0);

  const dienstenLijst = [
    { id: "01", title: SEO_PAGES.tadelakt.name, desc: "Een eerbetoon aan Marokkaans meesterschap. Handmatig gepolijst. 100% waterdicht, uiterst luxueus en organisch.", route: "tadelakt" },
    { id: "02", title: SEO_PAGES.microcement.name, desc: "De moderne standaard voor naadloos design. Strak, ijzersterk en in elke warme aardetint te verkrijgen.", route: "microcement" },
    { id: "03", title: SEO_PAGES.bespoke.name, desc: "Wij creëren meubelstukken. Van ingebouwde nissen in de douche tot naadloze wastafelmeubels.", route: "bespoke" },
    { id: "04", title: SEO_PAGES.marmorino.name, desc: "Klassieke marmerpleister met een zijdezachte glans. Brengt een ongeëvenaarde diepte en lichtreflectie.", route: "marmorino" },
    { id: "05", title: SEO_PAGES.leemstuc.name, desc: "100% ecologisch, ademend en vochtregulerend. Brengt warmte, textuur en een rustgevende akoestiek.", route: "leemstuc" },
    { id: "06", title: SEO_PAGES.travertino.name, desc: "De robuuste, poreuze uitstraling van ruw Italiaans natuursteen. Perfect voor een wabi-sabi accentmuur.", route: "travertino" }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(dienstenLijst.length / itemsPerPage);
  const nextPage = () => setServicePage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setServicePage((prev) => (prev - 1 + totalPages) % totalPages);
  const visibleServices = dienstenLijst.slice(servicePage * itemsPerPage, (servicePage + 1) * itemsPerPage);

  return (
    <>
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row items-center relative z-10">
          <div className="w-full md:w-1/2 md:pr-16 text-center md:text-left z-10">
            <div className="inline-flex items-center space-x-4 mb-8">
              <span className="w-12 h-px bg-[#B07D54]"></span>
              <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] font-medium">Rotterdam & Omstreken</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-[#3A3530]">Aardse Luxe.<br/><span className="italic text-[#B07D54]">Naadloze</span> Perfectie.</h2>
            <p className="text-lg font-light text-[#3A3530]/80 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
              Creëer de ultieme rust in uw interieur. Van authentiek Marokkaans Tadelakt tot state-of-the-art microcement, afgewerkt met warme koper- en bronsaccenten.
            </p>
            <button onClick={() => { window.scrollTo(0,0); navigate('offerte'); }} className="group inline-flex items-center space-x-4 text-sm tracking-widest uppercase text-[#3A3530]">
              <span className="border-b border-[#3A3530] pb-1 group-hover:border-[#B07D54] group-hover:text-[#B07D54] transition-all duration-300">Offerte Aanvragen</span>
              <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-2 group-hover:text-[#B07D54] transition-all duration-300" />
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-16 md:mt-0 relative">
             <div className="absolute -inset-4 border border-[#B07D54]/30 translate-x-4 translate-y-4 rounded-t-full hidden md:block"></div>
             <div className="relative overflow-hidden rounded-t-[100px] md:rounded-t-full aspect-[4/5] bg-[#D5CFC4] shadow-2xl">
               <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" alt="Luxe Venetian plaster muur in Pinterest stijl" className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" />
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#3A3530] text-[#EAE6DF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1 relative">
             <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
               <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=1000" alt="Ambacht en passie" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-[#3A3530]/20"></div>
             </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">De Maker</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#EAE6DF]">Passie, Precisie & Erfgoed</h2>
            <p className="font-light text-[#EAE6DF]/80 mb-6 text-sm md:text-base leading-relaxed">Geboren uit een diepe passie voor architectuur en sterk geworteld in mijn Marokkaanse roots. Voor mij is wandafwerking, en in het bijzonder authentiek Tadelakt, geen standaard werk. Het is een eeuwenoud erfgoed dat vraagt om toewijding.</p>
            <p className="font-light text-[#EAE6DF]/80 mb-8 text-sm md:text-base leading-relaxed">Elke ruimte die we aanpakken in regio Rotterdam en omstreken wordt met de hand bewerkt. Geen massaproductie, maar oprecht meesterschap.</p>
            <button onClick={() => { window.scrollTo(0,0); navigate('over-ons'); }} className="group inline-flex items-center space-x-4 text-sm tracking-widest uppercase text-[#EAE6DF] mb-8">
              <span className="border-b border-[#EAE6DF] pb-1 group-hover:border-[#B07D54] group-hover:text-[#B07D54] transition-all duration-300">Lees mijn hele verhaal</span>
              <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-2 group-hover:text-[#B07D54] transition-all duration-300" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#B07D54] flex items-center justify-center text-[#B07D54]"><Hammer size={20} strokeWidth={1.5} /></div>
              <span className="text-sm tracking-widest uppercase font-light">Uw Ambachtsman</span>
            </div>
          </div>
        </div>
      </section>

      <section id="diensten" className="py-24 bg-[#F2F0EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 flex flex-col items-center">
            <Droplet className="text-[#B07D54] mb-4" strokeWidth={1} size={32} />
            <h2 className="text-3xl md:text-5xl font-serif text-[#3A3530] mb-4">Onze Expertise</h2>
            <p className="font-light text-[#3A3530]/70 max-w-2xl mx-auto">Gespecialiseerd in naadloze, aardse afwerkingen die ademen.</p>
          </div>
          <div key={servicePage} className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-slide">
            {visibleServices.map((dienst) => (
              <div key={dienst.id} className="group border-t border-[#3A3530]/10 pt-8 hover:border-[#B07D54] transition-colors duration-500 flex flex-col">
                <span className="text-xs tracking-widest text-[#B07D54] font-medium block mb-4">{dienst.id}</span>
                <h4 className="text-2xl font-serif text-[#3A3530] mb-4">{dienst.title}</h4>
                <p className="text-[#3A3530]/70 font-light mb-6 text-sm leading-relaxed flex-grow">{dienst.desc}</p>
                <button onClick={() => { window.scrollTo(0,0); navigate(dienst.route); }} className="mt-4 flex items-center text-xs tracking-widest uppercase text-[#B07D54] hover:text-[#3A3530] transition-colors w-max">
                  Ontdek Meer <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-16 space-x-6">
            <button onClick={prevPage} className="w-12 h-12 rounded-full border border-[#3A3530]/30 flex items-center justify-center text-[#3A3530] hover:border-[#B07D54] hover:text-[#B07D54] transition-all duration-300"><ChevronLeft strokeWidth={1} size={24} /></button>
            <div className="text-xs tracking-widest text-[#3A3530]/50 font-medium">{servicePage + 1} / {totalPages}</div>
            <button onClick={nextPage} className="w-12 h-12 rounded-full border border-[#3A3530]/30 flex items-center justify-center text-[#3A3530] hover:border-[#B07D54] hover:text-[#B07D54] transition-all duration-300"><ChevronRight strokeWidth={1} size={24} /></button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#EAE6DF] border-t border-[#3A3530]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-[#B07D54] mb-4 block">Onze Werkwijze</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3A3530] mb-12">Transparant & <span className="italic text-[#B07D54]">Zorgeloos</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative mb-12">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-[#B07D54]/20"></div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#F2F0EB] border border-[#3A3530]/10 flex items-center justify-center z-10 mb-6 shadow-sm"><Coffee className="text-[#B07D54]" size={28} strokeWidth={1.5} /></div>
              <h4 className="text-xl font-serif text-[#3A3530] mb-3">1. Kennismaking</h4>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#F2F0EB] border border-[#3A3530]/10 flex items-center justify-center z-10 mb-6 shadow-sm"><FileText className="text-[#B07D54]" size={28} strokeWidth={1.5} /></div>
              <h4 className="text-xl font-serif text-[#3A3530] mb-3">2. Offerte & Sample</h4>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#F2F0EB] border border-[#3A3530]/10 flex items-center justify-center z-10 mb-6 shadow-sm"><PenTool className="text-[#B07D54]" size={28} strokeWidth={1.5} /></div>
              <h4 className="text-xl font-serif text-[#3A3530] mb-3">3. Realisatie</h4>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#F2F0EB] border border-[#3A3530]/10 flex items-center justify-center z-10 mb-6 shadow-sm"><CheckCircle className="text-[#B07D54]" size={28} strokeWidth={1.5} /></div>
              <h4 className="text-xl font-serif text-[#3A3530] mb-3">4. Oplevering</h4>
            </div>
          </div>
          <button onClick={() => { window.scrollTo(0,0); navigate('werkwijze'); }} className="group inline-flex items-center space-x-4 text-sm tracking-widest uppercase text-[#3A3530]">
             <span className="border-b border-[#3A3530] pb-1 group-hover:border-[#B07D54] group-hover:text-[#B07D54] transition-all duration-300">Bekijk de stappen in detail</span>
             <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-2 group-hover:text-[#B07D54] transition-all duration-300" />
          </button>
        </div>
      </section>

      <section className="py-24 bg-[#F2F0EB] border-t border-[#3A3530]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#3A3530] mb-4">Wat Onze <span className="italic text-[#B07D54]">Klanten</span> Zeggen</h2>
            <p className="font-light text-[#3A3530]/70 max-w-xl mx-auto">Vakmanschap bewijst zich door de glimlach van een tevreden opdrachtgever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative shadow-sm">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}</div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">"Werkelijk prachtig vakmanschap. Onze badkamer in Kralingen voelt nu als een luxe, serene spa. Hij werkt netjes, communiceert helder en het Tadelakt is vlekkeloos."</p>
              <div className="mt-auto"><p className="font-serif text-lg text-[#3A3530]">Familie de Vries</p><p className="text-xs uppercase tracking-widest text-[#B07D54] mt-1">Rotterdam Kralingen</p></div>
            </div>
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative shadow-sm">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}</div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">"Zeer professioneel. Het naadloze microcement op de vloer heeft onze hele benedenverdieping getransformeerd. Een absolute aanrader als je voor kwaliteit gaat."</p>
              <div className="mt-auto"><p className="font-serif text-lg text-[#3A3530]">Thomas V.</p><p className="text-xs uppercase tracking-widest text-[#B07D54] mt-1">Hillegersberg</p></div>
            </div>
            <div className="bg-[#EAE6DF] p-8 rounded-2xl border border-[#3A3530]/5 relative shadow-sm">
              <Quote className="absolute top-6 right-6 text-[#B07D54]/20" size={40} />
              <div className="flex space-x-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#B07D54] fill-[#B07D54]" />)}</div>
              <p className="font-light text-[#3A3530]/80 italic mb-6 text-sm leading-relaxed">"Duidelijke afspraken, geen verrassingen achteraf en het resultaat van de bespoke wastafel overtreft al onze verwachtingen. Een ware ambachtsman."</p>
              <div className="mt-auto"><p className="font-serif text-lg text-[#3A3530]">Sarah & Jeroen</p><p className="text-xs uppercase tracking-widest text-[#B07D54] mt-1">Den Haag</p></div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CtaFooter navigate={navigate} />
    </>
  );
}

/* =========================================
   PORTFOLIO PAGE COMPONENT
   ========================================= */
function PortfolioPage({ navigate }) {
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
    { id: 1, title: "Wabi-Sabi Badkamer", material: "Authentiek Tadelakt", location: "Rotterdam Kralingen", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200", desc: "Een serene, naadloze badkamer in warme zandtinten. Volledig waterdicht afgewerkt met traditioneel Marokkaans Tadelakt en koperen accenten." },
    { id: 2, title: "Monolithisch Wastafelmeubel", material: "Microcement", location: "Hillegersberg", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200", desc: "Op maat gemaakt zwevend wastafelmeubel. Wand en meubel vloeien naadloos in elkaar over dankzij het gebruik van extreem slijtvast microcement." },
    { id: 3, title: "Luxe Penthouse Vloer", material: "Beton Ciré", location: "Kop van Zuid", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200", desc: "Een gigantisch naadloos oppervlak dat rust en ruimte creëert in dit high-end penthouse, perfect gecombineerd met minimalistisch meubilair." },
    { id: 4, title: "Karakteristieke Accentmuur", material: "Travertino Finish", location: "Wassenaar", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", desc: "De rauwe, poreuze structuur van echt Italiaans natuursteen nagebootst met travertino stucwerk. Een krachtig statement achter de open haard." }
  ];

  return (
    <div className="bg-[#F2F0EB] min-h-screen pt-32 pb-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <div>
            <span className="inline-block px-3 py-1 bg-[#B07D54]/10 text-[#B07D54] text-xs tracking-widest uppercase mb-6 rounded-full border border-[#B07D54]/20">Ons Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#3A3530] mb-4">Recente <span className="italic text-[#B07D54]">Meesterwerken</span></h1>
            <p className="font-light text-[#3A3530]/70 max-w-xl">Een selectie van onze meest exclusieve projecten. Blader door de ruimtes en laat u inspireren door het vakmanschap.</p>
          </div>
          <div className="hidden md:flex space-x-4 pb-2">
            <button onClick={() => scrollPortfolio('left')} className="w-12 h-12 rounded-full border border-[#3A3530]/20 flex items-center justify-center text-[#3A3530] hover:border-[#B07D54] hover:text-[#B07D54] transition-all duration-300"><ChevronLeft strokeWidth={1.5} size={24} /></button>
            <button onClick={() => scrollPortfolio('right')} className="w-12 h-12 rounded-full border border-[#3A3530]/20 flex items-center justify-center text-[#3A3530] hover:border-[#B07D54] hover:text-[#B07D54] transition-all duration-300"><ChevronRight strokeWidth={1.5} size={24} /></button>
          </div>
        </div>
      </div>

      <div className="relative max-w-[100vw] overflow-hidden mb-24">
        <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 lg:px-12 pb-12 gap-6 md:gap-10">
          {portfolioItems.map((item) => (
            <div key={item.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[40vw] snap-center group relative flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-[#EAE6DF]/90 backdrop-blur px-4 py-2 rounded-full"><span className="text-xs tracking-widest uppercase text-[#B07D54] font-medium flex items-center"><MapPin size={12} className="mr-1" /> {item.location}</span></div>
              </div>
              <span className="text-xs tracking-widest text-[#B07D54] uppercase mb-2 block">{item.material}</span>
              <h3 className="text-2xl font-serif text-[#3A3530] mb-3">{item.title}</h3>
              <p className="text-[#3A3530]/70 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="md:hidden flex justify-center mt-2 text-xs tracking-widest uppercase text-[#3A3530]/40 items-center"><ChevronLeft size={14} className="mr-2"/> Swipe om te ontdekken <ChevronRight size={14} className="ml-2"/></div>
      </div>
      <CtaFooter navigate={navigate} />
    </div>
  );
}

/* =========================================
   GENERIC SEO LANDING PAGE COMPONENT
   ========================================= */
function GenericLandingPage({ navigate, pageData }) {
  useEffect(() => { window.scrollTo(0, 0); }, [pageData]);
  if (!pageData) return null;

  return (
    <div className="bg-[#F2F0EB] min-h-screen pt-20">
      <section className="pt-16 pb-20 lg:pt-32 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <span className="inline-block px-3 py-1 bg-[#B07D54]/10 text-[#B07D54] text-xs tracking-widest uppercase mb-6 rounded-full border border-[#B07D54]/20">{pageData.subtitle}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 text-[#3A3530]">
            {pageData.h1.split(' ').map((word, index, arr) => {
              if (index === arr.length - 1 || word.toLowerCase().includes(pageData.name.split(' ')[0].toLowerCase())) {
                 return <span key={index} className="italic text-[#B07D54]"> {word} </span>
              }
              return word + ' ';
            })}
          </h1>
          <p className="text-lg font-light text-[#3A3530]/80 mb-8 leading-relaxed">{pageData.heroText}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => { window.scrollTo(0,0); navigate('offerte'); }} className="bg-[#3A3530] text-[#EAE6DF] px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#B07D54] transition-colors text-center">Vraag Prijsindicatie Aan</button>
            <a href="tel:+31612345678" className="border border-[#3A3530] text-[#3A3530] px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#3A3530] hover:text-[#EAE6DF] transition-colors text-center flex items-center justify-center"><Phone size={16} className="mr-2" /> Bel Direct</a>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
           <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <img src={pageData.heroImage} alt={pageData.h1} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-[#EAE6DF] font-serif text-2xl italic">"{pageData.quote}"</p>
              </div>
           </div>
        </div>
      </section>
      <section className="py-24 bg-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-[#3A3530]">{pageData.featuresTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pageData.features.map((feature, idx) => (
              <div key={idx} className="bg-[#F2F0EB] p-8 text-center rounded-xl border border-[#3A3530]/5 shadow-sm">
                <feature.icon className="mx-auto text-[#B07D54] mb-4" size={40} strokeWidth={1} />
                <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
                <p className="font-light text-sm text-[#3A3530]/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 lg:px-12 max-w-5xl mx-auto text-center">
        <span className="text-xs tracking-widest text-[#B07D54] uppercase mb-4 block">Onze Roots</span>
        <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#3A3530]">{pageData.storyTitle}</h2>
        <p className="text-lg font-light text-[#3A3530]/80 leading-relaxed mb-8">{pageData.storyText}</p>
        <p className="font-serif italic text-2xl text-[#B07D54]">"Het resultaat is een levendige wand die met de jaren alleen maar mooier wordt."</p>
      </section>
      <CtaFooter navigate={navigate} />
    </div>
  );
}

/* =========================================
   MAIN APP ROUTER (Smart URL Routing)
   ========================================= */
export default function App() {
  
  // Lees de huidige URL uit bij het laden van de website
  const getInitialRoute = () => {
    const path = window.location.pathname.substring(1); // Verwijder de '/'
    if (!path) return 'home';
    
    // Controleer of het een geldige pagina is
    if (SEO_PAGES[path] || ['home', 'over-ons', 'werkwijze', 'portfolio', 'offerte'].includes(path)) {
      return path;
    }
    return 'home'; // Als URL niet bestaat, ga naar home
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute());

  // Deze functie update niet alleen de pagina, maar ook de URL in de browser!
  // Aangepast: Fallback voor de online preview omgeving (voorkomt SecurityError)
  const handleNavigate = (route) => {
    try {
      window.history.pushState({}, '', `/${route === 'home' ? '' : route}`);
    } catch (e) {
      // In de online preview editor kan pushState soms een error geven vanwege iframe restricties.
      // We negeren de error hier zodat de knoppen wel gewoon blijven werken.
      console.log('URL bar update disabled in this preview environment.');
    }
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  // Luister naar de "Vorige" en "Volgende" knoppen in de browser van de gebruiker
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#EAE6DF] font-sans text-[#3A3530] selection:bg-[#B07D54] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #B07D54 !important; outline: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      
      {/* Geef de slimme navigatie functie door aan alle componenten */}
      <Navigation navigate={handleNavigate} currentRoute={currentRoute} />
      
      <div className="flex-grow">
        {currentRoute === 'home' && <HomePage navigate={handleNavigate} />}
        {currentRoute === 'over-ons' && <OverOnsPage navigate={handleNavigate} />}
        {currentRoute === 'werkwijze' && <WerkwijzePage navigate={handleNavigate} />}
        {currentRoute === 'portfolio' && <PortfolioPage navigate={handleNavigate} />}
        {currentRoute === 'offerte' && <OffertePage />}
        {SEO_PAGES[currentRoute] && <GenericLandingPage pageData={SEO_PAGES[currentRoute]} navigate={handleNavigate} />}
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/31622873096?text=Beste%20Lumière,%20ik%20heb%20een%20korte%20vraag%20over%20mijn%20project." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-[#3A3530] text-[#EAE6DF] text-xs font-light tracking-widest px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
          Snel even appen?
        </span>
      </a>

      {/* JURIDISCHE FOOTER */}
      <footer className="bg-[#3A3530] text-[#EAE6DF]/50 py-12 px-6 lg:px-12 border-t border-[#EAE6DF]/10 font-light text-[10px] md:text-xs tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col space-y-2">
            <p>&copy; {new Date().getFullYear()} Lumière Afwerking</p>
            <p className="opacity-70">Gevestigd te Rotterdam</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <a href="#" className="hover:text-[#B07D54] transition-colors cursor-pointer">Instagram</a>
            <a href="#" className="hover:text-[#B07D54] transition-colors cursor-pointer">Privacy & Cookies</a>
            <a href="#" className="hover:text-[#B07D54] transition-colors cursor-pointer">Algemene Voorwaarden</a>
          </div>
          <div className="flex flex-col space-y-2 text-center md:text-right opacity-70">
             <p>KVK: 87654321</p>
             <p>BTW: NL123456789B01</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
