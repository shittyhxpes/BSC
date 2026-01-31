import Link from "next/link";
import { CheckCircle2, Package, Truck, Mail, ChevronLeft } from "lucide-react";

export default function SuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="mb-8 md:mb-12 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>
        <div className="text-center space-y-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Заказ принят!
          </h1>
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
            Номер вашего заказа: #{params.id}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Подтверждение</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
              Мы отправили детали заказа на ваш email
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Сборка</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
              Обычно занимает от 1 до 3 рабочих дней
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mx-auto">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Доставка</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
              Трек-номер придет в отдельном письме
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900">
          <Link
            href="/"
            className="inline-block px-12 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all"
          >
            Вернуться на главную
          </Link>
        </div>

        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
          Если у вас есть вопросы, напишите нам в Telegram или на почту support@bigsteppers.club
        </p>
      </div>
    </div>
  );
}
