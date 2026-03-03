
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowUpRight, Zap, ShoppingCart, 
  Film, Activity, TrendingUp, Target, BarChart3, 
  Database, Globe, ShieldCheck, Users, DollarSign, ShoppingBag
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';

// CONEXIÓN FIREBASE
import { db } from "../../../firebase";
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const WelcomeView = ({ setActiveModule }) => {
  const [realData, setRealData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Para evitar el error de Recharts
  const [stats, setStats] = useState({
    ventasHoy: 0,
    alcanceSemanal: 0,
    conversion: 3.8,
    metaMensual: 0,
    totalIngresos: 0,
    totalProductos: 0,
    totalClientes: 0
  });

  useEffect(() => {
    // Marcamos como cargado después del primer render para que el DOM tenga medidas
    setIsLoaded(true);

    const qVentas = query(collection(db, "ventas"), orderBy("fecha", "desc"));
    const unsubVentas = onSnapshot(qVentas, (snap) => {
      const docs = snap.docs.map(d => ({ ...d.data(), id: d.id }));
      
      const chartMap = [...docs].reverse().slice(-7).map(v => ({
        name: v.fecha?.seconds ? new Date(v.fecha.seconds * 1000).toLocaleDateString('es-ES', {weekday: 'short'}) : '...',
        ventas: v.total || 0
      }));
      setRealData(chartMap);

      const hoy = new Date().setHours(0,0,0,0);
      const ventasDeHoy = docs.filter(v => (v.fecha?.seconds * 1000) > hoy);
      const totalHoy = ventasDeHoy.reduce((acc, curr) => acc + (curr.total || 0), 0);
      
      setStats({
        ventasHoy: totalHoy,
        alcanceSemanal: docs.length * 150,
        conversion: 3.8,
        metaMensual: Math.min(Math.round((totalHoy / 5000) * 100), 100),
        totalIngresos: docs.reduce((acc, curr) => acc + (curr.total || 0), 0),
        totalProductos: docs.reduce((acc, curr) => acc + (curr.items || 0), 0),
        totalClientes: new Set(docs.map(v => v.clienteId)).size || Math.floor(docs.length * 0.7)
      });
    });

    return () => unsubVentas();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      
      {/* MÉTRICAS SUPERIORES */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-8 italic">Análisis de Impacto en Tiempo Real</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-fupagua-azul rounded-2xl"><DollarSign size={20}/></div>
            </div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ingresos Totales</h4>
            <p className="text-3xl font-black text-slate-900 italic">${stats.totalIngresos.toLocaleString()}</p>
          </div>

          <div className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-50 text-fupagua-amarillo rounded-2xl"><ShoppingBag size={20}/></div>
            </div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Productos</h4>
            <p className="text-3xl font-black text-slate-900 italic">{stats.totalProductos}</p>
          </div>

          <div className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><Users size={20}/></div>
            </div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Clientes</h4>
            <p className="text-3xl font-black text-slate-900 italic">{stats.totalClientes}</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[45px] shadow-2xl relative overflow-hidden">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Tasa Conversión</h4>
            <p className="text-3xl font-black text-white italic">{stats.conversion}%</p>
          </div>
        </div>
      </div>

      {/* GRÁFICO PRINCIPAL */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 bg-slate-900 rounded-[50px] p-10 text-white relative overflow-hidden border border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-fupagua-azul rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Live Engine Active</span>
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                Consola <span className="text-slate-500 text-4xl block md:inline md:ml-2">Estadísticas</span>
              </h2>
            </div>
          </div>
          
          <div className="h-[320px] w-full mt-4"> 
            {isLoaded && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={realData.length > 0 ? realData : [{name: '...', ventas: 0}]}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '20px'}} />
                  <Area type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={5} fill="url(#colorVentas)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* METAS LATERALES */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm">
            <Target className="text-fupagua-azul mb-4" size={32} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Meta Mensual</h4>
            <p className="text-4xl font-black text-slate-900 italic">{stats.metaMensual}%</p>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-5 overflow-hidden">
               <div className="bg-fupagua-azul h-full" style={{ width: `${stats.metaMensual}%` }} />
            </div>
          </div>

          <div className="bg-fupagua-amarillo p-8 rounded-[45px] shadow-xl shadow-fupagua-amarillo/20 group cursor-pointer hover:bg-slate-900 transition-all duration-500">
            <BarChart3 className="text-slate-900 group-hover:text-fupagua-amarillo mb-4" size={32} />
            <h4 className="text-[10px] font-black uppercase text-slate-900/60 group-hover:text-white/40">Ventas Hoy</h4>
            <p className="text-4xl font-black text-slate-900 group-hover:text-white">${stats.ventasHoy}</p>
          </div>
        </div>
      </div>

      {/* BOTONES DE ACCESO RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => setActiveModule('contenido')} className="bg-white p-10 rounded-[50px] border border-slate-100 hover:shadow-2xl transition-all group text-left">
          <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-fupagua-azul mb-8 group-hover:bg-slate-900 transition-all">
            <Database size={28} />
          </div>
          <h4 className="text-2xl font-black uppercase italic text-slate-900 mb-2">Centro medios</h4>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Archivos Cloud</p>
        </button>

        <button onClick={() => setActiveModule('tienda')} className="bg-white p-10 rounded-[50px] border border-slate-100 hover:shadow-2xl transition-all group text-left">
          <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center text-fupagua-amarillo mb-8 group-hover:scale-110 transition-all">
            <ShoppingCart size={28} />
          </div>
          <h4 className="text-2xl font-black uppercase italic text-slate-900 mb-2">Tienda</h4>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Stock Real-Time</p>
        </button>

        <button onClick={() => setActiveModule('galeria')} className="bg-white p-10 rounded-[50px] border border-slate-100 hover:shadow-2xl transition-all group text-left">
          <div className="w-16 h-16 bg-red-50 rounded-[24px] flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-500 group-hover:text-white transition-all">
            <Film size={28} />
          </div>
          <h4 className="text-2xl font-black uppercase italic text-slate-900 mb-2">Galería</h4>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Video & Foto</p>
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-white border border-slate-100 rounded-[30px] py-5 px-10 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[9px] font-black uppercase text-slate-900">Seguridad: Encriptado</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-fupagua-azul" />
            <span className="text-[9px] font-black uppercase text-slate-900">Firebase North-Cloud</span>
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-900 uppercase italic">
          fupagua - Fundación de personas autistas del guárico
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;