

import React, { useState, useEffect } from 'react'; // Agregado useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, X, Trash2, Receipt, 
  ChevronRight, Send, LayoutGrid, Sparkles, Tag
} from 'lucide-react';

// --- IMPORTACIONES DE FIREBASE ---
import { db } from "../firebase"; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const ProductCard = ({ product, onAdd, compact }) => (
  <div className="group bg-white rounded-[40px] p-4 border border-slate-100 hover:shadow-2xl transition-all duration-500">
    <div className={`relative w-full overflow-hidden rounded-[30px] mb-5 shadow-inner ${compact ? 'aspect-square' : 'aspect-square md:h-72 lg:h-80'}`}>
      <img src={product.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={product.name} />
      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 backdrop-blur-[2px]">
         <button onClick={() => onAdd(product)} className="w-full bg-white text-slate-900 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-fupagua-amarillo">
            + Añadir a la Bolsa
         </button>
      </div>
      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-md">
        {product.category}
      </span>
    </div>
    <div className="flex flex-col px-1 pb-2">
      <h4 className="text-base font-black uppercase italic text-slate-900 leading-tight mb-2 group-hover:text-fupagua-azul transition-colors">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-xl font-black text-slate-900">${product.price}</span>
        <div className="h-[1px] flex-grow mx-4 bg-slate-100"></div>
        <Tag size={14} className="text-slate-200" />
      </div>
    </div>
  </div>
);

const Store = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // --- ESTADOS DINÁMICOS ---
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(["Todos"]);

  // --- CONEXIÓN EN TIEMPO REAL ---
  useEffect(() => {
    // 1. Escuchar Productos
    const qProd = query(collection(db, "productos"), orderBy("createdAt", "desc"));
    const unsubProd = onSnapshot(qProd, (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllProducts(docs);
    });

    // 2. Escuchar Categorías Dinámicas
    const qCat = query(collection(db, "categorias"), orderBy("nombre", "asc"));
    const unsubCat = onSnapshot(qCat, (snap) => {
      const catsFromDB = snap.docs.map(d => d.data().nombre);
      setCategories(["Todos", ...catsFromDB]);
    });

    return () => { unsubProd(); unsubCat(); };
  }, []);

  const addToCart = (p) => { 
    setCart([...cart, { ...p, cartId: Math.random() }]); 
    setIsCartOpen(true); 
  };

  const removeFromCart = (cartId) => { setCart(cart.filter(item => item.cartId !== cartId)); };
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  // Filtrado lógico
  const filteredProducts = activeCategory === "Todos" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const sendToWhatsApp = () => {
    let msg = `*PEDIDO FUPAGUA STORE*\n==========================\n`;
    cart.forEach(i => msg += `• ${i.name.toUpperCase()} - $${i.price}\n`);
    msg += `==========================\n*TOTAL: $${total}*\n\n_Hola! Deseo concretar este pedido._`;
    window.open(`https://wa.me/584243390902?text=${encodeURIComponent(msg)}`);
  };

  return (
    <section id="tienda" className="pt-32 pb-24 bg-white overflow-hidden min-h-screen relative">
      {/* Texto de Fondo */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[18vw] font-black uppercase italic leading-none whitespace-nowrap -ml-20">FUPAGUA STORE 2026</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
              <span className="h-1 w-12 bg-fupagua-amarillo rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Autogestión Solidaria</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Fupagua <br /> 
              <span className="relative text-fupagua-amarillo font-light italic ml-2 md:ml-4">
                Store
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-azul/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="group relative bg-slate-900 p-3 rounded-[35px] flex items-center gap-5 pr-10 shadow-2xl transition-all hover:bg-fupagua-azul"
          >
            <div className="bg-white p-4 rounded-[28px] text-slate-900 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] leading-none mb-2">Tu Bolsa</p>
              <p className="text-3xl font-black text-white leading-none">${total}</p>
            </div>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-fupagua-amarillo text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-4 border-white shadow-lg animate-bounce">
                {cart.length}
              </span>
            )}
          </motion.button>
        </div>

        {/* CONTENIDO DE LA TIENDA */}
        {!showFullCatalog ? (
          <div className="space-y-16">
            <div className="flex justify-between items-center border-b border-slate-100 pb-8">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 italic">Lanzamientos Recientes</h3>
              <button onClick={() => setShowFullCatalog(true)} className="flex items-center gap-3 text-slate-900 font-black uppercase text-[10px] tracking-widest hover:text-fupagua-azul transition-all group">
                Explorar Catálogo <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {allProducts.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center bg-slate-50 p-6 rounded-[35px]">
               <button onClick={() => setShowFullCatalog(false)} className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-slate-500 hover:text-slate-900 transition-all">
                  <ChevronRight size={18} className="rotate-180"/> Volver
               </button>
               <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-slate-100'}`}>
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} compact />)}
            </div>
          </motion.div>
        )}
      </div>

      {/* CARRITO (EL RESTO DEL CÓDIGO SE MANTIENE IGUAL) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[5000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-white h-full shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col">
              
              <div className="p-10 border-b border-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-fupagua-azul">Checkout</span>
                  <button onClick={() => setIsCartOpen(false)} className="bg-slate-100 p-3 rounded-full hover:bg-slate-900 hover:text-white transition-all"><X size={20}/></button>
                </div>
                <h4 className="text-4xl font-black uppercase italic text-slate-900 tracking-tighter">Tu Bolsa</h4>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <ShoppingBag size={80} strokeWidth={1}/>
                    <p className="mt-4 font-black uppercase text-xs tracking-widest">Bolsa Vacía</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div layout key={item.cartId} className="flex gap-6 items-center pb-6 border-b border-slate-50 group">
                      <div className="w-20 h-20 rounded-[20px] overflow-hidden bg-slate-100 shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-black uppercase italic text-slate-900 leading-tight mb-1">{item.name}</p>
                        <p className="text-fupagua-azul font-black text-lg">$ {item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group-hover:text-slate-400">
                        <Trash2 size={18}/>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-10 bg-slate-50 rounded-t-[50px]">
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Inversión Total</p>
                      <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none">$ {total}</p>
                   </div>
                   <div className="p-5 bg-white rounded-[25px] shadow-sm">
                      <Receipt size={32} className="text-fupagua-azul" />
                   </div>
                </div>
                
                <button 
                  onClick={sendToWhatsApp} disabled={cart.length === 0}
                  className="w-full bg-slate-900 text-white py-6 rounded-[25px] font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-fupagua-azul transition-all shadow-xl disabled:opacity-20 group"
                >
                  <Send size={18} className="text-fupagua-amarillo group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                  Confirmar vía WhatsApp
                </button>
                <p className="text-center mt-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                   Al comprar, apoyas directamente nuestra labor de más de 28 años.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Store;