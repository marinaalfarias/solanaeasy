import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { X, Wallet, CheckCircle, HelpCircle, ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";

type PaymentState = "qr" | "wallet" | "processing" | "success" | "guide";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  amount?: string;
  currency?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  storeName = "Loja do Dev",
  amount = "150,00",
  currency = "BRL",
}: PaymentModalProps) {
  const [state, setState] = useState<PaymentState>("qr");
  const [copied, setCopied] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);

  const walletAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
  const solanaeasyUrl = `solana:${walletAddress}?amount=0.98&label=${encodeURIComponent(storeName)}&message=${encodeURIComponent(`Pagamento de R$${amount}`)}`;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setState("qr"), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => setPulseActive((p) => !p), 800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    setState("processing");
    setTimeout(() => setState("success"), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden"
              style={{ background: "#0F1117", border: "1px solid rgba(153,69,255,0.3)" }}
            >
              {/* Header */}
              <div
                className="px-6 pt-5 pb-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  {state !== "guide" && state !== "success" && (
                    <>
                      <p className="text-xs" style={{ color: "#8B949E" }}>
                        {storeName}
                      </p>
                      <p style={{ color: "#F9FAFB", fontWeight: 700 }} className="text-lg">
                        R$ {amount}
                      </p>
                    </>
                  )}
                  {state === "guide" && (
                    <button
                      onClick={() => setState("qr")}
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: "#9945FF" }}
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  )}
                  {state === "success" && (
                    <p style={{ color: "#14F195", fontWeight: 700 }} className="text-lg">
                      Pagamento Confirmado!
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg transition-all"
                  style={{ color: "#8B949E", background: "rgba(255,255,255,0.05)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {/* QR State */}
                  {state === "qr" && (
                    <motion.div
                      key="qr"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* QR Code */}
                      <div
                        className="p-4 rounded-xl"
                        style={{ background: "#FFFFFF" }}
                      >
                        <QRCodeSVG
                          value={solanaeasyUrl}
                          size={180}
                          bgColor="#FFFFFF"
                          fgColor="#0F1117"
                          level="M"
                        />
                      </div>

                      {/* SolanaEasy badge */}
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                        style={{ background: "rgba(20,241,149,0.1)", color: "#14F195", border: "1px solid rgba(20,241,149,0.2)" }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "#14F195",
                            boxShadow: "0 0 6px #14F195",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                        Aguardando pagamento...
                      </div>

                      <p className="text-xs text-center" style={{ color: "#8B949E" }}>
                        Escaneie com qualquer carteira Solana compatível
                      </p>

                      {/* Wallet button */}
                      <button
                        onClick={() => setState("wallet")}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all"
                        style={{
                          background: "linear-gradient(135deg, #9945FF, #7B2FDB)",
                          color: "#FFFFFF",
                          fontWeight: 600,
                        }}
                      >
                        <Wallet className="w-4 h-4" />
                        Pagar com Carteira
                      </button>

                      <button
                        onClick={() => setState("guide")}
                        className="flex items-center gap-1.5 text-xs transition-all"
                        style={{ color: "#8B949E" }}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        O que é isso?
                      </button>
                    </motion.div>
                  )}

                  {/* Wallet Connect State */}
                  {state === "wallet" && (
                    <motion.div
                      key="wallet"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-sm text-center" style={{ color: "#8B949E" }}>
                        Escolha sua carteira
                      </p>

                      {[
                        { name: "Phantom", emoji: "👻", color: "#AB9FF2" },
                        { name: "Solflare", emoji: "☀️", color: "#FC9B27" },
                        { name: "Backpack", emoji: "🎒", color: "#E33E3F" },
                      ].map((wallet) => (
                        <button
                          key={wallet.name}
                          onClick={simulatePayment}
                          className="flex items-center gap-3 p-4 rounded-xl transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#F9FAFB",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.border = `1px solid ${wallet.color}44`;
                            (e.currentTarget as HTMLButtonElement).style.background = `${wallet.color}11`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.08)";
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                          }}
                        >
                          <span className="text-2xl">{wallet.emoji}</span>
                          <div className="flex-1 text-left">
                            <p style={{ fontWeight: 600 }}>{wallet.name}</p>
                            <p className="text-xs" style={{ color: "#8B949E" }}>
                              Extensão detectada
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4" style={{ color: "#8B949E" }} />
                        </button>
                      ))}

                      <div
                        className="p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <p className="text-xs mb-2" style={{ color: "#8B949E" }}>
                          Ou envie manualmente para:
                        </p>
                        <div className="flex items-center gap-2">
                          <code
                            className="flex-1 text-xs truncate"
                            style={{ color: "#14F195" }}
                          >
                            {walletAddress.slice(0, 20)}...
                          </code>
                          <button
                            onClick={handleCopyAddress}
                            className="p-1.5 rounded-md"
                            style={{ color: copied ? "#14F195" : "#8B949E" }}
                          >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setState("qr")}
                        className="text-sm text-center"
                        style={{ color: "#8B949E" }}
                      >
                        ← Voltar para QR Code
                      </button>
                    </motion.div>
                  )}

                  {/* Processing State */}
                  {state === "processing" && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 py-8"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 rounded-full"
                          style={{
                            border: "3px solid rgba(153,69,255,0.2)",
                            borderTopColor: "#9945FF",
                          }}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ color: "#9945FF" }}
                        >
                          <Wallet className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p style={{ color: "#F9FAFB", fontWeight: 600 }}>Processando...</p>
                        <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
                          Confirmando na blockchain Solana
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#9945FF" }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Success State */}
                  {state === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-5 py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                        className="relative"
                      >
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(20,241,149,0.15)" }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                          >
                            <CheckCircle className="w-12 h-12" style={{ color: "#14F195" }} />
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(20,241,149,0.2)" }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                      >
                        <p style={{ color: "#14F195", fontWeight: 700 }} className="text-xl">
                          Sucesso!
                        </p>
                        <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
                          Seu recibo foi gerado
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="w-full p-4 rounded-xl text-sm"
                        style={{ background: "rgba(20,241,149,0.06)", border: "1px solid rgba(20,241,149,0.15)" }}
                      >
                        <div className="flex justify-between mb-2">
                          <span style={{ color: "#8B949E" }}>Valor pago</span>
                          <span style={{ color: "#F9FAFB", fontWeight: 600 }}>R$ {amount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span style={{ color: "#8B949E" }}>Taxa de rede</span>
                          <span style={{ color: "#14F195" }}>~0.000005 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "#8B949E" }}>Confirmações</span>
                          <span style={{ color: "#14F195" }}>32/32 ✓</span>
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        onClick={onClose}
                        className="w-full py-3 rounded-xl transition-all"
                        style={{ background: "rgba(20,241,149,0.1)", color: "#14F195", border: "1px solid rgba(20,241,149,0.3)", fontWeight: 600 }}
                      >
                        Fechar
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Guide State */}
                  {state === "guide" && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-4"
                    >
                      <h3 style={{ color: "#F9FAFB", fontWeight: 700 }} className="text-base">
                        O que é SolanaEasy? 🚀
                      </h3>

                      {[
                        {
                          step: "1",
                          title: "Blockchain rápida",
                          desc: "Solana processa ~65.000 transações por segundo, com taxas de menos de $0,01.",
                        },
                        {
                          step: "2",
                          title: "QR Code seguro",
                          desc: "O QR Code contém todos os dados do pagamento criptografados e assinados.",
                        },
                        {
                          step: "3",
                          title: "Precisa de uma carteira?",
                          desc: "Instale o Phantom (phantom.app) — é gratuito e funciona como extensão no Chrome.",
                        },
                      ].map((item) => (
                        <div
                          key={item.step}
                          className="flex gap-3 p-3 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm"
                            style={{ background: "rgba(153,69,255,0.2)", color: "#9945FF", fontWeight: 700 }}
                          >
                            {item.step}
                          </div>
                          <div>
                            <p style={{ color: "#F9FAFB", fontWeight: 600 }} className="text-sm">
                              {item.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#8B949E" }}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {state !== "success" && (
                <div
                  className="px-6 py-3 flex items-center justify-center gap-1.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs" style={{ color: "#4A5568" }}>
                    Powered by
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#9945FF", fontWeight: 600 }}
                  >
                    SolEasy SDK
                  </span>
                  <span className="text-xs" style={{ color: "#4A5568" }}>
                    • 256-bit SSL
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
