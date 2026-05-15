export interface UseCase {
  title: string;
  description: string;
  imagePrompt: string;
  staticImage?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  deliveryTime: string;
  features: string[];
  benefits: string[];
  imagePrompt: string;
  staticImage?: string;
  useCases?: UseCase[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  website?: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}