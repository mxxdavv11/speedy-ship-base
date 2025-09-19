import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Готовы обсудить ваши потребности в фулфилменте? 
              Оставьте заявку, и наш эксперт свяжется с вами в течение часа.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Телефон</p>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">info@fulfillpro.ru</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Адрес</p>
                  <p className="text-muted-foreground">Москва, ул. Логистическая, 15</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-2xl p-8 shadow-card">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Ваше имя" className="bg-background" />
                <Input placeholder="Телефон" className="bg-background" />
              </div>
              <Input placeholder="Email" type="email" className="bg-background" />
              <Input placeholder="Название компании" className="bg-background" />
              <Textarea 
                placeholder="Расскажите о ваших потребностях в фулфилменте..." 
                className="min-h-32 bg-background resize-none"
              />
              <Button className="w-full" variant="hero" size="lg">
                Отправить заявку
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;