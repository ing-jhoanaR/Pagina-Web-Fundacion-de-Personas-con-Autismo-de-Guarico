import React from 'react';
import { motion } from 'framer-motion';
/* Usamos los nombres actualizados que no marcan error en las nuevas versiones de Lucide */
import { 
  Instagram as InstaIcon, 
  Facebook as FbIcon, 
  MessageCircle 
} from 'lucide-react';

const SocialFloat = () => {
  const socialLinks = [
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle size={24} />, 
      color: 'bg-[#25D366]', 
      url: 'https://wa.me/584243390902' 
    },
    { 
      name: 'Instagram', 
      icon: <InstaIcon size={24} />, 
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', 
      url: 'https://instagram.com/fupagua' 
    },
    { 
      name: 'Facebook', 
      icon: <FbIcon size={24} />, 
      color: 'bg-[#1877F2]', 
      url: 'https://facebook.com/fupagua' 
    }
  ];

  return (
    /* Contenedor estático y flotante */
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`${social.color} text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative border-2 border-white/20`}
        >
          {/* Tooltip elegante */}
          <span className="absolute right-16 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
            {social.name}
          </span>
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialFloat;