import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message }: ContactRequest = await req.json();

    console.log("Received contact request:", { name, phone, email });

    // Отправляем email владельцу (вам)
    const emailResponse = await resend.emails.send({
      from: "Полка+ <onboarding@resend.dev>",
      to: ["polkapluss@yandex.ru"], // Ваша почта
      subject: `Новая заявка от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF2E92;">Новая заявка с сайта Полка+</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
            ${message ? `<p><strong>Сообщение:</strong><br/>${message}</p>` : ''}
          </div>
          
          <p style="color: #6B7280; font-size: 14px;">
            Заявка получена ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Заявка успешно отправлена" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
