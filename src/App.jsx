import { useState } from 'react'
import Navbar from './Navbar' 

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
    description: "",
    media: [
      { type: 'image', url: "/images/12r.jpg" },
      { type: 'image', url: "/images/12r1.jpg" },
      { type: 'image', url: "/images/12r2.jpg" },
      { type: 'image', url: "/images/12r3.jpg" },
      
]
  },
  {
    id: 4, 
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
]


export default function App() {
  const [filter, setFilter] = useState('available');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
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
        <header className="max-w-6xl mx-auto mb-16 flex flex-col items-center text-center mt-10">
          <h1 className="text-6xl font-black italic text-blue-500 uppercase tracking-tighter">
            Flip <span className="text-white">Fone</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-widest mt-2 uppercase text-xs">
            Premium iPhone Seller • La Trinidad / Baguio City
          </p>

          <div className="w-full max-w-md mt-10">
            <input 
              type="text"
              placeholder="SEARCH IPHONES..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500/50 rounded-2xl py-4 px-6 outline-none transition-all text-[10px] font-black tracking-widest uppercase placeholder:text-zinc-600 shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 mt-8">
             {['available', 'sold'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setFilter(tab)}
                className={`px-10 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all
                  ${filter === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-200'}`}
              >
                {tab}
              </button>
             ))}
          </div>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredGadgets.map((item) => (
            <div key={item.id} onClick={() => handleOpenModal(item)} className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition-all hover:border-blue-500/50 cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <img src={item.image} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.status === 'sold' ? 'grayscale opacity-40' : ''}`} />
                {item.status === 'sold' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                     <span className="bg-white text-black font-black px-4 py-2 -rotate-12 uppercase text-lg">SOLD</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg uppercase mb-1">{item.model}</h3>
                <span className="bg-blue-500/10 text-blue-400 text-[9px] font-bold px-2 py-1 rounded">{item.specs}</span>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-2xl font-black text-white">₱{item.price.toLocaleString()}</p>
                    <div className="bg-zinc-800 p-3 rounded-xl group-hover:bg-blue-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </main>

        {selectedItem && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-6 right-6 z-50 bg-white text-black w-10 h-10 rounded-full font-black flex items-center justify-center hover:scale-110 transition-transform"
              >
                ✕
              </button>
              
              <div className="bg-black flex items-center justify-center min-h-[300px] md:min-h-full md:w-1/2 relative group">
                {selectedItem.media[currentMediaIndex].type === 'video' ? (
                  <video src={selectedItem.media[currentMediaIndex].url} className="w-full h-full object-contain" controls autoPlay muted loop />
                ) : (
                  <img src={selectedItem.media[currentMediaIndex].url} className="w-full h-full object-contain" />
                )}

                {selectedItem.media.length > 1 && (
                  <>
                    <button onClick={prevMedia} className="absolute left-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10">←</button>
                    <button onClick={nextMedia} className="absolute right-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10">→</button>
                  </>
                )}
              </div>

              <div className="p-8 md:p-12 pb-12 md:w-1/2 flex flex-col justify-between h-full overflow-y-auto bg-zinc-900 scrollbar-hide">
                <div className="mb-8">
                  <h2 className="text-4xl font-black uppercase text-blue-500 italic mb-6 tracking-tighter leading-none">{selectedItem.model}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed border-l-4 border-blue-500 pl-6 mb-6">{selectedItem.description}</p>
                  <div className="pl-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest space-y-2">
                    <p>Condition: <span className="text-zinc-300">{selectedItem.condition}</span></p>
                    <p>Specs: <span className="text-zinc-300">{selectedItem.specs}</span></p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-zinc-800/50">
                  <p className="text-5xl font-black text-white mb-6 tracking-tighter">₱{selectedItem.price.toLocaleString()}</p>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61585651144393" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-50 block w-full py-5 bg-blue-600 text-white font-black uppercase rounded-2xl text-center hover:bg-blue-500 shadow-2xl transition-all active:scale-95"
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