import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordModal = ({ open, onClose, onBackToLogin }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Здесь будет логика отправки письма для восстановления
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md glass-card backdrop-blur-xl rounded-2xl p-6 shadow-elegant m-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к входу
          </button>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Забыли пароль?</h2>
              <p className="text-muted-foreground">
                Введите ваш email, и мы отправим инструкции для восстановления пароля
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="modern" 
                size="lg" 
                className="w-full"
                disabled={!email.trim()}
              >
                Отправить инструкции
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-accent-green">Письмо отправлено!</h2>
            <p className="text-muted-foreground">
              Проверьте вашу почту <strong>{email}</strong>. 
              Мы отправили инструкции по восстановлению пароля.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};