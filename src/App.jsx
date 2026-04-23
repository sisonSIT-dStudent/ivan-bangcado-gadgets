import { useState, useEffect } from 'react';
import Navbar from './Navbar'; 

const GADGET_DATA = [
  { 
    id: 1, 
    model: "iPhone 15 Pro", 
    price: 32000, 
    specs: "128GB", 
    status: 'sold', 
    condition: "99% Smooth",
    image: "/images/15p.jpg",
    description: "Premium condition, barely used.",
    media: [
      { type: 'image', url: "/images/15p.jpg" },
      { type: 'image', url: "/images/15p1.jpg" },
      { type: 'image', url: "/images/15p2.jpg" },
      { type: 'image', url: "/images/15p3.jpg" },
    ]
  },
  {
    id: 2,
    model: "iPhone 13 Pro Max",
    price: 22000,
    specs: "128GB",
    status: 'available',
    condition: "76% Battery Health",
    image: "/images/13pm.jpg", 
    description: "Openline, Factory unlock, True tone working, Face id working, No history of repair.",
    media: [
      { type: 'image', url: "/images/13pm.jpg" },
      { type: 'image', url: "/images/13pm1.jpg" },
      { type: 'image', url: "/images/13pm2.jpg" },
      { type: 'image', url: "/images/13pm3.jpg" },
      { type: 'image', url: "/images/13pm4.jpg" }
    ]
  },
  { 
    id: 3, 
    model: "iPhone 13", 
    price: 28500, 
    specs: "128GB | Pink Edition", 
    status: 'sold', 
    condition: "VNDS (Very Near Deadstock)", 
    image: "/images/13pi.jpg",
    description: "Lady owned. Fresh as new. Tempered glass installed since day one.",
    media: [
      { type: 'image', url: "/images/13pi.jpg" },
      { type: 'image', url: "/images/13pi1.jpg" },
      { type: 'image', url: "/images/13pi2.jpg" },
    ]
  },
  { 
    id: 4, 
    model: "iPhone 12", 
    price: 8500, 
    specs: "64GB | Red Edition", 
    status: 'sold', 
    condition: "VNDS (Very Near Deadstock)", 
    image: "/images/12r.jpg",
    description: "Compact and powerful. Great battery life.",
    media: [
      { type: 'image', url: "/images/12r.jpg" },
      { type: 'image', url: "/images/12r1.jpg" },
      { type: 'image', url: "/images/12r2.jpg" },
      { type: 'image', url: "/images/12r3.jpg" },
    ]
  },
  {
    id: 5, 
    model: "iPhone 14 Pro", 
    price: 24500, 
    specs: "128GB | Black Edition", 
    status: 'sold', 
    condition: "Good condition", 
    image: "/images/14p.jpg",
    description: "Openline, factory unlock, No sim restriction",
    media: [
      { type: 'image', url: "/images/14p.jpg" },
      { type: 'image', url: "/images/14p1.jpg" },
      { type: 'image', url: "/images/14p2.jpg" },
    ]
  }
];

export default function App() {
  const [filter, setFilter] = useState('available');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Prevents the "black glitch" by caching images ahead of time
  useEffect(() => {
    if (selectedItem) {
      selectedItem.media.forEach((item) => {
        const img = new Image();
        img.src = item.url;
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev + 1) % selectedItem.media.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev - 1 + selectedItem.media.length) % selectedItem.media.length);
  };

  const filteredGadgets = GADGET_DATA.filter(item => {
    const matchesStatus = item.status === filter;
    const matchesSearch = item.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-600/30">
      <Navbar />
      
      <div className="p-4 md:p-10 pt-20"> 
        <header className="max-w-6xl mx-auto mb-12 flex flex-col items-center text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-black italic text-blue-500 uppercase tracking-tighter leading-none">
            Flip <span className="text-white">Fone</span>
          </h1>
          <p className="text-zinc-500 font-bold tracking-[0.3em] mt-3 uppercase text-[9px] md:text-xs">
            Premium iPhone Seller • Baguio City
          </p>

          <div className="w-full max-w-md mt-10 px-2">
            <input 
              type="text"
              placeholder="Search model..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500/50 rounded-2xl py-4 px-6 outline-none transition-all text-sm font-black uppercase tracking-widest placeholder:text-zinc-700 shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 mt-8">
             {['available', 'sold'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setFilter(tab)}
                className={`px-8 md:px-12 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all
                  ${filter === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {tab}
              </button>
             ))}
          </div>
        </header>

        {/* MAIN GRID: Optimized for 2 columns on mobile */}
        <main className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-20">
          {filteredGadgets.map((item) => (
            <div 
              key={`${filter}-${item.id}`} 
              onClick={() => handleOpenModal(item)} 
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden transition-all active:scale-95 md:hover:border-blue-500/50 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-800">
                <img 
                  src={item.image} 
                  className={`w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 ${item.status === 'sold' ? 'grayscale opacity-30' : ''}`} 
                  alt={item.model}
                />
                {item.status === 'sold' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white text-black font-black px-2 py-1 -rotate-12 uppercase text-[10px] md:text-sm shadow-2xl">SOLD OUT</span>
                  </div>
                )}
              </div>
              <div className="p-3 md:p-6">
                <h3 className="font-bold text-[11px] md:text-lg uppercase mb-1 truncate text-zinc-100">{item.model}</h3>
                <span className="bg-zinc-800 text-zinc-400 text-[7px] md:text-[9px] font-bold px-1.5 py-0.5 rounded border border-zinc-700">{item.specs}</span>
                <div className="flex justify-between items-end mt-2 md:mt-4">
                    <p className="text-sm md:text-2xl font-black text-blue-500">₱{item.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* MODAL: Fixed height with independent scroll for description */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-zinc-900 border border-zinc-800 rounded-[2rem] max-w-4xl w-full h-[80vh] md:h-auto md:max-h-[85vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 z-50 bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full font-black flex items-center justify-center hover:scale-110 transition-transform"
              >
                ✕
              </button>
              
              {/* IMAGE SECTION (TOP ON MOBILE) */}
              <div className="bg-black flex items-center justify-center h-[45%] md:h-full md:w-1/2 relative group shrink-0 border-b md:border-b-0 md:border-r border-zinc-800">
                <img 
                  key={selectedItem.media[currentMediaIndex].url}
                  src={selectedItem.media[currentMediaIndex].url} 
                  className="w-full h-full object-contain p-4" 
                  alt="Product view"
                />

                {selectedItem.media.length > 1 && (
                  <>
                    <button onClick={prevMedia} className="absolute left-2 md:left-4 bg-blue-600/90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 transition-all active:scale-90">←</button>
                    <button onClick={nextMedia} className="absolute right-2 md:right-4 bg-blue-600/90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 transition-all active:scale-90">→</button>
                  </>
                )}
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {selectedItem.media.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i === currentMediaIndex ? 'w-4 bg-blue-500' : 'w-1 bg-zinc-600'}`} />
                  ))}
                </div>
              </div>

              {/* DETAILS SECTION (SCROLLABLE ON MOBILE) */}
              <div className="p-6 md:p-12 flex flex-col justify-between flex-grow overflow-y-auto bg-zinc-900">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-2 w-2 rounded-full ${selectedItem.status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{selectedItem.status}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase text-white italic mb-4 md:mb-6 tracking-tighter leading-none">{selectedItem.model}</h2>
                  <div className="space-y-4">
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed border-l-2 border-blue-600 pl-4">{selectedItem.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                        <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Condition</p>
                        <p className="text-[10px] text-zinc-200 font-bold uppercase">{selectedItem.condition}</p>
                      </div>
                      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                        <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Specs</p>
                        <p className="text-[10px] text-zinc-200 font-bold uppercase">{selectedItem.specs}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-zinc-800/50">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-4xl md:text-6xl font-black text-blue-500 tracking-tighter">₱{selectedItem.price.toLocaleString()}</p>
                  </div>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61585651144393" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 md:py-6 bg-blue-600 text-white font-black uppercase rounded-2xl text-center hover:bg-blue-500 shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all active:scale-95 text-xs md:text-base tracking-widest"
                  >
                    Inquire via Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}