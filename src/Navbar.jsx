export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
      
        <div className="flex items-center gap-2">
          <div className="font-black tracking-tighter text-blue-500 uppercase">Ivan</div>
          <span className="font-black tracking-tighter text-white uppercase">Bangcado</span>
        </div>

     


      
        <a 
          href="https://www.instagram.com/flip.fone2601" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} 
          className="relative z-[60] bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-6 py-2.5 rounded-full transition-all uppercase tracking-widest shadow-lg shadow-blue-600/20 cursor-pointer active:scale-95"
        >
          Contact me
        </a>
      </div>
    </nav>
  )
}