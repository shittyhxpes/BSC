import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Доставка</h1>
        
        <div className="space-y-8 text-neutral-400">
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Регионы доставки</h2>
            <p>Мы осуществляем доставку по всей России, а также в страны СНГ. Все заказы отправляются из нашего распределительного центра в Москве.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Способы и сроки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-neutral-800 rounded-lg">
                <h3 className="text-white font-bold mb-2 uppercase text-sm">СДЭК (Пункт выдачи)</h3>
                <p className="text-sm">3-7 рабочих дней. Самый популярный и удобный способ.</p>
              </div>
              <div className="p-6 border border-neutral-800 rounded-lg">
                <h3 className="text-white font-bold mb-2 uppercase text-sm">Курьерская доставка</h3>
                <p className="text-sm">2-5 рабочих дней. До двери в крупных городах.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Стоимость</h2>
            <p>Стоимость доставки рассчитывается автоматически при оформлении заказа в зависимости от вашего региона и веса посылки. При заказе от 15 000 ₽ доставка бесплатная.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Отслеживание</h2>
            <p>После отправки заказа вы получите трек-номер на электронную почту, указанную при оформлении. Вы сможете отследить статус посылки на сайте выбранной курьерской службы.</p>
          </section>
        </div>
      </div>
    </div>
  );
}