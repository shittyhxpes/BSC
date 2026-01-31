import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Таблица размеров</h1>
        
        <div className="space-y-12 text-neutral-400">
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Футболки и Худи</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-neutral-800">
                <thead>
                  <tr className="bg-neutral-900">
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Размер</th>
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Ширина (см)</th>
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Длина (см)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">S</td>
                    <td className="p-4 border border-neutral-800">54</td>
                    <td className="p-4 border border-neutral-800">70</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">M</td>
                    <td className="p-4 border border-neutral-800">57</td>
                    <td className="p-4 border border-neutral-800">72</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">L</td>
                    <td className="p-4 border border-neutral-800">60</td>
                    <td className="p-4 border border-neutral-800">74</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">XL</td>
                    <td className="p-4 border border-neutral-800">63</td>
                    <td className="p-4 border border-neutral-800">76</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Брюки и Шорты</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-neutral-800">
                <thead>
                  <tr className="bg-neutral-900">
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Размер</th>
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Талия (см)</th>
                    <th className="p-4 border border-neutral-800 text-white uppercase text-xs">Длина (см)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">S</td>
                    <td className="p-4 border border-neutral-800">76-80</td>
                    <td className="p-4 border border-neutral-800">102</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">M</td>
                    <td className="p-4 border border-neutral-800">80-84</td>
                    <td className="p-4 border border-neutral-800">104</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">L</td>
                    <td className="p-4 border border-neutral-800">84-88</td>
                    <td className="p-4 border border-neutral-800">106</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-neutral-800 text-white font-bold">XL</td>
                    <td className="p-4 border border-neutral-800">88-92</td>
                    <td className="p-4 border border-neutral-800">108</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Как измерить?</h2>
            <p className="text-sm">Для наиболее точного выбора размера мы рекомендуем измерить вашу любимую вещь аналогичного фасона и сравнить её параметры с нашей таблицей. Измерения производятся на ровной поверхности.</p>
          </section>
        </div>
      </div>
    </div>
  );
}