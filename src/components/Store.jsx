
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, X, Trash2, Receipt, 
  ChevronRight, Send, LayoutGrid 
} from 'lucide-react';

// 1. DATA ESTRUCTURADA
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

// SUB-COMPONENTE TARJETA (Totalmente Responsivo)
const ProductCard = ({ product, onAdd, compact }) => (
  <div className="group bg-white rounded-[30px] md:rounded-[60px] p-3 md:p-5 border border-slate-100 hover:shadow-xl transition-all duration-500">
    <div className={`relative w-full overflow-hidden rounded-[25px] md:rounded-[45px] mb-4 md:mb-8 shadow-inner 
      ${compact ? 'aspect-square' : 'aspect-[4/5] md:h-[450px]'}`}>
      
      <img 
        src={product.image} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        alt={product.name} 
      />
      
      <div className="absolute inset-0 bg-slate-900/20 md:bg-slate-900/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-end md:items-center justify-center p-4 md:p-10">
         <button 
           onClick={() => onAdd(product)} 
           className="w-full bg-white/90 backdrop-blur-sm text-slate-900 py-3 md:py-6 rounded-xl md:rounded-[25px] font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-2xl active:scale-95 transition-transform"
         >
           + Agregar
         </button>
      </div>
      
      <span className="absolute top-3 left-3 md:top-8 md:left-8 bg-white/90 backdrop-blur px-3 py-1 md:px-6 md:py-2 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-widest shadow-sm">
        {product.category}
      </span>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-2 gap-1">
      <div className="space-y-0.5">
        <h4 className="text-sm md:text-2xl font-black uppercase italic text-slate-900 leading-tight">
          {product.name}
        </h4>
        <p className="hidden md:block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          Colección Fupagua 2026
        </p>
      </div>
      <span className="text-lg md:text-3xl font-black text-fupagua-azul">
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
    <section id="tienda" className="py-16 md:py-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        
        {/* HEADER MONUMENTAL RESPONSIVO */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="text-center md:text-left">
             <span className="text-fupagua-azul font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Autogestión Solidaria</span>
             <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-slate-900 uppercase italic leading-[0.8] tracking-tighter mt-4">
               Fupagua <br/><span className="text-fupagua-amarillo">Store</span>
             </h2>
          </div>

          {/* BOTÓN CARRITO REFORMADO PARA MÓVIL */}
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="group relative bg-slate-50 p-2 md:p-3 rounded-[35px] md:rounded-[45px] flex items-center gap-3 md:gap-6 md:pr-12 shadow-2xl border border-slate-100"
          >
            <div className="bg-slate-900 p-4 md:p-7 rounded-[28px] md:rounded-[38px] text-white group-hover:bg-fupagua-azul transition-colors">
              <ShoppingBag className="w-6 h-6 md:w-[35px] md:h-[35px]" />
            </div>
            <div className="text-left">
              <p className="hidden md:block text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Tu Bolsa</p>
              <p className="text-xl md:text-4xl font-black text-slate-900 leading-none">${total}</p>
            </div>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-fupagua-rojo text-white w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-[10px] md:text-sm border-2 md:border-4 border-white animate-bounce">
                {cart.length}
              </span>
            )}
          </motion.button>
        </div>

        {/* NAVEGACIÓN Y VISTAS */}
        {!showFullCatalog ? (
          <div className="space-y-12 md:space-y-16">
            {/* ENCABEZADO DESTACADO RESPONSIVO */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b-2 border-slate-50 pb-6 md:pb-8 gap-4">
              <h3 className="text-xl md:text-2xl font-black uppercase italic text-slate-300">Colección Destacada</h3>
              <button 
                onClick={() => setShowFullCatalog(true)} 
                className="w-full sm:w-auto bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[20px] font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-fupagua-azul transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Ver Catálogo Completo <LayoutGrid size={18}/>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
              {allProducts.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 md:space-y-16">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
               <button onClick={() => setShowFullCatalog(false)} className="group flex items-center gap-4 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-fupagua-azul transition-all">
                  <div className="p-3 md:p-4 bg-slate-100 rounded-full group-hover:bg-fupagua-azul group-hover:text-white transition-all"><ChevronRight size={18} className="rotate-180"/></div>
                  Volver al Inicio
               </button>
               <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {categories.map(cat => (
                    <button 
                      key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-fupagua-azul text-white shadow-xl scale-105 md:scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} compact />)}
            </div>
          </motion.div>
        )}
      </div>

      {/* MODAL FACTURA RESPONSIVO */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[3000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full sm:max-w-lg bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 md:p-12 border-b-2 border-dashed border-slate-100">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h4 className="text-2xl md:text-4xl font-black uppercase italic text-slate-900">Tu Pedido</h4>
                  <button onClick={() => setIsCartOpen(false)} className="bg-slate-50 p-3 md:p-4 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all"><X size={20}/></button>
                </div>
                <div className="bg-fupagua-azul/5 p-4 md:p-6 rounded-[20px] md:rounded-[25px] border border-fupagua-azul/10">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-fupagua-azul">Resumen de Facturación</p>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-6 md:space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-200 text-center">
                    <ShoppingBag size={80} strokeWidth={1}/>
                    <p className="mt-4 font-black uppercase text-[10px] tracking-widest">Bolsa Vacía</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center border-b border-slate-50 pb-4 md:pb-6">
                      <div className="flex items-center gap-4 md:gap-6">
                        <img src={item.image} className="w-14 h-14 md:w-20 md:h-20 rounded-[15px] md:rounded-[25px] object-cover shadow-lg" alt={item.name} />
                        <div>
                          <p className="text-xs md:text-sm font-black uppercase italic text-slate-900 leading-tight">{item.name}</p>
                          <p className="text-fupagua-azul font-bold text-[10px] md:text-xs">$ {item.price}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-slate-300 hover:text-fupagua-rojo transition-all"><Trash2 size={18}/></button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 md:p-12 bg-slate-50 rounded-t-[40px] md:rounded-t-[60px]">
                <div className="flex justify-between items-end mb-8 md:mb-10">
                   <div>
                      <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Total Estimado</p>
                      <p className="text-4xl md:text-6xl font-black text-slate-900 leading-none">$ {total}</p>
                   </div>
                   <Receipt size={40} className="hidden sm:block text-slate-200" />
                </div>
                <button 
                  onClick={sendToWhatsApp} disabled={cart.length === 0}
                  className="w-full bg-slate-900 text-white py-5 md:py-7 rounded-2xl md:rounded-[30px] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 hover:bg-fupagua-azul transition-all shadow-2xl disabled:opacity-20"
                >
                  <Send size={18} className="text-fupagua-amarillo" /> Procesar Pedido
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