import { PortfolioResponse, ApiFetchOptions } from './types';

const DEFAULT_API_URL = 'https://pmhfhyuqhndjfbzbzclx.supabase.co/functions/v1/public-api/v1/portfolio';
const DEFAULT_USERNAME = 'fanueldx25';

// Reliable fallback dataset based on verified public endpoint response
export const FALLBACK_PORTFOLIO_DATA: PortfolioResponse = {
  profile: {
    username: 'fanueldx25',
    display_name: 'Fanuel DX',
    bio: 'Founder & Full-Stack Architect building next-generation digital experiences, automated systems, and high-performance applications.',
    avatar_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/avatars/fb8c92b9-8545-4e23-a46e-93b0b65a911e/avatar-1776631982983.jpeg',
    cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/avatars/fb8c92b9-8545-4e23-a46e-93b0b65a911e/cover-1786648344044.jpg',
    location: 'Cameroon',
    availability: 'open_to_work',
    skills: [
      'Python',
      'TypeScript',
      'Next.js',
      'Node.js',
      'AI',
      'Databases',
      'Open Source',
      'Startups'
    ],
    links: {
      github: 'https://github.com/fanueldx25-ux',
      website: 'https://devfanuel.online/',
      twitter: 'https://x.com/fanuel_lily?s=21',
      linkedin: null
    },
    verified: true,
    joined_at: '2026-04-18T17:08:34.675908+00:00',
    url: 'https://dev-glass.lovable.app/u/fanueldx25'
  },
  projects: [
    {
      id: '2b18e620-ba1c-4ed8-894f-f6f676b8c81a',
      title: 'Wave Pilot Pro & WhatsApp Bot',
      description: 'Automated communication bot and connect hub powering real-time customer workflows and messaging automation.',
      cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/1776695553003-AE516702-84F8-46F7-AF21-E38159E8B327.jpeg',
      images: [],
      tech_stack: ['React', 'Node.js', 'WebSockets', 'Automation'],
      live_url: 'https://wave-pilot-pro.lovable.app/app/connect',
      repo_url: 'https://github.com/fanueldx25-ux',
      created_at: '2026-04-20T14:32:35.6826+00:00',
      url: 'https://dev-glass.lovable.app/project/2b18e620-ba1c-4ed8-894f-f6f676b8c81a'
    },
    {
      id: 'c4a59453-1538-46bd-9673-4056b9690438',
      title: 'DevGlass Platform',
      description: 'High-performance web agency platform bridging creative modern glassmorphism design and robust full-stack engineering.',
      cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/1776803302701-7FAF324E-046D-4782-AB61-FFBCBF599D97.jpeg',
      images: [],
      tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      live_url: 'https://devfanuel.online/',
      repo_url: null,
      created_at: '2026-04-21T20:28:25.051173+00:00',
      url: 'https://dev-glass.lovable.app/project/c4a59453-1538-46bd-9673-4056b9690438'
    },
    {
      id: '59034bc3-495b-4eca-ac5c-94e0eff8b607',
      title: 'Collaborative Team Chat Engine',
      description: 'Real-time team messaging and idea-sharing hub built for high throughput and seamless collaboration.',
      cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/1776631851102-BE8772F7-3AEB-4087-B76E-3D7A3AB4EA32.jpeg',
      images: [],
      tech_stack: ['React', 'Node.js', 'Socket.io', 'Tailwind'],
      live_url: null,
      repo_url: null,
      created_at: '2026-04-19T20:50:59.139068+00:00',
      url: 'https://dev-glass.lovable.app/project/59034bc3-495b-4eca-ac5c-94e0eff8b607'
    },
    {
      id: '091fefb9-f07d-4a25-ac63-3400ff8ae172',
      title: 'Omini Generative AI System',
      description: 'Generative AI experimentation framework exploring multimodal intelligence and custom vision models.',
      cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/1780464514448-Gemini_Generated_Image_xmyt0exmyt0exmyt.png',
      images: [],
      tech_stack: ['Python', 'AI / ML', 'Multimodal', 'PyTorch'],
      live_url: null,
      repo_url: 'https://github.com/fanueldx25-ux',
      created_at: '2026-06-03T05:28:40.221279+00:00',
      url: 'https://dev-glass.lovable.app/project/091fefb9-f07d-4a25-ac63-3400ff8ae172'
    },
    {
      id: 'ba49126b-8886-4865-ad33-467870627690',
      title: 'Project V Visual Identity',
      description: 'Minimalist brand system and aesthetic design language created for next-generation developer tooling.',
      cover_url: 'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/1776974808371-C440FBBF-7881-4D68-AA1D-52BBE2FBB007.webp',
      images: [],
      tech_stack: ['UI / UX', 'Design Systems', 'Figma'],
      live_url: null,
      repo_url: null,
      created_at: '2026-04-23T20:06:51.591771+00:00',
      url: 'https://dev-glass.lovable.app/project/ba49126b-8886-4865-ad33-467870627690'
    }
  ],
  posts: [
    {
      id: 'e80eee4b-e1f7-4463-9502-14e56eac3544',
      content: 'Will be creating an AI from scratch every step at GPT-5 level architecture but at a smaller efficient scale. Let me know what you guys think 💭',
      images: [
        'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/posts/b627354b-cb89-4de7-9735-1f024e0fc7a0.jpg'
      ],
      preview_title: null,
      preview_description: null,
      preview_url: null,
      preview_image_url: null,
      created_at: '2026-08-16T17:26:31.479383+00:00',
      url: 'https://dev-glass.lovable.app/post/e80eee4b-e1f7-4463-9502-14e56eac3544'
    },
    {
      id: 'e7870ee2-7191-4159-a8e0-c6563a5ba8ee',
      content: 'Check out the new redesigned brand logo & visual direction for DevGlass ✨',
      images: [
        'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/posts/961ce9e2-e704-4745-bfea-3a3a60164d6c.jpg'
      ],
      preview_title: null,
      preview_description: null,
      preview_url: null,
      preview_image_url: null,
      created_at: '2026-08-31T15:11:52.419353+00:00',
      url: 'https://dev-glass.lovable.app/post/e7870ee2-7191-4159-a8e0-c6563a5ba8ee'
    },
    {
      id: '2e6eed28-4e16-4250-8632-d82366d64e1c',
      content: 'We are officially live on TikTok sharing behind-the-scenes engineering and design breakdowns!',
      images: [
        'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/posts/c80100eb-e031-4c54-ac31-1675ffa7e68c.jpg'
      ],
      preview_title: 'TikTok @fanueldx25',
      preview_description: 'Follow our engineering and tech journey on TikTok',
      preview_url: 'https://vt.tiktok.com/ZSV6syPN9/',
      preview_image_url: null,
      created_at: '2026-08-17T16:04:10.578581+00:00',
      url: 'https://dev-glass.lovable.app/post/2e6eed28-4e16-4250-8632-d82366d64e1c'
    },
    {
      id: 'eddb41fa-e26c-4715-9156-a8313165ba08',
      content: 'New milestone reached in automated conversational workflows! Comment what integrations you want to see next 🤨',
      images: [
        'https://pmhfhyuqhndjfbzbzclx.supabase.co/storage/v1/object/public/projects/fb8c92b9-8545-4e23-a46e-93b0b65a911e/posts/6b0be763-cbd9-461a-b600-e63face6efc7.jpg'
      ],
      preview_title: null,
      preview_description: null,
      preview_url: null,
      preview_image_url: null,
      created_at: '2026-08-24T22:31:03.907473+00:00',
      url: 'https://dev-glass.lovable.app/post/eddb41fa-e26c-4715-9156-a8313165ba08'
    }
  ]
};

export interface FetchResult {
  data: PortfolioResponse;
  isLive: boolean;
  error?: string | null;
}

export async function fetchPortfolio(options: ApiFetchOptions = {}): Promise<FetchResult> {
  const username =
    options.username ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_USERNAME) ||
    DEFAULT_USERNAME;

  const apiKey =
    options.apiKey ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) ||
    '';

  const limit = options.limit ?? 10;
  const offset = options.offset ?? 0;

  const url = new URL(DEFAULT_API_URL);
  url.searchParams.set('username', username);
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('offset', offset.toString());

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (apiKey && apiKey.trim().length > 0 && apiKey !== 'your_api_key_here') {
    headers['x-api-key'] = apiKey.trim();
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status} ${res.statusText}`);
    }

    const payload = await res.json();

    if (!payload || !payload.profile) {
      throw new Error('Invalid portfolio payload: missing profile object');
    }

    return {
      data: {
        profile: payload.profile,
        projects: Array.isArray(payload.projects) ? payload.projects : [],
        posts: Array.isArray(payload.posts) ? payload.posts : [],
      },
      isLive: true,
      error: null,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network error';
    console.warn('Portfolio API fetch failed or timed out. Using fallback data:', message);

    return {
      data: FALLBACK_PORTFOLIO_DATA,
      isLive: false,
      error: message,
    };
  }
}
