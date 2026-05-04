import { useState } from "react";
import { PaymentModal } from "../components/PaymentModal";
import { Star, Truck, Shield, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function WidgetDemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const price = 149.99;
  const total = (price * quantity).toFixed(2).replace(".", ",");

  return (
    <div className="min-h-screen" style={{ background: "#F9FAFB" }}>
      {/* Demo banner */}
      <div
        className="py-2 px-4 text-center text-sm"
        style={{ background: "linear-gradient(90deg, #9945FF22, #14F19522)", borderBottom: "1px solid rgba(153,69,255,0.2)" }}
      >
        <span style={{ color: "#9945FF" }}>🎮 Ambiente de Demonstração</span>
        <span style={{ color: "#111827" }}> — Veja como o Widget de Pagamento SolPay funciona</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <div
              className="aspect-square rounded-2xl overflow-hidden relative"
              style={{ background: "#E5E7EB" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
                alt="Relógio Premium"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs"
                style={{ background: "rgba(20,241,149,0.9)", color: "#111827", fontWeight: 700 }}
              >
                🔥 Mais Vendido
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=200&h=200&fit=crop",
              ].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: i === 0 ? "2px solid #9945FF" : "2px solid transparent" }}
                >
                  <ImageWithFallback src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm mb-1" style={{ color: "#9945FF" }}>
                Loja do Dev • Tecnologia Premium
              </p>
              <h1 style={{ color: "#111827", fontSize: "1.75rem", fontWeight: 700 }}>
                Relógio Smart Pro X1
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4"
                      style={{ color: "#F59E0B" }}
                      fill="#F59E0B"
                    />
                  ))}
                </div>
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  4.9 (328 avaliações)
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span style={{ color: "#111827", fontWeight: 800, fontSize: "2rem" }}>
                  R$ {price.toFixed(2).replace(".", ",")}
                </span>
                <span style={{ color: "#9CA3AF", textDecoration: "line-through" }}>
                  R$ 229,99
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{ background: "rgba(20,241,149,0.15)", color: "#059669", fontWeight: 600 }}
                >
                  -35%
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                ou 6x de R$ 24,99 sem juros
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: "#111827" }}>
                Quantidade:
              </span>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-2" style={{ borderColor: "#E5E7EB" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center rounded-full transition-all"
                  style={{ background: "#F3F4F6", color: "#111827" }}
                >
                  −
                </button>
                <span style={{ color: "#111827", fontWeight: 600, minWidth: "1.5rem", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full transition-all"
                  style={{ background: "#F3F4F6", color: "#111827" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Frete Grátis" },
                { icon: Shield, label: "Garantia 1 ano" },
                { icon: Zap, label: "Entrega Rápida" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{ background: "#F3F4F6" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#9945FF" }} />
                  <span className="text-xs" style={{ color: "#6B7280" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              {/* Traditional payment button */}
              <button
                className="w-full py-3.5 rounded-xl transition-all"
                style={{ background: "#111827", color: "#F9FAFB", fontWeight: 600 }}
              >
                🛒 Comprar com Cartão — R$ {total}
              </button>

              {/* SolPay Button - the main CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-xl transition-all relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #9945FF, #14F195)",
                  color: "#111827",
                  fontWeight: 700,
                  boxShadow: "0 4px 24px rgba(153,69,255,0.35)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  Pagar com Solana — R$ {total}
                </span>
              </button>

              <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                Pagamento instantâneo • Sem taxas bancárias • Powered by SolPay SDK
              </p>
            </div>
          </div>
        </div>

        {/* SDK Integration Hint */}
        <div
          className="mt-16 p-6 rounded-2xl"
          style={{ background: "#0F1117", border: "1px solid rgba(153,69,255,0.2)" }}
        >
          <p className="text-xs mb-3" style={{ color: "#8B949E" }}>
            💡 Este botão foi integrado com apenas 3 linhas de código:
          </p>
          <pre
            className="text-sm font-mono overflow-x-auto"
            style={{ color: "#14F195" }}
          >{`import { SolPay } from '@solpay/sdk';
const solpay = new SolPay({ apiKey: 'sua_chave' });
solpay.iniciarPagamento({ valor: ${(price * quantity).toFixed(2)}, moeda: 'BRL' });`}</pre>
        </div>
      </div>

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        storeName="Loja do Dev"
        amount={total}
        currency="BRL"
      />
    </div>
  );
}