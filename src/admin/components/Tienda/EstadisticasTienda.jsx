

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, Award, Target 
} from 'lucide-react';

const EstadisticasTienda = ({ resumido = false }) => {
  // Datos simulados basados en tus productos reales
  const dataVentas = [
    { name: 'Ene', ventas: 400 }, { name: 'Feb', ventas: 700 },
    { name: 'Mar', ventas: 1200 }, { name: 'Abr', ventas: 900 },
  ];

  const dataCategorias = [
    { name: 'Indumentaria', value: 45 },
    { name: 'Accesorios', value: 30 },
    { name: 'Educativo', value: 15 },
    { name: 'Arte', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#fbbf24', '#10b981', '#6366f1'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. TARJETAS DE IMPACTO RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Totales" value="$2,450" trend="+12%" up icon={<DollarSign />} color="text-green-500" />
        <StatCard title="Productos Vendidos" value="158" trend="+5%" up icon={<ShoppingBag />} color="text-fupagua-azul" />
        <StatCard title="Nuevos Clientes" value="42" trend="-2%" icon={<Users />} color="text-purple-500" />
        <StatCard title="Tasa de Conversión" value="3.8%" trend="+0.4%" up icon={<Target />} color="text-fupagua-amarillo" />
      </div>

      {/* 2. GRÁFICOS PRINCIPALES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GRÁFICO DE VENTAS MENSUALES */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-2">
                <TrendingUp className="text-fupagua-azul" /> Rendimiento Mensual
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ingresos brutos por ventas en tienda</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase p-2 outline-none">
              <option>Año 2026</option>
              <option>Año 2025</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVentas}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}} />
                <Area type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO DE CATEGORÍAS (PIE) */}
        <div className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-white font-black uppercase italic tracking-widest text-sm mb-8">Top Categorías</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataCategorias} innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value">
                  {dataCategorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white text-2xl font-black italic">+28</span>
                <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Años</span>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            {dataCategorias.map((cat, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-white/60">{cat.name}</span>
                </div>
                <span className="text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// COMPONENTE AUXILIAR PARA LAS TARJETAS
const StatCard = ({ title, value, trend, up, icon, color }) => (
  <div className="bg-white p-6 rounded-[35px] border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black ${up ? 'text-green-500' : 'text-red-400'}`}>
        {trend} {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    <h4 className="text-2xl font-black text-slate-900 mt-1">{value}</h4>
  </div>
);

export default EstadisticasTienda;