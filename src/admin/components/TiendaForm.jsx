
import React, { useState, useEffect } from 'react';
import { 
  Plus, Package, DollarSign, Tag, Layers, 
  Image as ImageIcon, Trash2, Save, Sparkles,
  ChevronRight, ArrowUpRight, Loader2, Filter, X
} from 'lucide-react';

// CONEXIÓN FIREBASE - Ruta corregida para src/admin/components/
import { db } from "../../firebase"; 
import { 
  collection, addDoc, serverTimestamp, query, 
  orderBy, onSnapshot, doc, deleteDoc 
} from 'firebase/firestore';

const TiendaForm = () => {
  const [product, setProduct] = useState({
    name: '', price: '', category: 'Indumentaria', stock: '', description: '', tallas: [], isTrending: false,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  
  const [categorias, setCategorias] = useState(["Indumentaria", "Accesorios", "Educativo", "Arte"]);
  const [nuevaCat, setNuevaCat] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);

  const tallasDisponibles = ["Única", "S", "M", "L", "XL", "Kids"];

  useEffect(() => {
    const qProd = query(collection(db, "productos"), orderBy("createdAt", "desc"));
    const unsubProd = onSnapshot(qProd, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setProductsList(docs);
    });

    const qCat = query(collection(db, "categorias"), orderBy("nombre", "asc"));
    const unsubCat = onSnapshot(qCat, (snap) => {
      if (!snap.empty) {
        const catsDB = snap.docs.map(d => d.data().nombre);
        // Mantiene las originales + las nuevas de la DB sin duplicar
        setCategorias(Array.from(new Set(["Indumentaria", "Accesorios", "Educativo", "Arte", ...catsDB])));
      }
    });

    return () => { unsubProd(); unsubCat(); };
  }, []);

  const agregarCategoria = async () => {
    if (!nuevaCat.trim()) return;
    try {
      await addDoc(collection(db, "categorias"), { nombre: nuevaCat.trim() });
      setNuevaCat('');
      setShowAddCat(false);
    } catch (e) { alert("Error"); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setPreviewImage(URL.createObjectURL(file)); }
  };

  const handleSave = async () => {
    if (!product.name || !product.price || !imageFile || !product.stock) {
      alert("Faltan datos obligatorios"); return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'fupagua_preset'); 
      const res = await fetch(`https://api.cloudinary.com/v1_1/dras8fqbc/upload`, { method: 'POST', body: formData });
      const data = await res.json();

      await addDoc(collection(db, "productos"), {
        ...product, image: data.secure_url, price: parseFloat(product.price),
        stock: parseInt(product.stock), createdAt: serverTimestamp()
      });
      setProduct({ name: '', price: '', category: 'Indumentaria', stock: '', description: '', tallas: [], isTrending: false });
      setPreviewImage(null);
    } catch (error) { alert("Error al subir"); } finally { setIsSaving(false); }
  };

  const productosFiltrados = filtroCategoria === 'Todas' ? productsList : productsList.filter(p => p.category === filtroCategoria);

  return (
    <div className="space-y-20">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-in fade-in duration-1000">
        
        {/* LADO IZQUIERDO: FORMULARIO ORIGINAL */}
        <div className="xl:col-span-7 space-y-8">
          <div className="bg-white rounded-[50px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-50 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center text-fupagua-amarillo shadow-2xl rotate-3">
                    <Package size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Inventario</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Gestión de Stock</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block ml-4">Nombre del Producto</label>
                  <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent focus:border-fupagua-azul/20 focus:bg-white p-6 rounded-[30px] text-xl font-bold text-slate-800 outline-none transition-all shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block ml-4">Precio ($)</label>
                    <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="w-full bg-slate-50 p-6 rounded-[30px] font-black text-2xl outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block ml-4">Stock</label>
                    <input type="number" value={product.stock} onChange={(e) => setProduct({...product, stock: e.target.value})} className="w-full bg-slate-50 p-6 rounded-[30px] font-black text-2xl outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLASIFICACIÓN ORIGINAL */}
          <div className="bg-slate-900 rounded-[50px] p-10 shadow-2xl relative overflow-hidden border-t-4 border-fupagua-azul">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2"><Sparkles className="text-fupagua-azul" size={18} /> Clasificación</h3>
                   <button onClick={() => setShowAddCat(!showAddCat)} className="text-[9px] font-black text-fupagua-azul uppercase">{showAddCat ? '[ Cerrar ]' : '[ + Nueva ]'}</button>
                </div>

                {showAddCat && (
                  <div className="mb-6 flex gap-2">
                    <input type="text" value={nuevaCat} onChange={(e) => setNuevaCat(e.target.value)} className="flex-1 bg-white/10 p-3 rounded-xl text-white text-xs" />
                    <button onClick={agregarCategoria} className="bg-fupagua-azul text-white p-3 rounded-xl"><Plus size={16} /></button>
                  </div>
                )}

                <select value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 p-6 rounded-[25px] text-white font-bold outline-none appearance-none cursor-pointer">
                  {categorias.map(cat => <option key={`cat-opt-${cat}`} value={cat} className="text-slate-900">{cat}</option>)}
                </select>
              </div>

              <div>
                <h3 className="text-white font-black uppercase italic tracking-widest text-sm mb-6 flex items-center gap-2"><Tag className="text-fupagua-amarillo" size={18} /> Tallas</h3>
                <div className="grid grid-cols-3 gap-3">
                  {tallasDisponibles.map(t => (
                    <button key={`talla-btn-${t}`} onClick={() => setProduct(prev => ({...prev, tallas: prev.tallas.includes(t) ? prev.tallas.filter(x => x !== t) : [...prev.tallas, t]}))} className={`py-4 rounded-2xl font-black text-[10px] uppercase transition-all ${product.tallas.includes(t) ? 'bg-fupagua-amarillo text-slate-900' : 'bg-white/5 text-white/40'}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: PREVIEW ORIGINAL */}
        <div className="xl:col-span-5 relative">
          <div className="sticky top-10">
            <div className="bg-white rounded-[60px] p-5 shadow-2xl border border-slate-100">
              <div className="relative aspect-square rounded-[45px] overflow-hidden bg-slate-50 group">
                {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-200 uppercase font-black text-[10px]">Subir Imagen</div>}
                <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                   <div className="bg-fupagua-amarillo text-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">+ Cargar Foto</div>
                   <input type="file" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              <div className="px-6 py-8">
                <p className="text-[10px] font-black text-fupagua-azul uppercase mb-1">{product.category}</p>
                <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{product.name || "Sin nombre"}</h4>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">${product.price || "0"}</span>
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-black text-[10px] uppercase tracking-widest mt-8 flex items-center justify-center gap-3">
              {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Publicar Producto
            </button>
          </div>
        </div>
      </div>

      {/* STOCK ORIGINAL CON KEYS CORREGIDAS */}
      <div className="pt-20 border-t-2 border-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Control de <span className="text-fupagua-azul">Stock</span></h3>
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-2 rounded-[25px]">
            {['Todas', ...categorias].map((cat, i) => (
              <button key={`filtro-${cat}-${i}`} onClick={() => setFiltroCategoria(cat)} className={`px-4 py-2 rounded-[20px] text-[10px] font-black uppercase transition-all ${filtroCategoria === cat ? 'bg-white text-fupagua-azul shadow-sm' : 'text-slate-400'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productosFiltrados.map((item) => (
            <div key={`prod-${item.id}`} className="group bg-white rounded-[40px] border border-slate-100 p-5 hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-square rounded-[30px] overflow-hidden bg-slate-50 mb-6">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <button onClick={async () => { if(confirm("¿Eliminar?")) await deleteDoc(doc(db, "productos", item.id)) }} className="absolute bottom-4 right-4 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
              </div>
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-black text-slate-800 uppercase italic">{item.name}</h4>
                <span className="font-black text-fupagua-azul text-sm">${item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiendaForm;