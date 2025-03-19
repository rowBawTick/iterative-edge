import { useState } from 'react';
import { Button } from './ui/DaisyUI';
import { FiCheckCircle } from 'react-icons/fi';
import { BiErrorCircle } from 'react-icons/bi';

interface ContactFormProps {
  id: string;
}

interface AlertState {
  type: 'success' | 'error';
  message: string;
}

export default function ContactForm({ id }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enquiry: ''
  });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          type: 'success',
          message: 'Your message has been sent successfully!'
        });
        setFormData({ name: '', email: '', enquiry: '' });
        setTimeout(() => setAlert(null), 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="py-16 bg-base-200">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center justify-center mb-8">Contact Us</h2>
            
            {alert && (
              <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
                {alert.type === 'success' ? (
                  <FiCheckCircle className="h-6 w-6 stroke-current" />
                ) : (
                  <BiErrorCircle className="h-6 w-6 stroke-current" />
                )}
                <span>{alert.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label block">
                  <span className="label-text font-medium">Enquiry</span>
                </label>
                <textarea
                  placeholder="How can we help you?"
                  className="textarea textarea-bordered w-full h-32 mt-2"
                  value={formData.enquiry}
                  onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-center mt-8">
                <Button 
                  type="submit"
                  variant="primary"
                  className="w-48" 
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
