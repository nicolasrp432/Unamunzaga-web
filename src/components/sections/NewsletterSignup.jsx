import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email: email,
          status: 'active',
          source: 'services'
        }]);

      if (error) {
        // Handle duplicate email error
        if (error.code === '23505') {
          setErrorMessage('Este correo ya está suscrito a nuestra newsletter.');
        } else {
          setErrorMessage('Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setErrorMessage('Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.');
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 text-amber-600 rounded-full p-2">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Suscríbete a nuestra newsletter</h2>
          </div>
          <p className="text-gray-700 mb-6">Recibe consejos de reformas y novedades directamente en tu correo</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Correo electrónico"
              inputMode="email"
              autoComplete="email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-colors duration-200 ${status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600'
                }`}
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enviando…</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Suscribirme</span>
                </>
              )}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-700">¡Gracias! Te hemos suscrito correctamente.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-700">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
