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
    condition: "99% Smooth", 
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

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev + 1) % selectedItem.media.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev - 1 + selectedItem.media.length) % selectedItem.media.length);
  };

  const filteredGadgets = GADGET_DATA.filter(item => 
    item.status === filter && item.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500/50 rounded-2xl py-4 px-6 outline-none transition-all text-sm font-black uppercase tracking-widest placeholder:text-zinc-700"
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

        <main className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-20">
          {filteredGadgets.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleOpenModal(item)} 
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden transition-all active:scale-95 md:hover:border-blue-500/50 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-800">
                <img src={item.image} className={`w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 ${item.status === 'sold' ? 'grayscale opacity-30' : ''}`} alt={item.model} />
                {item.status === 'sold' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white text-black font-black px-2 py-1 -rotate-12 uppercase text-[10px] md:text-sm">SOLD OUT</span>
                  </div>
                )}
              </div>
              <div className="p-3 md:p-6">
                <h3 className="font-bold text-[11px] md:text-lg uppercase mb-1 truncate">{item.model}</h3>
                <span className="bg-zinc-800 text-zinc-400 text-[7px] md:text-[9px] font-bold px-1.5 py-0.5 rounded border border-zinc-700">{item.specs}</span>
                <p className="text-sm md:text-2xl font-black text-blue-500 mt-2 md:mt-4">₱{item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </main>

        {selectedItem && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-zinc-900 border border-zinc-800 rounded-[2rem] max-w-5xl w-full max-h-[85vh] md:h-[550px] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 z-50 bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full font-black flex items-center justify-center hover:scale-110 transition-transform"
              >
                ✕
              </button>
              
              {/* IMAGE SECTION - ZOOMED TO CUT OUT MARGINS */}
              <div className="bg-black flex items-center justify-center h-[45%] md:h-full md:w-[60%] relative shrink-0 border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden">
                <img 
                  key={selectedItem.media[currentMediaIndex].url}
                  src={selectedItem.media[currentMediaIndex].url} 
                  className="w-full h-full object-contain scale-[1.4] md:scale-[1.25] transition-transform duration-500" 
                  alt="Product view"
                />
                {selectedItem.media.length > 1 && (
                  <>
                    <button onClick={prevMedia} className="absolute left-3 bg-blue-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-blue-500 transition-colors">←</button>
                    <button onClick={nextMedia} className="absolute right-3 bg-blue-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-blue-500 transition-colors">→</button>
                  </>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-zinc-900 overflow-y-auto">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-4xl font-black uppercase text-white italic tracking-tighter leading-none">{selectedItem.model}</h2>
                  <p className="text-zinc-400 text-xs leading-relaxed border-l-2 border-blue-600 pl-3">{selectedItem.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
                      <p className="text-[8px] text-zinc-500 uppercase font-black mb-0.5">Condition</p>
                      <p className="text-[10px] md:text-xs text-zinc-200 font-bold uppercase truncate">{selectedItem.condition}</p>
                    </div>
                    <div className="bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
                      <p className="text-[8px] text-zinc-500 uppercase font-black mb-0.5">Storage</p>
                      <p className="text-[10px] md:text-xs text-zinc-200 font-bold uppercase truncate">{selectedItem.specs}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-zinc-800/50">
                  <p className="text-3xl md:text-4xl font-black text-blue-500 tracking-tighter mb-4">₱{selectedItem.price.toLocaleString()}</p>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61585651144393" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-blue-600 text-white font-black uppercase rounded-xl text-center text-[10px] md:text-xs tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
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