"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ forceShow = false }: { forceShow?: boolean }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  // Если мы в админке, показываем футер только если это явно запрошено (forceShow)
  // Это нужно, чтобы футер в админке рендерился только внутри AdminLayoutWrapper
  if (isAdminPage && !forceShow) {
    return null;
  }

  return (
    <footer className={`bg-black text-neutral-400 py-20 ${forceShow ? 'px-6 lg:px-12' : 'px-6'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6">
          <h3 className="text-white text-2xl font-black uppercase tracking-tighter">BIG STEPPERS CLUB</h3>
          <p className="text-sm max-w-xs">Бренд, объединяющий людей, для которых каждый шаг наполнен особым смыслом.</p>
          <p className="text-xs">© {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold uppercase tracking-widest text-xs">Информация</span>
            <Link href="/delivery" className="hover:text-white transition-colors">Доставка</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Возврат</Link>
            <Link href="/size-guide" className="hover:text-white transition-colors">Таблица размеров</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold uppercase tracking-widest text-xs">Контакты</span>
            <a href="mailto:info@bigsteppers.club" className="hover:text-white transition-colors">info@bigsteppers.club</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold uppercase tracking-widest text-xs">Соцсети</span>
            <a href="https://t.me/bigsteppersclub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
