import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Возврат</h1>
        
        <div className="space-y-8 text-neutral-400">
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Условия возврата</h2>
            <p>Вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения заказа, если он не подошел вам по размеру, фасону или цвету.</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Товар не был в употреблении</li>
              <li>Сохранены все бирки, ярлыки и оригинальная упаковка</li>
              <li>Имеется документ, подтверждающий покупку</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Как оформить возврат</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-white font-bold">1</span>
                <p className="text-sm">Напишите нам на почту <span className="text-white">returns@bigsteppers.club</span> с указанием номера заказа и причины возврата.</p>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-white font-bold">2</span>
                <p className="text-sm">Аккуратно упакуйте товар в оригинальную упаковку.</p>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-white font-bold">3</span>
                <p className="text-sm">Отправьте посылку курьерской службой СДЭК до нашего склада (адрес будет предоставлен в ответном письме).</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Возврат денежных средств</h2>
            <p>После получения и проверки товара нашими специалистами, мы вернем деньги в течение 5-10 рабочих дней. Возврат осуществляется на ту же карту, с которой была произведена оплата.</p>
          </section>
        </div>
      </div>
    </div>
  );
}