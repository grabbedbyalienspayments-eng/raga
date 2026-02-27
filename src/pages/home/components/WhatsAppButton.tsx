export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/40775134887"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-zinc-900 border border-rose-400/30 rounded-full flex items-center justify-center text-rose-400 hover:scale-110 transition-all duration-200 ease-out cursor-pointer group"
      style={{
        boxShadow: '0 4px 20px rgba(251, 113, 133, 0.15), 0 0 40px rgba(251, 113, 133, 0.1)'
      }}
      aria-label="Contact pe WhatsApp"
    >
      <i className="ri-whatsapp-line text-2xl group-hover:scale-110 transition-transform duration-200 ease-out"></i>
    </a>
  );
}