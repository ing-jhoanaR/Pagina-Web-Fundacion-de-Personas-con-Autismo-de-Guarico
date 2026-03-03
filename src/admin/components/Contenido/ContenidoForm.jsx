
import React, { useState, useEffect } from 'react';
import {
  Plus, LayoutGrid, Trash2, Send, CheckCircle2,
  Smartphone, Youtube, Link as LinkIcon, ExternalLink,
  ArrowUpRight, CloudUpload, Loader2, FileVideo, FileText,
  Filter, Calendar, Play, Users
} from 'lucide-react';

// FIREBASE IMPORTS
import { db, storage } from "../../../firebase";
import { collection, addDoc, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ContenidoForm = () => {
  const [links, setLinks] = useState([{ type: 'YouTube', url: '' }]);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [previewData, setPreviewData] = useState({
    title: '',
    category: 'Noticias',
    userType: 'padres', // NUEVO CAMPO: Público objetivo
    description: ''
  });

  const [publicaciones, setPublicaciones] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todas');
  
  const categorias = ['Todas', 'Noticias', 'Talleres Educativos', 'Blogs', 'Cursos'];
  const userTypes = [
    { id: 'padres', label: 'Padres y Familias' },
    { id: 'especialistas', label: 'Especialistas' },
    { id: 'comunidad', label: 'Comunidad / PCD' }
  ];

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const q = query(collection(db, "publicaciones"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPublicaciones(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      console.error("Error en Firebase Snapshot:", error);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const addLinkField = () => setLinks([...links, { type: 'YouTube', url: '' }]);
  
  const updateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!previewData.title) return alert("Por favor, ingresa al menos un título.");
    setIsSaving(true);
    let fileUrl = "";
    let fileType = "";

    try {
      if (file) {
        const storageRef = ref(storage, `contenidos/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (s) => setUploadProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
            (e) => reject(e),
            async () => {
              fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
              fileType = file.type;
              resolve();
            }
          );
        });
      }

      await addDoc(collection(db, "publicaciones"), {
        ...previewData,
        links: links.filter(l => l.url !== ""),
        mediaUrl: fileUrl,
        mediaType: fileType,
        createdAt: new Date(),
      });

      setPreviewData({ title: '', category: 'Noticias', userType: 'padres', description: '' });
      setLinks([{ type: 'YouTube', url: '' }]);
      setFile(null);
      setUploadProgress(0);
      alert("¡Publicado con éxito!");

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error crítico al subir el contenido.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      try {
        await deleteDoc(doc(db, "publicaciones", id));
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const filteredItems = activeFilter === 'Todas'
    ? publicaciones
    : publicaciones.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-16 p-4 md:p-10 animate-in fade-in duration-700 bg-slate-50/30 min-h-screen font-sans">
      
      {/* EDITOR DE CONTENIDO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-7 space-y-8">
          <div className="bg-white rounded-[50px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-16 h-16 bg-blue-600 rounded-[22px] flex items-center justify-center text-white shadow-lg rotate-3 hover:rotate-0 transition-transform cursor-default">
                <LayoutGrid size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Editor Maestro</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Gestión Fupagua | +28 Años</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-4">Título del Artículo</label>
                  <input type="text" value={previewData.title} onChange={(e) => setPreviewData({...previewData, title: e.target.value})} placeholder="Ej: Nueva Jornada" className="w-full bg-slate-50 p-5 rounded-[25px] font-bold text-slate-800 outline-none focus:ring-4 ring-blue-50 transition-all text-sm" />
                </div>
                
                {/* SELECTOR CATEGORÍA */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-4">Contenido</label>
                  <select value={previewData.category} onChange={(e) => setPreviewData({...previewData, category: e.target.value})} className="w-full bg-slate-50 p-5 rounded-[25px] font-black text-[10px] uppercase text-slate-600 outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                    {categorias.filter(c => c !== 'Todas').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* SELECTOR USERTYPE (PÚBLICO) */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3 block ml-4">Dirigido a:</label>
                  <select value={previewData.userType} onChange={(e) => setPreviewData({...previewData, userType: e.target.value})} className="w-full bg-blue-50 p-5 rounded-[25px] font-black text-[10px] uppercase text-blue-700 outline-none appearance-none cursor-pointer hover:bg-blue-100 transition-colors">
                    {userTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-4">Cuerpo del Contenido</label>
                <textarea rows="4" value={previewData.description} onChange={(e) => setPreviewData({...previewData, description: e.target.value})} className="w-full bg-slate-50 p-6 rounded-[30px] font-medium text-slate-700 outline-none resize-none focus:ring-4 ring-blue-50 transition-all" placeholder="Describe la noticia o curso aquí..."></textarea>
              </div>

              {/* UPLOAD FILE */}
              <div className="bg-slate-50 p-10 rounded-[40px] border-2 border-dashed border-slate-200 text-center hover:border-blue-400 transition-colors group">
                <label className="cursor-pointer block">
                  {isSaving ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="animate-spin mx-auto text-blue-600 mb-2" size={30} />
                      <span className="text-xs font-black text-blue-600">{uploadProgress}%</span>
                    </div>
                  ) : (
                    <>
                      <CloudUpload size={40} className="mx-auto text-slate-300 mb-3 group-hover:text-blue-500 transition-colors" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter block">{file ? file.name : "Click para subir video o imagen"}</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} disabled={isSaving} />
                </label>
              </div>

              {/* LINKS */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center ml-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Enlaces Adicionales</label>
                    <button onClick={addLinkField} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Plus size={16}/></button>
                 </div>
                 {links.map((link, index) => (
                  <div key={index} className="flex gap-3 animate-in slide-in-from-left-2">
                    <select value={link.type} onChange={(e) => updateLink(index, 'type', e.target.value)} className="bg-slate-900 text-white text-[10px] font-black px-4 rounded-2xl outline-none">
                      <option>YouTube</option>
                      <option>Sitio Web</option>
                    </select>
                    <input type="url" value={link.url} onChange={(e) => updateLink(index, 'url', e.target.value)} placeholder="https://youtube.com/..." className="flex-1 bg-slate-50 p-4 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:ring-2 ring-blue-100" />
                    <button onClick={() => removeLink(index)} className="p-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* VISTA PREVIA */}
        <div className="xl:col-span-5 relative">
          <div className="sticky top-10 space-y-6">
            <div className="bg-slate-900 rounded-[60px] p-8 shadow-2xl border-b-[12px] border-blue-600">
              <div className="bg-white rounded-[45px] p-6 space-y-5">
                <div className="aspect-video bg-slate-100 rounded-[30px] flex items-center justify-center overflow-hidden relative shadow-inner">
                  {file ? (
                    file.type.includes('video') ? (
                      <div className="flex flex-col items-center text-slate-400">
                        <Play size={50} fill="currentColor" />
                        <span className="text-[8px] font-black mt-2 uppercase tracking-widest">Video Preparado</span>
                      </div>
                    ) : (
                      <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    )
                  ) : links[0]?.url && getYouTubeID(links[0].url) ? (
                    <iframe 
                      className="w-full h-full pointer-events-none"
                      src={`https://www.youtube.com/embed/${getYouTubeID(links[0].url)}?controls=0&mute=1&autoplay=1&loop=1`}
                      title="YouTube preview"
                      frameBorder="0"
                    />
                  ) : <FileText size={50} className="text-slate-200" />}
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase rounded-full">{previewData.category}</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded-full">Destino: {previewData.userType}</span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter">{previewData.title || "Tu Título Aquí"}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{previewData.description || "Resumen..."}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-blue-600 text-white py-7 rounded-[35px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center justify-center gap-4 disabled:opacity-50 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Send size={24} />}
              {isSaving ? "Subiendo..." : "Lanzar Publicación"}
            </button>
          </div>
        </div>
      </div>

      {/* HISTORIAL */}
      <div className="space-y-10 border-t border-slate-200 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Ecosistema de <span className="text-blue-600">Recursos</span></h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2">Filtro por tipo de contenido</p>
          </div>
          <div className="flex bg-white p-2 rounded-[25px] border border-slate-200 shadow-sm gap-1 overflow-x-auto max-w-full no-scrollbar">
            {categorias.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-3 rounded-[20px] text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeFilter === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredItems.map((item) => {
            const ytLink = item.links?.find(l => l.type === 'YouTube')?.url;
            const ytID = ytLink ? getYouTubeID(ytLink) : null;

            return (
              <div key={item.id} className="bg-white rounded-[50px] p-5 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="relative h-60 rounded-[40px] overflow-hidden bg-slate-100 mb-6 shadow-inner">
                  {ytID ? (
                    <iframe className="w-full h-full scale-125 pointer-events-none" src={`https://www.youtube.com/embed/${ytID}?controls=0&mute=1&autoplay=0&loop=1&playlist=${ytID}`} title="YouTube preview" frameBorder="0" loading="lazy" />
                  ) : item.mediaType?.includes('video') ? (
                    <video src={item.mediaUrl} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={item.mediaUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"} className="w-full h-full object-cover" alt={item.title} />
                  )}
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase text-blue-600 shadow-sm">{item.category}</span>
                    <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase text-white shadow-sm flex items-center gap-1"><Users size={8}/> {item.userType}</span>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <h4 className="text-xl font-black text-slate-900 uppercase italic leading-tight mb-3 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center pt-5 border-t border-slate-50">
                    <button onClick={() => deleteItem(item.id)} className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Trash2 size={16}/>
                    </button>
                    <span className="text-[10px] font-black text-slate-300 uppercase italic">ID: {item.id.slice(0,5)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContenidoForm;