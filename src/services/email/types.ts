export interface ContactFormData {
  name: string;
  email: string;
  enquiry: string;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
}
