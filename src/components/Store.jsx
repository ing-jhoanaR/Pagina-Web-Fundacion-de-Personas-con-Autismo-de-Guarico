

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, X, Trash2, Receipt, 
  ChevronRight, Send, LayoutGrid 
} from 'lucide-react';

const categories = ["Todos", "Indumentaria", "Educativo", "Arte", "Accesorios"];

const allProducts = [
  { id: 1, category: "Indumentaria", name: "Uniforme Oficial", price: 25, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400" },
  { id: 2, category: "Accesorios", name: "Taza 28 Años", price: 10, image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed39?q=80&w=400" },
  { id: 3, category: "Educativo", name: "Kit Psicomotricidad", price: 45, image: "https://images.unsplash.com/photo-1531346680769-a1d79b57ad5c?q=80&w=400" },
  { id: 4, category: "Accesorios", name: "Agenda 2026", price: 12, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=400" },
  { id: 5, category: "Indumentaria", name: "Gorra Fupagua", price: 15, image: "https://images.unsplash.com/photo-1588850561447-417f33188db0?q=80&w=400" },
  { id: 6, category: "Arte", name: "Set Lápices Colores", price: 6, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400" },
  { id: 7, category: "Accesorios", name: "Bolso Térmico", price: 18, image: "https://images.unsplash.com/photo-1544816153-12ad5d713281?q=80&w=400" },
  { id: 8, category: "Educativo", name: "Rompecabezas", price: 22, image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=400" },
  { id: 9, category: "Educativo", name: "Libro Cuentos", price: 20, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400" },
  { id: 10, category: "Accesorios", name: "Botella Tritan", price: 9, image: "https://images.unsplash.com/photo-1602143307185-8a15505566f1?q=80&w=400" }
];

const ProductCard = ({ product, onAdd, compact }) => (
  // AJUSTE: Reducción de paddings y bordes
  <div className="group bg-white rounded-[30px] md:rounded-[40px] p-3 md:p-4 border border-slate-100 hover:shadow-xl transition-all duration-500">
    {/* AJUSTE: Altura de imagen controlada (max-h-80 en desktop) */}
    <div className={`relative w-full overflow-hidden rounded-[20px] md:rounded-[30px] mb-4 shadow-inner 
      ${compact ? 'aspect-square' : 'aspect-square md:h-72 lg:h-80'}`}>
      
      <img 
        src={product.image} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        alt={product.name} 
      />
      
      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
         <button 
           onClick={() => onAdd(product)} 
           className="w-full bg-white text-slate-900 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-transform"
         >
           + Agregar
         </button>
      </div>
      
      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">
        {product.category}
      </span>
    </div>

    <div className="flex flex-col justify-between px-1">
      <h4 className="text-sm md:text-lg font-black uppercase italic text-slate-900 leading-tight mb-1">
        {product.name}
      </h4>
      <span className="text-base md:text-xl font-black text-fupagua-azul">
        ${product.price}
      </span>
    </div>
  </div>
);

const Store = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const addToCart = (p) => { 
    setCart([...cart, { ...p, cartId: Math.random() }]); 
    setIsCartOpen(true); 
  };

  const removeFromCart = (cartId) => { 
    setCart(cart.filter(item => item.cartId !== cartId)); 
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = activeCategory === "Todos" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const sendToWhatsApp = () => {
    let msg = `*FACTURA DIGITAL - FUPAGUA STORE*\n==========================\n`;
    cart.forEach(i => msg += `• ${i.name.toUpperCase()} - $${i.price}\n`);
    msg += `==========================\n*TOTAL A PAGAR: $${total}*\n\n_Hola! Deseo concretar este pedido._`;
    window.open(`https://wa.me/584243390902?text=${encodeURIComponent(msg)}`);
  };

  return (
    <section id="tienda" className="py-12 md:py-20 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER: Ajustado para que no sea gigante */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div className="text-center md:text-left">
             <span className="text-fupagua-azul font-black uppercase tracking-[0.4em] text-[10px]">Autogestión Solidaria</span>
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 uppercase italic leading-[0.9] tracking-tighter mt-2">
               Fupagua <br/><span className="text-fupagua-amarillo">Store</span>
             </h2>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="group relative bg-slate-50 p-2 rounded-[30px] flex items-center gap-4 pr-8 shadow-xl border border-slate-100"
          >
            <div className="bg-slate-900 p-4 rounded-[24px] text-white group-hover:bg-fupagua-azul transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Tu Bolsa</p>
              <p className="text-2xl font-black text-slate-900 leading-none">${total}</p>
            </div>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-fupagua-rojo text-white w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] border-2 border-white">
                {cart.length}
              </span>
            )}
          </motion.button>
        </div>

        {!showFullCatalog ? (
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-100 pb-6 gap-4">
              <h3 className="text-lg md:text-xl font-black uppercase italic text-slate-300 tracking-widest">Colección Destacada</h3>
              <button 
                onClick={() => setShowFullCatalog(true)} 
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center gap-2"
              >
                Ver Todo el Catálogo <LayoutGrid size={16}/>
              </button>
            </div>
            {/* GRID REDUCIDO: 3 columnas en desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {allProducts.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
               <button onClick={() => setShowFullCatalog(false)} className="group flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-fupagua-azul transition-all">
                  <div className="p-2 bg-slate-100 rounded-full group-hover:bg-fupagua-azul group-hover:text-white transition-all"><ChevronRight size={16} className="rotate-180"/></div>
                  Volver
               </button>
               <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map(cat => (
                    <button 
                      key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-fupagua-azul text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            {/* GRID REDUCIDO: 4 columnas pequeñas en catálogo completo */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} compact />)}
            </div>
          </motion.div>
        )}
      </div>

      {/* MODAL CARRITO: Ajustes de tamaño */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[3000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl md:text-2xl font-black uppercase italic text-slate-900">Tu Pedido</h4>
                  <button onClick={() => setIsCartOpen(false)} className="bg-slate-50 p-2 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all"><X size={18}/></button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300">
                    <ShoppingBag size={48} strokeWidth={1}/>
                    <p className="mt-2 font-black uppercase text-[10px] tracking-widest">Vaciío</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center pb-4 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-md" alt={item.name} />
                        <div>
                          <p className="text-[11px] font-black uppercase italic text-slate-900 leading-tight">{item.name}</p>
                          <p className="text-fupagua-azul font-bold text-[10px]">$ {item.price}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-slate-300 hover:text-fupagua-rojo"><Trash2 size={16}/></button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-slate-50 rounded-t-[30px]">
                <div className="flex justify-between items-end mb-6">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Total</p>
                      <p className="text-4xl font-black text-slate-900 leading-none">$ {total}</p>
                   </div>
                   <Receipt size={32} className="text-slate-200" />
                </div>
                <button 
                  onClick={sendToWhatsApp} disabled={cart.length === 0}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-fupagua-azul transition-all disabled:opacity-20"
                >
                  <Send size={16} className="text-fupagua-amarillo" /> Procesar Pedido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Store;