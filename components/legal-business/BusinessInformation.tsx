export function BusinessInformation() {
  const whatsapp = "+62 822-3300-6780";
  const waLink = "https://wa.me/6282233006780";

  return (
    <footer id="business-information" className="relative bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">📄 Kontak</div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-deep md:text-4xl">
          Kontak &amp; Pembayaran
        </h2>

        <div className="mt-8 rounded-2xl border border-sage/15 bg-cream/50 p-6 md:p-8">
          <div>
            <h3 className="text-lg font-bold text-ink-deep">Hubungi Kami</h3>
            <p className="mt-3 text-sm text-ink">Email: admin@huahualearning.com</p>
            <p className="mt-2 text-sm text-ink">
              WhatsApp: <a href={waLink} className="font-medium text-forest underline decoration-sage">{whatsapp}</a>
            </p>
          </div>

          <div className="mt-8 border-t border-sage/20 pt-6">
            <h3 className="text-lg font-bold text-ink-deep">Produk, harga, dan pembayaran</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Produk yang ditawarkan: les privat Mandarin (1-on-1 dan grup), kelas persiapan HSK, dan coaching yang
              bisa disesuaikan berdasarkan kebutuhan bisnis/travel/conversation.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              Untuk detail harga paket, silakan lihat bagian <a href="#pricing" className="font-medium text-forest underline decoration-sage">Paket &amp; Harga</a>.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              Checkout dan pembayaran dilakukan melalui <a href="https://app.huahualearning.com/private" className="font-medium text-forest underline decoration-sage">app.huahualearning.com/private</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
