

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, Plus, X, Maximize2, 
  CheckCircle2, CloudUpload, Info, Video, 
  Film, AlertCircle, Loader2, Trash2, ExternalLink
} from 'lucide-react';

import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const GaleriaForm = () => {
  // ESTADOS DEL FORMULARIO
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');

  // ESTADOS DE LA LISTA DE GESTIÓN
  const [publicaciones, setPublicaciones] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 1. CARGAR PUBLICACIONES EXISTENTES (TIEMPO REAL)
  useEffect(() => {
    const q = query(collection(db, "galeria"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setPublicaciones(docs);
      setLoadingList(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMediaChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => {
        if (file.size > 40 * 1024 * 1024) {
          alert(`El archivo ${file.name} supera los 40MB permitidos.`);
          return null;
        }

        return {
          file: file,
          url: URL.createObjectURL(file),
          type: file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name
        };
      }).filter(file => file !== null);

      setSelectedMedia((prev) => prev.concat(filesArray));
    }
  };

  const removeMedia = (index) => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  const handlePublicar = async () => {
    if (selectedMedia.length === 0) return alert("Selecciona al menos un archivo");
    if (!albumTitle) return alert("Por favor, ponle un título al álbum");

    setIsUploading(true);

    try {
      const uploadPromises = selectedMedia.map(async (item) => {
        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('upload_preset', 'fupagua_preset'); 

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dras8fqbc/upload`, 
          { method: 'POST', body: formData }
        );
        
        const data = await res.json();
        return {
          url: data.secure_url,
          type: item.type,
          public_id: data.public_id
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      await addDoc(collection(db, "galeria"), {
        titulo: albumTitle,
        archivos: uploadedFiles,
        createdAt: serverTimestamp(),
        legacyYear: 28 
      });

      alert("¡Publicado con éxito!");
      setSelectedMedia([]);
      setAlbumTitle('');
      
    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Error de conexión.");
    } finally {
      setIsUploading(false);
    }
  };

  // FUNCIÓN PARA ELIMINAR
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este álbum de la galería?")) {
      setDeletingId(id);
      try {
        await deleteDoc(doc(db, "galeria", id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-20">
      
      {/* SECCIÓN 1: FORMULARIO DE SUBIDA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-2">Gestor de Medios</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Subida de Imágenes y Reels</p>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fupagua-azul mb-3 block ml-2">Título del Álbum</label>
                <input 
                  type="text" 
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="Ej: Jornada de Equinoterapia" 
                  className="w-full bg-slate-50 p-5 rounded-[20px] border-none outline-none font-bold text-slate-700 focus:ring-2 ring-fupagua-azul/20 transition-all" 
                />
              </div>

              <div className="relative group">
                <input 
                  type="file" multiple accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  disabled={isUploading}
                />
                <div className="border-2 border-dashed border-slate-200 rounded-[30px] p-12 flex flex-col items-center justify-center gap-4 bg-slate-50 group-hover:bg-white group-hover:border-fupagua-azul transition-all duration-500">
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-fupagua-azul transition-all">
                      <ImageIcon size={24} />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-fupagua-rojo transition-all">
                      <Film size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase text-slate-900">Cargar Multimedia</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Máx. 40MB</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-[30px] space-y-4">
                <button 
                  onClick={handlePublicar}
                  disabled={isUploading}
                  className={`w-full ${isUploading ? 'bg-slate-700' : 'bg-fupagua-azul'} text-white py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-fupagua-azul/20`}
                >
                  {isUploading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  {isUploading ? "Subiendo..." : "Publicar Ahora"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-6 px-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Previsualización</h3>
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest">
              {selectedMedia.length} Archivos
            </span>
          </div>
          {selectedMedia.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedMedia.map((item, index) => (
                <div key={index} className="group relative aspect-square rounded-[30px] overflow-hidden bg-slate-100 border border-slate-100 animate-in zoom-in duration-300">
                  {item.type === 'image' ? (
                    <img src={item.url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  )}
                  <button onClick={() => removeMedia(index)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[400px] bg-white border-2 border-dashed border-slate-100 rounded-[50px] flex flex-col items-center justify-center text-slate-200">
              <Film size={40} strokeWidth={1} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">Sin archivos seleccionados</p>
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN 2: LISTA DE GESTIÓN (LO QUE YA ESTÁ EN LA NUBE) */}
      <div className="pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Álbumes en <span className="text-fupagua-verde">Vivo</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestiona el contenido de la Galería Principal</p>
          </div>
          <span className="bg-fupagua-verde/10 text-fupagua-verde px-4 py-2 rounded-2xl text-[10px] font-black uppercase italic">
            {publicaciones.length} Publicaciones totales
          </span>
        </div>

        {loadingList ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {publicaciones.map((pub) => (
              <div key={pub.id} className="group bg-white rounded-[35px] border border-slate-100 p-4 hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-video rounded-[25px] overflow-hidden bg-slate-900 mb-4">
                  {pub.archivos?.[0]?.type === 'video' ? (
                    <video src={pub.archivos[0].url} className="w-full h-full object-cover opacity-60" muted />
                  ) : (
                    <img src={pub.archivos?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  )}
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] text-white font-black uppercase">
                    {pub.archivos?.length} items
                  </div>
                </div>
                
                <h4 className="text-xs font-black text-slate-800 uppercase italic mb-4 line-clamp-1 px-2">{pub.titulo}</h4>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(pub.id)}
                    disabled={deletingId === pub.id}
                    className="flex-grow flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    {deletingId === pub.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    Eliminar
                  </button>
                  <a href={pub.archivos?.[0]?.url} target="_blank" rel="noreferrer" className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-fupagua-azul hover:text-white transition-all">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaForm;